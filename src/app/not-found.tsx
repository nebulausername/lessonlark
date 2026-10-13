import Link from 'next/link';

import { AudienceReset } from '@/components/AudienceReset';
import { Icon } from '@/components/Icon';
import { LarkMark } from '@/components/Logo';
import { SchlichterKopf } from '@/components/SchlichterKopf';
import { AUDIENCES, CONTENT, href } from '@/content';

export const metadata = { title: 'Page not found' };

export default function NichtGefunden() {
  return (
    <div className="flex min-h-dvh flex-col">
      <AudienceReset />
      <SchlichterKopf />
      <main id="inhalt" className="wrap flex flex-1 flex-col items-center justify-center py-20 text-center">
        <LarkMark className="size-20" />
        <p className="mt-6 font-hand text-[1.75rem] leading-none text-ink-2">This lark flew off.</p>
        <h1 className="mt-3 text-[2.5rem] font-extrabold sm:text-[3rem]">We couldn&rsquo;t find that page</h1>
        <p className="mt-3 max-w-md text-ink-2">The link may be old, or the page moved. Here are good places to land:</p>
        <ul className="mt-8 flex flex-wrap justify-center gap-3">
          {AUDIENCES.map((k) => (
            <li key={k}>
              <Link href={href(k)} className="btn btn-ghost">
                {CONTENT[k].label} <Icon name="arrow" className="size-4" />
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
