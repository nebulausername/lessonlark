import Link from 'next/link';

import { AUDIENCES, CONTENT, href, type AudienceContent } from '@/content';
import { navLinks, startLabel } from '@/lib/ziele';

import { AudienceSwitch } from './AudienceSwitch';
import { Logo } from './Logo';
import { MobileMenu } from './MobileMenu';
import { NavLinks } from './NavLinks';
import { ThemeToggle } from './ThemeToggle';

export function Header({ a }: { a: AudienceContent }) {
  const links = navLinks(a);
  const start = { href: href(a.key, 'signup'), label: startLabel(a) };
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur-md">
        <div className="wrap relative flex h-16 items-center gap-3">
          <Link href={href(a.key)} className="tap -ml-1 flex items-center rounded-full px-1" aria-label="Lessonlark home">
            <Logo />
          </Link>
          <nav aria-label="Main" className="ml-4 hidden lg:block">
            <NavLinks links={links} />
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
            <Link href={`${href(a.key, 'signup')}#login`} className="btn btn-ghost btn-sm hidden sm:inline-flex">
              Log in
            </Link>
            <Link href={start.href} className="btn btn-primary btn-sm hidden min-[400px]:inline-flex">
              {start.label}
            </Link>
            <MobileMenu links={[...links, { href: `${href(a.key, 'signup')}#login`, label: 'Log in' }]} cta={start} />
          </div>
        </div>
      </header>
      <div className="wrap pt-4 pb-1">
        <AudienceSwitch
          aktuell={a.key}
          eintraege={AUDIENCES.map((k) => ({ key: k, label: CONTENT[k].label, shortLabel: CONTENT[k].shortLabel }))}
        />
      </div>
    </>
  );
}
