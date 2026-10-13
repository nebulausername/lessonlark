import Link from 'next/link';

import type { AudienceContent, Course } from '@/content/typen';
import { href } from '@/lib/href';
import type { SampleQuote } from '@/content/typen';

import { Icon } from './Icon';
import { Picture } from './Picture';
import { SampleTag } from './SampleTag';

/** Handgezeichneter Strich unter dem Akzentwort (Moment 1). pathLength=1 hält die Strichlänge unabhängig von der Breite. */
export function Unterstrich({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 18" preserveAspectRatio="none" className={`underline-draw ${className}`} aria-hidden="true" focusable="false">
      <path
        d="M3 12.5C40 6 92 3.5 140 5.5c26 1 51 3.6 76 7.5"
        pathLength={1}
        fill="none"
        stroke="var(--accent)"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Abschnitt({
  eyebrow,
  titel,
  text,
  children,
  id,
  className = '',
}: {
  eyebrow?: string;
  titel: string;
  text?: string;
  children?: React.ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <section id={id} aria-labelledby={id ? `${id}-titel` : undefined} className={`wrap mt-24 sm:mt-28 ${className}`}>
      <div className="max-w-2xl" data-reveal="">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 id={id ? `${id}-titel` : undefined} className="mt-2 text-[2rem] font-bold sm:text-[2.5rem]">
          {titel}
        </h2>
        {text && <p className="mt-3 text-ink-2">{text}</p>}
      </div>
      {children}
    </section>
  );
}

export function Initialen({ name }: { name: string }) {
  const kurz = name
    .replace(/^(Ms|Mr|Mrs|Dr)\.\s+/, '')
    .split(/\s+/)
    .map((t) => t[0])
    .join('')
    .slice(0, 2);
  return (
    <span className="grid size-11 flex-none place-items-center rounded-full bg-accent-soft font-display text-base font-bold text-accent-ink" aria-hidden="true">
      {kurz}
    </span>
  );
}

export function Stimme({ q }: { q: SampleQuote }) {
  return (
    <figure className="card flex h-full flex-col p-6" data-sample="">
      <div className="flex items-center justify-between">
        <span className="flex gap-0.5 text-accent-ink" aria-hidden="true">
          {[0, 1, 2, 3, 4].map((i) => (
            <Icon key={i} name="star" className="size-4 fill-current" strokeWidth={1.5} />
          ))}
        </span>
        <SampleTag />
      </div>
      <blockquote className="mt-4 flex-1 text-[1.0625rem] leading-relaxed">&ldquo;{q.quote}&rdquo;</blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        <Initialen name={q.name} />
        <span>
          <span className="block font-semibold">{q.name}</span>
          <span className="block text-sm text-ink-2">{q.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export function KursKarte({ a, c, priority = false }: { a: Pick<AudienceContent, 'key'>; c: Course; priority?: boolean }) {
  return (
    <article className="card group relative flex h-full flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-1">
      <div className="overflow-hidden bg-bg-2">
        <Picture
          name={`course-${c.slug}`}
          alt=""
          width={1536}
          height={1024}
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
          priority={priority}
          className="aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap gap-2">
          <span className="chip">{c.topic}</span>
          <span className="chip">{c.level}</span>
        </div>
        <h3 className="mt-3 text-xl font-bold">
          <Link href={href(a.key, `courses/${c.slug}`)} className="after:absolute after:inset-0 after:content-['']">
            {c.title}
          </Link>
        </h3>
        <p className="mt-1.5 flex-1 text-[0.98rem] text-ink-2">{c.tagline}</p>
        <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm font-semibold text-ink-2">
          <span className="inline-flex items-center gap-1.5">
            <Icon name="calendar" className="size-4" /> {c.durationWeeks} weeks
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Icon name="clock" className="size-4" /> {c.hoursPerWeek} h/week
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Icon name="book" className="size-4" /> {c.lessons} lessons
          </span>
        </p>
      </div>
    </article>
  );
}

export function SchlussAufruf({ titel, text, cta, ziel }: { titel: string; text: string; cta: string; ziel: string }) {
  return (
    <section className="wrap mt-24 sm:mt-28" aria-labelledby="schluss-titel">
      <div className="relative overflow-hidden rounded-[2rem] bg-accent px-6 py-14 text-center text-[#1b2a4a] sm:px-12" data-reveal="">
        <svg className="pointer-events-none absolute -top-10 -left-10 size-48 opacity-25" viewBox="0 0 100 100" aria-hidden="true">
          <circle cx="50" cy="50" r="40" fill="none" stroke="#1b2a4a" strokeWidth="10" strokeDasharray="190 60" />
        </svg>
        <svg className="pointer-events-none absolute -right-8 -bottom-12 size-56 opacity-20" viewBox="0 0 100 100" aria-hidden="true">
          <rect x="15" y="15" width="70" height="70" rx="22" fill="#1b2a4a" />
        </svg>
        <h2 id="schluss-titel" className="relative mx-auto max-w-2xl text-[2rem] font-bold sm:text-[2.75rem]">
          {titel}
        </h2>
        <p className="relative mx-auto mt-3 max-w-xl text-[1.0625rem]">{text}</p>
        <Link href={ziel} className="btn relative mt-7 bg-[#1b2a4a] text-[#fff8ee]">
          {cta} <Icon name="arrow" className="size-4" />
        </Link>
      </div>
    </section>
  );
}
