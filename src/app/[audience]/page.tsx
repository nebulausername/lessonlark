import Link from 'next/link';

import { Abschnitt, KursKarte, SchlussAufruf, Stimme, Unterstrich } from '@/components/bausteine';
import { Icon } from '@/components/Icon';
import { Picture } from '@/components/Picture';
import { SampleTag } from '@/components/SampleTag';
import { audience, href } from '@/content';
import { ctaZiel } from '@/lib/ziele';

export default async function Home({ params }: { params: Promise<{ audience: string }> }) {
  const a = audience((await params).audience);
  const h = a.hero;
  const kartenText = a.key === 'schools' ? `${h.progressCard.streakDays}-day class streak` : `${h.progressCard.streakDays}-day streak`;

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="wrap grid items-center gap-10 pt-8 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:pt-14" aria-labelledby="hero-titel">
        <div>
          <p className="eyebrow rise">{h.eyebrow}</p>
          <h1 id="hero-titel" className="rise mt-4 text-[2.6rem] leading-[1.04] font-extrabold sm:text-[3.5rem] lg:text-[4.1rem]">
            {h.titleStart}{' '}
            <span className="relative inline-block whitespace-nowrap">
              <span className="relative z-10">{h.accentWord}</span>
              <Unterstrich className="absolute -bottom-1.5 left-0 h-[0.32em] w-full" />
            </span>{' '}
            {h.titleEnd}
          </h1>
          <p className="rise-2 mt-6 max-w-xl text-[1.125rem] text-ink-2 sm:text-[1.1875rem]">{h.lead}</p>
          <div className="rise-3 mt-8 flex flex-wrap items-center gap-3">
            <Link href={ctaZiel(h.primaryCta, a)} className="btn btn-primary text-[1.0625rem]">
              {h.primaryCta} <Icon name="arrow" className="size-4" />
            </Link>
            <Link href={ctaZiel(h.secondaryCta, a)} className="btn btn-ghost text-[1.0625rem]">
              {h.secondaryCta}
            </Link>
          </div>
          <p className="rise-3 mt-5 flex items-center gap-2 font-hand text-[1.5rem] leading-none text-accent-ink">
            <svg viewBox="0 0 40 24" className="h-5 w-8 -scale-y-100" aria-hidden="true">
              <path d="M2 4c10 14 22 17 34 12m0 0-6-6m6 6-7 4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {h.note}
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-[34rem]">
          <div className="absolute inset-[6%] -z-10 rounded-full bg-accent-soft blur-2xl" aria-hidden="true" />
          <Picture
            name={`hero-${a.key}`}
            alt=""
            width={2048}
            height={2048}
            sizes="(min-width: 1024px) 34rem, 92vw"
            priority
            className="aspect-square w-full rounded-[2rem] object-cover"
          />
          {/* Fortschrittskarte (Moment 1) */}
          <div className="card absolute -bottom-6 left-0 w-[min(19rem,80%)] p-4 sm:-left-6" aria-hidden="true">
            <p className="flex items-center justify-between text-xs font-bold tracking-wide text-ink-2 uppercase">
              {h.progressCard.label}
              <span className="flex items-center gap-1 text-accent-ink normal-case">
                <Icon name="flame" className="flame size-4" /> {kartenText}
              </span>
            </p>
            <p className="mt-1.5 font-display text-lg font-bold">{h.progressCard.lessonTitle}</p>
            <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-bg-2">
              <div className="fill-bar h-full rounded-full bg-accent" style={{ width: `${h.progressCard.percent}%` }} />
            </div>
            <p className="mt-1.5 text-right text-sm font-semibold text-ink-2">{h.progressCard.percent}%</p>
          </div>
          <div className="card absolute top-6 -right-2 hidden items-center gap-2 px-3.5 py-2.5 sm:flex" aria-hidden="true">
            <span className="grid size-7 place-items-center rounded-full bg-success text-white">
              <Icon name="check" className="size-4" strokeWidth={3} />
            </span>
            <span className="text-sm font-semibold">Lesson complete</span>
          </div>
        </div>
      </section>

      {/* ---------- Kennzahlen (Sample) ---------- */}
      <section className="wrap mt-20" aria-label="At a glance">
        <ul className="card grid divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0" data-reveal="">
          {a.stats.map((s) => (
            <li key={s.label} className="flex items-center justify-between gap-4 px-6 py-5 sm:block" data-sample="">
              <span>
                <span className="block font-display text-[2rem] font-bold">{s.value}</span>
                <span className="block text-ink-2">{s.label}</span>
              </span>
              <SampleTag className="sm:mt-2" />
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- Nutzen ---------- */}
      <Abschnitt id="nutzen" eyebrow="Why Lessonlark" titel={a.key === 'schools' ? 'Built for real classrooms' : 'Designed to keep you going'}>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {a.benefits.map((b) => (
            <li key={b.title} className="card p-6" data-reveal="">
              <span className="grid size-12 place-items-center rounded-2xl bg-accent-soft text-accent-ink">
                <Icon name={b.icon} className="size-6" />
              </span>
              <h3 className="mt-5 text-xl font-bold">{b.title}</h3>
              <p className="mt-2 text-[0.98rem] text-ink-2">{b.text}</p>
            </li>
          ))}
        </ul>
      </Abschnitt>

      {/* ---------- So funktioniert's ---------- */}
      <Abschnitt id="ablauf" eyebrow="How it works" titel="Three steps, no guesswork">
        <ol className="relative mt-10 grid gap-5 md:grid-cols-3">
          <svg className="absolute top-8 right-[16%] left-[16%] hidden h-2 md:block" preserveAspectRatio="none" viewBox="0 0 100 2" aria-hidden="true">
            <line x1="0" y1="1" x2="100" y2="1" stroke="var(--line-strong)" strokeWidth="2" strokeDasharray="2 3" vectorEffect="non-scaling-stroke" />
          </svg>
          {a.steps.map((s, i) => (
            <li key={s.title} className="relative text-center" data-reveal="">
              <span className="mx-auto grid size-16 place-items-center rounded-full border-4 border-bg bg-accent font-display text-2xl font-extrabold text-[#1b2a4a] shadow-soft">
                {i + 1}
              </span>
              <h3 className="mt-4 text-xl font-bold">{s.title}</h3>
              <p className="mx-auto mt-2 max-w-xs text-[0.98rem] text-ink-2">{s.text}</p>
            </li>
          ))}
        </ol>
      </Abschnitt>

      {/* ---------- Kurse ---------- */}
      <Abschnitt
        id="kurse"
        eyebrow={`Popular ${a.coursesWord.toLowerCase()}`}
        titel={a.key === 'schools' ? 'Programs your teachers can start Monday' : 'Start with something you can finish'}
      >
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {a.courses.map((c) => (
            <li key={c.slug} data-reveal="">
              <KursKarte a={a} c={c} />
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-[1.5rem] border border-dashed border-line-strong p-6" data-reveal="">
          <p className="text-lg">
            <span className="font-bold">Not sure where to start?</span> <span className="text-ink-2">Four questions, one honest recommendation.</span>
          </p>
          <Link href={href(a.key, 'find-your-course')} className="btn btn-accent">
            {a.key === 'schools' ? 'Find a program' : 'Find your course'} <Icon name="arrow" className="size-4" />
          </Link>
        </div>
      </Abschnitt>

      {/* ---------- Stimmen (Sample) ---------- */}
      <Abschnitt id="stimmen" eyebrow="In their words" titel={a.key === 'schools' ? 'What teachers and leaders say' : 'What learners say'}>
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {a.testimonials.map((q) => (
            <li key={q.name} data-reveal="">
              <Stimme q={q} />
            </li>
          ))}
        </ul>
      </Abschnitt>

      <SchlussAufruf titel={a.finalCta.title} text={a.finalCta.text} cta={a.finalCta.cta} ziel={ctaZiel(a.finalCta.cta, a)} />
    </>
  );
}
