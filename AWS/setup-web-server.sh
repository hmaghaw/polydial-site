#!/usr/bin/env bash
# =============================================================================
# setup-web-server.sh
#
# Bootstraps a small EC2 instance (t2/t3/t4g.micro) to host:
#     polydial.com      + www.polydial.com
#     ideationmax.com   + www.ideationmax.com
#
# Installs:  Docker (+ compose & buildx plugins), Git, Nginx, Certbot
# Configures: Nginx reverse proxy -> local Docker ports, HTTPS for every name,
#             HTTP -> HTTPS redirect, automatic certificate renewal
#             (systemd timer, nginx reloads itself after each renewal),
#             2 GB swap file (micro instances only have 1 GB RAM),
#             Docker log rotation so containers can't fill the disk.
#
# Supported OS: Amazon Linux 2023 (dnf) and Ubuntu 22.04 / 24.04 (apt).
# Safe to re-run: every step checks before it changes anything.
#
# Usage:
#   sudo ./setup-web-server.sh --email you@example.com
#
# Options:
#   --email ADDRESS          Let's Encrypt account / expiry-notice email (required)
#   --polydial-port N        Local port the polydial.com container listens on   (default 3004)
#   --ideationmax-port N     Local port the ideationmax.com container listens on (default 3005)
#   --staging                Use Let's Encrypt staging (test certs, no rate limits)
#   --skip-dns-check         Request certificates even if DNS doesn't point here yet
#   --no-swap                Don't create a swap file
#   -h, --help               Show this help
# =============================================================================
set -Eeuo pipefail

# ----------------------------- defaults --------------------------------------
EMAIL="hanyelgaml@ideationmax.com"
POLYDIAL_PORT=3004
IDEATIONMAX_PORT=3005
STAGING=0
SKIP_DNS_CHECK=0
CREATE_SWAP=1
SWAP_SIZE_MB=2048

WEBROOT=/var/www/letsencrypt
CERTBOT_VENV=/opt/certbot
CERTBOT="$CERTBOT_VENV/bin/certbot"
NGINX_CONF_DIR=/etc/nginx/conf.d

# ----------------------------- helpers ---------------------------------------
c_green=$'\e[32m'; c_yellow=$'\e[33m'; c_red=$'\e[31m'; c_bold=$'\e[1m'; c_off=$'\e[0m'
log()  { echo "${c_green}==>${c_off} ${c_bold}$*${c_off}"; }
warn() { echo "${c_yellow}WARN:${c_off} $*" >&2; }
die()  { echo "${c_red}ERROR:${c_off} $*" >&2; exit 1; }
trap 'die "failed at line $LINENO: $BASH_COMMAND"' ERR

usage() { sed -n '/^# Usage:/,/^# =====/p' "$0" | grep -v '^# =====' | sed 's/^# \{0,1\}//'; exit 0; }

while [[ $# -gt 0 ]]; do
  case "$1" in
    --email)            EMAIL="${2:-}"; shift 2 ;;
    --polydial-port)    POLYDIAL_PORT="${2:-}"; shift 2 ;;
    --ideationmax-port) IDEATIONMAX_PORT="${2:-}"; shift 2 ;;
    --staging)          STAGING=1; shift ;;
    --skip-dns-check)   SKIP_DNS_CHECK=1; shift ;;
    --no-swap)          CREATE_SWAP=0; shift ;;
    -h|--help)          usage ;;
    *) die "unknown option: $1 (see --help)" ;;
  esac
done

[[ $EUID -eq 0 ]] || die "run as root: sudo $0 $*"
[[ -n "$EMAIL" ]] || die "--email is required (Let's Encrypt sends expiry warnings there)"
for p in "$POLYDIAL_PORT" "$IDEATIONMAX_PORT"; do
  [[ "$p" =~ ^[0-9]+$ ]] && (( p > 0 && p < 65536 )) || die "invalid port: $p"
done

# domain:port — add more lines here to host more sites on the same box
SITES=(
  "polydial.com:${POLYDIAL_PORT}"
  "ideationmax.com:${IDEATIONMAX_PORT}"
)

# The non-root user who will run docker / git (ec2-user on AL2023, ubuntu on Ubuntu)
TARGET_USER="${SUDO_USER:-}"
if [[ -z "$TARGET_USER" || "$TARGET_USER" == "root" ]]; then
  for u in ec2-user ubuntu; do id "$u" &>/dev/null && TARGET_USER=$u && break; done
fi

# ----------------------------- OS detection ----------------------------------
. /etc/os-release
if command -v dnf &>/dev/null; then
  PKG=dnf
elif command -v apt-get &>/dev/null; then
  PKG=apt
  export DEBIAN_FRONTEND=noninteractive
else
  die "unsupported OS ($PRETTY_NAME): need dnf or apt-get"
fi
log "Detected $PRETTY_NAME ($PKG), arch $(uname -m)"

case "$(uname -m)" in
  x86_64)  ARCH_COMPOSE=x86_64;  ARCH_GO=amd64 ;;
  aarch64) ARCH_COMPOSE=aarch64; ARCH_GO=arm64 ;;
  *) die "unsupported CPU architecture $(uname -m)" ;;
esac

# ----------------------------- 1. swap ---------------------------------------
setup_swap() {
  if [[ $CREATE_SWAP -eq 0 ]]; then return; fi
  if swapon --show --noheadings | grep -q .; then
    log "Swap already active — skipping"; return
  fi
  log "Creating ${SWAP_SIZE_MB} MB swap file (helps docker builds on 1 GB RAM)"
  if ! fallocate -l "${SWAP_SIZE_MB}M" /swapfile 2>/dev/null; then
    dd if=/dev/zero of=/swapfile bs=1M count="$SWAP_SIZE_MB" status=none
  fi
  chmod 600 /swapfile
  mkswap /swapfile >/dev/null
  swapon /swapfile
  grep -q '^/swapfile ' /etc/fstab || echo '/swapfile none swap sw 0 0' >> /etc/fstab
  echo 'vm.swappiness=10' > /etc/sysctl.d/99-swappiness.conf
  sysctl -q -p /etc/sysctl.d/99-swappiness.conf
}

# ----------------------------- 2. base packages ------------------------------
install_packages() {
  log "Installing git, nginx, docker, python3"
  if [[ $PKG == dnf ]]; then
    dnf -y -q upgrade --refresh || warn "dnf upgrade had problems, continuing"
    # AL2023 ships curl-minimal, which already provides `curl`
    dnf -y -q install git nginx docker python3 python3-pip tar gzip
  else
    apt-get update -q
    apt-get -y -q upgrade
    apt-get -y -q install git nginx docker.io python3-venv curl ca-certificates
    # Compose v2 / buildx packages exist on newer Ubuntu releases; fall back later if not
    apt-get -y -q install docker-compose-v2 2>/dev/null || true
    apt-get -y -q install docker-buildx    2>/dev/null || true
    rm -f /etc/nginx/sites-enabled/default
  fi
}

# ----------------------------- 3. docker -------------------------------------
setup_docker() {
  log "Configuring Docker"
  mkdir -p /etc/docker
  if [[ ! -f /etc/docker/daemon.json ]]; then
    cat > /etc/docker/daemon.json <<'JSON'
{
  "log-driver": "json-file",
  "log-opts": { "max-size": "10m", "max-file": "3" }
}
JSON
  fi
  systemctl enable --now docker
  systemctl restart docker

  local plugins=/usr/local/lib/docker/cli-plugins
  mkdir -p "$plugins"

  if ! docker compose version &>/dev/null; then
    log "Installing Docker Compose v2 plugin"
    curl -fsSL "https://github.com/docker/compose/releases/latest/download/docker-compose-linux-${ARCH_COMPOSE}" \
      -o "$plugins/docker-compose"
    chmod +x "$plugins/docker-compose"
  fi

  if ! docker buildx version &>/dev/null; then
    log "Installing Docker buildx plugin (needed by 'docker compose build')"
    local tag
    tag=$(curl -fsSL https://api.github.com/repos/docker/buildx/releases/latest \
          | grep -m1 '"tag_name"' | cut -d'"' -f4)
    [[ -n "$tag" ]] || die "could not look up latest buildx release"
    curl -fsSL "https://github.com/docker/buildx/releases/download/${tag}/buildx-${tag}.linux-${ARCH_GO}" \
      -o "$plugins/docker-buildx"
    chmod +x "$plugins/docker-buildx"
  fi

  if [[ -n "$TARGET_USER" ]]; then
    usermod -aG docker "$TARGET_USER"
    log "Added '$TARGET_USER' to the docker group (log out/in to take effect)"
  fi
}

# ----------------------------- 4. certbot ------------------------------------
install_certbot() {
  # Installed in its own virtualenv: identical on AL2023 and Ubuntu, and always current.
  if [[ ! -x "$CERTBOT" ]]; then
    log "Installing Certbot into $CERTBOT_VENV"
    python3 -m venv "$CERTBOT_VENV"
    "$CERTBOT_VENV/bin/pip" install -q --upgrade pip
    "$CERTBOT_VENV/bin/pip" install -q certbot
  else
    log "Certbot already installed — upgrading"
    "$CERTBOT_VENV/bin/pip" install -q --upgrade certbot
  fi
  ln -sf "$CERTBOT" /usr/local/bin/certbot
  mkdir -p "$WEBROOT/.well-known/acme-challenge"
}

# ----------------------------- 5. nginx --------------------------------------
nginx_version_ge() {  # nginx_version_ge 1.25.1
  local v; v=$(nginx -v 2>&1 | sed -E 's|.*nginx/([0-9.]+).*|\1|')
  [[ "$(printf '%s\n%s\n' "$1" "$v" | sort -V | head -n1)" == "$1" ]]
}

write_common_conf() {
  cat > "$NGINX_CONF_DIR/00-common.conf" <<'NGX'
# Managed by setup-web-server.sh — shared http-level settings
map $http_upgrade $connection_upgrade {
    default upgrade;
    ''      close;
}
server_tokens off;
NGX
}

cert_exists() { [[ -s "/etc/letsencrypt/live/$1/fullchain.pem" ]]; }

# Only add IPv6 listeners when the kernel has IPv6 enabled
if [[ -s /proc/net/if_inet6 ]]; then V6_80='    listen [::]:80;'; V6=1; else V6_80='    #  (IPv6 disabled on this host)'; V6=0; fi

# HTTP-only config used until a certificate exists (serves ACME challenges + app)
write_http_only_conf() {
  local domain=$1 port=$2
  cat > "$NGINX_CONF_DIR/$domain.conf" <<NGX
# Managed by setup-web-server.sh — TEMPORARY http-only config (no certificate yet)
server {
    listen 80;
$V6_80
    server_name $domain www.$domain;

    location ^~ /.well-known/acme-challenge/ {
        root $WEBROOT;
        default_type "text/plain";
    }

    location / {
        proxy_pass http://127.0.0.1:$port;
        proxy_http_version 1.1;
        proxy_set_header Host              \$host;
        proxy_set_header X-Real-IP         \$remote_addr;
        proxy_set_header X-Forwarded-For   \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
NGX
}

# Final config: HTTP->HTTPS redirect + HTTPS reverse proxy (websocket-ready)
write_https_conf() {
  local domain=$1 port=$2 listen443
  if nginx_version_ge 1.25.1; then
    listen443='    listen 443 ssl;'
    [[ $V6 -eq 1 ]] && listen443+=$'\n    listen [::]:443 ssl;'
    listen443+=$'\n    http2 on;'
  else
    listen443='    listen 443 ssl http2;'
    [[ $V6 -eq 1 ]] && listen443+=$'\n    listen [::]:443 ssl http2;'
  fi

  cat > "$NGINX_CONF_DIR/$domain.conf" <<NGX
# Managed by setup-web-server.sh — $domain + www.$domain -> 127.0.0.1:$port

# ---- HTTP: ACME challenges stay on port 80, everything else -> HTTPS ----
server {
    listen 80;
$V6_80
    server_name $domain www.$domain;

    location ^~ /.well-known/acme-challenge/ {
        root $WEBROOT;
        default_type "text/plain";
    }

    location / {
        return 301 https://\$host\$request_uri;
    }
}

# ---- HTTPS ----
server {
$listen443
    server_name $domain www.$domain;

    ssl_certificate     /etc/letsencrypt/live/$domain/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/$domain/privkey.pem;
    ssl_protocols       TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers off;
    ssl_session_cache   shared:SSL:10m;
    ssl_session_timeout 1d;

    add_header Strict-Transport-Security "max-age=31536000" always;
    add_header X-Content-Type-Options    "nosniff" always;

    client_max_body_size 25m;

    location / {
        proxy_pass http://127.0.0.1:$port;
        proxy_http_version 1.1;

        proxy_set_header Upgrade           \$http_upgrade;
        proxy_set_header Connection        \$connection_upgrade;
        proxy_set_header Host              \$host;
        proxy_set_header X-Real-IP         \$remote_addr;
        proxy_set_header X-Forwarded-For   \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;

        proxy_read_timeout 300s;
        proxy_send_timeout 300s;
    }
}
NGX
}

reload_nginx() {
  nginx -t -q || die "nginx config test failed (run 'sudo nginx -t' for details)"
  systemctl enable nginx &>/dev/null
  if systemctl is-active --quiet nginx; then systemctl reload nginx; else systemctl start nginx; fi
}

setup_nginx_bootstrap() {
  log "Writing nginx configs"
  # SELinux (if enforcing, e.g. on RHEL) blocks nginx -> localhost proxying by default
  if command -v getenforce &>/dev/null && [[ "$(getenforce)" == "Enforcing" ]]; then
    setsebool -P httpd_can_network_connect 1
  fi
  write_common_conf
  for site in "${SITES[@]}"; do
    local domain=${site%%:*} port=${site##*:}
    if cert_exists "$domain"; then
      write_https_conf "$domain" "$port"
    else
      write_http_only_conf "$domain" "$port"
    fi
  done
  reload_nginx
}

# ----------------------------- 6. certificates -------------------------------
public_ip() {
  local token
  token=$(curl -fsS -m 3 -X PUT http://169.254.169.254/latest/api/token \
          -H "X-aws-ec2-metadata-token-ttl-seconds: 60" 2>/dev/null) || true
  if [[ -n "$token" ]]; then
    curl -fsS -m 3 -H "X-aws-ec2-metadata-token: $token" \
      http://169.254.169.254/latest/meta-data/public-ipv4 2>/dev/null && return
  fi
  curl -fsS -m 5 https://checkip.amazonaws.com 2>/dev/null | tr -d '[:space:]'
}

dns_points_here() {  # dns_points_here name ip
  getent ahostsv4 "$1" | awk '{print $1}' | sort -u | grep -qx "$2"
}

ISSUED=()
SKIPPED=()

obtain_certificates() {
  local my_ip=""
  [[ $SKIP_DNS_CHECK -eq 1 ]] || my_ip=$(public_ip || true)
  [[ $SKIP_DNS_CHECK -eq 1 || -n "$my_ip" ]] || warn "could not determine public IP — DNS check disabled"
  [[ -n "$my_ip" ]] && log "This instance's public IP: $my_ip"

  local extra=()
  [[ $STAGING -eq 1 ]] && extra+=(--staging)

  for site in "${SITES[@]}"; do
    local domain=${site%%:*} port=${site##*:}

    if [[ -n "$my_ip" ]]; then
      local bad=()
      for name in "$domain" "www.$domain"; do
        dns_points_here "$name" "$my_ip" || bad+=("$name")
      done
      if [[ ${#bad[@]} -gt 0 ]]; then
        warn "${bad[*]} does not resolve to $my_ip yet — skipping certificate for $domain."
        warn "  Point the A records at this instance, then re-run this script."
        SKIPPED+=("$domain")
        continue
      fi
    fi

    log "Requesting/validating certificate for $domain + www.$domain"
    "$CERTBOT" certonly --webroot -w "$WEBROOT" \
      --cert-name "$domain" -d "$domain" -d "www.$domain" \
      --email "$EMAIL" --agree-tos --no-eff-email \
      --non-interactive --keep-until-expiring "${extra[@]}"

    write_https_conf "$domain" "$port"
    ISSUED+=("$domain")
  done
  reload_nginx
}

# ----------------------------- 7. auto-renewal -------------------------------
setup_renewal() {
  log "Setting up automatic renewal (systemd timer, twice daily)"
  mkdir -p /etc/letsencrypt/renewal-hooks/deploy
  cat > /etc/letsencrypt/renewal-hooks/deploy/reload-nginx.sh <<'SH'
#!/bin/sh
# Runs only when a certificate was actually renewed
nginx -t -q && systemctl reload nginx
SH
  chmod +x /etc/letsencrypt/renewal-hooks/deploy/reload-nginx.sh

  cat > /etc/systemd/system/certbot-renew.service <<UNIT
[Unit]
Description=Renew Let's Encrypt certificates
After=network-online.target
Wants=network-online.target

[Service]
Type=oneshot
ExecStart=$CERTBOT renew --quiet
UNIT

  cat > /etc/systemd/system/certbot-renew.timer <<'UNIT'
[Unit]
Description=Run certbot renew twice daily

[Timer]
OnCalendar=*-*-* 00,12:00:00
RandomizedDelaySec=1h
Persistent=true

[Install]
WantedBy=timers.target
UNIT

  # Ubuntu's apt certbot (if ever installed) ships its own timer — avoid running both
  systemctl disable --now certbot.timer &>/dev/null || true

  systemctl daemon-reload
  systemctl enable --now certbot-renew.timer
}

verify_renewal() {
  if [[ ${#ISSUED[@]} -gt 0 && $STAGING -eq 0 ]]; then
    log "Testing renewal with a dry run"
    "$CERTBOT" renew --dry-run --quiet && log "Renewal dry run OK" \
      || warn "renewal dry run failed — check: sudo certbot renew --dry-run"
  fi
}

# ----------------------------- run -------------------------------------------
setup_swap
install_packages
setup_docker
install_certbot
setup_nginx_bootstrap
obtain_certificates
setup_renewal
verify_renewal

echo
log "Done."
echo "  Docker:   $(docker --version)"
echo "  Compose:  $(docker compose version --short 2>/dev/null || echo n/a)"
echo "  Git:      $(git --version)"
echo "  Nginx:    $(nginx -v 2>&1 | cut -d/ -f2)"
echo "  Certbot:  $("$CERTBOT" --version 2>&1)"
echo
for site in "${SITES[@]}"; do
  d=${site%%:*}; p=${site##*:}
  if cert_exists "$d"; then
    echo "  ${c_green}✔${c_off} https://$d  https://www.$d  ->  127.0.0.1:$p"
  else
    echo "  ${c_yellow}✘${c_off} $d  (HTTP only, no certificate yet)  ->  127.0.0.1:$p"
  fi
done
echo
echo "  Next renewal check: $(systemctl list-timers certbot-renew.timer --no-legend | awk '{print $1, $2, $3}')"
[[ ${#SKIPPED[@]} -gt 0 ]] && echo "  Re-run this script after DNS for ${SKIPPED[*]} points here."
[[ -n "$TARGET_USER" ]] && echo "  Log out and back in as '$TARGET_USER' to use docker without sudo."
exit 0
