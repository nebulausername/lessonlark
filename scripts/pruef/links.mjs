// Prüft den GEBAUTEN Export (out/) ohne Browser, nur am HTML OHNE <script>-Blöcke
// (die RSC-Nutzlast enthält dieselben Texte noch einmal und würde Fehler verdecken):
//  1. jeder interne Verweis (href, src, srcset) zeigt auf eine vorhandene Datei,
//  2. externe Verweise nur auf die erlaubten Rechtsseiten,
//  3. jedes Element mit data-sample enthält ein Sample-Etikett (data-sample-tag),
//  4. jede Seite trägt robots noindex und <html lang="en">.
//   node scripts/pruef/links.mjs [out]   Exit 0 = grün, 1 = Befund, 2 = misst nichts.
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const OUT = process.argv[2] ?? 'out';
const BASIS = '/lessonlark';
const ERLAUBT_EXTERN = [/^https:\/\/kaufmeinewebsite\.de\/en\/legal#(impressum|datenschutz)$/];
const LEER = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr']);

const html = (d) => readdirSync(d).flatMap((n) => {
  const p = join(d, n);
  return statSync(p).isDirectory() ? html(p) : n.endsWith('.html') ? [p] : [];
});
if (!existsSync(join(OUT, 'index.html'))) {
  console.log(`⛔ ${OUT}/index.html fehlt — misst nichts`);
  process.exit(2);
}

function ziel(url) {
  const pfad = decodeURIComponent(url.split('#')[0].split('?')[0]);
  if (!pfad.startsWith(`${BASIS}/`)) return null;
  const rel = pfad.slice(BASIS.length);
  return rel.endsWith('/') ? join(OUT, rel, 'index.html') : join(OUT, rel);
}

const befunde = [];
let verweise = 0;
let samples = 0;
const dateien = html(OUT);
for (const datei of dateien) {
  const name = relative(OUT, datei);
  const roh = readFileSync(datei, 'utf8');
  const text = roh.replace(/<script\b[\s\S]*?<\/script>/gi, '');

  if (!/<meta name="robots" content="noindex, nofollow"/.test(text)) befunde.push(`${name}: robots noindex fehlt`);
  if (!/<html lang="en"/.test(text)) befunde.push(`${name}: <html lang="en"> fehlt`);

  for (const m of text.matchAll(/\s(href|src|srcSet|srcset)="([^"]+)"/g)) {
    const urls = m[1].toLowerCase() === 'srcset' ? m[2].split(',').map((t) => t.trim().split(/\s+/)[0]) : [m[2]];
    for (const u of urls) {
      verweise++;
      if (u.startsWith('#') || u.startsWith('data:') || u.startsWith('mailto:')) continue;
      if (/^https?:\/\//.test(u)) {
        if (!ERLAUBT_EXTERN.some((r) => r.test(u))) befunde.push(`${name}: externer Verweis ${u}`);
        continue;
      }
      const z = ziel(u);
      if (!z) befunde.push(`${name}: Verweis ohne ${BASIS}: ${u}`);
      else if (!existsSync(z)) befunde.push(`${name}: totes Ziel ${u}`);
    }
  }

  // Sample-Elemente: Tags mitzählen, bis das Element schließt.
  const stapel = [];
  for (const t of text.matchAll(/<(\/?)([a-zA-Z][a-zA-Z0-9-]*)([^>]*?)(\/?)>/g)) {
    const [, zu, tag, attr, selbst] = t;
    const name2 = tag.toLowerCase();
    if (zu) {
      while (stapel.length) {
        const oben = stapel.pop();
        if (oben.sample && !oben.etikett) befunde.push(`${name}: data-sample ohne Etikett (<${oben.tag}> …)`);
        if (oben.sample && oben.etikett) samples++;
        if (oben.tag === name2) break;
      }
      continue;
    }
    if (/data-sample-tag/.test(attr)) for (const s of stapel) if (s.sample) s.etikett = true;
    if (selbst || LEER.has(name2)) continue;
    stapel.push({ tag: name2, sample: /\sdata-sample=""/.test(attr), etikett: false });
  }
}
if (befunde.length) {
  console.log(`✗ ${befunde.length} Befunde:\n  ${[...new Set(befunde)].slice(0, 40).join('\n  ')}`);
  process.exit(1);
}
console.log(`✓ ${dateien.length} Seiten, ${verweise} Verweise, ${samples} Sample-Elemente mit Etikett`);
