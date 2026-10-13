import Link from 'next/link';

import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';

/** Kopf für Seiten ohne Zielgruppe (Auswahl, 404). */
export function SchlichterKopf() {
  return (
    <header className="border-b border-line">
      <div className="wrap flex h-16 items-center justify-between">
        <Link href="/" className="tap flex items-center rounded-full" aria-label="Lessonlark: choose who is learning">
          <Logo />
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}
