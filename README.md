# PolyDial marketing site (Docker)

A standalone replica of the public pages of polydial.com — React + Vite + Tailwind, served by nginx.
No database, no backend, no third-party scripts.

## Run it

```sh
docker compose up --build -d
# open http://localhost:8080
```

Change the port with `PORT=3000 docker compose up --build -d`.

## Pages

| Route | Page |
|---|---|
| `/` | Home |
| `/appointments` | Polydial Appointments (professionals) |
| `/orders` | Polydial Orders (restaurants) |
| `/languages` | Supported languages |
| `/privacy-policy`, `/terms-of-service` | Legal (edit `src/content/*.md`) |
| `/customer-support` | Help Center |

Any other path shows a 404 page. `/healthz` returns `ok` for health checks.

## Logo and demo videos

The real logo PNG and the four demo videos aren't included. Until you add them the site
uses an SVG approximation of the logo and shows a "Video not bundled yet" panel.
To pull them from the live site (run from the project root, then rebuild):

```sh
sh scripts/fetch-assets.sh
docker compose up --build -d
```

Or copy them by hand into `public/` (logo) and `public/assets/` (videos) using the file
names listed in `src/config.js`.

## Portal links

"Login to Portal", "Get Started" and similar buttons link to the portal, which is not part of
this site. They point at `https://polydial.com` by default; change it at build time:

```sh
VITE_PORTAL_URL=https://staging.polydial.com docker compose up --build -d
```

## Editing

- Shared text (emails, phone, hours, video paths): `src/config.js`
- Language lists: `src/data/languages.js`
- Pages: `src/pages/`, shared pieces: `src/components/`

Local development without Docker: `npm install && npm run dev`.

## Differences from the live site

- `/about` and `/contact` redirect to the portal login on the live site, so they're omitted;
  the `#about` and `#contact` sections on each page are included.
- The live `/appointments` page renders the Contact section and footer twice; the replica shows them once.
- The Replit dev banner and Stripe script loaded by the live site are left out.
