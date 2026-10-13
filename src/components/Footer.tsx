import Link from 'next/link';

import { href, type AudienceContent } from '@/content';
import { MARKE } from '@/content/gemeinsam';
import { navLinks } from '@/lib/ziele';

import { Logo } from './Logo';

export function Footer({ a }: { a: AudienceContent }) {
  const links = navLinks(a);
  return (
    <footer className="mt-24 border-t border-line bg-bg-2">
      <div className="wrap grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-3 max-w-xs text-ink-2">{MARKE.claim} Short lessons, honest feedback and a clear path forward.</p>
        </div>
        <nav aria-label="Learn">
          <h2 className="font-sans text-sm font-bold tracking-wide text-ink uppercase">Learn</h2>
          <ul className="mt-3 space-y-2 text-ink-2">
            {links.slice(0, 3).map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="underline-offset-4 hover:text-ink hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Company">
          <h2 className="font-sans text-sm font-bold tracking-wide text-ink uppercase">Company</h2>
          <ul className="mt-3 space-y-2 text-ink-2">
            {links.slice(3).map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="underline-offset-4 hover:text-ink hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href={href(a.key, 'dashboard')} className="underline-offset-4 hover:text-ink hover:underline">
                Dashboard preview
              </Link>
            </li>
          </ul>
        </nav>
        <div>
          <h2 className="font-sans text-sm font-bold tracking-wide text-ink uppercase">This prototype</h2>
          <ul className="mt-3 space-y-2 text-ink-2">
            <li>Concept by {MARKE.autor}</li>
            <li>
              <a href={MARKE.imprint} className="underline underline-offset-4 hover:text-ink">
                Imprint
              </a>
            </li>
            <li>
              <a href={MARKE.privacy} className="underline underline-offset-4 hover:text-ink">
                Privacy
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="wrap py-5 text-sm text-ink-2">
          Lessonlark is a fictional brand created for a concept prototype. Items marked &ldquo;Sample&rdquo; are placeholder content.
          Illustrations generated with AI. Nothing you enter on this site is sent or stored.
        </p>
      </div>
    </footer>
  );
}
