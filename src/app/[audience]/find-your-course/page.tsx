import type { Metadata } from 'next';

import { CourseFinder } from '@/components/CourseFinder';
import { audience } from '@/content';

export async function generateMetadata({ params }: { params: Promise<{ audience: string }> }): Promise<Metadata> {
  const a = audience((await params).audience);
  return { title: a.key === 'schools' ? 'Find a program' : 'Find your course' };
}

export default async function Kursfinder({ params }: { params: Promise<{ audience: string }> }) {
  const a = audience((await params).audience);
  return (
    <div className="wrap max-w-4xl pt-8">
      <div className="text-center">
        <p className="eyebrow">{a.key === 'schools' ? 'Program finder' : 'Course finder'} · 1 minute</p>
        <h1 className="mx-auto mt-2 max-w-2xl text-[2.4rem] font-extrabold sm:text-[3rem]">{a.quiz.title}</h1>
        <p className="mx-auto mt-3 mb-10 max-w-xl text-[1.125rem] text-ink-2">{a.quiz.lead}</p>
      </div>
      <CourseFinder
        audience={a.key}
        fragen={a.quiz.questions}
        wort={a.key === 'schools' ? 'program' : 'course'}
        kurse={a.courses.map(({ slug, title, tagline, topic, level, durationWeeks, hoursPerWeek }) => ({ slug, title, tagline, topic, level, durationWeeks, hoursPerWeek }))}
      />
    </div>
  );
}
