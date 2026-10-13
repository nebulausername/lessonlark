import type { Metadata } from 'next';
import Link from 'next/link';

import { Dashboard } from '@/components/Dashboard';
import { audience, href } from '@/content';

export const metadata: Metadata = { title: 'Dashboard preview' };

export default async function DashboardSeite({ params }: { params: Promise<{ audience: string }> }) {
  const a = audience((await params).audience);
  return (
    <div className="wrap pt-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-dashed border-line-strong px-5 py-3">
        <p className="text-ink-2">
          <span className="font-semibold text-ink">Dashboard preview.</span> This is what {a.dashboard.view === 'teacher' ? 'a teacher' : 'a learner'} sees after logging in.
        </p>
        <Link href={href(a.key, 'signup')} className="text-sm font-semibold text-accent-ink underline underline-offset-4">
          Make it yours: sign up
        </Link>
      </div>
      <h1 className="sr-only">Your dashboard</h1>
      <Dashboard audience={a.key} d={a.dashboard} kurse={a.courses.map((c) => ({ slug: c.slug, title: c.title, probe: { title: c.trial.title, minutes: c.trial.minutes } }))} />
    </div>
  );
}
