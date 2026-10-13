import type { Metadata } from 'next';

import { ContactForm } from '@/components/ContactForm';
import { Icon } from '@/components/Icon';
import { audience } from '@/content';

export async function generateMetadata({ params }: { params: Promise<{ audience: string }> }): Promise<Metadata> {
  const a = audience((await params).audience);
  return { title: a.contact.mode === 'demo' ? 'Book a demo' : 'Contact' };
}

export default async function Kontakt({ params }: { params: Promise<{ audience: string }> }) {
  const a = audience((await params).audience);
  return (
    <div className="wrap grid gap-10 pt-8 lg:grid-cols-[1fr_1.3fr]">
      <div>
        <p className="eyebrow">{a.contact.mode === 'demo' ? 'Book a demo' : 'Contact'}</p>
        <h1 className="mt-2 text-[2.4rem] font-extrabold sm:text-[3rem]">{a.contact.title}</h1>
        <p className="mt-4 text-[1.125rem] text-ink-2">{a.contact.lead}</p>
        <ul className="mt-8 space-y-4">
          {[
            ['clock', a.contact.responseNote],
            ['shield', 'We never share your details, and we never send marketing you did not ask for.'],
            ['heart', a.contact.mode === 'demo' ? 'No sales pressure: the free classroom pilot comes first.' : 'Real people answer, usually a teacher or instructor.'],
          ].map(([icon, text]) => (
            <li key={text} className="flex gap-3">
              <span className="grid size-10 flex-none place-items-center rounded-xl bg-accent-soft text-accent-ink">
                <Icon name={icon as 'clock'} className="size-5" />
              </span>
              <span className="self-center">{text}</span>
            </li>
          ))}
        </ul>
      </div>
      <ContactForm a={{ contact: a.contact, key: a.key }} />
    </div>
  );
}
