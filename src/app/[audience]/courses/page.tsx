import type { Metadata } from 'next';

import { CourseCatalog } from '@/components/CourseCatalog';
import { audience } from '@/content';

export async function generateMetadata({ params }: { params: Promise<{ audience: string }> }): Promise<Metadata> {
  const a = audience((await params).audience);
  return { title: `${a.coursesWord} for ${a.label.toLowerCase()}` };
}

export default async function Kurse({ params }: { params: Promise<{ audience: string }> }) {
  const a = audience((await params).audience);
  return (
    <div className="wrap pt-8">
      <p className="eyebrow">{a.label}</p>
      <h1 className="mt-2 text-[2.5rem] font-extrabold sm:text-[3.25rem]">
        {a.key === 'schools' ? 'Programs for every grade band' : 'Courses you can actually finish'}
      </h1>
      <p className="mt-3 max-w-2xl text-[1.125rem] text-ink-2">
        Every {a.key === 'schools' ? 'program' : 'course'} comes with a free trial lesson. Open one and try it before you sign up.
      </p>
      <CourseCatalog a={{ key: a.key, coursesWord: a.coursesWord, courses: a.courses }} />
    </div>
  );
}
