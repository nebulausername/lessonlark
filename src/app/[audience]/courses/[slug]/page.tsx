import type { Metadata } from 'next';
import Link from 'next/link';

import { Abschnitt, Initialen, KursKarte } from '@/components/bausteine';
import { Icon } from '@/components/Icon';
import { Picture } from '@/components/Picture';
import { SampleTag } from '@/components/SampleTag';
import { TrialLesson } from '@/components/TrialLesson';
import { AUDIENCES, CONTENT, audience, course, href } from '@/content';

export const dynamicParams = false;

export function generateStaticParams() {
  return AUDIENCES.flatMap((a) => CONTENT[a].courses.map((c) => ({ audience: a, slug: c.slug })));
}

type Props = { params: Promise<{ audience: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await params;
  const c = course(audience(p.audience), p.slug);
  return { title: c.title, description: c.tagline };
}

export default async function KursSeite({ params }: Props) {
  const p = await params;
  const a = audience(p.audience);
  const c = course(a, p.slug);
  const andere = a.courses.filter((k) => k.slug !== c.slug).slice(0, 3);
  const wort = a.key === 'schools' ? 'program' : 'course';

  return (
    <>
      <div className="wrap pt-6">
        <nav aria-label="Breadcrumb" className="text-sm font-semibold text-ink-2">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href={href(a.key, 'courses')} className="underline-offset-4 hover:text-ink hover:underline">
                {a.coursesWord}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-ink">
              {c.title}
            </li>
          </ol>
        </nav>

        <section className="mt-6 grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]" aria-labelledby="kurs-titel">
          <div>
            <div className="flex flex-wrap gap-2">
              <span className="chip">{c.topic}</span>
              <span className="chip">{c.level}</span>
            </div>
            <h1 id="kurs-titel" className="rise mt-4 text-[2.4rem] font-extrabold sm:text-[3.25rem]">
              {c.title}
            </h1>
            <p className="rise-2 mt-4 text-[1.1875rem] text-ink-2">{c.tagline}</p>
            <dl className="rise-2 mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                ['Length', `${c.durationWeeks} weeks`],
                ['Time', `${c.hoursPerWeek} h / week`],
                ['Lessons', String(c.lessons)],
                ['Price', c.priceNote],
              ].map(([k, v]) => (
                <div key={k} className="rounded-2xl border border-line bg-surface px-4 py-3">
                  <dt className="text-xs font-bold tracking-wide text-ink-2 uppercase">{k}</dt>
                  <dd className="mt-0.5 font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 flex items-center gap-2 text-ink-2">
              <Icon name="users" className="size-4" /> {c.format}
            </p>
            <div className="rise-3 mt-7 flex flex-wrap gap-3">
              <a href="#trial" className="btn btn-primary">
                Try the free lesson <Icon name="arrow" className="size-4" />
              </a>
              <Link href={href(a.key, 'signup')} className="btn btn-ghost">
                {a.key === 'schools' ? 'Start a free pilot' : 'Enroll'}
              </Link>
            </div>
          </div>
          <div className="rounded-[2rem] bg-accent-soft p-3">
            <Picture
              name={`course-${c.slug}`}
              alt=""
              width={1536}
              height={1024}
              sizes="(min-width: 1024px) 34rem, 92vw"
              priority
              className="aspect-[3/2] w-full rounded-[1.6rem] object-cover"
            />
          </div>
        </section>
      </div>

      <Abschnitt id="ergebnisse" eyebrow="Outcomes" titel={`What you'll be able to do`}>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {c.outcomes.map((o) => (
            <li key={o} className="card flex gap-3 p-5" data-reveal="">
              <span className="grid size-7 flex-none place-items-center rounded-full bg-accent text-[#1b2a4a]">
                <Icon name="check" className="size-4" strokeWidth={3} />
              </span>
              <span>{o}</span>
            </li>
          ))}
        </ul>
      </Abschnitt>

      <section id="trial" aria-labelledby="trial-titel" className="wrap mt-24 scroll-mt-24">
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow">Try before you sign up</p>
          <h2 id="trial-titel" className="mt-2 text-[2rem] font-bold sm:text-[2.5rem]">
            A real lesson, right here
          </h2>
          <p className="mt-3 mb-8 text-ink-2">No account needed. It takes about {c.trial.minutes} minutes and nothing you answer leaves this page.</p>
          <TrialLesson lektion={c.trial} audience={a.key} slug={c.slug} kursTitel={c.title} />
        </div>
      </section>

      <Abschnitt id="lehrplan" eyebrow="Syllabus" titel={`${c.modules.length} modules, ${c.lessons} lessons`}>
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_20rem]">
          <ol className="space-y-3">
            {c.modules.map((m, i) => (
              <li key={m.title}>
                <details className="card group p-0" open={i === 0}>
                  <summary className="flex cursor-pointer list-none items-center gap-4 p-5 [&::-webkit-details-marker]:hidden">
                    <span className="grid size-10 flex-none place-items-center rounded-full bg-accent-soft font-display font-bold text-accent-ink">{i + 1}</span>
                    <span className="flex-1">
                      <span className="block font-display text-lg font-bold">{m.title}</span>
                      <span className="block text-sm text-ink-2">{m.lessons} lessons</span>
                    </span>
                    <Icon name="arrow" className="size-5 rotate-90 transition-transform group-open:-rotate-90" />
                  </summary>
                  <p className="px-5 pb-5 text-ink-2 sm:pl-[4.75rem]">{m.summary}</p>
                </details>
              </li>
            ))}
          </ol>
          <aside className="card h-fit p-6" data-sample="" aria-labelledby="lehrer-titel">
            <div className="flex items-center justify-between">
              <h3 id="lehrer-titel" className="font-sans text-sm font-bold tracking-wide text-ink-2 uppercase">
                Your {a.key === 'schools' ? 'curriculum lead' : 'instructor'}
              </h3>
              <SampleTag />
            </div>
            <div className="mt-4 flex items-center gap-3">
              <Initialen name={c.instructor.name} />
              <div>
                <p className="font-bold">{c.instructor.name}</p>
                <p className="text-sm text-ink-2">{c.instructor.title}</p>
              </div>
            </div>
            <p className="mt-4 text-[0.98rem] text-ink-2">{c.instructor.bio}</p>
          </aside>
        </div>
      </Abschnitt>

      <Abschnitt id="mehr" eyebrow={`More ${a.coursesWord.toLowerCase()}`} titel={`Pair this ${wort} with`}>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {andere.map((k) => (
            <li key={k.slug} data-reveal="">
              <KursKarte a={a} c={k} />
            </li>
          ))}
        </ul>
      </Abschnitt>
    </>
  );
}
