'use client';

import Link from 'next/link';

import type { AudienceContent, AudienceKey } from '@/content/typen';
import { href } from '@/lib/href';
import { useProfil } from '@/lib/sitzung';

import { Icon } from './Icon';
import { LarkMark } from './Logo';
import { SampleTag } from './SampleTag';

type Daten = AudienceContent['dashboard'];
type KursKurz = { slug: string; title: string; probe: { title: string; minutes: number } };

/**
 * Vorschau „nach dem Login“. Kennzahlen sind Beispieldaten (markiert); Name,
 * Ziel, Niveau, Zeit und empfohlener Kurs kommen aus dem Onboarding dieses
 * Tabs. Ohne Profil zeigt es den Rückfallnamen — im HTML steht also immer ein
 * vollständiges Dashboard.
 */
export function Dashboard({ audience, d, kurse }: { audience: AudienceKey; d: Daten; kurse: KursKurz[] }) {
  const profil = useProfil();
  const lehrkraft = d.view === 'teacher';
  const name = profil?.name || d.fallbackName;
  const eigener = kurse.find((k) => k.slug === (profil?.kurs ?? profil?.empfohlen));
  const naechster = eigener ?? kurse.find((k) => k.title === d.nextLesson.course) ?? kurse[0]!;
  // Die vorgegebene „nächste Lektion“ gehört zu EINEM Kurs. Hat das Profil einen anderen, nimm dessen Lektion.
  const lektion = naechster.title === d.nextLesson.course ? d.nextLesson : naechster.probe;
  const lektionen = profil?.lektionen?.length ?? 0;
  const fortschritt = Math.min(100, 34 + lektionen * 6);
  const streak = lehrkraft ? 9 : 5 + lektionen;
  const erledigt = d.weekPlan.filter((t) => t.done).length;

  const nav = lehrkraft
    ? [
        ['#ueberblick', 'Overview', 'chart'],
        ['#klassen', 'Classes', 'users'],
        ['#aufgaben', 'Assignments', 'book'],
        ['#woche', 'This week', 'calendar'],
      ]
    : [
        ['#ueberblick', 'Overview', 'chart'],
        ['#woche', 'This week', 'calendar'],
        ['#abzeichen', 'Badges', 'trophy'],
      ];

  return (
    <div className="grid gap-6 lg:grid-cols-[15rem_1fr]">
      {/* Seitenleiste wie in der App */}
      <aside className="card hidden h-fit p-4 lg:block" aria-label="Dashboard sections">
        <div className="flex items-center gap-2 px-2 py-1.5">
          <LarkMark className="size-7" />
          <span className="font-display font-bold">My Lessonlark</span>
        </div>
        <ul className="mt-4 space-y-1">
          {nav.map(([ziel, label, icon]) => (
            <li key={ziel}>
              <a href={ziel} className="flex items-center gap-3 rounded-xl px-3 py-2.5 font-semibold text-ink-2 hover:bg-bg-2 hover:text-ink">
                <Icon name={icon as 'chart'} className="size-5" /> {label}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-6 rounded-2xl bg-accent-soft p-4">
          <p className="text-sm font-bold">Your plan</p>
          <p className="mt-1 text-sm text-ink-2">{profil?.plan ?? (lehrkraft ? 'Classroom (free)' : 'Free')}</p>
          <Link href={href(audience, 'pricing')} className="mt-2 inline-block text-sm font-semibold text-accent-ink underline underline-offset-4">
            See plans
          </Link>
        </div>
      </aside>

      <div className="min-w-0 space-y-6">
        <section id="ueberblick" className="card scroll-mt-24 p-6 sm:p-8" aria-labelledby="hallo">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-ink-2">{lehrkraft ? 'Good morning,' : 'Welcome back,'}</p>
              <h2 id="hallo" className="text-[2rem] font-extrabold sm:text-[2.4rem]">
                {name}
              </h2>
            </div>
            <span className="flex flex-wrap items-center justify-end gap-2 text-sm text-ink-2">
              {profil?.demo && (
                <Link href={`${href(audience, 'signup')}#login`} className="chip border-accent-ink/40 text-ink">
                  Demo account · switch
                </Link>
              )}
              Numbers are sample data <SampleTag />
            </span>
          </div>
          {(profil?.goal || profil?.level || profil?.time) && (
            <ul className="mt-4 flex flex-wrap gap-2" aria-label="Your answers from onboarding">
              {[profil?.goal, profil?.level, profil?.time].filter(Boolean).map((t) => (
                <li key={t} className="chip border-accent-ink/30 bg-accent-soft text-ink">
                  {t}
                </li>
              ))}
              <li>
                <Link href={href(audience, 'welcome')} className="chip underline underline-offset-2">
                  Edit
                </Link>
              </li>
            </ul>
          )}

          <div className="mt-6 grid gap-5 md:grid-cols-[1.4fr_1fr]">
            <div className="rounded-[1.25rem] bg-ink p-6 text-bg">
              <p className="text-sm font-bold tracking-wide uppercase opacity-80">{lehrkraft ? 'Next class lesson' : 'Up next'}</p>
              <p className="mt-2 font-display text-2xl font-bold">{lektion.title}</p>
              <p className="mt-1 opacity-80">
                {naechster.title} · {lektion.minutes} min
              </p>
              <Link href={`${href(audience, `courses/${naechster.slug}`)}#trial`} className="btn btn-accent mt-5">
                <Icon name="play" className="size-4 fill-current" /> {lehrkraft ? 'Preview lesson' : 'Continue'}
              </Link>
            </div>
            <div className="flex items-center gap-5 rounded-[1.25rem] border border-line p-5">
              <Ring wert={lehrkraft ? Math.round((d.classes ?? []).reduce((s, c) => s + c.progress, 0) / Math.max(1, d.classes?.length ?? 1)) : fortschritt} />
              <div>
                <p className="flex items-center gap-1.5 font-display text-xl font-bold">
                  <Icon name="flame" className="flame size-5 text-accent-ink" /> {streak}-day {lehrkraft ? 'class ' : ''}streak
                </p>
                <p className="mt-1 text-sm text-ink-2">
                  {lehrkraft ? 'Average progress across your classes.' : lektionen ? `Includes ${lektionen} finished trial lesson${lektionen > 1 ? 's' : ''}.` : 'Course progress so far.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {lehrkraft && d.classes && (
          <section id="klassen" className="card scroll-mt-24 p-6 sm:p-8" aria-labelledby="klassen-titel">
            <h2 id="klassen-titel" className="text-2xl font-bold">
              Your classes
            </h2>
            <div className="mt-5 overflow-x-auto" tabIndex={0} role="region" aria-label="Classes table">
              <table className="w-full min-w-[32rem] text-left">
                <thead className="text-sm text-ink-2">
                  <tr>
                    <th className="pb-3 font-semibold">Class</th>
                    <th className="pb-3 font-semibold">Students</th>
                    <th className="pb-3 font-semibold">Progress</th>
                    <th className="pb-3 font-semibold">Needs help</th>
                  </tr>
                </thead>
                <tbody>
                  {d.classes.map((c) => (
                    <tr key={c.name} className="border-t border-line">
                      <td className="py-3.5 font-semibold">{c.name}</td>
                      <td className="py-3.5">{c.students}</td>
                      <td className="py-3.5">
                        <span className="flex items-center gap-3">
                          <span className="h-2 w-28 overflow-hidden rounded-full bg-bg-2">
                            <span className="fill-bar block h-full rounded-full bg-accent" style={{ width: `${c.progress}%` }} />
                          </span>
                          {c.progress}%
                        </span>
                      </td>
                      <td className="py-3.5">
                        <span className="chip border-danger/30 text-danger">{c.needsHelp} students</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        <div className="grid gap-6 xl:grid-cols-2">
          {lehrkraft && d.assignments && (
            <section id="aufgaben" className="card scroll-mt-24 p-6 sm:p-8" aria-labelledby="aufgaben-titel">
              <h2 id="aufgaben-titel" className="text-2xl font-bold">
                Assignments
              </h2>
              <ul className="mt-5 space-y-4">
                {d.assignments.map((x) => (
                  <li key={x.title}>
                    <p className="flex justify-between gap-3 font-semibold">
                      <span>{x.title}</span>
                      <span className="text-sm whitespace-nowrap text-ink-2">Due {x.due}</span>
                    </p>
                    <div className="mt-2 flex items-center gap-3">
                      <span className="h-2 flex-1 overflow-hidden rounded-full bg-bg-2">
                        <span className="fill-bar block h-full rounded-full bg-success" style={{ width: `${Math.round((x.submitted / x.total) * 100)}%` }} />
                      </span>
                      <span className="text-sm text-ink-2">
                        {x.submitted}/{x.total} in
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section id="woche" className="card scroll-mt-24 p-6 sm:p-8" aria-labelledby="woche-titel">
            <div className="flex items-baseline justify-between gap-3">
              <h2 id="woche-titel" className="text-2xl font-bold">
                This week
              </h2>
              <span className="text-sm font-semibold text-ink-2">
                {erledigt} of {d.weekPlan.length} done
              </span>
            </div>
            {profil?.time && <p className="mt-1 text-sm text-ink-2">Planned around: {profil.time}</p>}
            <ol className="mt-5 space-y-2">
              {d.weekPlan.map((t) => (
                <li key={t.day} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 ${t.done ? '' : 'bg-bg-2'}`}>
                  <span className="w-10 flex-none font-semibold text-ink-2">{t.day}</span>
                  <span className={`flex-1 ${t.done ? 'text-ink-2 line-through decoration-1' : ''}`}>{t.item}</span>
                  {t.done ? (
                    <span className="grid size-6 flex-none place-items-center rounded-full bg-success text-white">
                      <Icon name="check" className="size-3.5" strokeWidth={3} />
                      <span className="sr-only">Done</span>
                    </span>
                  ) : (
                    <span className="size-6 flex-none rounded-full border-2 border-line-strong">
                      <span className="sr-only">To do</span>
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </section>

          <section id="abzeichen" className="card scroll-mt-24 p-6 sm:p-8" aria-labelledby="abzeichen-titel">
            <h2 id="abzeichen-titel" className="text-2xl font-bold">
              {lehrkraft ? 'Class milestones' : 'Badges'}
            </h2>
            <ul className="mt-5 space-y-3">
              {d.achievements.map((b, i) => (
                <li key={b.title} className="flex gap-4 rounded-2xl border border-line p-4">
                  <span className="grid size-12 flex-none place-items-center rounded-2xl bg-accent-soft text-accent-ink">
                    <Icon name={(['flame', 'star', 'trophy'] as const)[i % 3]!} className="size-6" />
                  </span>
                  <span>
                    <span className="block font-bold">{b.title}</span>
                    <span className="block text-sm text-ink-2">{b.text}</span>
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

/** Moment 5: Fortschrittsring zeichnet sich einmal auf. */
function Ring({ wert }: { wert: number }) {
  const r = 34;
  const umfang = 2 * Math.PI * r;
  return (
    <div className="relative size-24 flex-none">
      <svg viewBox="0 0 80 80" className="size-24 -rotate-90" aria-hidden="true">
        <circle cx="40" cy="40" r={r} fill="none" stroke="var(--bg-2)" strokeWidth="9" />
        <circle
          key={wert}
          className="ring-fill"
          cx="40"
          cy="40"
          r={r}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={umfang}
          strokeDashoffset={umfang * (1 - wert / 100)}
          style={{ '--ring-full': `${umfang}` } as React.CSSProperties}
        />
      </svg>
      <span className="absolute inset-0 grid place-items-center font-display text-xl font-extrabold">
        {wert}%<span className="sr-only"> complete</span>
      </span>
    </div>
  );
}
