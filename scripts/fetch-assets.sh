#!/usr/bin/env sh
# Copies the logo, favicon and demo videos from the live polydial.com into ./public
# so the replica uses the real media. Run once from the project root:
#   sh scripts/fetch-assets.sh
# Then rebuild:  docker compose up --build -d
set -eu

SRC="${SRC:-https://polydial.com}"
DEST="$(dirname "$0")/../public"
mkdir -p "$DEST/assets"

fetch() {
  echo "-> $1"
  curl -fSL --retry 2 -o "$DEST/$1" "$SRC/$1"
}

fetch polydial-logo-rectangular.png
fetch polydial-logo-64x64.png
fetch assets/polydial_final_step5_updated_compressed_1756768660710-BXRpackj.mp4
fetch assets/polydial_multilingual_updated_final_compressed_1756785691368-D18CM99i.mp4
fetch assets/polydial_clover_demo_FINAL_1759881363681-C59-HeMY.mp4
fetch assets/polydial_call_forwarding_final_compressed_1759601643435-Dm5W1yot.mp4

echo "Done. Media saved to public/. Rebuild the image to include it."
