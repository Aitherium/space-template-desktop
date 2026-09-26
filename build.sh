#!/usr/bin/env bash
# Build dist/site.tar.gz for the Desktop Space template.
#
# Usage: ./build.sh
#
# The site is the static page in src/: a branded bar and the AitherOS desktop,
# full-viewport, in a frame. Packed flat so that extracting the tarball into a
# site directory puts index.html at the top.
#
# Requires: bash, tar, grep.
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DIST="$HERE/dist"
SITE="$DIST/site"

rm -rf "$DIST"
mkdir -p "$SITE"
cp -R "$HERE/src/." "$SITE/"

# Every local file index.html asks for must be in the tarball.
missing=0
checked=0
while IFS= read -r ref; do
  case "$ref" in http:*|https:*|//*|data:*|\#*|"") continue ;; esac
  checked=$((checked + 1))
  if [ ! -f "$SITE/${ref#./}" ]; then
    echo "missing: $ref" >&2
    missing=$((missing + 1))
  fi
done < <(grep -oE '(src|href)="[^"]+"' "$SITE/index.html" | sed -E 's/^(src|href)="//; s/"$//')
[ "$missing" -eq 0 ] || { echo "[desktop] $missing local reference(s) missing" >&2; exit 1; }
[ "$checked" -gt 0 ] || { echo "[desktop] found no local references to check" >&2; exit 1; }
echo "[desktop] verified $checked local reference(s) resolve"

tar -czf "$DIST/site.tar.gz" -C "$SITE" .
echo "[desktop] wrote $DIST/site.tar.gz ($(wc -c < "$DIST/site.tar.gz") bytes, $(find "$SITE" -type f | wc -l) files)"
