// Abläufe wie ein Mensch sie klickt (Chromium). Jede Probe meldet ✓/✗; Exit 1 bei einem ✗.
//   node scripts/pruef/ablauf.mjs [--basis=http://127.0.0.1:3198]
import { chromium } from 'playwright';

const BASIS = (process.argv.find((a) => a.startsWith('--basis='))?.slice(8) ?? 'http://127.0.0.1:3198') + '/lessonlark';
const b = await chromium.launch();
let rot = 0;
const ok = (bed, text) => {
  console.log(`${bed ? '✓' : '✗'} ${text}`);
  if (!bed) rot++;
};

async function neu(opts = {}) {
  const ctx = await b.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce', ...opts });
  const p = await ctx.newPage();
  const nichtGet = [];
  const fehler = [];
  // GET/HEAD sind Lesen (HEAD = Vorab-Laden verlinkter Seiten durch Next). Alles andere würde Daten senden.
  p.on('request', (q) => !['GET', 'HEAD'].includes(q.method()) && nichtGet.push(`${q.method()} ${q.url()}`));
  p.on('pageerror', (e) => fehler.push(e.message));
  p.on('console', (m) => m.type() === 'error' && fehler.push(m.text()));
  return { ctx, p, nichtGet, fehler };
}

// 1. Ganze Reise: Quiz → Empfehlung → Probelektion → Signup → Onboarding → Dashboard
{
  const { ctx, p, nichtGet, fehler } = await neu();
  await p.goto(`${BASIS}/professionals/find-your-course/`, { waitUntil: 'networkidle' });
  for (let i = 0; i < 4; i++) {
    await p.locator('form .choice').first().click();
    await p.getByRole('button', { name: i === 3 ? /See my match/ : /^Next/ }).click();
  }
  const treffer = p.getByRole('heading', { name: /^Start with / });
  await treffer.waitFor();
  const kurs = (await treffer.textContent()).replace('Start with ', '');
  ok(Boolean(kurs), `Quiz empfiehlt „${kurs}"`);
  ok((await p.locator('text=Why this fits').count()) === 1 && (await p.locator('h3:has-text("Why this fits") + ul li').count()) === 4, 'Empfehlung nennt vier Gründe aus den Antworten');
  await p.getByRole('link', { name: /Try its free lesson/ }).click();
  await p.waitForURL(/\/courses\/[^/]+\/#trial$/);
  ok((await p.locator('#kurs-titel').textContent()) === kurs, 'Empfehlung führt zur richtigen Kursseite (#trial)');
  await p.getByRole('button', { name: /Got it, next/ }).click();
  await p.getByRole('button', { name: /Flip the card/ }).click();
  await p.getByRole('button', { name: /Next: two questions/ }).click();
  for (let i = 0; i < 2; i++) {
    await p.locator('#trial ul.grid button').first().click();
    ok((await p.locator('#trial [aria-live="polite"] p.font-bold').count()) === 1, `Frage ${i + 1}: sofortige Rückmeldung mit Erklärung`);
    await p.getByRole('button', { name: i === 1 ? /Finish lesson/ : /Next question/ }).click();
  }
  await p.getByRole('heading', { name: /Lesson complete\./ }).waitFor();
  ok(true, 'Probelektion abgeschlossen');
  await p.getByRole('link', { name: /Continue the full course/ }).click();
  await p.waitForURL(/\/signup\/$/);
  await p.getByRole('button', { name: /Create my account/ }).click();
  ok((await p.locator('[aria-invalid="true"]').count()) === 3, 'Leeres Signup: drei Felder als ungültig markiert');
  ok(await p.waitForFunction(() => document.activeElement?.getAttribute('aria-invalid') === 'true', null, { timeout: 2000 }).then(() => true, () => false), 'Fokus springt auf das erste fehlerhafte Feld');
  await p.getByLabel('Your first name').fill('Testa');
  await p.getByLabel('Email').fill('testa@example.com');
  await p.getByLabel('Password', { exact: true }).fill('lernen-macht-spass');
  await p.getByRole('button', { name: /Create my account/ }).click();
  await p.waitForURL(/\/welcome\/$/);
  let ziel = '';
  for (let i = 0; i < 3; i++) {
    const wahl = p.locator('form .choice').nth(1);
    if (i === 0) ziel = (await wahl.locator('.font-semibold').textContent()).trim();
    await wahl.click();
    await p.getByRole('button', { name: i === 2 ? /Build my plan/ : /^Next/ }).click();
  }
  await p.waitForURL(/\/dashboard\/$/);
  await p.getByRole('heading', { name: 'Testa' }).waitFor();
  ok(true, 'Dashboard begrüßt mit dem eingegebenen Namen');
  ok((await p.locator(`[aria-label="Your answers from onboarding"] >> text=${ziel}`).count()) === 1, `Dashboard zeigt das Ziel „${ziel}"`);
  ok((await p.locator('text=Includes 1 finished trial lesson').count()) === 1, 'Dashboard zählt die abgeschlossene Probelektion');
  const weiter = await p.getByRole('link', { name: /Continue/ }).getAttribute('href');
  ok(weiter.includes(`/courses/`) && weiter.endsWith('#trial'), `„Continue" führt in den eigenen Kurs (${weiter})`);
  ok(nichtGet.length === 0, `Ganze Reise sendet nichts: 0 POST/PUT/PATCH/DELETE (${nichtGet.join(', ') || 0})`);
  ok(fehler.length === 0, `Ganze Reise ohne Konsolenfehler ${fehler.join(' | ')}`);
  await ctx.close();
}

// 1b. Demo-Konten: ohne Anmeldung ins gefüllte Dashboard, je Zielgruppe
{
  const { ctx, p, nichtGet, fehler } = await neu();
  for (const [a, name, kurs] of [
    ['students', 'Maya', 'Paragraph Power Workshop'],
    ['professionals', 'Sam', 'Confident Presenting'],
    ['schools', 'Mr. Chen', 'Reading Comprehension, Grades 6–8'],
  ]) {
    await p.goto(`${BASIS}/${a}/signup/#login`, { waitUntil: 'networkidle' });
    await p.getByRole('button', { name: new RegExp(`^${name}`) }).click();
    await p.waitForURL(`**/${a}/dashboard/`);
    await p.getByRole('heading', { name }).waitFor();
    const weiter = await p.locator('#ueberblick .bg-ink').textContent();
    ok(weiter.includes(kurs), `Demo „${name}" (${a}): Dashboard mit eigenem Kurs „${kurs}"`);
    ok((await p.locator('text=Demo account · switch').count()) === 1, `Demo „${name}": als Demo-Konto gekennzeichnet`);
  }
  // Wechsel des Demo-Kontos ersetzt das Profil vollständig (keine Reste vom vorigen)
  await p.goto(`${BASIS}/schools/signup/#login`, { waitUntil: 'networkidle' });
  await p.getByRole('button', { name: /^Ms\. Rivera/ }).click();
  await p.getByRole('heading', { name: 'Ms. Rivera' }).waitFor();
  ok((await p.locator('#ueberblick .bg-ink').textContent()).includes('Doubling and halving'), 'Demo-Wechsel: Ms. Rivera bekommt ihre eigene nächste Lektion');
  ok(nichtGet.length === 0 && fehler.length === 0, `Demo-Konten senden nichts, keine Konsolenfehler ${fehler.join(' | ')}`);
  await ctx.close();
}

// 2. Zielgruppen-Schalter auf jeder Seitenart
{
  const { ctx, p } = await neu();
  for (const [von, klick, soll] of [
    ['/students/', 'Professionals', '/professionals/'],
    ['/students/courses/fractions-made-friendly/', 'Schools', '/schools/courses/'],
    ['/schools/pricing/', 'Students & parents', '/students/pricing/'],
    ['/professionals/dashboard/', 'Schools', '/schools/dashboard/'],
  ]) {
    await p.goto(BASIS + von, { waitUntil: 'networkidle' });
    await p.getByRole('navigation', { name: 'Who is learning?' }).getByRole('link', { name: klick }).click();
    await p.waitForURL(`**${soll}`);
    const a = soll.split('/')[1];
    await p.waitForFunction((x) => document.documentElement.dataset.audience === x, a);
    ok(true, `Schalter ${von} → ${soll}, <html data-audience="${a}">`);
  }
  await ctx.close();
}

// 3. Dunkelmodus bleibt nach Neuladen, Preise-Schalter, Banner bleibt zu
{
  const { ctx, p } = await neu({ colorScheme: 'light' });
  await p.goto(`${BASIS}/professionals/pricing/`, { waitUntil: 'networkidle' });
  await p.getByRole('button', { name: 'Dark mode' }).click();
  await p.reload({ waitUntil: 'networkidle' });
  ok((await p.evaluate(() => document.documentElement.dataset.theme)) === 'dark', 'Dunkelmodus bleibt nach Neuladen');
  const pro = p.locator('li:has(h3:text-is("Pro")) .font-display.text-\\[2\\.75rem\\]');
  const jahr = await pro.textContent();
  await p.locator('label:has-text("Monthly")').click();
  const monat = await pro.textContent();
  ok(jahr !== monat, `Monat/Jahr ändert den Preis (${jahr} → ${monat})`);
  await p.getByRole('button', { name: 'Hide notice' }).click();
  await p.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'About' }).click();
  await p.waitForURL('**/about/');
  await p.reload({ waitUntil: 'networkidle' });
  ok(!(await p.locator('.concept-banner').isVisible()), 'Geschlossener Hinweis bleibt im Besuch zu');
  await ctx.close();
}

// 4. Kontakt und Demo-Buchung: Prüfung im Browser, Bestätigung ohne Anfrage
{
  const { ctx, p, nichtGet } = await neu();
  await p.goto(`${BASIS}/schools/contact/`, { waitUntil: 'networkidle' });
  await p.getByRole('button', { name: /Request this demo slot/ }).click();
  ok((await p.locator('#termin-fehler').count()) === 1, 'Demo ohne Termin: Fehler am Terminfeld');
  await p.getByLabel('Your name').fill('Rosa Diaz');
  await p.getByLabel('Work email').fill('rosa@school.example');
  await p.getByLabel('School or district').fill('Hill Valley Elementary');
  await p.locator('label:has-text("1:00 PM")').nth(1).click();
  await p.getByRole('button', { name: /Request this demo slot/ }).click();
  ok((await p.getByRole('status').textContent()).includes('Tue 1:00 PM'), 'Bestätigung nennt den gewählten Termin');
  ok(nichtGet.length === 0, 'Demo-Buchung sendet nichts');
  await ctx.close();
}

// 5. Handy-Menü schließt sich nach dem Seitenwechsel
{
  const { ctx, p } = await neu({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
  await p.goto(`${BASIS}/students/`, { waitUntil: 'networkidle' });
  await p.getByRole('button', { name: 'Open menu' }).click();
  await p.locator('#mobil-menue').getByRole('link', { name: 'Pricing' }).click();
  await p.waitForURL('**/students/pricing/');
  ok(await p.locator('#mobil-menue').isHidden(), 'Menü ist nach dem Wechsel zu');
  await ctx.close();
}

// 6. Filter im Katalog
{
  const { ctx, p } = await neu();
  await p.goto(`${BASIS}/students/courses/`, { waitUntil: 'networkidle' });
  const vorher = await p.locator('article').count();
  await p.getByRole('searchbox').fill('zzzz-nichts');
  ok((await p.locator('text=Nothing matches').count()) === 1, 'Leere Suche zeigt Hinweis mit Zurücksetzen');
  await p.getByRole('button', { name: 'Reset filters' }).click();
  ok((await p.locator('article').count()) === vorher, `Zurücksetzen zeigt wieder alle ${vorher}`);
  await ctx.close();
}

await b.close();
console.log(rot ? `\nABLAUF ROT (${rot})` : '\nABLAUF GRÜN');
process.exit(rot ? 1 : 0);
