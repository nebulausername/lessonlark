'use client';

import { useRef, useState } from 'react';

import type { AudienceContent } from '@/content/typen';

import { DemoHinweis, EMAIL, Feld, fokusAufFehler } from './formular';
import { Icon } from './Icon';

const TAGE = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const ZEITEN = ['9:30 AM', '1:00 PM', '4:30 PM'];

type Fehler = Partial<Record<'name' | 'email' | 'schule' | 'nachricht' | 'termin', string>>;

/** Kontakt bzw. „Book a demo“. Absenden prüft im Browser und zeigt eine Bestätigung — es geht keine Anfrage hinaus. */
export function ContactForm({ a }: { a: Pick<AudienceContent, 'contact' | 'key'> }) {
  const demo = a.contact.mode === 'demo';
  const form = useRef<HTMLFormElement>(null);
  const [fehler, setFehler] = useState<Fehler>({});
  const [gesendet, setGesendet] = useState<{ name: string; termin?: string } | null>(null);
  const [termin, setTermin] = useState<string>('');

  function absenden(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const name = String(d.get('name') ?? '').trim();
    const email = String(d.get('email') ?? '').trim();
    const nachricht = String(d.get('nachricht') ?? '').trim();
    const schule = String(d.get('schule') ?? '').trim();
    const f: Fehler = {};
    if (!name) f.name = 'Please tell us your name.';
    if (!EMAIL.test(email)) f.email = 'Please enter an email address like name@example.com.';
    if (demo && !schule) f.schule = 'Which school or district is this for?';
    if (demo && !termin) f.termin = 'Pick a time that works for you.';
    if (!demo && nachricht.length < 10) f.nachricht = 'A sentence or two helps us answer well (10 characters minimum).';
    setFehler(f);
    if (Object.keys(f).length) return fokusAufFehler(form.current);
    setGesendet({ name, termin: demo ? termin : undefined });
  }

  if (gesendet) {
    return (
      <div className="card rise p-8 text-center" role="status">
        <span className="mx-auto grid size-14 place-items-center rounded-full bg-success text-white">
          <svg viewBox="0 0 24 24" className="check-draw size-8" aria-hidden="true">
            <path d="M5 12.5 10 17 19 7" pathLength={1} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h2 className="mt-4 text-2xl font-bold">Thanks, {gesendet.name}!</h2>
        <p className="mx-auto mt-2 max-w-md text-ink-2">
          {gesendet.termin ? `Your demo request for ${gesendet.termin} is noted. ` : 'Your message is noted. '}
          {a.contact.responseNote} In this prototype nothing was actually sent.
        </p>
        <button type="button" className="btn btn-ghost mt-6" onClick={() => setGesendet(null)}>
          Send another
        </button>
      </div>
    );
  }

  return (
    <form ref={form} noValidate onSubmit={absenden} className="card space-y-5 p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Feld label="Your name" fehler={fehler.name}>
          {(p) => <input {...p} name="name" autoComplete="name" className="field" />}
        </Feld>
        <Feld label={demo ? 'Work email' : 'Email'} fehler={fehler.email}>
          {(p) => <input {...p} name="email" type="email" autoComplete="email" inputMode="email" className="field" />}
        </Feld>
      </div>
      {demo && (
        <div className="grid gap-5 sm:grid-cols-2">
          <Feld label="School or district" fehler={fehler.schule}>
            {(p) => <input {...p} name="schule" autoComplete="organization" className="field" />}
          </Feld>
          <Feld label="Number of students">
            {(p) => (
              <select {...p} name="schueler" className="field" defaultValue="100-500">
                <option value="1-100">Up to 100</option>
                <option value="100-500">100 to 500</option>
                <option value="500-2000">500 to 2,000</option>
                <option value="2000+">More than 2,000</option>
              </select>
            )}
          </Feld>
        </div>
      )}
      <Feld label="What is this about?">
        {(p) => (
          <select {...p} name="thema" className="field">
            {a.contact.topics.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        )}
      </Feld>
      {demo && (
        <fieldset aria-describedby={fehler.termin ? 'termin-fehler' : undefined}>
          <legend className="font-semibold">Pick a 20-minute slot</legend>
          <p className="text-sm text-ink-2">Times shown in your time zone. We confirm by email.</p>
          <div className="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
            {TAGE.map((t) => (
              <div key={t} className="contents">
                <span className="self-center font-semibold text-ink-2">{t}</span>
                <div className="flex flex-wrap gap-2">
                  {ZEITEN.map((z) => {
                    const wert = `${t} ${z}`;
                    return (
                      <label
                        key={wert}
                        className="tap inline-flex cursor-pointer items-center rounded-full border border-line bg-surface px-3 py-1.5 text-sm font-semibold transition-colors has-[:checked]:border-accent-ink has-[:checked]:bg-accent-soft has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-accent-ink"
                      >
                        <input
                          type="radio"
                          name="termin"
                          value={wert}
                          checked={termin === wert}
                          onChange={() => setTermin(wert)}
                          className="sr-only"
                        />
                        {z}
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          {fehler.termin && (
            <p id="termin-fehler" className="mt-2 text-sm font-semibold text-danger">
              {fehler.termin}
            </p>
          )}
        </fieldset>
      )}
      <Feld label={demo ? 'Anything we should know? (optional)' : 'Message'} fehler={fehler.nachricht}>
        {(p) => <textarea {...p} name="nachricht" rows={4} className="field min-h-28 resize-y" />}
      </Feld>
      <DemoHinweis />
      <button type="submit" className="btn btn-primary w-full sm:w-auto">
        {demo ? 'Request this demo slot' : 'Send message'} <Icon name="arrow" className="size-4" />
      </button>
    </form>
  );
}
