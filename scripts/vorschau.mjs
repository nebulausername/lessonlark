// Statische Vorschau von out/ unter /lessonlark/ — verhält sich wie der nginx-Block
// (gleiche Köpfe inkl. CSP, try_files $uri $uri/ → index.html, echte 404 mit 404.html).
// Aufruf: node scripts/vorschau.mjs [port]   (Standard 3198, lauscht nur auf 127.0.0.1)
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { gzipSync } from 'node:zlib';

import { KOEPFE } from '../deploy/koepfe.mjs';

const PORT = Number(process.argv[2] ?? 3198);
const WURZEL = new URL('../out/', import.meta.url).pathname;
const BASIS = '/lessonlark';
const TYPEN = {
  '.html': 'text/html; charset=utf-8', '.js': 'application/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.json': 'application/json', '.txt': 'text/plain; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.webp': 'image/webp', '.avif': 'image/avif', '.woff2': 'font/woff2', '.ico': 'image/x-icon',
};

async function datei(p) {
  try {
    const s = await stat(p);
    if (s.isDirectory()) return datei(join(p, 'index.html'));
    return p;
  } catch {
    return null;
  }
}

createServer(async (req, res) => {
  const url = new URL(req.url, 'http://x');
  let pfad = decodeURIComponent(url.pathname);
  if (pfad === BASIS) { res.writeHead(301, { Location: `${BASIS}/` }); return res.end(); }
  if (!pfad.startsWith(`${BASIS}/`)) { res.writeHead(404); return res.end('nicht unter /lessonlark'); }
  const rel = normalize(pfad.slice(BASIS.length)).replace(/^(\.\.[/\\])+/, '');
  const gefunden = await datei(join(WURZEL, rel));
  const koepfe = { ...KOEPFE };
  if (rel.startsWith('/_next/static/')) koepfe['Cache-Control'] = 'public, max-age=31536000, immutable';
  if (!gefunden) {
    const body = await readFile(join(WURZEL, '404.html'));
    res.writeHead(404, { ...koepfe, 'Content-Type': TYPEN['.html'] });
    return res.end(body);
  }
  let body = await readFile(gefunden);
  const typ = TYPEN[extname(gefunden)] ?? 'application/octet-stream';
  // Wie nginx (gzip_comp_level 6, ab 1 kB, nur Text): sonst misst Lighthouse unkomprimiertes JavaScript.
  if (/text|javascript|json|svg/.test(typ) && body.length >= 1024 && /gzip/.test(req.headers['accept-encoding'] ?? '')) {
    body = gzipSync(body, { level: 6 });
    koepfe['Content-Encoding'] = 'gzip';
    koepfe['Vary'] = 'Accept-Encoding';
  }
  res.writeHead(200, { ...koepfe, 'Content-Type': typ });
  res.end(body);
}).listen(PORT, '127.0.0.1', () => console.log(`Vorschau: http://127.0.0.1:${PORT}${BASIS}/`));
