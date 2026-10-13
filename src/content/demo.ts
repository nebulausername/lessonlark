import type { Profil } from '@/lib/sitzung';

import type { AudienceContent, AudienceKey } from './typen';

/**
 * Demo-Konten zum Anklicken: ohne Anmeldung direkt in ein gefülltes Dashboard.
 * Antworten verweisen per Index auf die Onboarding-Optionen der Zielgruppe, damit
 * Dashboard und Onboarding dieselben Wörter benutzen. Alle Personen sind erfunden.
 */
type Roh = { name: string; rolle: string; ziel: number; niveau: number; zeit: number; kurs: number; plan: string; lektionen: number };

const ROH: Record<AudienceKey, Roh[]> = {
  students: [
    { name: 'Alex', rolle: 'Grade 4 · catching up on fractions', ziel: 2, niveau: 0, zeit: 0, kurs: 0, plan: 'Plus', lektionen: 1 },
    { name: 'Maya', rolle: 'Grade 7 · writing with more confidence', ziel: 0, niveau: 1, zeit: 1, kurs: 2, plan: 'Family', lektionen: 2 },
    { name: 'Theo', rolle: 'Grade 10 · algebra word problems', ziel: 1, niveau: 2, zeit: 2, kurs: 1, plan: 'Free', lektionen: 0 },
  ],
  professionals: [
    { name: 'Jordan', rolle: 'Switching careers into data', ziel: 0, niveau: 0, zeit: 0, kurs: 0, plan: 'Pro', lektionen: 2 },
    { name: 'Elena', rolle: 'Marketing manager learning UX', ziel: 2, niveau: 1, zeit: 1, kurs: 1, plan: 'Pro', lektionen: 1 },
    { name: 'Sam', rolle: 'Team lead, presenting with more ease', ziel: 1, niveau: 2, zeit: 0, kurs: 3, plan: 'Teams', lektionen: 0 },
  ],
  schools: [
    { name: 'Ms. Rivera', rolle: 'Grade 4 teacher · daily math practice', ziel: 0, niveau: 0, zeit: 1, kurs: 0, plan: 'School', lektionen: 1 },
    { name: 'Mr. Chen', rolle: 'Grade 7 ELA · reading intervention', ziel: 1, niveau: 1, zeit: 0, kurs: 1, plan: 'School', lektionen: 0 },
    { name: 'Ms. Patel', rolle: 'Coding club · enrichment', ziel: 2, niveau: 1, zeit: 2, kurs: 2, plan: 'Classroom', lektionen: 2 },
  ],
};

export type DemoKonto = { name: string; rolle: string; profil: Profil };

export function demoKonten(a: AudienceContent): DemoKonto[] {
  const label = (schritt: 'goal' | 'level' | 'time', i: number) => {
    const o = a.onboarding.find((s) => s.key === schritt)?.options[i];
    if (!o) throw new Error(`Demo-Konto: ${a.key}/${schritt}[${i}] gibt es nicht`);
    return o.label;
  };
  return ROH[a.key].map((r) => {
    const kurs = a.courses[r.kurs];
    if (!kurs) throw new Error(`Demo-Konto: ${a.key} Kurs ${r.kurs} gibt es nicht`);
    return {
      name: r.name,
      rolle: r.rolle,
      profil: {
        name: r.name,
        audience: a.key,
        goal: label('goal', r.ziel),
        level: label('level', r.niveau),
        time: label('time', r.zeit),
        kurs: kurs.slug,
        plan: r.plan,
        lektionen: a.courses.slice(0, r.lektionen).map((c) => c.slug),
        demo: true,
      },
    };
  });
}
