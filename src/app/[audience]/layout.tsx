import type { Metadata } from 'next';

import { ConceptBanner } from '@/components/ConceptBanner';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { PrototypePill } from '@/components/PrototypePill';
import { Reveal } from '@/components/Reveal';
import { AUDIENCES, audience } from '@/content';

export const dynamicParams = false;

export function generateStaticParams() {
  return AUDIENCES.map((a) => ({ audience: a }));
}

export async function generateMetadata({ params }: { params: Promise<{ audience: string }> }): Promise<Metadata> {
  const a = audience((await params).audience);
  return { description: a.metaDescription };
}

export default async function AudienceLayout({ children, params }: { children: React.ReactNode; params: Promise<{ audience: string }> }) {
  const a = audience((await params).audience);
  return (
    <div data-audience={a.key} className="flex min-h-dvh flex-col">
      <a
        href="#inhalt"
        className="sr-only z-50 rounded-full bg-primary px-4 py-2 font-semibold text-on-primary focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <ConceptBanner />
      <Header a={a} />
      <main id="inhalt" className="flex-1">
        {children}
      </main>
      <Footer a={a} />
      <PrototypePill />
      <Reveal />
    </div>
  );
}
