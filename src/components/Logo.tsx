/** Wortmarke: eine kleine, runde Lerche. Farben folgen den Tokens (hell/dunkel, Zielgruppe). */
export function LarkMark({ className = 'size-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" focusable="false">
      <path d="M6.5 20.5 1.5 24l6 .4Z" fill="var(--ink)" />
      <circle cx="15" cy="17" r="10" fill="var(--ink)" />
      <path d="M24.2 12.6 30.5 14.6 24.6 16.4Z" fill="var(--accent)" />
      <path d="M15.5 26.9a10 10 0 0 0 9.3-8.4c-2.2 3.3-5.6 5.3-9.3 5.6Z" fill="var(--accent)" />
      <circle cx="19.6" cy="12.6" r="1.5" fill="var(--bg)" />
      <path d="M7.8 16.4c3.3-.2 6.3 1.4 7.6 4.6" stroke="var(--bg)" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function Logo() {
  return (
    <span className="flex items-center gap-2">
      <LarkMark />
      <span className="font-display text-[1.375rem] font-bold tracking-tight">Lessonlark</span>
    </span>
  );
}
