'use client';

import { useEffect, useRef } from 'react';

import { Icon } from './Icon';
import { LarkMark } from './Logo';

/** Schwebende Pille „About this prototype“ mit Dialog. Nur Aussagen, die stimmen. */
export function PrototypePill() {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const oeffnen = () => dialog.current?.showModal();
    window.addEventListener('ll:prototyp', oeffnen);
    return () => window.removeEventListener('ll:prototyp', oeffnen);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => dialog.current?.showModal()}
        aria-label="About this prototype"
        className="tap fixed right-3 bottom-3 z-30 flex items-center gap-2 rounded-full border border-line bg-surface p-2 text-sm font-semibold shadow-lift transition-transform hover:-translate-y-0.5 sm:right-4 sm:bottom-4 sm:py-2 sm:pr-4 sm:pl-2.5"
      >
        <LarkMark className="size-7 sm:size-6" />
        <span className="hidden sm:inline">About this prototype</span>
      </button>
      <dialog
        ref={dialog}
        aria-labelledby="prototyp-titel"
        className="w-[min(36rem,calc(100vw-2rem))] rounded-[1.5rem] border border-line bg-surface p-0 shadow-lift"
        onClick={(e) => e.target === dialog.current && dialog.current?.close()}
      >
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <h2 id="prototyp-titel" className="text-2xl font-bold">
              About this prototype
            </h2>
            <form method="dialog">
              <button className="tap grid size-9 place-items-center rounded-full border border-line" aria-label="Close">
                <Icon name="x" className="size-4" />
              </button>
            </form>
          </div>
          <p className="mt-3 text-ink-2">
            A working concept for an edtech startup website, built by Darius Hofman. Lessonlark is a fictional brand; anything marked
            &ldquo;Sample&rdquo; is placeholder content.
          </p>
          <h3 className="mt-6 font-sans text-sm font-bold tracking-wide uppercase">Try this</h3>
          <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-ink-2">
            <li>Switch &ldquo;Who&rsquo;s learning?&rdquo; between students, professionals and schools.</li>
            <li>Take the course finder quiz, then do the free trial lesson.</li>
            <li>Sign up and finish onboarding: the dashboard uses your answers.</li>
            <li>Toggle dark mode, and open it on your phone.</li>
          </ol>
          <h3 className="mt-6 font-sans text-sm font-bold tracking-wide uppercase">Under the hood</h3>
          <ul className="mt-2 flex flex-wrap gap-2">
            {['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS 4', 'Static export', 'No third-party requests', 'Accessible by design'].map((t) => (
              <li key={t} className="chip">
                {t}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-ink-2">Nothing you type here leaves your browser: forms are simulated and state lives in this tab only.</p>
        </div>
      </dialog>
    </>
  );
}
