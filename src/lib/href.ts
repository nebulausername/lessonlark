import type { AudienceKey } from '@/content/typen';

/** Pfad innerhalb der App (ohne basePath — den setzt next/link). Ohne Inhaltsimport, damit Client-Bündel klein bleiben. */
export function href(a: AudienceKey, rest = ''): string {
  const r = rest.replace(/^\/+|\/+$/g, '');
  return r ? `/${a}/${r}/` : `/${a}/`;
}
