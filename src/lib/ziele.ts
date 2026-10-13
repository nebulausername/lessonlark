import { href, type AudienceContent } from '@/content';

/**
 * Wohin ein Knopf führt, entschieden aus seiner Aufschrift. Die Inhalte nennen
 * nur Text; so bleibt jede Zielgruppe frei in der Wortwahl, und jeder Knopf
 * landet trotzdem auf einer echten Seite (links.mjs prüft das im Bau).
 */
export function ctaZiel(text: string, a: AudienceContent): string {
  const t = text.toLowerCase();
  if (/demo|talk to/.test(t)) return href(a.key, 'contact');
  if (/lesson/.test(t)) return `${href(a.key, `courses/${a.courses[0]!.slug}`)}#trial`;
  if (/find|right course|program/.test(t)) return href(a.key, 'find-your-course');
  return href(a.key, 'signup');
}

export function navLinks(a: AudienceContent) {
  return [
    { href: href(a.key, 'courses'), label: a.coursesWord },
    { href: href(a.key, 'find-your-course'), label: a.key === 'schools' ? 'Find a program' : 'Find your course' },
    { href: href(a.key, 'pricing'), label: 'Pricing' },
    { href: href(a.key, 'about'), label: 'About' },
    { href: href(a.key, 'contact'), label: a.contact.mode === 'demo' ? 'Book a demo' : 'Contact' },
  ];
}

export function startLabel(a: AudienceContent): string {
  return a.key === 'schools' ? 'Free pilot' : 'Start free';
}
