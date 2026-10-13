'use client';

import Link from 'next/link';
import { useState } from 'react';

import type { Plan } from '@/content/typen';
import { profilErgaenzen } from '@/lib/sitzung';

import { Icon } from './Icon';

/** Preise mit Monat/Jahr-Schalter. Der Schalter ist eine echte Radiogruppe (Pfeiltasten gehen). */
export function PricingTable({ plans, yearlyNote, ziele }: { plans: Plan[]; yearlyNote: string; ziele: Record<string, string> }) {
  const [jaehrlich, setJaehrlich] = useState(true);
  return (
    <div className="mt-10">
      <fieldset className="mx-auto flex w-fit flex-col items-center gap-3">
        <legend className="sr-only">Billing period</legend>
        <div className="flex rounded-full border border-line bg-surface p-1 shadow-soft">
          {[
            [false, 'Monthly'],
            [true, 'Yearly'],
          ].map(([wert, label]) => (
            <label
              key={String(label)}
              className="tap flex cursor-pointer items-center rounded-full px-5 py-2 font-semibold text-ink-2 transition-colors has-[:checked]:bg-accent has-[:checked]:text-[#1b2a4a] has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-accent-ink"
            >
              <input type="radio" name="abrechnung" className="sr-only" checked={jaehrlich === wert} onChange={() => setJaehrlich(wert as boolean)} />
              {label}
            </label>
          ))}
        </div>
        <p className="font-hand text-[1.375rem] leading-none text-accent-ink">{yearlyNote}</p>
      </fieldset>

      <ul className="mt-10 grid gap-6 lg:grid-cols-3">
        {plans.map((p) => {
          const preis = jaehrlich ? p.yearlyPerMonth : p.monthly;
          return (
            <li
              key={p.id}
              className={`card relative flex flex-col p-7 text-left ${p.highlight ? 'border-2 border-accent-ink shadow-lift lg:-translate-y-3' : ''}`}
            >
              {p.highlight && (
                <span className="absolute -top-3.5 left-7 rounded-full bg-accent px-3 py-1 text-xs font-bold tracking-wide text-[#1b2a4a] uppercase">
                  Recommended
                </span>
              )}
              <h3 className="text-2xl font-bold">{p.name}</h3>
              <p className="mt-1 text-ink-2">{p.tagline}</p>
              <p className="mt-6 flex items-end gap-2" aria-live="polite">
                {preis === null ? (
                  <span className="font-display text-[2.75rem] leading-none font-extrabold">Custom</span>
                ) : (
                  <>
                    <span className="font-display text-[2.75rem] leading-none font-extrabold">${preis % 1 ? preis.toFixed(2) : preis}</span>
                    <span className="pb-1 text-ink-2">{p.unit}</span>
                  </>
                )}
              </p>
              <p className="mt-1 text-sm text-ink-2">
                {preis === null ? 'Quoted for your district' : preis === 0 ? 'Free forever' : jaehrlich ? 'Billed yearly' : 'Billed monthly'}
              </p>
              <Link
                href={ziele[p.id] ?? '#'}
                onClick={() => profilErgaenzen({ plan: p.name })}
                className={`btn mt-6 w-full ${p.highlight ? 'btn-primary' : 'btn-ghost'}`}
              >
                {p.cta}
              </Link>
              <ul className="mt-6 space-y-2.5">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2.5">
                    <Icon name="check" className="mt-1 size-4 flex-none text-success" strokeWidth={3} />
                    <span className="text-[0.98rem]">{f}</span>
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
