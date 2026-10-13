import type { Metadata } from 'next';
import Link from 'next/link';

import { Abschnitt } from '@/components/bausteine';
import { Icon } from '@/components/Icon';
import { PricingTable } from '@/components/PricingTable';
import { audience, href } from '@/content';
import { ctaZiel } from '@/lib/ziele';

export async function generateMetadata({ params }: { params: Promise<{ audience: string }> }): Promise<Metadata> {
  const a = audience((await params).audience);
  return { title: `Pricing for ${a.label.toLowerCase()}` };
}

export default async function Preise({ params }: { params: Promise<{ audience: string }> }) {
  const a = audience((await params).audience);
  const ziele = Object.fromEntries(a.pricing.plans.map((p) => [p.id, ctaZiel(p.cta, a)]));
  return (
    <>
      <div className="wrap pt-8 text-center">
        <p className="eyebrow">Pricing</p>
        <h1 className="mx-auto mt-2 max-w-3xl text-[2.5rem] font-extrabold sm:text-[3.25rem]">{a.pricing.title}</h1>
        <p className="mx-auto mt-3 max-w-2xl text-[1.125rem] text-ink-2">{a.pricing.lead}</p>
        <PricingTable plans={a.pricing.plans} yearlyNote={a.pricing.yearlyNote} ziele={ziele} />
        <p className="mx-auto mt-10 flex max-w-xl items-center justify-center gap-2 text-ink-2">
          <Icon name="shield" className="size-5 flex-none text-success" /> {a.pricing.guarantee}
        </p>
      </div>

      <Abschnitt id="faq" eyebrow="FAQ" titel="Questions people ask first">
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_20rem]">
          <ul className="space-y-3">
            {a.faq.map((f, i) => (
              <li key={f.q}>
                <details className="card group p-0" open={i === 0}>
                  <summary className="flex cursor-pointer list-none items-center gap-4 p-5 font-display text-lg font-bold [&::-webkit-details-marker]:hidden">
                    <span className="flex-1">{f.q}</span>
                    <span className="grid size-8 flex-none place-items-center rounded-full bg-accent-soft text-accent-ink transition-transform group-open:rotate-45" aria-hidden="true">
                      +
                    </span>
                  </summary>
                  <p className="px-5 pb-5 text-ink-2">{f.a}</p>
                </details>
              </li>
            ))}
          </ul>
          <aside className="card h-fit p-6">
            <Icon name="chat" className="size-7 text-accent-ink" />
            <h3 className="mt-3 text-xl font-bold">Still deciding?</h3>
            <p className="mt-2 text-ink-2">
              {a.contact.mode === 'demo' ? 'See it with your own classes in a 20-minute demo.' : 'Ask us anything. A real person answers.'}
            </p>
            <Link href={href(a.key, 'contact')} className="btn btn-ghost mt-5 w-full">
              {a.contact.mode === 'demo' ? 'Book a demo' : 'Contact us'}
            </Link>
          </aside>
        </div>
      </Abschnitt>
    </>
  );
}
