import { notFound } from 'next/navigation';

import { professionals } from './professionals';
import { schools } from './schools';
import { students } from './students';
import { AUDIENCES, type AudienceContent, type AudienceKey, type Course } from './typen';

export const CONTENT: Record<AudienceKey, AudienceContent> = { students, professionals, schools };

export function isAudience(wert: string): wert is AudienceKey {
  return (AUDIENCES as readonly string[]).includes(wert);
}

/** Zielgruppe aus dem Pfad. Alles andere ist eine 404 (dynamicParams=false fängt es vorher ab). */
export function audience(wert: string): AudienceContent {
  if (!isAudience(wert)) notFound();
  return CONTENT[wert];
}

export function course(a: AudienceContent, slug: string): Course {
  const c = a.courses.find((k) => k.slug === slug);
  if (!c) notFound();
  return c;
}

export { href } from '@/lib/href';

export { AUDIENCES };
export type { AudienceContent, AudienceKey, Course };
