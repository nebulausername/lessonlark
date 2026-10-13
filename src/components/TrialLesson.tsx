'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import type { AudienceKey, TrialLesson as Lektion } from '@/content/typen';
import { href } from '@/lib/href';
import { profilErgaenzen, profilLesen } from '@/lib/sitzung';

import { Icon } from './Icon';

type Antworten = (number | null)[];

/**
 * Probelektion in vier Schritten: Idee → Karteikarte → zwei Fragen → Abschluss.
 * Rückmeldung sofort und erklärt (aria-live), der Fokus wandert mit, damit
 * Tastatur und Screenreader nie im Leeren stehen.
 */
export function TrialLesson({ lektion, audience, slug, kursTitel }: { lektion: Lektion; audience: AudienceKey; slug: string; kursTitel: string }) {
  const [schritt, setSchritt] = useState(0);
  const [umgedreht, setUmgedreht] = useState(false);
  const [antworten, setAntworten] = useState<Antworten>(lektion.questions.map(() => null));
  const titel = useRef<HTMLHeadingElement>(null);
  const gestartet = useRef(false);

  const fragenZahl = lektion.questions.length;
  const gesamt = 2 + fragenZahl; // Idee, Karte, Fragen
  const fertig = schritt >= gesamt;
  const richtig = antworten.filter((w, i) => w === lektion.questions[i]!.correct).length;

  useEffect(() => {
    if (!gestartet.current) {
      gestartet.current = true;
      return;
    }
    titel.current?.focus();
    if (schritt >= gesamt) {
      const alt = profilLesen().lektionen ?? [];
      profilErgaenzen({ lektionen: Array.from(new Set([...alt, slug])), kurs: slug, audience });
    }
  }, [schritt, gesamt, slug, audience]);

  const weiter = () => setSchritt((s) => s + 1);
  const fortschritt = Math.round((Math.min(schritt, gesamt) / gesamt) * 100);

  return (
    <div className="card overflow-hidden">
      <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-4 sm:px-7">
        <div>
          <p className="text-xs font-bold tracking-wide text-ink-2 uppercase">Free trial lesson · {lektion.minutes} min</p>
          <p className="font-display text-lg font-bold">{lektion.title}</p>
        </div>
        <p className="text-sm font-semibold whitespace-nowrap text-ink-2">{fertig ? 'Done' : `Step ${schritt + 1} of ${gesamt}`}</p>
      </div>
      <div
        className="h-1.5 bg-bg-2"
        role="progressbar"
        aria-label="Lesson progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={fortschritt}
      >
        <div className="h-full bg-accent transition-[width] duration-500 ease-out" style={{ width: `${fortschritt}%` }} />
      </div>

      <div className="p-5 sm:p-7">
        {schritt === 0 && (
          <div className="rise">
            <h3 ref={titel} tabIndex={-1} className="text-2xl font-bold">
              {lektion.intro.heading}
            </h3>
            <p className="mt-3 text-ink-2">{lektion.intro.body}</p>
            <div className="mt-5 flex gap-3 rounded-2xl bg-accent-soft p-4">
              <Icon name="spark" className="mt-0.5 size-5 flex-none text-accent-ink" />
              <p>
                <span className="font-bold">Key idea: </span>
                {lektion.intro.keyIdea}
              </p>
            </div>
            <button type="button" onClick={weiter} className="btn btn-primary mt-6">
              Got it, next <Icon name="arrow" className="size-4" />
            </button>
          </div>
        )}

        {schritt === 1 && (
          <div className="rise">
            <h3 ref={titel} tabIndex={-1} className="text-2xl font-bold">
              Quick recall
            </h3>
            <p className="mt-2 text-ink-2">Think of your answer first, then flip the card.</p>
            <div className="mt-5 grid min-h-40 place-items-center rounded-2xl border-2 border-dashed border-line-strong bg-bg p-6 text-center">
              <p className="font-display text-xl font-bold">{lektion.flashcard.front}</p>
              {umgedreht && (
                <p className="rise mt-4 rounded-xl bg-accent-soft px-4 py-3 text-[1.0625rem]" aria-live="polite">
                  {lektion.flashcard.back}
                </p>
              )}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              {!umgedreht ? (
                <button type="button" onClick={() => setUmgedreht(true)} className="btn btn-ghost">
                  Flip the card
                </button>
              ) : (
                <button type="button" onClick={weiter} className="btn btn-primary">
                  Next: two questions <Icon name="arrow" className="size-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {schritt >= 2 && !fertig && (
          <Frage
            key={schritt}
            titelRef={titel}
            nummer={schritt - 1}
            zahl={fragenZahl}
            frage={lektion.questions[schritt - 2]!}
            gewaehlt={antworten[schritt - 2] ?? null}
            waehle={(w) => setAntworten((alt) => alt.map((x, i) => (i === schritt - 2 ? w : x)))}
            weiter={weiter}
            letzte={schritt - 2 === fragenZahl - 1}
          />
        )}

        {fertig && (
          <div className="relative text-center">
            <Funken />
            <span className="mx-auto grid size-16 place-items-center rounded-full bg-success text-white">
              <svg viewBox="0 0 24 24" className="check-draw size-9" aria-hidden="true">
                <path d="M5 12.5 10 17 19 7" pathLength={1} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <h3 ref={titel} tabIndex={-1} className="mt-4 text-2xl font-bold">
              Lesson complete. {richtig} of {fragenZahl} right.
            </h3>
            <p className="mx-auto mt-2 max-w-md text-ink-2">
              {richtig === fragenZahl ? 'Clean sweep. ' : 'Mistakes are part of it. '}
              That&rsquo;s one small win in {kursTitel}. Keep the streak going in the full {audience === 'schools' ? 'program' : 'course'}.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href={href(audience, 'signup')} className="btn btn-primary">
                {audience === 'schools' ? 'Start a free pilot' : 'Continue the full course'} <Icon name="arrow" className="size-4" />
              </Link>
              <button
                type="button"
                onClick={() => {
                  setSchritt(0);
                  setUmgedreht(false);
                  setAntworten(lektion.questions.map(() => null));
                }}
                className="btn btn-ghost"
              >
                Try again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Frage({
  titelRef,
  nummer,
  zahl,
  frage,
  gewaehlt,
  waehle,
  weiter,
  letzte,
}: {
  titelRef: React.RefObject<HTMLHeadingElement | null>;
  nummer: number;
  zahl: number;
  frage: Lektion['questions'][number];
  gewaehlt: number | null;
  waehle: (w: number) => void;
  weiter: () => void;
  letzte: boolean;
}) {
  const beantwortet = gewaehlt !== null;
  const stimmt = gewaehlt === frage.correct;
  return (
    <div className="rise">
      <p className="text-sm font-bold text-ink-2">
        Question {nummer} of {zahl}
      </p>
      <h3 ref={titelRef} tabIndex={-1} className="mt-1 text-2xl font-bold">
        {frage.prompt}
      </h3>
      <ul className="mt-5 grid gap-3">
        {frage.options.map((o, i) => {
          const istRichtig = beantwortet && i === frage.correct;
          const istFalsch = beantwortet && i === gewaehlt && !stimmt;
          return (
            <li key={o}>
              <button
                type="button"
                disabled={beantwortet}
                onClick={() => waehle(i)}
                aria-pressed={gewaehlt === i}
                className={`flex w-full items-center gap-3 rounded-2xl border-2 px-4 py-3.5 text-left font-semibold transition-colors disabled:cursor-default ${
                  istRichtig
                    ? 'border-success bg-success/10'
                    : istFalsch
                      ? 'border-danger bg-danger/10'
                      : 'border-line bg-surface enabled:hover:border-line-strong'
                }`}
              >
                <span
                  className={`grid size-8 flex-none place-items-center rounded-full border-2 text-sm font-bold ${
                    istRichtig ? 'border-success bg-success text-white' : istFalsch ? 'border-danger bg-danger text-white' : 'border-line-strong'
                  }`}
                  aria-hidden="true"
                >
                  {istRichtig ? <Icon name="check" className="size-4" strokeWidth={3} /> : istFalsch ? <Icon name="x" className="size-4" strokeWidth={3} /> : String.fromCharCode(65 + i)}
                </span>
                <span>{o}</span>
                {istRichtig && <span className="sr-only">(correct answer)</span>}
                {istFalsch && <span className="sr-only">(your answer, not correct)</span>}
              </button>
            </li>
          );
        })}
      </ul>
      <div aria-live="polite">
        {beantwortet && (
          <div className={`rise mt-5 rounded-2xl p-4 ${stimmt ? 'bg-success/10' : 'bg-danger/10'}`}>
            <p className="font-bold">{stimmt ? 'Correct!' : 'Not quite.'}</p>
            <p className="mt-1 text-ink-2">{frage.explanation}</p>
          </div>
        )}
      </div>
      {beantwortet && (
        <button type="button" onClick={weiter} className="btn btn-primary mt-6">
          {letzte ? 'Finish lesson' : 'Next question'} <Icon name="arrow" className="size-4" />
        </button>
      )}
    </div>
  );
}

/** Moment 4: ein Kranz kleiner Funken, einmal. */
function Funken() {
  const punkte = Array.from({ length: 10 }, (_, i) => {
    const w = (i / 10) * Math.PI * 2;
    return { dx: `${Math.round(Math.cos(w) * 70)}px`, dy: `${Math.round(Math.sin(w) * 70)}px`, farbe: i % 2 ? 'var(--accent)' : 'var(--success)' };
  });
  return (
    <span className="pointer-events-none absolute top-8 left-1/2" aria-hidden="true">
      {punkte.map((p, i) => (
        <span
          key={i}
          className="spark absolute size-2.5 rounded-full"
          style={{ '--dx': p.dx, '--dy': p.dy, background: p.farbe, animationDelay: `${i * 18}ms` } as React.CSSProperties}
        />
      ))}
    </span>
  );
}
