// OG-Bild 1200×630 aus der laufenden Vorschau (echte Schriften, echtes Bild), 0 Credits.
//   node scripts/og.mjs [basis]   → public/og.jpg
import { chromium } from 'playwright';
import sharp from 'sharp';

const BASIS = process.argv[2] ?? 'http://127.0.0.1:3198';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1200, height: 630 }, colorScheme: 'light' });
await p.goto(`${BASIS}/lessonlark/`, { waitUntil: 'networkidle' });
await p.evaluate(() => {
  document.documentElement.dataset.audience = 'professionals';
  document.body.innerHTML = `
  <div style="width:1200px;height:630px;display:grid;grid-template-columns:1fr 560px;align-items:center;background:#fff8ee;color:#1b2a4a;overflow:hidden">
    <div style="padding:0 0 0 72px">
      <div style="display:flex;align-items:center;gap:14px">
        <svg viewBox="0 0 32 32" width="56" height="56"><path d="M6.5 20.5 1.5 24l6 .4Z" fill="#1b2a4a"/><circle cx="15" cy="17" r="10" fill="#1b2a4a"/><path d="M24.2 12.6 30.5 14.6 24.6 16.4Z" fill="#ff6b4a"/><path d="M15.5 26.9a10 10 0 0 0 9.3-8.4c-2.2 3.3-5.6 5.3-9.3 5.6Z" fill="#ff6b4a"/><circle cx="19.6" cy="12.6" r="1.5" fill="#fff8ee"/><path d="M7.8 16.4c3.3-.2 6.3 1.4 7.6 4.6" stroke="#fff8ee" stroke-width="1.8" fill="none" stroke-linecap="round"/></svg>
        <span style="font-family:var(--font-bricolage);font-weight:700;font-size:44px;letter-spacing:-.02em">Lessonlark</span>
      </div>
      <h1 style="font-family:var(--font-bricolage);font-weight:800;font-size:66px;line-height:1.02;letter-spacing:-.03em;margin:34px 0 0">Learning that<br>actually <span style="text-decoration:underline;text-decoration-color:#ff6b4a;text-decoration-thickness:8px;text-underline-offset:10px">sings</span>.</h1>
      <p style="font-family:var(--font-figtree);font-size:26px;color:#4a5878;margin:26px 0 0;max-width:500px">Edtech website prototype: students, professionals and schools in one site.</p>
      <p style="font-family:var(--font-caveat);font-size:30px;color:#b83a1e;margin:22px 0 0">concept by Darius Hofman</p>
    </div>
    <img src="/lessonlark/img/hero-professionals-960.webp" style="width:600px;height:600px;object-fit:cover;margin-left:-20px">
  </div>`;
});
await p.waitForFunction(() => document.querySelector('img')?.complete);
await p.evaluate(() => document.fonts.ready);
const png = await p.screenshot({ caret: 'initial' });
await sharp(png).jpeg({ quality: 86, mozjpeg: true }).toFile('public/og.jpg');
await b.close();
console.log('public/og.jpg');
