/**
 * Inhaltsmodell von Lessonlark. Jede Zielgruppe liefert EIN Objekt vom Typ
 * `AudienceContent` (src/content/<zielgruppe>.ts). Die Seiten lesen nur dieses
 * Modell, sie kennen keine Zielgruppe beim Namen.
 *
 * Alles, was erfunden ist, um ein Layout echt wirken zu lassen (Zitate,
 * Kennzahlen, Personen), trägt `sample: true`. Die Komponenten setzen dann
 * zwingend das Etikett „Sample“ daneben; ohne das Feld passt der Wert nicht
 * in den Typ.
 */

export const AUDIENCES = ['students', 'professionals', 'schools'] as const;
export type AudienceKey = (typeof AUDIENCES)[number];

export type IconName =
  | 'spark'
  | 'clock'
  | 'chart'
  | 'shield'
  | 'users'
  | 'path'
  | 'chat'
  | 'trophy'
  | 'book'
  | 'heart'
  | 'target'
  | 'calendar';

export type Level = 'Beginner' | 'Intermediate' | 'Advanced';

export interface SampleStat {
  sample: true;
  value: string; // "12k+"
  label: string; // "learners this year"
}

export interface SampleQuote {
  sample: true;
  quote: string;
  name: string; // fictional first name + last initial, e.g. "Maya R."
  role: string; // "Parent of a 7th grader"
}

export interface SamplePerson {
  sample: true;
  name: string;
  title: string;
  bio: string;
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  help: string;
  options: {
    label: string;
    hint?: string;
    /** Sentence shown on the result screen when this option was picked ("You want …"). */
    reason: string;
    /** Points per course slug of THIS audience. Missing slug = 0. */
    scores: Record<string, number>;
  }[];
}

export interface TrialLesson {
  title: string;
  minutes: number;
  intro: { heading: string; body: string; keyIdea: string };
  flashcard: { front: string; back: string };
  /** Exactly two questions, each with 3 or 4 options. */
  questions: { prompt: string; options: string[]; correct: number; explanation: string }[];
}

export interface Course {
  slug: string; // unique across ALL audiences, kebab-case
  title: string;
  tagline: string; // one line, max ~70 chars
  topic: string; // filter facet, 3 distinct topics per audience
  level: Level;
  durationWeeks: number;
  hoursPerWeek: number;
  lessons: number;
  format: string; // "Self-paced + weekly live session"
  priceNote: string; // "Included in Plus"
  /** Object-only still life for the cover illustration (no people, no text). */
  imagePrompt: string;
  outcomes: string[]; // exactly 4
  modules: { title: string; lessons: number; summary: string }[]; // exactly 5
  instructor: SamplePerson;
  trial: TrialLesson;
}

export interface Plan {
  id: string;
  name: string;
  tagline: string;
  /** Price per month when billed monthly. null = custom quote. */
  monthly: number | null;
  /** Price per month when billed yearly. null = custom quote. */
  yearlyPerMonth: number | null;
  unit: string; // "/month" or "per student / month"
  cta: string;
  highlight?: boolean;
  features: string[]; // 4 to 6
}

export interface OnboardingStep {
  key: 'goal' | 'level' | 'time';
  question: string;
  help: string;
  options: { value: string; label: string; hint: string }[]; // 3 or 4
}

export interface AudienceContent {
  key: AudienceKey;
  label: string; // "Students & parents"
  shortLabel: string; // "Students"
  /** Word used for courses in this audience: "Courses" or "Programs". */
  coursesWord: string;
  metaDescription: string;
  hero: {
    eyebrow: string;
    titleStart: string;
    accentWord: string; // the one word that gets the hand-drawn underline
    titleEnd: string;
    lead: string;
    primaryCta: string;
    secondaryCta: string;
    note: string; // handwritten margin note, max 4 words
    progressCard: { label: string; lessonTitle: string; percent: number; streakDays: number };
  };
  stats: SampleStat[]; // exactly 3
  benefits: { icon: IconName; title: string; text: string }[]; // exactly 4
  steps: { title: string; text: string }[]; // exactly 3
  testimonials: SampleQuote[]; // exactly 3
  finalCta: { title: string; text: string; cta: string };
  courses: Course[]; // exactly 4
  quiz: { title: string; lead: string; questions: QuizQuestion[] }; // exactly 4 questions
  pricing: { title: string; lead: string; yearlyNote: string; plans: Plan[]; guarantee: string }; // exactly 3 plans
  faq: { q: string; a: string }[]; // exactly 6
  aboutLine: string; // one sentence: what Lessonlark means for this audience
  contact: {
    mode: 'contact' | 'demo';
    title: string;
    lead: string;
    topics: string[]; // 4
    responseNote: string;
  };
  signup: { title: string; lead: string; perks: string[] }; // 3 perks
  onboarding: OnboardingStep[]; // exactly 3: goal, level, time
  dashboard: {
    view: 'learner' | 'teacher';
    fallbackName: string;
    nextLesson: { course: string; title: string; minutes: number };
    weekPlan: { day: string; item: string; done: boolean }[]; // exactly 5 (Mon–Fri)
    achievements: { title: string; text: string }[]; // exactly 3
    /** Only for view 'teacher'. */
    classes?: { name: string; students: number; progress: number; needsHelp: number }[];
    assignments?: { title: string; due: string; submitted: number; total: number }[];
  };
}
