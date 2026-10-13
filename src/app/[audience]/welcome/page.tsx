import type { Metadata } from 'next';

import { Onboarding } from '@/components/Onboarding';
import { audience } from '@/content';

export const metadata: Metadata = { title: 'Welcome' };

export default async function Willkommen({ params }: { params: Promise<{ audience: string }> }) {
  const a = audience((await params).audience);
  return (
    <div className="wrap max-w-3xl pt-8">
      <p className="text-center font-hand text-[1.75rem] leading-none text-accent-ink">Welcome aboard!</p>
      <h1 className="mt-3 text-center text-[2.2rem] font-extrabold sm:text-[2.75rem]">
        {a.dashboard.view === 'teacher' ? 'Let’s set up your first class' : 'Let’s shape your plan'}
      </h1>
      <p className="mx-auto mt-3 mb-10 max-w-xl text-center text-ink-2">Three quick questions. You can change every answer later.</p>
      <Onboarding audience={a.key} schritte={a.onboarding} fallbackName={a.dashboard.fallbackName} />
    </div>
  );
}
