# Lessonlark

**A clickable concept prototype of an edtech startup website.** Lessonlark is a fictional brand. The site adapts to three audiences with one switch (students & parents, working professionals, schools) and covers the full path from first visit to a personalized dashboard.

**Live:** https://kaufmeinewebsite.de/lessonlark/

## What's inside

- **Key pages:** home, course catalog with filters and search, course pages, pricing with a monthly/yearly toggle, about, contact, and "book a demo" for schools
- **Audience switch:** copy, accent color, illustrations, courses, pricing and dashboard change per audience; the switch keeps you on the same kind of page
- **Course finder:** four questions and a recommendation that explains why
- **Trial lesson:** concept card, flashcard and two questions with instant feedback on every course page
- **Sign-up → onboarding → dashboard:** three onboarding questions personalize the dashboard (learner view, or a teacher view for schools)
- **Demo accounts:** on the log-in tab, three fictional accounts per audience open a filled-in dashboard with one click, no sign-up
- **Light and dark mode** from color tokens, respects the system setting and remembers your choice
- **Honest by design:** placeholder quotes, numbers and people carry a visible "Sample" label, and nothing you type leaves the browser

## Stack

Next.js 16 (App Router, static export) · React 19 · TypeScript · Tailwind CSS 4. No backend, no third-party requests, self-hosted fonts.

```bash
npm install
npm run dev        # http://127.0.0.1:3197/lessonlark/
npm run build      # static export to out/
npm run preview    # serves out/ with the production headers on :3198
```

## Quality checks

| Script | What it checks |
|---|---|
| `scripts/pruef/schau.mjs` | every page in Chromium (3 widths, light/dark) and WebKit: console errors, horizontal scroll, axe WCAG 2.1 AA, third-party requests |
| `scripts/pruef/ablauf.mjs` | user journeys: quiz → lesson → sign-up → onboarding → dashboard, audience switch, theme, pricing toggle, forms send nothing |
| `scripts/pruef/links.mjs` | every internal link and image in the built HTML exists; every sample element carries its label |

## Project layout

```
src/content/      typed content per audience (students.ts, professionals.ts, schools.ts)
src/app/          routes: /[audience]/{courses,find-your-course,pricing,about,contact,signup,welcome,dashboard}
src/components/   UI, client components only where interaction needs them
scripts/          image pipeline (AVIF/WebP) and checks
```

Illustrations were generated with AI and processed into responsive AVIF/WebP. Concept and code: Darius Hofman. MIT license.
