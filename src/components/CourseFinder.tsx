'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import type { AudienceKey, Course, QuizQuestion } from '@/content/typen';
import { href } from '@/lib/href';
import { profilErgaenzen } from '@/lib/sitzung';

import { Icon } from './Icon';
import { Picture } from './Picture';

type KursKurz = Pick<Course, 'slug' | 'title' | 'tagline' | 'topic' | 'level' | 'durationWeeks' | 'hoursPerWeek'>;

/** Punkte je Kurs aus den Antworten. Gleichstand entscheidet die Reihenfolge der Kurse (stabil, nachvollziehbar). */
export function auswerten(fragen: QuizQuestion[], wahl: (number | null)[], kurse: KursKurz[]) {
  const punkte = new Map(kurse.map((k) => [k.slug, 0]));
  fragen.forEach((f, i) => {
    const o = wahl[i] == null ? undefined : f.options[wahl[i]!];
    if (!o) return;
    for (const [slug, p] of Object.entries(o.scores)) if (punkte.has(slug)) punkte.set(slug, punkte.get(slug)! + p);
  });
  return [...kurse].map((k, i) => ({ k, p: punkte.get(k.slug)!, i })).sort((x, y) => y.p - x.p || x.i - y.i);
}

export function CourseFinder({
  audience,
  fragen,
  kurse,
  wort,
}: {
  audience: AudienceKey;
  fragen: QuizQuestion[];
  kurse: KursKurz[];
  wort: string;
}) {
  const [schritt, setSchritt] = useState(0);
  const [wahl, setWahl] = useState<(number | null)[]>(fragen.map(() => null));
  const kopf = useRef<HTMLHeadingElement>(null);
  const erster = useRef(true);
  const fertig = schritt >= fragen.length;
  const rangliste = fertig ? auswerten(fragen, wahl, kurse) : [];
  const sieger = rangliste[0]?.k;

  useEffect(() => {
    if (erster.current) {
      erster.current = false;
      return;
    }
    kopf.current?.focus();
  }, [schritt]);

  useEffect(() => {
    if (sieger) profilErgaenzen({ empfohlen: sieger.slug, audience });
  }, [sieger, audience]);

  if (fertig && sieger) {
    const gruende = fragen.map((f, i) => f.options[wahl[i]!]?.reason).filter(Boolean) as string[];
    return (
      <div>
        <p className="eyebrow">Your match</p>
        <h2 ref={kopf} tabIndex={-1} className="mt-2 text-[2rem] font-bold sm:text-[2.5rem]">
          Start with {sieger.title}
        </h2>
        <div className="deal card mt-8 grid overflow-hidden md:grid-cols-[1fr_1.1fr]">
          <div className="bg-accent-soft p-3">
            <Picture name={`course-${sieger.slug}`} alt="" width={1536} height={1024} sizes="(min-width: 768px) 30rem, 92vw" className="aspect-[3/2] h-full w-full rounded-[1.25rem] object-cover" />
          </div>
          <div className="p-6 sm:p-8">
            <div className="flex flex-wrap gap-2">
              <span className="chip">{sieger.topic}</span>
              <span className="chip">{sieger.level}</span>
              <span className="chip">
                {sieger.durationWeeks} weeks · {sieger.hoursPerWeek} h/week
              </span>
            </div>
            <p className="mt-4 text-[1.125rem]">{sieger.tagline}</p>
            <h3 className="mt-6 font-sans text-sm font-bold tracking-wide text-ink-2 uppercase">Why this fits</h3>
            <ul className="mt-3 space-y-2">
              {gruende.map((g) => (
                <li key={g} className="flex gap-2.5">
                  <Icon name="check" className="mt-1 size-4 flex-none text-success" strokeWidth={3} />
                  <span>{g}</span>
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href={`${href(audience, `courses/${sieger.slug}`)}#trial`} className="btn btn-primary">
                Try its free lesson <Icon name="arrow" className="size-4" />
              </Link>
              <Link href={href(audience, `courses/${sieger.slug}`)} className="btn btn-ghost">
                See the {wort}
              </Link>
            </div>
          </div>
        </div>

        <h3 className="mt-12 text-xl font-bold">Also worth a look</h3>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2">
          {rangliste.slice(1, 3).map(({ k }, i) => (
            <li key={k.slug} className="deal" style={{ animationDelay: `${120 + i * 90}ms` }}>
              <Link href={href(audience, `courses/${k.slug}`)} className="card flex items-center gap-4 p-4 transition-transform hover:-translate-y-0.5">
                <Picture name={`course-${k.slug}`} alt="" width={1536} height={1024} sizes="7rem" className="aspect-[3/2] w-28 flex-none rounded-xl object-cover" />
                <span>
                  <span className="block font-display text-lg font-bold">{k.title}</span>
                  <span className="block text-sm text-ink-2">
                    {k.topic} · {k.level}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="btn btn-ghost mt-10"
          onClick={() => {
            setWahl(fragen.map(() => null));
            setSchritt(0);
          }}
        >
          Start over
        </button>
      </div>
    );
  }

  const f = fragen[schritt]!;
  const gewaehlt = wahl[schritt];
  return (
    <form
      className="card p-6 sm:p-8"
      onSubmit={(e) => {
        e.preventDefault();
        if (gewaehlt != null) setSchritt((s) => s + 1);
      }}
    >
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-bold text-ink-2">
          Question {schritt + 1} of {fragen.length}
        </p>
        <ol className="flex gap-1.5" aria-hidden="true">
          {fragen.map((q, i) => (
            <li key={q.id} className={`h-2 w-8 rounded-full transition-colors duration-300 ${i <= schritt ? 'bg-accent' : 'bg-bg-2'}`} />
          ))}
        </ol>
      </div>
      <fieldset key={f.id} className="rise mt-5">
        <legend className="w-full">
          <h2 ref={kopf} tabIndex={-1} className="text-[1.75rem] font-bold sm:text-[2rem]">
            {f.prompt}
          </h2>
          <span className="mt-1 block text-ink-2">{f.help}</span>
        </legend>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {f.options.map((o, i) => (
            <label key={o.label} className="choice">
              <input
                type="radio"
                name={f.id}
                checked={gewaehlt === i}
                onChange={() => setWahl((alt) => alt.map((x, j) => (j === schritt ? i : x)))}
              />
              <span>
                <span className="block font-semibold">{o.label}</span>
                {o.hint && <span className="mt-0.5 block text-sm text-ink-2">{o.hint}</span>}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="mt-8 flex items-center justify-between gap-3">
        <button type="button" onClick={() => setSchritt((s) => Math.max(0, s - 1))} disabled={schritt === 0} className="btn btn-ghost disabled:opacity-40">
          Back
        </button>
        <button type="submit" disabled={gewaehlt == null} className="btn btn-primary disabled:cursor-not-allowed disabled:opacity-50">
          {schritt === fragen.length - 1 ? 'See my match' : 'Next'} <Icon name="arrow" className="size-4" />
        </button>
      </div>
    </form>
  );
}
