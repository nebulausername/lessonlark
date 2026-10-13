'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function NavLinks({ links }: { links: { href: string; label: string }[] }) {
  const pathname = usePathname();
  return (
    <ul className="flex items-center gap-1">
      {links.map((l) => {
        const an = pathname === l.href || (l.href.endsWith('/courses/') && pathname.startsWith(l.href));
        return (
          <li key={l.href}>
            <Link
              href={l.href}
              aria-current={an ? 'page' : undefined}
              className="relative rounded-full px-3 py-2 text-[0.9688rem] font-semibold text-ink-2 transition-colors hover:text-ink aria-[current=page]:text-ink"
            >
              {l.label}
              {an && <span className="absolute inset-x-3 -bottom-0.5 h-[3px] rounded-full bg-accent" aria-hidden="true" />}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
