import { pfad } from '@/lib/pfad';

/** Breiten, die scripts/bilder.mjs je Bild erzeugt (AVIF + WebP). */
export const BREITEN = [480, 960, 1600] as const;

/**
 * Responsives Bild ohne Bild-Optimierer (statischer Export). Breite/Höhe geben
 * das Seitenverhältnis vor, damit nichts springt (CLS 0).
 */
export function Picture({
  name,
  alt,
  width,
  height,
  sizes,
  priority = false,
  className = '',
}: {
  name: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const satz = (endung: string) => BREITEN.map((b) => `${pfad(`/img/${name}-${b}.${endung}`)} ${b}w`).join(', ');
  return (
    <picture>
      <source type="image/avif" srcSet={satz('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={satz('webp')} sizes={sizes} />
      <img
        src={pfad(`/img/${name}-960.webp`)}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding={priority ? 'sync' : 'async'}
        className={className}
      />
    </picture>
  );
}
