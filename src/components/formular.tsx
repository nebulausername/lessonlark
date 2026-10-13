'use client';

import { useId } from 'react';

/** Feld mit Beschriftung, Hilfe und Fehler, beide per aria-describedby am Eingabefeld. */
export function Feld({
  label,
  fehler,
  hilfe,
  children,
}: {
  label: string;
  fehler?: string;
  hilfe?: string;
  children: (props: { id: string; 'aria-invalid'?: true; 'aria-describedby'?: string }) => React.ReactNode;
}) {
  const id = useId();
  const beschreibung = [hilfe && `${id}-hilfe`, fehler && `${id}-fehler`].filter(Boolean).join(' ') || undefined;
  return (
    <div>
      <label htmlFor={id} className="block font-semibold">
        {label}
      </label>
      {hilfe && (
        <p id={`${id}-hilfe`} className="mt-0.5 text-sm text-ink-2">
          {hilfe}
        </p>
      )}
      <div className="mt-2">{children({ id, 'aria-invalid': fehler ? true : undefined, 'aria-describedby': beschreibung })}</div>
      {fehler && (
        <p id={`${id}-fehler`} className="mt-1.5 text-sm font-semibold text-danger">
          {fehler}
        </p>
      )}
    </div>
  );
}

export const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Fokus auf das erste fehlerhafte Feld, nachdem React die Fehler gezeichnet hat. */
export function fokusAufFehler(form: HTMLFormElement | null) {
  requestAnimationFrame(() => form?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus());
}

export function DemoHinweis() {
  return (
    <p className="flex items-start gap-2 rounded-xl bg-bg-2 px-4 py-3 text-sm text-ink-2">
      <svg viewBox="0 0 24 24" className="mt-0.5 size-4 flex-none" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <path d="M7 11V8a5 5 0 0 1 10 0v3M6 11h12v9H6v-9Z" />
      </svg>
      Prototype: nothing you enter is sent or stored on a server. It stays in this browser tab.
    </p>
  );
}
