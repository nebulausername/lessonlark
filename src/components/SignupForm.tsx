'use client';

import { useRouter } from 'next/navigation';
import { useRef, useState, useSyncExternalStore } from 'react';

import type { DemoKonto } from '@/content/demo';
import type { AudienceKey } from '@/content/typen';
import { href } from '@/lib/href';
import { profilLesen, profilSetzen } from '@/lib/sitzung';

import { Initialen } from './bausteine';

import { DemoHinweis, EMAIL, Feld, fokusAufFehler } from './formular';
import { Icon } from './Icon';

type Fehler = Partial<Record<'name' | 'email' | 'passwort', string>>;

function hashAbonnieren(melden: () => void) {
  window.addEventListener('hashchange', melden);
  return () => window.removeEventListener('hashchange', melden);
}

/** Registrierung und Anmeldung (Reiter). Beides nur im Browser; danach geht es ins Onboarding bzw. Dashboard. */
export function SignupForm({ audience, lehrkraft, demos }: { audience: AudienceKey; lehrkraft: boolean; demos: DemoKonto[] }) {
  const router = useRouter();
  const form = useRef<HTMLFormElement>(null);
  const hash = useSyncExternalStore(hashAbonnieren, () => window.location.hash, () => '');
  const [gewaehlt, setGewaehlt] = useState<'neu' | 'login' | null>(null);
  const reiter = gewaehlt ?? (hash === '#login' ? 'login' : 'neu');
  const [fehler, setFehler] = useState<Fehler>({});
  const [zeigen, setZeigen] = useState(false);
  const [passwort, setPasswort] = useState('');
  const [laeuft, setLaeuft] = useState(false);

  function absenden(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const name = String(d.get('name') ?? '').trim();
    const email = String(d.get('email') ?? '').trim();
    const f: Fehler = {};
    if (reiter === 'neu' && !name) f.name = 'Please tell us what to call you.';
    if (!EMAIL.test(email)) f.email = 'Please enter an email address like name@example.com.';
    if (passwort.length < 8) f.passwort = 'Use at least 8 characters.';
    setFehler(f);
    if (Object.keys(f).length) return fokusAufFehler(form.current);
    setLaeuft(true);
    // Eigene Anmeldung beendet ein Demo-Konto: dessen Antworten dürfen nicht hineinmischen.
    const alt = profilLesen();
    const basis = alt.demo ? {} : alt;
    if (reiter === 'neu') {
      profilSetzen({ ...basis, name, email, audience });
      router.push(href(audience, 'welcome'));
    } else {
      profilSetzen({ ...basis, email, audience });
      router.push(href(audience, 'dashboard'));
    }
  }

  function demoBetreten(d: DemoKonto) {
    setLaeuft(true);
    profilSetzen(d.profil);
    router.push(href(audience, 'dashboard'));
  }

  const staerke = passwort.length === 0 ? 0 : passwort.length < 8 ? 1 : /[^a-zA-Z]/.test(passwort) && passwort.length >= 12 ? 3 : 2;

  return (
    <div className="card p-6 sm:p-8">
      <div role="tablist" aria-label="Account" className="grid grid-cols-2 rounded-full bg-bg-2 p-1">
        {(
          [
            ['neu', 'Create account'],
            ['login', 'Log in'],
          ] as const
        ).map(([k, label]) => (
          <button
            key={k}
            type="button"
            role="tab"
            id={`reiter-${k}`}
            aria-selected={reiter === k}
            aria-controls="konto-form"
            onClick={() => {
              setGewaehlt(k);
              setFehler({});
            }}
            className="tap rounded-full py-2 font-semibold text-ink-2 transition-colors aria-selected:bg-surface aria-selected:text-ink aria-selected:shadow-soft"
          >
            {label}
          </button>
        ))}
      </div>

      <div id="konto-form" role="tabpanel" aria-labelledby={`reiter-${reiter}`} className="mt-6">
      {reiter === 'login' && (
        <section aria-labelledby="demo-titel" className="mb-6">
          <h2 id="demo-titel" className="text-xl font-bold">
            Try a demo account
          </h2>
          <p className="mt-1 text-sm text-ink-2">No sign-up needed. One click opens a dashboard filled with sample data.</p>
          <ul className="mt-4 grid gap-2.5">
            {demos.map((d) => (
              <li key={d.name}>
                <button
                  type="button"
                  disabled={laeuft}
                  onClick={() => demoBetreten(d)}
                  className="group flex w-full items-center gap-3 rounded-2xl border border-line bg-surface p-3 text-left transition-colors hover:border-accent-ink hover:bg-accent-soft disabled:opacity-60"
                >
                  <Initialen name={d.name} />
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold">{d.name}</span>
                    <span className="block text-sm text-ink-2">{d.rolle}</span>
                  </span>
                  <Icon name="arrow" className="size-5 flex-none text-ink-2 transition-transform group-hover:translate-x-0.5" />
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-6 flex items-center gap-3 text-sm font-semibold text-ink-2" aria-hidden="true">
            <span className="h-px flex-1 bg-line" /> or log in with email <span className="h-px flex-1 bg-line" />
          </p>
        </section>
      )}
      <form ref={form} noValidate onSubmit={absenden} className="space-y-5" aria-label={reiter === 'neu' ? 'Create account' : 'Log in with email'}>
        {reiter === 'neu' && (
          <Feld label={lehrkraft ? 'Your name (as students see it)' : 'Your first name'} fehler={fehler.name}>
            {(p) => <input {...p} name="name" autoComplete={lehrkraft ? 'name' : 'given-name'} className="field" placeholder={lehrkraft ? 'Ms. Rivera' : 'Alex'} />}
          </Feld>
        )}
        <Feld label={lehrkraft ? 'School email' : 'Email'} fehler={fehler.email}>
          {(p) => <input {...p} name="email" type="email" autoComplete="email" inputMode="email" className="field" />}
        </Feld>
        <Feld label="Password" fehler={fehler.passwort} hilfe={reiter === 'neu' ? 'At least 8 characters. Longer is stronger.' : undefined}>
          {(p) => (
            <div className="relative">
              <input
                {...p}
                name="passwort"
                type={zeigen ? 'text' : 'password'}
                autoComplete={reiter === 'neu' ? 'new-password' : 'current-password'}
                value={passwort}
                onChange={(e) => setPasswort(e.target.value)}
                className="field pr-20"
              />
              <button
                type="button"
                onClick={() => setZeigen((z) => !z)}
                className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full px-3 py-1.5 text-sm font-semibold text-ink-2 hover:text-ink"
                aria-pressed={zeigen}
              >
                {zeigen ? 'Hide' : 'Show'}
              </button>
            </div>
          )}
        </Feld>
        {reiter === 'neu' && (
          <div className="flex items-center gap-3" aria-live="polite">
            <div className="flex flex-1 gap-1.5" aria-hidden="true">
              {[1, 2, 3].map((s) => (
                <span key={s} className={`h-1.5 flex-1 rounded-full transition-colors ${staerke >= s ? (staerke === 1 ? 'bg-danger' : staerke === 2 ? 'bg-accent' : 'bg-success') : 'bg-bg-2'}`} />
              ))}
            </div>
            <span className="w-16 text-right text-sm font-semibold text-ink-2">{['', 'Too short', 'Good', 'Strong'][staerke]}</span>
          </div>
        )}
        <DemoHinweis />
        <button type="submit" disabled={laeuft} className="btn btn-primary w-full">
          {reiter === 'neu' ? 'Create my account' : 'Log in'} <Icon name="arrow" className="size-4" />
        </button>
        {reiter === 'login' && <p className="text-center text-sm text-ink-2">Prototype: any email and an 8+ character password will do.</p>}
        {reiter === 'neu' && (
          <p className="text-center text-sm text-ink-2">
            Just looking?{' '}
            <button type="button" onClick={() => setGewaehlt('login')} className="font-semibold text-accent-ink underline underline-offset-4">
              Open a demo account
            </button>
          </p>
        )}
      </form>
      </div>
    </div>
  );
}
