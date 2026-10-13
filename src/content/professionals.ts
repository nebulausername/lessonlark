import type { AudienceContent } from './typen';

export const professionals: AudienceContent = {
  key: 'professionals',
  label: 'Professionals',
  shortLabel: 'Professionals',
  coursesWord: 'Courses',
  metaDescription:
    'Lessonlark helps working professionals build practical data, design and product skills in 3 to 6 hours a week, with short lessons and portfolio projects.',

  hero: {
    eyebrow: 'For working professionals',
    titleStart: 'Learn skills that fit the',
    accentWord: 'hours',
    titleEnd: 'you actually have.',
    lead: 'Short lessons, real projects and a weekly plan that works around a full-time job. Build practical skills in data, design and product in 3 to 6 hours a week.',
    primaryCta: 'Try a free lesson',
    secondaryCta: 'Find my course',
    note: 'Fits a full calendar',
    progressCard: {
      label: 'Continue learning',
      lessonTitle: 'Spotting a trend',
      percent: 72,
      streakDays: 12,
    },
  },

  stats: [
    { sample: true, value: '35 min', label: 'average daily study time' },
    { sample: true, value: '4.7 / 5', label: 'average lesson rating' },
    { sample: true, value: '6 weeks', label: 'typical time to finish a first course' },
  ],

  benefits: [
    {
      icon: 'clock',
      title: 'Lessons sized for real life',
      text: 'Most lessons run 10 to 25 minutes, so you can learn on a commute, at lunch or after the kids are in bed.',
    },
    {
      icon: 'target',
      title: 'Projects for your portfolio',
      text: 'Every course ends with a project you can show to a manager or a hiring team, built on realistic work.',
    },
    {
      icon: 'spark',
      title: 'Adaptive review',
      text: 'Smart practice brings back the ideas you are about to forget and skips what you already know.',
    },
    {
      icon: 'users',
      title: 'Live sessions with working instructors',
      text: 'Bring your questions to a weekly group session and get feedback on your own work.',
    },
  ],

  steps: [
    {
      title: 'Tell us your goal',
      text: 'Answer four quick questions. We suggest a course and a weekly plan that fits your calendar.',
    },
    {
      title: 'Learn in short sessions',
      text: 'Work through short lessons, flashcards and quizzes, plus a live session each week when you want company.',
    },
    {
      title: 'Finish with something to show',
      text: 'Complete a project, get written feedback and earn a certificate of completion.',
    },
  ],

  testimonials: [
    {
      sample: true,
      quote:
        'I only had about 40 minutes most evenings. The short lessons and the weekly plan meant I actually finished a course for once.',
      name: 'Dana K.',
      role: 'Operations lead, switched to analytics',
    },
    {
      sample: true,
      quote:
        'The critique sessions were what I valued most. I got specific feedback on my wireframes, and it changed how I explain my design choices.',
      name: 'Marcus T.',
      role: 'Marketing manager, learning UX',
    },
    {
      sample: true,
      quote:
        'The problem statement exercise changed how I read feature requests. I now ask who is stuck and why before I ask what to build.',
      name: 'Priya S.',
      role: 'Customer success manager, moving toward product',
    },
  ],

  finalCta: {
    title: 'Your next skill fits in 15 minutes',
    text: 'Try a free mini lesson right now. No credit card needed, and you can stop whenever your day calls.',
    cta: 'Try a free lesson',
  },

  courses: [
    {
      slug: 'data-analysis-foundations',
      title: 'Data Analysis Foundations',
      tagline: 'Turn messy spreadsheets into clear answers you can explain.',
      topic: 'Data',
      level: 'Beginner',
      durationWeeks: 6,
      hoursPerWeek: 4,
      lessons: 30,
      format: 'Self-paced + weekly live session',
      priceNote: 'Included in Pro and Teams',
      imagePrompt:
        'a small bar chart sculpture made of wooden blocks, a brass magnifying glass and a stack of colorful sticky notes on a desk',
      outcomes: [
        'Turn a vague request into a question that data can answer',
        'Clean and check a messy spreadsheet before you trust it',
        'Summarize data with averages, medians and grouped tables',
        'Present one clear chart and a one-page summary of your findings',
      ],
      modules: [
        {
          title: 'Ask a good question',
          lessons: 4,
          summary: 'Turn a loose request into a specific question, and decide what data would answer it.',
        },
        {
          title: 'Collect and clean',
          lessons: 7,
          summary: 'Spot duplicates, gaps and inconsistent entries in spreadsheets, and fix them safely.',
        },
        {
          title: 'Summarize with confidence',
          lessons: 7,
          summary: 'Use averages, medians, spread and grouped summaries, and know when each one misleads.',
        },
        {
          title: 'Find patterns',
          lessons: 6,
          summary: 'Compare groups, read trends over time and tell correlation apart from cause.',
        },
        {
          title: 'Tell the story',
          lessons: 6,
          summary: 'Choose the right chart, write a short summary and finish your portfolio project.',
        },
      ],
      instructor: {
        sample: true,
        name: 'Jordan Ellis',
        title: 'Senior data analyst, 9 years in industry',
        bio: 'Jordan has spent nine years turning messy business data into decisions. He teaches the habits he wishes he had learned first: check the data, then trust it.',
      },
      trial: {
        title: 'When the average misleads',
        minutes: 5,
        intro: {
          heading: 'The average is not always typical',
          body: 'The mean adds up every value and divides by the count. It is useful, but one extreme value can drag it far from what most people experience. The median is the middle value once the numbers are sorted, so a single outlier barely moves it. Before you report an average, glance at the spread and ask which number describes a typical case.',
          keyIdea:
            'When a few extreme values stretch the data, the median usually describes a typical case better than the mean.',
        },
        flashcard: {
          front: 'What is the median?',
          back: 'The middle value after you sort the numbers. Half the values fall below it and half fall above it.',
        },
        questions: [
          {
            prompt: 'Five support tickets were answered in 4, 5, 6, 7 and 98 minutes. What is the median wait?',
            options: ['4 minutes', '6 minutes', '24 minutes', '98 minutes'],
            correct: 1,
            explanation:
              'Sorted, the middle of five values is the third one: 6. The mean is 24 minutes, pulled up by the single 98-minute outlier.',
          },
          {
            prompt:
              'Most orders in a shop are under $40, but a few bulk orders are very large. Which number better describes a typical order?',
            options: [
              'The largest order',
              'The total of all orders',
              'The mean order value',
              'The median order value',
            ],
            correct: 3,
            explanation:
              'The bulk orders pull the mean upward. The median stays close to what most customers spend, so it is the better summary of a typical order.',
          },
        ],
      },
    },
    {
      slug: 'ux-design-essentials',
      title: 'UX Design Essentials',
      tagline: 'Design simple, usable screens, and show your thinking.',
      topic: 'Design',
      level: 'Beginner',
      durationWeeks: 8,
      hoursPerWeek: 5,
      lessons: 40,
      format: 'Self-paced + weekly critique session',
      priceNote: 'Included in Pro and Teams',
      imagePrompt:
        'paper wireframe sketches, a sharpened pencil, a ruler and a few rounded paper buttons arranged on a pale desk surface',
      outcomes: [
        'Plan and run short conversations with the people you design for',
        'Sketch a user flow and turn it into a clear wireframe',
        'Use type, spacing and contrast so screens are easy to read',
        'Test a design with five people and write up what you learned',
      ],
      modules: [
        {
          title: 'Understand people',
          lessons: 8,
          summary: 'Plan interviews, ask open questions and capture what people really need.',
        },
        {
          title: 'Define the problem',
          lessons: 7,
          summary: 'Map a journey, find the pain points and write a problem statement the team can share.',
        },
        {
          title: 'Sketch and structure',
          lessons: 9,
          summary: 'Draw user flows and wireframes, and use layout and hierarchy to guide the eye.',
        },
        {
          title: 'Design for clarity',
          lessons: 9,
          summary: 'Choose type, color and components, with accessibility basics built in from the start.',
        },
        {
          title: 'Test and share',
          lessons: 7,
          summary: 'Run a usability test, improve the design and present a short case study.',
        },
      ],
      instructor: {
        sample: true,
        name: 'Nadia Brooks',
        title: 'Lead UX designer, 11 years in product teams',
        bio: 'Nadia has led design for web and mobile products for eleven years. She is known for honest, specific critique that makes your next draft better.',
      },
      trial: {
        title: 'Make text easy to read',
        minutes: 5,
        intro: {
          heading: 'Contrast does the quiet work',
          body: 'Text only works if people can read it. Contrast is the difference in brightness between text and its background. Accessibility guidelines ask for a ratio of at least 4.5 to 1 for normal-size text. Light gray on white often fails. And never use color alone to carry meaning: pair it with an icon or a short word. Both habits help everyone.',
          keyIdea: 'Aim for at least 4.5-to-1 contrast for normal text, and never let color be the only signal.',
        },
        flashcard: {
          front: 'Minimum contrast ratio for normal-size text',
          back: '4.5 to 1. Large text can go down to 3 to 1.',
        },
        questions: [
          {
            prompt: 'What is the commonly recommended minimum contrast ratio for normal-size body text?',
            options: ['1.5 to 1', '3 to 1', '4.5 to 1', '10 to 1'],
            correct: 2,
            explanation:
              'Accessibility guidelines set 4.5 to 1 as the minimum for normal-size text. The 3-to-1 figure applies only to large text.',
          },
          {
            prompt: 'A form marks errors only by turning the field border red. What is the best fix?',
            options: [
              'Use a brighter red',
              'Add an icon and a short message next to the field',
              'Use green for fields that are fine',
              'Make the border dotted',
            ],
            correct: 1,
            explanation:
              'People who cannot tell certain colors apart may miss a red border. An icon and a message say what is wrong without relying on color.',
          },
        ],
      },
    },
    {
      slug: 'product-management-fundamentals',
      title: 'Product Management Fundamentals',
      tagline: 'Learn how to choose what to build, and why.',
      topic: 'Business',
      level: 'Intermediate',
      durationWeeks: 8,
      hoursPerWeek: 4,
      lessons: 32,
      format: 'Self-paced + weekly live session',
      priceNote: 'Included in Pro and Teams',
      imagePrompt:
        'a small wooden compass, index cards laid out in a neat grid and a tiny paper flag on a pin, on a light desk',
      outcomes: [
        'Write a clear problem statement before you propose a solution',
        'Weigh options by impact, effort and evidence, and explain your choice',
        'Write a one-page brief that engineers and designers can act on',
        'Pick a few simple measures to learn whether a change worked',
      ],
      modules: [
        {
          title: 'What product managers do',
          lessons: 5,
          summary: 'See how the role works day to day, and where it overlaps with design and engineering.',
        },
        {
          title: 'Find the real problem',
          lessons: 7,
          summary: 'Talk to customers, read the evidence and write problem statements that hold up.',
        },
        {
          title: 'Decide what to build',
          lessons: 7,
          summary: 'Compare options by impact and effort, say no kindly and plan a simple roadmap.',
        },
        {
          title: 'Work with a team',
          lessons: 6,
          summary: 'Write briefs, run short planning meetings and keep stakeholders informed.',
        },
        {
          title: 'Measure and learn',
          lessons: 7,
          summary: 'Choose a few measures, read early results honestly and decide what to do next.',
        },
      ],
      instructor: {
        sample: true,
        name: 'Tom Reyes',
        title: 'Group product manager, 12 years in software',
        bio: 'Tom has managed products and product managers for twelve years. He teaches decision-making with real trade-offs, not perfect frameworks.',
      },
      trial: {
        title: 'Start with the problem',
        minutes: 5,
        intro: {
          heading: 'Problems first, solutions second',
          body: 'Requests often arrive as solutions: "add a button" or "build an app." A solution is only one way to fix something. A good problem statement names who is stuck, what they are trying to do, what gets in the way, and how you know. Two sentences are enough. Write that first, and you can compare several solutions fairly.',
          keyIdea: 'Name who is stuck, what gets in their way and how you know, before you pick a solution.',
        },
        flashcard: {
          front: 'Problem statement',
          back: 'One or two sentences naming who is stuck, what they are trying to do, what gets in the way and how you know.',
        },
        questions: [
          {
            prompt: 'Which of these is a problem statement rather than a solution?',
            options: [
              'Add a dark mode toggle',
              'Build a mobile app',
              'New users abandon setup at step 3 because it asks for information they do not have yet',
              'Redesign the dashboard',
            ],
            correct: 2,
            explanation:
              'It names who is affected, where they get stuck and why. The other three jump straight to a solution.',
          },
          {
            prompt: 'Why write the problem down before choosing a solution?',
            options: [
              'It lets you compare several possible solutions fairly',
              'It makes the project plan longer',
              'It removes the need to talk to users',
              'It guarantees your first idea is right',
            ],
            correct: 0,
            explanation:
              'With the problem clear, you can weigh several options against the same need. It does not replace talking to users, and no method guarantees the first idea works.',
          },
        ],
      },
    },
    {
      slug: 'confident-presenting',
      title: 'Confident Presenting',
      tagline: 'Say what matters, clearly, in any room.',
      topic: 'Business',
      level: 'Intermediate',
      durationWeeks: 4,
      hoursPerWeek: 3,
      lessons: 16,
      format: 'Self-paced + live practice rounds',
      priceNote: 'Included in Pro and Teams',
      imagePrompt:
        'a vintage desk microphone, a glass of water and a stack of blank index cards beside a small wooden lectern',
      outcomes: [
        'Open with your main point and structure a message people can follow',
        'Build simple slides that support what you say',
        'Use pauses, pace and eye contact to sound calm and clear',
        'Handle questions and nerves with a few reliable habits',
      ],
      modules: [
        {
          title: 'Know your audience',
          lessons: 3,
          summary: 'Work out what your listeners know, what they need and what they will do with it.',
        },
        {
          title: 'Structure your message',
          lessons: 4,
          summary: 'Lead with the point, support it with up to three reasons and close with a clear ask.',
        },
        {
          title: 'Slides that support you',
          lessons: 3,
          summary: 'Cut the clutter so each slide makes one point and you stay the focus.',
        },
        {
          title: 'Voice, pace and presence',
          lessons: 3,
          summary: 'Practice pausing, pacing and posture, on camera and in a live practice round.',
        },
        {
          title: 'Handle questions and nerves',
          lessons: 3,
          summary: 'Prepare for hard questions, keep your footing and recover from a stumble.',
        },
      ],
      instructor: {
        sample: true,
        name: 'Helen Marsh',
        title: 'Communication coach and former team lead, 10 years coaching',
        bio: 'Helen led teams for years before she started coaching people to speak up at work. Her practice rounds are small, kind and very specific.',
      },
      trial: {
        title: 'Lead with your point',
        minutes: 4,
        intro: {
          heading: 'Answer first, details second',
          body: 'Most listeners are juggling something else. Give them your point first, then the reasons. A simple shape works almost anywhere: state your main point, give up to three reasons, then repeat the point. And when you need a moment to think, pause. A quiet beat sounds calm to your audience, even when it feels long to you.',
          keyIdea: 'Say your point first, support it with up to three reasons, and pause instead of filling the silence.',
        },
        flashcard: {
          front: 'A simple structure for any update',
          back: 'Point, up to three reasons, point again.',
        },
        questions: [
          {
            prompt: 'You have two minutes to update your team. What should you say first?',
            options: [
              'The full background and timeline',
              'Your main point or request',
              'An apology for having so little time',
              'A list of every task you completed',
            ],
            correct: 1,
            explanation:
              'Leading with the point tells people what to listen for. The details land better once they know where you are headed.',
          },
          {
            prompt: 'What is a better move than saying "um" when you need a moment to think?',
            options: ['Speak faster', 'Raise your volume', 'Repeat your last sentence', 'Pause quietly'],
            correct: 3,
            explanation:
              'A short pause sounds deliberate to listeners, and it gives you time to find your next thought.',
          },
        ],
      },
    },
  ],

  quiz: {
    title: 'Find your first course',
    lead: 'Four quick questions. We will suggest a course and tell you why it fits.',
    questions: [
      {
        id: 'goal',
        prompt: 'What do you most want to get better at?',
        help: 'Pick the one that matters most right now.',
        options: [
          {
            label: 'Working with numbers and data',
            hint: 'Reports, spreadsheets, finding answers',
            reason: 'You want to work with numbers and find answers in data',
            scores: { 'data-analysis-foundations': 3, 'product-management-fundamentals': 1 },
          },
          {
            label: 'Designing things people find easy to use',
            hint: 'Screens, flows, friendly products',
            reason: 'You want to design things people find easy to use',
            scores: { 'ux-design-essentials': 3, 'product-management-fundamentals': 1 },
          },
          {
            label: 'Deciding what gets built, and why',
            hint: 'Priorities, trade-offs, working with a team',
            reason: 'You want to help decide what gets built, and why',
            scores: {
              'product-management-fundamentals': 3,
              'ux-design-essentials': 1,
              'data-analysis-foundations': 1,
            },
          },
          {
            label: 'Speaking up with clarity',
            hint: 'Meetings, updates, pitches',
            reason: 'You want to speak up with clarity and calm',
            scores: { 'confident-presenting': 3 },
          },
        ],
      },
      {
        id: 'experience',
        prompt: 'How would you describe your experience?',
        help: 'There is no wrong answer. This helps us pick the right starting level.',
        options: [
          {
            label: 'Mostly new to it',
            hint: 'I would like to start with the basics',
            reason: 'You are starting fresh, so a beginner-friendly course fits',
            scores: { 'data-analysis-foundations': 2, 'ux-design-essentials': 2 },
          },
          {
            label: 'I have picked up a little on the job',
            hint: 'I know some of the words and tools',
            reason: 'You already know some of the vocabulary from work',
            scores: {
              'confident-presenting': 2,
              'data-analysis-foundations': 1,
              'ux-design-essentials': 1,
              'product-management-fundamentals': 1,
            },
          },
          {
            label: 'I work with customers or users',
            hint: 'I hear their problems first-hand',
            reason: 'You see customer problems up close',
            scores: { 'ux-design-essentials': 2, 'product-management-fundamentals': 2 },
          },
          {
            label: 'I already coordinate projects or people',
            hint: 'I plan, prioritize and keep things moving',
            reason: 'You already coordinate work across people',
            scores: { 'product-management-fundamentals': 2, 'confident-presenting': 1 },
          },
        ],
      },
      {
        id: 'style',
        prompt: 'How do you like to learn?',
        help: 'All courses mix lessons, practice and a project. This sets the emphasis.',
        options: [
          {
            label: 'Hands-on with real data',
            hint: 'Open a file and start working',
            reason: 'You learn best by working with real examples',
            scores: { 'data-analysis-foundations': 2, 'ux-design-essentials': 1 },
          },
          {
            label: 'Sketching, making and getting critique',
            hint: 'Draft something, then improve it',
            reason: 'You like to make things and get specific feedback',
            scores: { 'ux-design-essentials': 2, 'confident-presenting': 1 },
          },
          {
            label: 'Case studies and decisions',
            hint: 'Weigh the options and choose',
            reason: 'You like working through real decisions and trade-offs',
            scores: { 'product-management-fundamentals': 2, 'data-analysis-foundations': 1 },
          },
          {
            label: 'Practicing out loud with feedback',
            hint: 'Try it, get notes, try again',
            reason: 'You want to practice out loud and get feedback',
            scores: { 'confident-presenting': 3 },
          },
        ],
      },
      {
        id: 'time',
        prompt: 'How much time can you give each week?',
        help: 'Most people in this group study 3 to 6 hours.',
        options: [
          {
            label: 'About 3 hours',
            hint: 'A short, focused course',
            reason: 'About 3 hours a week suits a short, focused course',
            scores: { 'confident-presenting': 2, 'data-analysis-foundations': 1 },
          },
          {
            label: 'About 4 hours',
            hint: 'A steady weekly rhythm',
            reason: 'About 4 hours a week is a steady, comfortable pace',
            scores: { 'data-analysis-foundations': 2, 'product-management-fundamentals': 2 },
          },
          {
            label: 'About 5 hours',
            hint: 'Room for hands-on practice',
            reason: 'About 5 hours a week leaves room for hands-on practice',
            scores: { 'ux-design-essentials': 2, 'product-management-fundamentals': 1 },
          },
          {
            label: '6 hours or more',
            hint: 'Space for projects and live sessions',
            reason: 'You can give 6 hours or more, enough for a project-heavy course',
            scores: { 'ux-design-essentials': 2, 'data-analysis-foundations': 1 },
          },
        ],
      },
    ],
  },

  pricing: {
    title: 'Simple plans for busy schedules',
    lead: 'Start free. Upgrade when you want full courses, live sessions and feedback on your projects.',
    yearlyNote: 'Save about 25% with yearly billing',
    plans: [
      {
        id: 'starter',
        name: 'Starter',
        tagline: 'Try the lessons before you commit',
        monthly: 0,
        yearlyPerMonth: 0,
        unit: '/month',
        cta: 'Start free',
        features: [
          'A free mini lesson in every course',
          'Flashcards and quick quizzes',
          'The course-matching quiz',
          'A weekly study planner',
        ],
      },
      {
        id: 'pro',
        name: 'Pro',
        tagline: 'Everything you need to finish a course',
        monthly: 29,
        yearlyPerMonth: 22,
        unit: '/month',
        cta: 'Start Pro',
        highlight: true,
        features: [
          'Full access to all four courses',
          'Weekly live sessions with instructors',
          'Portfolio projects with written feedback',
          'Adaptive review that follows your progress',
          'Certificate of completion for each course',
          'Downloadable invoices for reimbursement',
        ],
      },
      {
        id: 'teams',
        name: 'Teams',
        tagline: 'Learn together at work, from 3 seats',
        monthly: 25,
        yearlyPerMonth: 19,
        unit: 'per seat / month',
        cta: 'Set up a team',
        features: [
          'Everything in Pro',
          'Team progress overview',
          'Shared learning goals',
          'One invoice for the whole team',
          'Minimum 3 seats',
        ],
      },
    ],
    guarantee:
      'If Pro is not right for you, cancel within 14 days of your first payment and we will refund it.',
  },

  faq: [
    {
      q: 'How much time do I need each week?',
      a: 'Plan for 3 to 6 hours a week. Lessons run about 10 to 25 minutes, so they fit into a commute, a lunch break or an evening. Courses last 4 to 8 weeks, and you can pause when work gets busy.',
    },
    {
      q: 'Do I get a certificate?',
      a: 'Yes. You earn a certificate of completion for each course once you finish the lessons and the final project. It shows what you studied. It is not an accredited qualification or a degree.',
    },
    {
      q: 'Can my employer reimburse the cost?',
      a: 'Many employers do. Pro and Teams plans include downloadable invoices you can attach to an expense or reimbursement request, and Teams can be billed on a single invoice.',
    },
    {
      q: 'Is this beginner-friendly?',
      a: 'Yes. Data Analysis Foundations and UX Design Essentials start from zero. The other two courses assume some work experience. Every course page lists its level, and the free mini lessons let you check the pace first.',
    },
    {
      q: 'Can I cancel any time?',
      a: 'Yes. Cancel from your account settings and you keep access until the end of the period you have paid for. Within 14 days of your first payment, you can also ask for a refund.',
    },
    {
      q: 'Are the live sessions required?',
      a: 'No. Each course has a weekly live session of about 45 minutes, but you can skip any of them. Sessions are recorded, so you can catch up when work gets in the way.',
    },
  ],

  aboutLine:
    'Lessonlark helps working adults build practical skills in the hours they actually have, with short lessons, real projects and a plan that bends around a busy week.',

  contact: {
    mode: 'contact',
    title: 'Questions before you start?',
    lead: 'Ask about courses, billing or team plans. A member of our team will write back.',
    topics: [
      'Choosing the right course',
      'Employer reimbursement or invoices',
      'Teams and group plans',
      'Something else',
    ],
    responseNote: 'We usually reply within one business day.',
  },

  signup: {
    title: 'Create your free account',
    lead: 'Save your progress, plan your week and pick up where you left off.',
    perks: [
      'A free mini lesson in every course',
      'A weekly plan that fits your calendar',
      'No credit card needed to start',
    ],
  },

  onboarding: [
    {
      key: 'goal',
      question: 'What brings you here?',
      help: 'This shapes the plan we suggest. You can change it later.',
      options: [
        { value: 'switch', label: 'Switch careers', hint: 'Explore a new field with a clear first step' },
        { value: 'grow', label: 'Grow in my current role', hint: 'Add a skill my job is asking for' },
        { value: 'portfolio', label: 'Build a portfolio project', hint: 'Finish something I can show' },
        { value: 'explore', label: 'Explore what interests me', hint: 'Try a topic before committing' },
      ],
    },
    {
      key: 'level',
      question: 'How much experience do you have?',
      help: 'We will start you at the right level.',
      options: [
        { value: 'new', label: 'I am new to this', hint: 'Start with the basics' },
        { value: 'some', label: 'I know a little', hint: 'Skip the very first steps' },
        { value: 'confident', label: 'I use it at work', hint: 'Go deeper on practice and projects' },
      ],
    },
    {
      key: 'time',
      question: 'How much time can you give each week?',
      help: 'Be realistic. A smaller plan you keep beats a big one you drop.',
      options: [
        { value: '3', label: 'About 3 hours', hint: 'A lesson or two on a few days' },
        { value: '4-5', label: '4 to 5 hours', hint: 'A steady weekly rhythm' },
        { value: '6', label: '6 hours or more', hint: 'Room for projects and live sessions' },
      ],
    },
  ],

  dashboard: {
    view: 'learner',
    fallbackName: 'Alex',
    nextLesson: {
      course: 'Data Analysis Foundations',
      title: 'Spotting a trend',
      minutes: 15,
    },
    weekPlan: [
      { day: 'Mon', item: 'Lesson: Comparing two groups (15 min)', done: true },
      { day: 'Tue', item: 'Flashcards and quick quiz (10 min)', done: true },
      { day: 'Wed', item: 'Lesson: Spotting a trend (15 min)', done: false },
      { day: 'Thu', item: 'Live session: bring your questions (45 min)', done: false },
      { day: 'Fri', item: 'Project step: chart your findings (40 min)', done: false },
    ],
    achievements: [
      { title: '12-day streak', text: 'You have studied 12 days in a row.' },
      { title: 'First project started', text: 'You opened your first portfolio project.' },
      { title: 'Review streak', text: 'You answered 10 review cards correctly in a row.' },
    ],
  },
};
