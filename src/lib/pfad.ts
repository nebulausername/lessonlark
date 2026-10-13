/**
 * Der Unterpfad steht NUR hier. `next/link` und `next/image` setzen ihn selbst,
 * handgeschriebene Pfade (Bilder in <picture>, OG-Bild, Favicon) nicht —
 * dafür gibt es `pfad()`.
 */
export const BASIS = '/lessonlark';

export function pfad(p: string): string {
  return `${BASIS}${p.startsWith('/') ? p : `/${p}`}`;
}
