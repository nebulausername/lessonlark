'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { Icon } from './Icon';

/**
 * Menü für schmale Bildschirme. Offen ist es nur für den Pfad, auf dem es
 * geöffnet wurde — nach einem Seitenwechsel ist es von selbst zu, ohne Effekt.
 */
export function MobileMenu({ links, cta }: { links: { href: string; label: string }[]; cta: { href: string; label: string } }) {
  const pathname = usePathname();
  const [offenAuf, setOffenAuf] = useState<string | null>(null);
  const offen = offenAuf === pathname;

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={offen}
        aria-controls="mobil-menue"
        aria-label={offen ? 'Close menu' : 'Open menu'}
        onClick={() => setOffenAuf(offen ? null : pathname)}
        onKeyDown={(e) => e.key === 'Escape' && setOffenAuf(null)}
        className="tap grid size-10 place-items-center rounded-full border border-line bg-surface"
      >
        <Icon name={offen ? 'x' : 'menu'} className="size-5" />
      </button>
      <div
        id="mobil-menue"
        hidden={!offen}
        className="absolute inset-x-0 top-full border-b border-line bg-bg px-4 pb-6 pt-2 shadow-lift"
        onKeyDown={(e) => e.key === 'Escape' && setOffenAuf(null)}
      >
        <ul className="flex flex-col">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={pathname === l.href ? 'page' : undefined}
                className="flex min-h-12 items-center border-b border-line text-lg font-semibold aria-[current=page]:text-accent-ink"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link href={cta.href} className="btn btn-primary mt-5 w-full">
          {cta.label}
        </Link>
      </div>
    </div>
  );
}
