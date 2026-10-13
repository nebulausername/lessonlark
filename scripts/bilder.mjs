// Rohbilder (bilder-roh/*.png, 2048 px) → public/img/<name>-<breite>.{avif,webp}.
// Breiten müssen zu BREITEN in src/components/Picture.tsx passen (Wächter: links.mjs prüft jede srcset-Datei).
import sharp from 'sharp';
import { mkdirSync, readdirSync, existsSync, statSync } from 'node:fs';

const BREITEN = [480, 960, 1600];
mkdirSync('public/img', { recursive: true });
sharp.concurrency(2);
let n = 0;
for (const datei of readdirSync('bilder-roh').filter((d) => d.endsWith('.png'))) {
  const name = datei.replace(/\.png$/, '');
  const quelle = `bilder-roh/${datei}`;
  for (const b of BREITEN) {
    for (const [endung, opts] of [['avif', { quality: 52, effort: 4 }], ['webp', { quality: 78 }]]) {
      const ziel = `public/img/${name}-${b}.${endung}`;
      if (existsSync(ziel) && statSync(ziel).mtimeMs > statSync(quelle).mtimeMs) continue;
      await sharp(quelle).resize({ width: b }).toFormat(endung, opts).toFile(ziel);
      n++;
    }
  }
}
console.log(`${n} Dateien erzeugt`);
