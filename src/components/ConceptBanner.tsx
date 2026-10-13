'use client';

import { Icon } from './Icon';

/**
 * Ehrlichkeit vorne: der Prototyp sagt selbst, was er ist. Schließen gilt für
 * den Besuch (sessionStorage); das Kopf-Skript setzt `data-banner` auf <html>,
 * bevor gezeichnet wird, damit nichts aufblitzt.
 */
export function ConceptBanner() {
  function schliessen() {
    document.documentElement.dataset.banner = 'zu';
    try {
      sessionStorage.setItem('ll-banner', 'zu');
    } catch {
      /* privater Modus */
    }
  }
  return (
    <div className="concept-banner bg-ink text-bg">
      <div className="wrap flex min-h-10 items-center gap-3 py-1.5 text-sm">
        <span className="rounded-full bg-accent px-2 py-0.5 text-xs font-bold tracking-wide text-[#1b2a4a] uppercase">Concept</span>
        <p className="min-w-0 flex-1">
          Lessonlark is a fictional brand, built as a working prototype for an edtech startup.{' '}
          <button
            type="button"
            className="font-semibold underline underline-offset-4"
            onClick={() => window.dispatchEvent(new Event('ll:prototyp'))}
          >
            What&rsquo;s inside
          </button>
        </p>
        <button type="button" onClick={schliessen} className="tap grid size-8 flex-none place-items-center rounded-full hover:bg-white/10" aria-label="Hide notice">
          <Icon name="x" className="size-4" />
        </button>
      </div>
    </div>
  );
}
