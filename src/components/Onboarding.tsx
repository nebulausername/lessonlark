'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import type { AudienceKey, OnboardingStep } from '@/content/typen';
import { href } from '@/lib/href';
import { profilErgaenzen, useProfil } from '@/lib/sitzung';

import { Icon } from './Icon';

/** Drei Fragen (Ziel, Niveau, Zeit). Die Antworten landen im Profil und machen das Dashboard persönlich. */
export function Onboarding({ audience, schritte, fallbackName }: { audience: AudienceKey; schritte: OnboardingStep[]; fallbackName: string }) {
  const router = useRouter();
  const profil = useProfil();
  const [i, setI] = useState(0);
  const [wahl, setWahl] = useState<Record<string, string>>({});
  const [baut, setBaut] = useState(false);
  const kopf = useRef<HTMLHeadingElement>(null);
  const erster = useRef(true);
  const s = schritte[i]!;
  const name = profil?.name || fallbackName;

  useEffect(() => {
    if (erster.current) {
      erster.current = false;
      return;
    }
    kopf.current?.focus();
  }, [i]);

  function weiter(e: React.FormEvent) {
    e.preventDefault();
    if (!wahl[s.key]) return;
    if (i < schritte.length - 1) return setI(i + 1);
    const label = (k: OnboardingStep['key']) => {
      const st = schritte.find((x) => x.key === k);
      return st?.options.find((o) => o.value === wahl[k])?.label;
    };
    profilErgaenzen({ audience, goal: label('goal'), level: label('level'), time: label('time') });
    setBaut(true);
    const warten = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 1100;
    window.setTimeout(() => router.push(href(audience, 'dashboard')), warten);
  }

  if (baut) {
    return (
      <div className="card grid min-h-80 place-items-center p-10 text-center" role="status">
        <div>
          <svg viewBox="0 0 48 48" className="mx-auto size-14 animate-spin text-accent" aria-hidden="true">
            <circle cx="24" cy="24" r="19" fill="none" stroke="currentColor" strokeWidth="5" strokeDasharray="90 40" strokeLinecap="round" />
          </svg>
          <p className="mt-5 font-display text-2xl font-bold">Building your plan, {name}…</p>
          <p className="mt-1 text-ink-2">Matching lessons to your goal and your week.</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={weiter} className="card p-6 sm:p-8">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-bold text-ink-2">
          Step {i + 1} of {schritte.length}
        </p>
        <ol className="flex gap-1.5" aria-hidden="true">
          {schritte.map((x, j) => (
            <li key={x.key} className={`h-2 w-10 rounded-full transition-colors duration-300 ${j <= i ? 'bg-accent' : 'bg-bg-2'}`} />
          ))}
        </ol>
      </div>
      <fieldset key={s.key} className="rise mt-5">
        <legend className="w-full">
          <h2 ref={kopf} tabIndex={-1} className="text-[1.75rem] font-bold sm:text-[2rem]">
            {s.question}
          </h2>
          <span className="mt-1 block text-ink-2">{s.help}</span>
        </legend>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {s.options.map((o) => (
            <label key={o.value} className="choice">
              <input type="radio" name={s.key} value={o.value} checked={wahl[s.key] === o.value} onChange={() => setWahl((w) => ({ ...w, [s.key]: o.value }))} />
              <span>
                <span className="block font-semibold">{o.label}</span>
                <span className="mt-0.5 block text-sm text-ink-2">{o.hint}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="mt-8 flex items-center justify-between gap-3">
        <button type="button" onClick={() => setI(Math.max(0, i - 1))} disabled={i === 0} className="btn btn-ghost disabled:opacity-40">
          Back
        </button>
        <button type="submit" disabled={!wahl[s.key]} className="btn btn-primary disabled:cursor-not-allowed disabled:opacity-50">
          {i === schritte.length - 1 ? 'Build my plan' : 'Next'} <Icon name="arrow" className="size-4" />
        </button>
      </div>
    </form>
  );
}
