'use client';

import { useId, useMemo, useState } from 'react';

import type { AudienceContent, Course, Level } from '@/content/typen';

import { KursKarte } from './bausteine';
import { Icon } from './Icon';

type Dauer = 'alle' | 'kurz' | 'mittel' | 'lang';
const DAUER: { key: Dauer; label: string; passt: (w: number) => boolean }[] = [
  { key: 'alle', label: 'Any length', passt: () => true },
  { key: 'kurz', label: 'Up to 4 weeks', passt: (w) => w <= 4 },
  { key: 'mittel', label: '5–8 weeks', passt: (w) => w >= 5 && w <= 8 },
  { key: 'lang', label: '9+ weeks', passt: (w) => w >= 9 },
];

/** Gefiltert wird im Browser — vier Kurse brauchen keinen Server. Ohne JavaScript steht die volle Liste da. */
export function CourseCatalog({ a }: { a: Pick<AudienceContent, 'key' | 'coursesWord' | 'courses'> }) {
  const [thema, setThema] = useState<string>('alle');
  const [niveau, setNiveau] = useState<Level | 'alle'>('alle');
  const [dauer, setDauer] = useState<Dauer>('alle');
  const [suche, setSuche] = useState('');
  const sucheId = useId();

  const themen = useMemo(() => Array.from(new Set(a.courses.map((c) => c.topic))), [a.courses]);
  const niveaus = useMemo(() => (['Beginner', 'Intermediate', 'Advanced'] as Level[]).filter((n) => a.courses.some((c) => c.level === n)), [a.courses]);

  const treffer = a.courses.filter((c: Course) => {
    const q = suche.trim().toLowerCase();
    return (
      (thema === 'alle' || c.topic === thema) &&
      (niveau === 'alle' || c.level === niveau) &&
      DAUER.find((d) => d.key === dauer)!.passt(c.durationWeeks) &&
      (!q || `${c.title} ${c.tagline} ${c.topic} ${c.outcomes.join(' ')}`.toLowerCase().includes(q))
    );
  });

  const zuruecksetzen = () => {
    setThema('alle');
    setNiveau('alle');
    setDauer('alle');
    setSuche('');
  };

  return (
    <div className="mt-10 grid gap-8 lg:grid-cols-[16rem_1fr]">
      <form className="space-y-6 lg:sticky lg:top-24 lg:self-start" role="search" aria-label={`Filter ${a.coursesWord.toLowerCase()}`} onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor={sucheId} className="text-sm font-bold">
            Search
          </label>
          <div className="relative mt-2">
            <Icon name="search" className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-ink-2" />
            <input id={sucheId} type="search" value={suche} onChange={(e) => setSuche(e.target.value)} placeholder="Try “fractions” or “data”" className="field pl-10" />
          </div>
        </div>
        <Gruppe titel="Topic" werte={[['alle', 'All topics'], ...themen.map((t) => [t, t] as [string, string])]} wahl={thema} setze={setThema} />
        <Gruppe titel="Level" werte={[['alle', 'Any level'], ...niveaus.map((n) => [n, n] as [string, string])]} wahl={niveau} setze={(w) => setNiveau(w as Level | 'alle')} />
        <Gruppe titel="Length" werte={DAUER.map((d) => [d.key, d.label] as [string, string])} wahl={dauer} setze={(w) => setDauer(w as Dauer)} />
      </form>

      <div>
        <p className="text-sm font-semibold text-ink-2" aria-live="polite">
          {treffer.length === a.courses.length ? `All ${a.courses.length} ${a.coursesWord.toLowerCase()}` : `${treffer.length} of ${a.courses.length} ${a.coursesWord.toLowerCase()}`}
        </p>
        {treffer.length > 0 ? (
          <ul className="mt-4 grid gap-6 sm:grid-cols-2">
            {treffer.map((c, i) => (
              <li key={c.slug} className="deal" style={{ animationDelay: `${i * 60}ms` }}>
                <KursKarte a={a} c={c} priority={i < 2} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="card mt-4 p-10 text-center">
            <p className="font-display text-xl font-bold">Nothing matches all of those filters.</p>
            <p className="mt-2 text-ink-2">Loosen one filter, or start over.</p>
            <button type="button" onClick={zuruecksetzen} className="btn btn-ghost mt-5">
              Reset filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Gruppe({ titel, werte, wahl, setze }: { titel: string; werte: [string, string][]; wahl: string; setze: (w: string) => void }) {
  const name = useId();
  return (
    <fieldset>
      <legend className="text-sm font-bold">{titel}</legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {werte.map(([wert, label]) => (
          <label
            key={wert}
            className="tap inline-flex cursor-pointer items-center rounded-full border border-line bg-surface px-3.5 py-1.5 text-[0.9375rem] font-semibold text-ink-2 transition-colors has-[:checked]:border-accent-ink has-[:checked]:bg-accent-soft has-[:checked]:text-ink has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-accent-ink"
          >
            <input type="radio" name={name} value={wert} checked={wahl === wert} onChange={() => setze(wert)} className="sr-only" />
            {label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
