// Response headers of the production site. One source for the server config and the local preview
// (scripts/vorschau.mjs), so the Content-Security-Policy behaves locally exactly as it does live.
//
// script-src 'unsafe-inline': der statische Next-Export schreibt Inline-Skripte (RSC-Nutzlast, je Seite
// verschieden; Hashes pro Seite wären ein Kopf von mehreren Kilobyte). Vertretbar, weil die Seite keine
// Nutzerinhalte ausgibt, nichts von Dritten lädt und connect-src auf 'self' steht.
export const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  "manifest-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
].join('; ');

export const KOEPFE = {
  'Content-Security-Policy': CSP,
  'X-Robots-Tag': 'noindex, nofollow',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
};
