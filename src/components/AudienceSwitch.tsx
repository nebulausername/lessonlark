'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

import type { AudienceKey } from '@/content/typen';

type Eintrag = { key: AudienceKey; label: string; shortLabel: string };

/**
 * „Who's learning?“ — führt zur SELBEN Seite der anderen Zielgruppe. Kursslugs
 * gehören je einer Zielgruppe, darum endet ein Wechsel auf einer Kursseite im
 * Katalog der anderen.
 */
export function zielPfad(pathname: string, ziel: AudienceKey): string {
  const rest = pathname.split('/').filter(Boolean).slice(1);
  if (rest[0] === 'courses' && rest.length > 1) rest.splice(1);
  return `/${[ziel, ...rest].join('/')}/`;
}

export function AudienceSwitch({ aktuell, eintraege }: { aktuell: AudienceKey; eintraege: Eintrag[] }) {
  const pathname = usePathname();

  // <html> trägt die Zielgruppe, damit die registrierten Farben beim Wechsel überblenden.
  useEffect(() => {
    document.documentElement.dataset.audience = aktuell;
  }, [aktuell]);

  return (
    <nav aria-label="Who is learning?" className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
      <span className="font-hand text-[1.375rem] leading-none text-ink-2" aria-hidden="true">
        Who&rsquo;s learning?
      </span>
      <ul className="flex rounded-full border border-line bg-surface p-1 shadow-soft">
        {eintraege.map((e) => {
          const an = e.key === aktuell;
          return (
            <li key={e.key}>
              <Link
                href={zielPfad(pathname, e.key)}
                aria-current={an ? 'true' : undefined}
                scroll={false}
                className={`tap flex items-center rounded-full px-3.5 py-1.5 text-[0.9375rem] font-semibold transition-colors duration-300 sm:px-4 ${
                  an ? 'bg-accent text-[#1b2a4a] shadow-soft' : 'text-ink-2 hover:text-ink'
                }`}
              >
                <span className="sm:hidden">{e.shortLabel}</span>
                <span className="hidden sm:inline">{e.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
