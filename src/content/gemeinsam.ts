import type { SamplePerson } from './typen';

/** Inhalte, die für alle Zielgruppen gleich sind (Marke, Über uns, Rechtliches). */

export const MARKE = {
  name: 'Lessonlark',
  claim: 'Learning that sings.',
  autor: 'Darius Hofman',
  /** Impressum/Datenschutz liegen auf der Seite, die den Prototyp beherbergt. */
  imprint: 'https://kaufmeinewebsite.de/en/legal#impressum',
  privacy: 'https://kaufmeinewebsite.de/en/legal#datenschutz',
} as const;

export const ABOUT = {
  title: 'We think learning should feel like progress, not pressure.',
  lead:
    'Lessonlark started with a simple observation: people stick with learning when every session ends with a small, visible win. So we build short lessons, honest feedback and a clear path forward — for kids, for working adults and for the schools that teach them.',
  mission: {
    heading: 'Our mission',
    text: 'Make steady, joyful progress possible for every learner, in ten focused minutes or a full class period.',
  },
  values: [
    { icon: 'target', title: 'Small wins, daily', text: 'Every lesson ends with something you can do that you could not do before.' },
    { icon: 'heart', title: 'Kind feedback', text: 'Mistakes are explained, never punished. Encouragement is part of the design.' },
    { icon: 'shield', title: 'Your data stays yours', text: 'No ads, no selling of learner data, and export or delete it any time.' },
    { icon: 'users', title: 'Built with teachers', text: 'Classroom teachers review every lesson before it goes live.' },
  ] as const,
  timeline: [
    { year: '2023', text: 'First prototype tested with two families and one classroom.' },
    { year: '2024', text: 'Launched short daily lessons for math and reading.' },
    { year: '2025', text: 'Added career courses for working adults.' },
    { year: '2026', text: 'Opened school plans with a free classroom pilot.' },
  ],
  team: [
    { sample: true, name: 'Priya N.', title: 'Co-founder & CEO', bio: 'Former middle-school teacher who wanted homework to feel less lonely.' },
    { sample: true, name: 'Jonas W.', title: 'Co-founder & CTO', bio: 'Builds the learning engine and obsesses over fast, accessible pages.' },
    { sample: true, name: 'Amara O.', title: 'Head of Learning Design', bio: 'Turns big topics into ten-minute lessons that actually stick.' },
    { sample: true, name: 'Luis M.', title: 'School Partnerships', bio: 'Helps schools run pilots that teachers are glad to keep.' },
  ] satisfies SamplePerson[],
};
