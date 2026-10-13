import type { Metadata } from 'next';

import { Icon } from '@/components/Icon';
import { SignupForm } from '@/components/SignupForm';
import { audience } from '@/content';
import { demoKonten } from '@/content/demo';

export const metadata: Metadata = { title: 'Create your account' };

export default async function Anmelden({ params }: { params: Promise<{ audience: string }> }) {
  const a = audience((await params).audience);
  return (
    <div className="wrap grid items-start gap-10 pt-8 lg:grid-cols-[1fr_1fr]">
      <div className="lg:pt-6">
        <p className="eyebrow">{a.label}</p>
        <h1 className="mt-2 text-[2.4rem] font-extrabold sm:text-[3rem]">{a.signup.title}</h1>
        <p className="mt-4 text-[1.125rem] text-ink-2">{a.signup.lead}</p>
        <ul className="mt-8 space-y-4">
          {a.signup.perks.map((p) => (
            <li key={p} className="flex gap-3">
              <span className="grid size-8 flex-none place-items-center rounded-full bg-accent text-[#1b2a4a]">
                <Icon name="check" className="size-4" strokeWidth={3} />
              </span>
              <span className="self-center text-[1.0625rem]">{p}</span>
            </li>
          ))}
        </ul>
        <p className="mt-10 font-hand text-[1.5rem] leading-tight text-accent-ink">Next: three quick questions, then your plan.</p>
      </div>
      <SignupForm audience={a.key} lehrkraft={a.dashboard.view === 'teacher'} demos={demoKonten(a)} />
    </div>
  );
}
