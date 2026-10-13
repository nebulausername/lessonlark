import type { Metadata } from 'next';

import { Abschnitt, Initialen, SchlussAufruf } from '@/components/bausteine';
import { Icon } from '@/components/Icon';
import { Picture } from '@/components/Picture';
import { SampleTag } from '@/components/SampleTag';
import { audience, href } from '@/content';
import { ABOUT } from '@/content/gemeinsam';

export const metadata: Metadata = { title: 'About' };

export default async function UeberUns({ params }: { params: Promise<{ audience: string }> }) {
  const a = audience((await params).audience);
  return (
    <>
      <section className="wrap grid items-center gap-10 pt-8 lg:grid-cols-[1.1fr_1fr]" aria-labelledby="about-titel">
        <div>
          <p className="eyebrow">About Lessonlark</p>
          <h1 id="about-titel" className="rise mt-3 text-[2.4rem] font-extrabold sm:text-[3.25rem]">
            {ABOUT.title}
          </h1>
          <p className="rise-2 mt-5 text-[1.125rem] text-ink-2">{ABOUT.lead}</p>
          <p className="rise-3 mt-5 border-l-4 border-accent pl-4 text-[1.125rem] font-semibold">{a.aboutLine}</p>
        </div>
        <Picture
          name="about-lark"
          alt="A small clay songbird sitting on a stack of books, the Lessonlark mascot"
          width={1536}
          height={1024}
          sizes="(min-width: 1024px) 34rem, 92vw"
          priority
          className="aspect-[3/2] w-full rounded-[2rem] object-cover"
        />
      </section>

      <Abschnitt id="werte" eyebrow={ABOUT.mission.heading} titel={ABOUT.mission.text}>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ABOUT.values.map((v) => (
            <li key={v.title} className="card p-6" data-reveal="">
              <span className="grid size-12 place-items-center rounded-2xl bg-accent-soft text-accent-ink">
                <Icon name={v.icon} className="size-6" />
              </span>
              <h3 className="mt-5 text-xl font-bold">{v.title}</h3>
              <p className="mt-2 text-[0.98rem] text-ink-2">{v.text}</p>
            </li>
          ))}
        </ul>
      </Abschnitt>

      <Abschnitt id="weg" eyebrow="Our story so far" titel="Small steps, on purpose">
        <div data-sample="">
          <div className="mt-3">
            <SampleTag />
          </div>
          <ol className="mt-8 grid gap-5 md:grid-cols-4">
            {ABOUT.timeline.map((t) => (
              <li key={t.year} className="relative border-t-4 border-accent pt-4" data-reveal="">
                <p className="font-display text-2xl font-extrabold">{t.year}</p>
                <p className="mt-1 text-ink-2">{t.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </Abschnitt>

      <Abschnitt id="team" eyebrow="Team" titel="The people behind the lark">
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ABOUT.team.map((p) => (
            <li key={p.name} className="card p-6" data-sample="" data-reveal="">
              <div className="flex items-start justify-between">
                <Initialen name={p.name} />
                <SampleTag />
              </div>
              <p className="mt-4 font-display text-lg font-bold">{p.name}</p>
              <p className="text-sm font-semibold text-accent-ink">{p.title}</p>
              <p className="mt-2 text-[0.98rem] text-ink-2">{p.bio}</p>
            </li>
          ))}
        </ul>
      </Abschnitt>

      <SchlussAufruf titel={a.finalCta.title} text={a.finalCta.text} cta={a.key === 'schools' ? 'Book a demo' : 'Start free'} ziel={href(a.key, a.key === 'schools' ? 'contact' : 'signup')} />
    </>
  );
}
