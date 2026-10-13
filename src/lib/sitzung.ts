'use client';

import { useMemo, useSyncExternalStore } from 'react';

import type { AudienceKey } from '@/content/typen';

/**
 * Der einzige Zustand des Prototyps: ein Profil im sessionStorage dieses Tabs.
 * Nichts geht an einen Server — der Prototyp hat keinen.
 */
export interface Profil {
  name?: string;
  email?: string;
  audience?: AudienceKey;
  goal?: string;
  level?: string;
  time?: string;
  /** Empfehlung aus dem Kursfinder (Slug). */
  empfohlen?: string;
  /** Kurs, für den sich jemand angemeldet hat (Slug). */
  kurs?: string;
  plan?: string;
  /** Abgeschlossene Probelektionen (Slugs). */
  lektionen?: string[];
  /** Angeklicktes Demo-Konto statt eigener Anmeldung. */
  demo?: boolean;
}

const SCHLUESSEL = 'll-profil';
const EREIGNIS = 'll:profil';

function roh(): string {
  try {
    return sessionStorage.getItem(SCHLUESSEL) ?? '{}';
  } catch {
    return '{}';
  }
}

export function profilLesen(): Profil {
  try {
    return JSON.parse(roh()) as Profil;
  } catch {
    return {};
  }
}

export function profilErgaenzen(teil: Partial<Profil>): void {
  const neu = { ...profilLesen(), ...teil };
  try {
    sessionStorage.setItem(SCHLUESSEL, JSON.stringify(neu));
  } catch {
    /* privater Modus: dann gilt es nur bis zum Neuladen nicht — der Prototyp bleibt bedienbar */
  }
  window.dispatchEvent(new Event(EREIGNIS));
}

/** Profil ERSETZEN (Demo-Konto): nichts vom vorigen Besuch darf hineinmischen. */
export function profilSetzen(neu: Profil): void {
  try {
    sessionStorage.setItem(SCHLUESSEL, JSON.stringify(neu));
  } catch {
    /* privater Modus */
  }
  window.dispatchEvent(new Event(EREIGNIS));
}

function abonnieren(melden: () => void) {
  window.addEventListener(EREIGNIS, melden);
  window.addEventListener('storage', melden);
  return () => {
    window.removeEventListener(EREIGNIS, melden);
    window.removeEventListener('storage', melden);
  };
}

/** Profil lesen, ohne Hydrierungsunterschied: auf dem Server und beim ersten Zeichnen ist es leer (null). */
export function useProfil(): Profil | null {
  const text = useSyncExternalStore(abonnieren, roh, () => null);
  return useMemo(() => {
    if (text === null) return null;
    try {
      return JSON.parse(text) as Profil;
    } catch {
      return {};
    }
  }, [text]);
}
