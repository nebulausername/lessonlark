import Link from 'next/link';

import { AudienceReset } from '@/components/AudienceReset';
import { ConceptBanner } from '@/components/ConceptBanner';
import { Icon } from '@/components/Icon';
import { Picture } from '@/components/Picture';
import { PrototypePill } from '@/components/PrototypePill';
import { SchlichterKopf } from '@/components/SchlichterKopf';
import { AUDIENCES, CONTENT, href } from '@/content';
import { MARKE } from '@/content/gemeinsam';

export default function Auswahl() {
  return (
    <div className="flex min-h-dvh flex-col">
      <AudienceReset />
      <ConceptBanner />
      <SchlichterKopf />
      <main id="inhalt" className="wrap flex-1 py-12 sm:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-hand text-[1.75rem] leading-none text-ink-2">{MARKE.claim}</p>
          <h1 className="rise mt-3 text-[2.6rem] font-extrabold sm:text-[3.5rem]">Who&rsquo;s learning today?</h1>
          <p className="rise-2 mt-4 text-[1.125rem] text-ink-2">
            Lessonlark adapts to the person in front of it. Pick one to start. You can switch any time from the top of every page.
          </p>
        </div>
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {AUDIENCES.map((k, i) => {
            const a = CONTENT[k];
            return (
              <li key={k} data-audience={k} className={i === 0 ? 'rise' : i === 1 ? 'rise-2' : 'rise-3'}>
                <article className="card group relative flex h-full flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-1">
                  <div className="bg-accent-soft">
                    <Picture
                      name={`hero-${k}`}
                      alt=""
                      width={2048}
                      height={2048}
                      sizes="(min-width: 768px) 33vw, 100vw"
                      priority={i === 0}
                      className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="eyebrow">{a.hero.eyebrow}</p>
                    <h2 className="mt-2 text-[1.75rem] font-bold">
                      <Link href={href(k)} className="after:absolute after:inset-0 after:content-['']">
                        {a.label}
                      </Link>
                    </h2>
                    <p className="mt-2 flex-1 text-ink-2">
                      {a.hero.titleStart} {a.hero.accentWord} {a.hero.titleEnd}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 font-semibold text-accent-ink" aria-hidden="true">
                      Explore <Icon name="arrow" className="size-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </main>
      <footer className="border-t border-line">
        <p className="wrap py-5 text-sm text-ink-2">
          Concept prototype by {MARKE.autor}. Lessonlark is a fictional brand. Illustrations generated with AI.{' '}
          <a href={MARKE.imprint} className="underline underline-offset-4">
            Imprint
          </a>{' '}
          ·{' '}
          <a href={MARKE.privacy} className="underline underline-offset-4">
            Privacy
          </a>
        </p>
      </footer>
      <PrototypePill />
    </div>
  );
}
