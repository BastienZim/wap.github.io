#!/usr/bin/env bash
# save as: scrape_page.sh
# usage:   ./scrape_page.sh "http://example.com/page.html#section" out_dir

set -euo pipefail

if ! command -v wget >/dev/null 2>&1; then
  echo "Error: wget is required. Install it (e.g., apt-get install wget / brew install wget) and retry." >&2
  exit 1
fi

URL_INPUT="${1:-}"
OUTDIR="${2:-site_dump}"

if [[ -z "$URL_INPUT" ]]; then
  echo "Usage: $0 <url> [output_dir]" >&2
  exit 1
fi

# Strip any URL fragment (#...)
URL="${URL_INPUT%%#*}"

mkdir -p "$OUTDIR"

# Extract hostname
HOST="$(printf '%s\n' "$URL" | awk -F/ '{print $3}')"

echo "Downloading: $URL"
echo "Saving to:   $OUTDIR"

wget \
  --page-requisites \
  --convert-links \
  --adjust-extension \
  --no-parent \
  --span-hosts \
  --domains="$HOST" \
  --retry-connrefused \
  --waitretry=1 \
  --read-timeout=20 \
  --timeout=15 \
  --tries=3 \
  --continue \
  --user-agent="Mozilla/5.0 (compatible; OfflineSaver/1.0)" \
  --directory-prefix="$OUTDIR" \
  "$URL"

echo
echo "✅ Done."

