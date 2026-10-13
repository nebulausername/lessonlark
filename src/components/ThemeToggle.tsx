'use client';

import { useSyncExternalStore } from 'react';

import { Icon } from './Icon';

const SCHLUESSEL = 'll-theme';
const EREIGNIS = 'll:theme';

function istDunkel(): boolean {
  const gesetzt = document.documentElement.dataset.theme;
  if (gesetzt === 'dark') return true;
  if (gesetzt === 'light') return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function abonnieren(melden: () => void) {
  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  mq.addEventListener('change', melden);
  window.addEventListener(EREIGNIS, melden);
  return () => {
    mq.removeEventListener('change', melden);
    window.removeEventListener(EREIGNIS, melden);
  };
}

/** Hell/Dunkel. Ohne Wahl folgt die Seite dem System; die Wahl bleibt im Browser (localStorage). */
export function ThemeToggle() {
  // null auf dem Server und beim Hydrieren → kein Unterschied zwischen HTML und Client.
  const dunkel = useSyncExternalStore(abonnieren, istDunkel, () => null);

  function umschalten() {
    const neu = istDunkel() ? 'light' : 'dark';
    document.documentElement.dataset.theme = neu;
    try {
      localStorage.setItem(SCHLUESSEL, neu);
    } catch {
      /* privater Modus: Wahl gilt nur für diesen Besuch */
    }
    window.dispatchEvent(new Event(EREIGNIS));
  }

  return (
    <button
      type="button"
      onClick={umschalten}
      aria-pressed={dunkel ?? undefined}
      aria-label="Dark mode"
      title="Toggle dark mode"
      className="tap grid size-10 place-items-center rounded-full border border-line bg-surface text-ink transition-colors hover:border-line-strong"
    >
      <Icon name={dunkel ? 'sun' : 'moon'} className="size-[1.15rem]" />
    </button>
  );
}
