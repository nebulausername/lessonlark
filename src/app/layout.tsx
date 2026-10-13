import type { Metadata, Viewport } from 'next';
import { Bricolage_Grotesque, Caveat, Figtree } from 'next/font/google';

import { pfad } from '@/lib/pfad';

import './globals.css';

const display = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-bricolage', display: 'swap' });
const sans = Figtree({ subsets: ['latin'], variable: '--font-figtree', display: 'swap' });
// Zierschrift nur für Randnotizen: nicht vorladen, sie darf nachkommen.
const hand = Caveat({ subsets: ['latin'], variable: '--font-caveat', display: 'swap', weight: ['600'], preload: false });

export const metadata: Metadata = {
  metadataBase: new URL('https://kaufmeinewebsite.de'),
  title: { default: 'Lessonlark: learning that sings', template: '%s · Lessonlark' },
  description: 'Concept prototype of an edtech startup website: short lessons, honest feedback and a clear path forward.',
  robots: { index: false, follow: false },
  openGraph: {
    type: 'website',
    siteName: 'Lessonlark',
    title: 'Lessonlark: learning that sings',
    description: 'Concept prototype of an edtech startup website by Darius Hofman.',
    images: [{ url: pfad('/og.jpg'), width: 1200, height: 630, alt: 'Lessonlark: clay-style learning objects on a cream background' }],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fff8ee' },
    { media: '(prefers-color-scheme: dark)', color: '#0f1626' },
  ],
};

/**
 * Läuft vor dem ersten Zeichnen: gewählte Farbwelt, Zielgruppe aus dem Pfad,
 * geschlossener Hinweis. Jeder Zugriff auf Speicher steht im try (privater
 * Modus, blockierte Website-Daten).
 */
const VORLAUF = `(function(){var d=document.documentElement;try{var t=localStorage.getItem('ll-theme');if(t==='light'||t==='dark')d.dataset.theme=t}catch(e){}try{if(sessionStorage.getItem('ll-banner')==='zu')d.dataset.banner='zu'}catch(e){}var m=location.pathname.match(/^\\/lessonlark\\/(students|professionals|schools)(\\/|$)/);if(m)d.dataset.audience=m[1]})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${hand.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: VORLAUF }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
