'use client';

import { useEffect } from 'react';

/** Auf Seiten ohne Zielgruppe (Auswahl, 404) darf <html> keine tragen, sonst färbt sie alle Karten gleich. */
export function AudienceReset() {
  useEffect(() => {
    delete document.documentElement.dataset.audience;
  }, []);
  return null;
}
