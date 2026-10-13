// Schau-Lauf: jede gebaute Seite im echten Browser. Zählt Konsolenfehler, seitliches Rollen,
// axe-Befunde (WCAG 2.1 AA), Anfragen an fremde Hosts und HTTP-Fehler; macht auf Wunsch Fotos.
//
//   node scripts/pruef/schau.mjs [--basis=http://127.0.0.1:3198] [--nur=<regex>] [--fotos=<ordner>]
//                                [--breiten=390,768,1440] [--browser=chromium,webkit] [--themen=light,dark] [--voll]
//
// Ohne --voll gilt die begründete Teilmenge: Chromium prüft ALLE Seiten auf drei Breiten im hellen
// Modus; dunkel nur die Seitenarten mit eigenen Farbflächen; WebKit nur je Seitenart eine Seite
// (dort geht es um Safari-Abweichungen, nicht um jedes Raster — und WebKit-Kontexte sterben bei
// knappem Speicher, siehe RECEIPTS).
// Exit 0 = alles grün, 1 = Befund, 2 = misst nichts (keine Seiten gefunden).
import { mkdirSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { chromium, webkit } from 'playwright';
import { AxeBuilder } from '@axe-core/playwright';

const arg = (n, d) => process.argv.find((a) => a.startsWith(`--${n}=`))?.split('=').slice(1).join('=') ?? d;
const BASIS = arg('basis', 'http://127.0.0.1:3198').replace(/\/$/, '');
const NUR = arg('nur') ? new RegExp(arg('nur')) : null;
const FOTOS = arg('fotos');
const VOLL = process.argv.includes('--voll');
const BREITEN = arg('breiten', '390,768,1440').split(',').map(Number);
const BROWSER = arg('browser', 'chromium,webkit').split(',');
const THEMEN = arg('themen', 'light,dark').split(',');
const OUT = new URL('../../out/', import.meta.url).pathname;
// --anhang=#login prüft z. B. den Anmelde-Reiter (Zustand hinter einem Sprungziel).
const ANHANG = arg('anhang', '');

function routen(dir = OUT, pre = '') {
  const r = [];
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) {
      if (e.startsWith('_') || e === 'img') continue;
      if (existsSync(join(p, 'index.html'))) r.push(`${pre}/${e}/`);
      r.push(...routen(p, `${pre}/${e}`));
    }
  }
  return r;
}
let alle = ['/', ...routen(), '/diese-seite-gibt-es-nicht/'].filter((r, i, a) => a.indexOf(r) === i);
if (NUR) alle = alle.filter((r) => NUR.test(r));
if (!alle.length) {
  console.error('Keine Seiten gefunden — misst nichts.');
  process.exit(2);
}

const art = (r) => r.replace(/^\/(students|professionals|schools)/, '/<a>').replace(/\/courses\/[^/]+\//, '/courses/<slug>/');
const ersteJeArt = new Map();
for (const r of alle) if (!ersteJeArt.has(art(r))) ersteJeArt.set(art(r), r);
const DUNKEL_ARTEN = new Set(['/', '/<a>/', '/<a>/pricing/', '/<a>/dashboard/', '/<a>/courses/<slug>/', '/<a>/signup/']);

const plan = [];
for (const b of BROWSER) {
  for (const t of THEMEN) {
    for (const r of alle) {
      if (!VOLL) {
        if (b === 'webkit' && ersteJeArt.get(art(r)) !== r) continue;
        if (b === 'webkit' && t === 'dark') continue;
        if (t === 'dark' && !DUNKEL_ARTEN.has(art(r))) continue;
      }
      for (const w of BREITEN) {
        if (!VOLL && (t === 'dark' || b === 'webkit') && w === 768) continue;
        plan.push({ b, t, r, w });
      }
    }
  }
}

if (FOTOS) mkdirSync(FOTOS, { recursive: true });
const browser = {};
let befunde = 0;
const zeilen = [];
const host = new URL(BASIS).host;

for (const p of plan) {
  browser[p.b] ??= await (p.b === 'webkit' ? webkit : chromium).launch();
  const ctx = await browser[p.b].newContext({
    viewport: { width: p.w, height: p.w < 600 ? 844 : 900 },
    deviceScaleFactor: 1,
    isMobile: p.w < 600 && p.b === 'chromium',
    hasTouch: p.w < 600,
    colorScheme: p.t,
    reducedMotion: 'reduce',
  });
  // Rot-Probe: ein absichtlich zu breites Element — der Überlauf-Wächter MUSS anschlagen.
  if (process.argv.includes('--rot'))
    await ctx.addInitScript(() =>
      document.addEventListener('DOMContentLoaded', () => {
        const d = document.createElement('div');
        d.style.cssText = 'width:2400px;height:2px';
        document.body.appendChild(d);
      }),
    );
  await ctx.addInitScript((t) => {
    try {
      localStorage.setItem('ll-theme', t);
    } catch {}
  }, p.t);
  const seite = await ctx.newPage();
  const fehler = [];
  const fremd = [];
  const ziel = BASIS + '/lessonlark' + p.r + ANHANG;
  const soll = p.r.startsWith('/diese-seite') ? 404 : 200;
  // Ladefehler über die Antworten zählen (mit Adresse), nicht über die Konsolenzeile ohne Adresse.
  // Ausnahme: das Dokument der absichtlichen 404-Probe selbst.
  seite.on('response', (r) => r.status() >= 400 && !(r.url() === ziel && soll === 404) && fehler.push(`HTTP ${r.status()} ${r.url()}`));
  seite.on('console', (m) => m.type() === 'error' && !m.text().startsWith('Failed to load resource') && fehler.push(m.text().slice(0, 160)));
  seite.on('pageerror', (e) => fehler.push(`pageerror: ${e.message.slice(0, 160)}`));
  seite.on('request', (q) => {
    const u = new URL(q.url());
    if (u.protocol.startsWith('http') && u.host !== host) fremd.push(u.host);
  });
  const antwort = await seite.goto(ziel, { waitUntil: 'networkidle' });
  const status = antwort?.status() ?? 0;
  // Durchscrollen, damit Auftritt-Blöcke gemessen werden, dann zurück nach oben.
  await seite.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 40));
    }
    window.scrollTo(0, 0);
  });
  await seite.waitForTimeout(250);
  const ueber = await seite.evaluate(() => {
    const d = document.documentElement;
    const diff = d.scrollWidth - d.clientWidth;
    const raus = [];
    if (diff > 0) {
      for (const el of document.querySelectorAll('body *')) {
        const r = el.getBoundingClientRect();
        if (r.width && r.right > d.clientWidth + 1 && getComputedStyle(el).position !== 'fixed') raus.push(`${el.tagName.toLowerCase()}.${String(el.className).slice(0, 40)}`);
        if (raus.length > 4) break;
      }
    }
    return { diff, raus };
  });
  let axe = [];
  if (p.b === 'chromium') {
    const r = await new AxeBuilder({ page: seite }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    axe = r.violations.map((v) => `${v.id}(${v.nodes.length}): ${v.nodes[0]?.target}`);
  }
  if (FOTOS) {
    const name = `${p.b}-${p.t}-${p.w}${p.r.replace(/\//g, '_') || '_'}`.replace(/_+$/, '');
    await seite.screenshot({ path: join(FOTOS, `${name}.png`), fullPage: true, caret: 'initial' });
  }
  const probleme = [];
  if (status !== soll) probleme.push(`HTTP ${status} statt ${soll}`);
  if (fehler.length) probleme.push(`Konsole: ${fehler.join(' | ')}`);
  if (ueber.diff > 0) probleme.push(`rollt seitlich +${ueber.diff}px: ${ueber.raus.join(', ')}`);
  if (fremd.length) probleme.push(`fremde Hosts: ${[...new Set(fremd)].join(', ')}`);
  if (axe.length) probleme.push(`axe: ${axe.join(' | ')}`);
  befunde += probleme.length;
  const kennung = `${p.b.padEnd(8)} ${p.t.padEnd(5)} ${String(p.w).padStart(4)} ${p.r}`;
  zeilen.push(probleme.length ? `✗ ${kennung}\n    ${probleme.join('\n    ')}` : `✓ ${kennung}`);
  await ctx.close();
}
for (const b of Object.values(browser)) await b.close();
console.log(zeilen.join('\n'));
console.log(`\n${plan.length} Ansichten, ${befunde} Befunde`);
process.exit(befunde ? 1 : 0);
