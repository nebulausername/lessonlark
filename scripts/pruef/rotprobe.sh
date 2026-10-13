#!/usr/bin/env bash
# Jeder Wächter einmal absichtlich verletzt — er MUSS rot werden (Betriebsregel 21).
# Arbeitet auf einer Kopie von out/, die echte Ausgabe bleibt unberührt. Braucht die Vorschau auf :3198.
set -uo pipefail
cd "$(dirname "$0")/../.."
K="$(mktemp -d)"; trap 'rm -rf "$K"' EXIT
gut=0; schlecht=0
erwarte_rot() { if [[ $1 -eq 1 ]]; then echo "✓ $2 wird rot"; gut=$((gut+1)); else echo "✗ $2 bleibt $1 — der Wächter ist blind"; schlecht=$((schlecht+1)); fi; }

cp -r out "$K/a"; sed -i 's#href="/lessonlark/students/pricing/"#href="/lessonlark/students/preise/"#' "$K/a/students/index.html"
node scripts/pruef/links.mjs "$K/a" >/dev/null; erwarte_rot $? "links.mjs: toter Link"

cp -r out "$K/b"; sed -i 's# data-sample-tag=""##' "$K/b/schools/index.html"
node scripts/pruef/links.mjs "$K/b" >/dev/null; erwarte_rot $? "links.mjs: Sample ohne Etikett"

cp -r out "$K/c"; sed -i 's#content="noindex, nofollow"#content="index, follow"#' "$K/c/professionals/pricing/index.html"
node scripts/pruef/links.mjs "$K/c" >/dev/null; erwarte_rot $? "links.mjs: noindex fehlt"

node scripts/pruef/schau.mjs --rot --nur='^/students/$' --browser=chromium --themen=light --breiten=390 >/dev/null; erwarte_rot $? "schau.mjs: seitliches Rollen"

echo "$gut rot wie verlangt, $schlecht blind"
exit $schlecht
