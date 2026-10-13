'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Blöcke mit `data-reveal`, die beim Laden UNTER dem Falz liegen, blenden beim
 * Hereinscrollen ein. Was schon sichtbar ist, bleibt unangetastet (kein
 * Aufblitzen, kein LCP-Verlust). Ohne JavaScript ist alles sofort da.
 */
export function Reveal() {
  const pathname = usePathname();
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    const io = new IntersectionObserver(
      (eintraege) => {
        for (const e of eintraege) {
          if (e.isIntersecting) {
            e.target.classList.remove('pre');
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    );
    for (const el of els) {
      if (el.getBoundingClientRect().top > window.innerHeight) {
        el.classList.add('pre');
        io.observe(el);
      }
    }
    return () => {
      io.disconnect();
      for (const el of els) el.classList.remove('pre');
    };
  }, [pathname]);
  return null;
}
