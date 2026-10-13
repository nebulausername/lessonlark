import type { AudienceContent } from './typen';

/**
 * Students & parents: kids in grades 3–12 learn, parents choose and pay.
 * Quiz scores are keyed by the four course slugs below:
 *   fractions-made-friendly, equation-detectives, paragraph-power-workshop, young-coders-lab
 */
export const students: AudienceContent = {
  key: 'students',
  label: 'Students & parents',
  shortLabel: 'Students',
  coursesWord: 'Courses',
  metaDescription:
    'Lessonlark gives kids in grades 3–12 short math, writing and coding lessons, with adaptive practice and clear progress updates for parents.',

  hero: {
    eyebrow: 'For kids in grades 3–12 and the parents behind them',
    titleStart: 'Short lessons your kid will',
    accentWord: 'finish',
    titleEnd: 'and you can follow.',
    lead: "Lessonlark turns math, writing and coding into 15-minute lessons with smart practice that adjusts to your child. Kids get small wins. Parents get a clear weekly summary.",
    primaryCta: 'Try a free lesson',
    secondaryCta: 'Find the right course',
    note: 'no credit card needed',
    progressCard: {
      label: "Today's lesson",
      lessonTitle: 'Comparing and ordering fractions',
      percent: 72,
      streakDays: 5,
    },
  },

  stats: [
    { sample: true, value: '4.8/5', label: 'average lesson rating' },
    { sample: true, value: '15 min', label: 'typical lesson length' },
    { sample: true, value: '8k+', label: 'lessons finished each week' },
  ],

  benefits: [
    {
      icon: 'clock',
      title: 'Lessons that fit a real evening',
      text: 'Most lessons take 10 to 15 minutes. Easy to squeeze in after practice, before dinner or on the bus.',
    },
    {
      icon: 'spark',
      title: 'Practice that adapts',
      text: 'Smart practice gives a little more help where your child is stuck and moves on when they are ready.',
    },
    {
      icon: 'chart',
      title: 'Progress you can read',
      text: 'A weekly summary in plain words: what got done, what is going well and what needs another go.',
    },
    {
      icon: 'shield',
      title: 'A calm place to learn',
      text: 'No ads, no public profiles and no open chat. Just lessons, hints and a clear finish line.',
    },
  ],

  steps: [
    {
      title: 'Find a starting point',
      text: 'Take the one-minute quiz or pick a course yourself. We suggest a level, and you can change it any time.',
    },
    {
      title: 'Learn in short lessons',
      text: 'Each lesson is a quick idea, a few practice questions and a clear finish. No long videos to sit through.',
    },
    {
      title: 'Check in together',
      text: 'Kids see their streak and badges. Parents see what is going well and what could use another look.',
    },
  ],

  testimonials: [
    {
      sample: true,
      quote:
        'My daughter used to dread fractions. The lessons are short enough that she actually sits down, and I like seeing the weekly summary without having to ask.',
      name: 'Dana M.',
      role: 'Parent of a 4th grader',
    },
    {
      sample: true,
      quote:
        'The lessons are short, so I really finish them. The hint button helps me figure it out without just giving me the answer.',
      name: 'Jonah T.',
      role: '8th grader',
    },
    {
      sample: true,
      quote:
        'We tried the free plan first. It was easy to see which course fit my son, and switching to Plus took a minute.',
      name: 'Priya S.',
      role: 'Parent of a 6th grader',
    },
  ],

  finalCta: {
    title: 'Start with one free lesson',
    text: 'No credit card, no pressure. Pick a course, try a lesson together and see how it feels.',
    cta: 'Try a free lesson',
  },

  courses: [
    {
      slug: 'fractions-made-friendly',
      title: 'Fractions Made Friendly',
      tagline: 'Pizza slices, number lines and a lot less fear of fractions.',
      topic: 'Math',
      level: 'Beginner',
      durationWeeks: 6,
      hoursPerWeek: 1.5,
      lessons: 18,
      format: 'Self-paced lessons + a weekly practice set',
      priceNote: 'Included in Plus and Family',
      imagePrompt:
        'chunky wooden fraction pie pieces, a sharpened pencil and a small eraser arranged on a pale desk in soft morning light',
      outcomes: [
        'Explain what the top and bottom numbers of a fraction mean',
        'Place fractions on a number line',
        'Compare and order fractions with different denominators',
        'Add and subtract fractions that share a denominator',
      ],
      modules: [
        {
          title: 'Equal parts and fair shares',
          lessons: 4,
          summary: 'Split shapes and sets into equal parts and name the pieces.',
        },
        {
          title: 'Fractions on a number line',
          lessons: 4,
          summary: 'See that a fraction is a point between whole numbers.',
        },
        {
          title: 'Comparing and ordering',
          lessons: 3,
          summary: 'Decide which fraction is bigger and explain why.',
        },
        {
          title: 'Equivalent fractions',
          lessons: 4,
          summary: 'Discover that 1/2, 2/4 and 4/8 are the same amount.',
        },
        {
          title: 'Adding and subtracting like fractions',
          lessons: 3,
          summary: 'Combine and take away pieces of the same size.',
        },
      ],
      instructor: {
        sample: true,
        name: 'Ms. Elena Park',
        title: 'Math teacher, 11 years in the classroom',
        bio: 'Elena taught 3rd through 6th grade before designing lessons for Lessonlark. She loves turning big ideas into things kids can cut, fold and sort.',
      },
      trial: {
        title: 'Equal parts: what a fraction really says',
        minutes: 4,
        intro: {
          heading: 'A fraction is a fair share',
          body: 'Cut a pizza into 4 equal slices and eat 1. You ate one fourth, written 1/4. The bottom number, called the denominator, tells how many equal parts the whole has. The top number, called the numerator, tells how many of those parts you are talking about. The parts must be equal. If one slice is huge and three are tiny, they are not fourths.',
          keyIdea:
            'The bottom number counts the equal parts in the whole, and the top number counts the parts you have.',
        },
        flashcard: {
          front: 'In the fraction 3/8, what does the 8 tell you?',
          back: 'The whole is split into 8 equal parts. The 8 is the denominator.',
        },
        questions: [
          {
            prompt:
              'A chocolate bar is split into 6 equal pieces. You eat 2 of them. What fraction of the bar did you eat?',
            options: ['2/6', '6/2', '2/8', '4/6'],
            correct: 0,
            explanation:
              'You ate 2 of the 6 equal pieces, so the fraction is 2/6. The total number of pieces always goes on the bottom.',
          },
          {
            prompt: 'You have two pizzas that are exactly the same size. Which is more pizza: 1/2 of one, or 1/4 of the other?',
            options: ['1/2', '1/4', 'They are the same amount'],
            correct: 0,
            explanation:
              'Fewer cuts make bigger pieces. When the whole is the same size, a half is bigger than a fourth.',
          },
        ],
      },
    },
    {
      slug: 'equation-detectives',
      title: 'Equation Detectives',
      tagline: 'Crack the case of the mystery number, one clue at a time.',
      topic: 'Math',
      level: 'Advanced',
      durationWeeks: 8,
      hoursPerWeek: 2,
      lessons: 24,
      format: 'Self-paced lessons + a weekly mixed review',
      priceNote: 'Included in Plus and Family',
      imagePrompt:
        'a small brass balance scale holding wooden cubes on one side, with a magnifying glass and a pencil resting on graph paper',
      outcomes: [
        'Solve one-step and multi-step equations and check the answer',
        'Handle variables on both sides of an equation',
        'Turn a word problem into an equation',
        'Read slope and sketch a simple line graph',
      ],
      modules: [
        {
          title: 'Balance and the equals sign',
          lessons: 4,
          summary: 'Use a balance scale to see why both sides must stay equal.',
        },
        {
          title: 'Multi-step equations',
          lessons: 5,
          summary: 'Undo operations in the right order, then check the result.',
        },
        {
          title: 'Variables on both sides',
          lessons: 5,
          summary: 'Collect like terms and solve when x shows up twice.',
        },
        {
          title: 'Word problems into equations',
          lessons: 5,
          summary: 'Pick out the clues, name the unknown and write the equation.',
        },
        {
          title: 'Lines, slope and graphs',
          lessons: 5,
          summary: 'Connect equations to straight lines on a coordinate grid.',
        },
      ],
      instructor: {
        sample: true,
        name: 'Mr. Marcus Bell',
        title: 'Middle school math teacher, 9 years in the classroom',
        bio: 'Marcus teaches pre-algebra and Algebra 1, and he still keeps a real balance scale on his desk. He believes every wrong answer is a clue worth following.',
      },
      trial: {
        title: 'Mystery number: balance the scale',
        minutes: 4,
        intro: {
          heading: 'An equation is a balanced scale',
          body: 'An equation says two things are equal, like a scale that sits level. A letter such as x stands for a number we do not know yet. Take x + 5 = 12. To find x, take away 5 from both sides, so the scale stays balanced. That leaves x = 7. Now check: 7 + 5 is 12. It works.',
          keyIdea:
            'Do the same thing to both sides of an equation and it stays balanced.',
        },
        flashcard: {
          front: 'What does the equals sign (=) really mean?',
          back: 'Both sides have the same value, like the two sides of a balanced scale.',
        },
        questions: [
          {
            prompt: 'Solve: x + 6 = 15. What is x?',
            options: ['8', '9', '10', '21'],
            correct: 1,
            explanation:
              'Take away 6 from both sides: x = 15 − 6 = 9. Check it: 9 + 6 = 15, so it works.',
          },
          {
            prompt: 'Solve: 3x = 18. What is x?',
            options: ['6', '15', '21', '54'],
            correct: 0,
            explanation:
              'x is multiplied by 3, so divide both sides by 3: 18 ÷ 3 = 6. Check it: 3 × 6 = 18.',
          },
        ],
      },
    },
    {
      slug: 'paragraph-power-workshop',
      title: 'Paragraph Power Workshop',
      tagline: 'Turn scattered ideas into clear, confident paragraphs.',
      topic: 'Reading & Writing',
      level: 'Intermediate',
      durationWeeks: 6,
      hoursPerWeek: 2,
      lessons: 20,
      format: 'Self-paced lessons + a weekly writing prompt',
      priceNote: 'Included in Plus and Family',
      imagePrompt:
        'an open blank notebook, a fountain pen, colorful sticky notes and a small stack of index cards on a warm wooden table',
      outcomes: [
        'Find the main idea in a short text',
        'Write a clear topic sentence',
        'Support a point with details and examples',
        'Revise a draft to make it shorter and smoother',
      ],
      modules: [
        {
          title: 'Find the main idea',
          lessons: 4,
          summary: 'Read short passages and say what they are mostly about.',
        },
        {
          title: 'Topic sentences that lead the way',
          lessons: 4,
          summary: 'Open a paragraph with a sentence that points the reader forward.',
        },
        {
          title: 'Details, examples and evidence',
          lessons: 4,
          summary: 'Back up an idea with facts, reasons and short examples.',
        },
        {
          title: 'Smooth transitions',
          lessons: 4,
          summary: 'Link sentences so the paragraph reads like one thought.',
        },
        {
          title: 'Revise and polish',
          lessons: 4,
          summary: 'Cut extra words, fix mix-ups and read your work out loud.',
        },
      ],
      instructor: {
        sample: true,
        name: 'Ms. Priya Nair',
        title: 'English teacher, 8 years in the classroom',
        bio: 'Priya has taught writing to 5th through 9th graders and runs a lunchtime writing club. She is a big believer in the second draft.',
      },
      trial: {
        title: 'Topic sentences: start with the big idea',
        minutes: 4,
        intro: {
          heading: 'One paragraph, one big idea',
          body: 'A strong paragraph is about one main idea. The first sentence, called the topic sentence, tells the reader what that idea is. The sentences after it add details, examples or reasons. Think of a sandwich: the topic sentence is the top bun and the details are the filling. If a sentence does not support the main idea, it belongs somewhere else.',
          keyIdea:
            'A paragraph has one main idea, and the topic sentence announces it.',
        },
        flashcard: {
          front: 'What does a topic sentence do?',
          back: 'It tells the reader the main idea of the paragraph.',
        },
        questions: [
          {
            prompt:
              'Which sentence works best as a topic sentence for a paragraph about dogs as pets?',
            options: [
              'Dogs can be wonderful pets because they are loyal and playful.',
              'Biscuit is brown and white.',
              'Last Friday we went to the park.',
              'Cats sleep a lot.',
            ],
            correct: 0,
            explanation:
              'The first choice names a big idea that other sentences can explain. The others are small details or about something else.',
          },
          {
            prompt:
              'Read: "Recycling helps our town. It keeps trash out of landfills. It saves energy. My favorite color is green." Which sentence does not belong?',
            options: [
              'Recycling helps our town.',
              'It keeps trash out of landfills.',
              'It saves energy.',
              'My favorite color is green.',
            ],
            correct: 3,
            explanation:
              'Every other sentence is about how recycling helps. Your favorite color does not support the main idea, so it should come out.',
          },
        ],
      },
    },
    {
      slug: 'young-coders-lab',
      title: 'Young Coders Lab',
      tagline: 'Build your first games and animations with real beginner code.',
      topic: 'Coding',
      level: 'Beginner',
      durationWeeks: 8,
      hoursPerWeek: 1.5,
      lessons: 16,
      format: 'Self-paced lessons + a build project each module',
      priceNote: 'Included in Plus and Family',
      imagePrompt:
        'colorful interlocking building blocks, a small wooden toy robot, a notebook of hand-drawn flowchart boxes and a pencil',
      outcomes: [
        'Write step-by-step programs in the right order',
        'Use loops to repeat actions',
        'Make a program choose with if and else',
        'Build and share a small game of your own',
      ],
      modules: [
        {
          title: 'Sequences: giving clear instructions',
          lessons: 4,
          summary: 'Order simple steps so a computer can follow them exactly.',
        },
        {
          title: 'Loops: repeat without the typing',
          lessons: 3,
          summary: 'Make a character dance, draw shapes and repeat patterns.',
        },
        {
          title: 'Choices with if and else',
          lessons: 3,
          summary: 'Let a program react to what the player does.',
        },
        {
          title: 'Variables: boxes that remember',
          lessons: 3,
          summary: 'Keep track of a score, a name or a number of lives.',
        },
        {
          title: 'Build your own mini game',
          lessons: 3,
          summary: 'Combine everything into a small game you can show a friend.',
        },
      ],
      instructor: {
        sample: true,
        name: 'Mr. Samir Patel',
        title: 'Computer science teacher, 7 years in the classroom',
        bio: 'Samir started teaching coding after school with a handful of laptops and a lot of snacks. He likes it best when a bug turns into a good question.',
      },
      trial: {
        title: 'Loops: let the computer repeat',
        minutes: 3,
        intro: {
          heading: 'Computers never get bored',
          body: 'Computers are great at repeating things without getting tired. A loop tells the computer to do the same steps again and again. Instead of writing “clap” five times, you write “repeat 5 times: clap”. Shorter code means fewer mistakes and is easier to change. Want ten claps instead? Change one number. Loops hide inside almost every game, from a character that keeps walking to a clock that keeps ticking.',
          keyIdea:
            'A loop repeats steps so you do not have to write them over and over.',
        },
        flashcard: {
          front: 'What is a loop in code?',
          back: 'A set of instructions that repeats, either a set number of times or until something changes.',
        },
        questions: [
          {
            prompt:
              'A program says: repeat 3 times: print "Hi". How many times does it print Hi?',
            options: ['1', '3', '4', 'It never stops'],
            correct: 1,
            explanation:
              'The loop runs its instruction exactly 3 times, so Hi prints 3 times.',
          },
          {
            prompt: 'You want a character to take 10 steps. Which program is shorter and easier to change?',
            options: [
              'Type the step command ten times in a row',
              'repeat 10 times: step',
              'Type the step command once',
            ],
            correct: 1,
            explanation:
              'The loop does the job in one line. If you later want 20 steps, you only change the 10 to a 20.',
          },
        ],
      },
    },
  ],

  quiz: {
    title: 'Find the right starting point',
    lead: 'Four quick questions, about a minute. We will suggest a course and tell you why.',
    questions: [
      {
        id: 'grade',
        prompt: 'Which grade is your child in?',
        help: 'A rough guess is fine. You can change the level later.',
        options: [
          {
            label: 'Grades 3–5',
            hint: 'Ages 8–10',
            reason: 'Your child is in the elementary grades, where solid foundations help most',
            scores: {
              'fractions-made-friendly': 3,
              'young-coders-lab': 1,
              'paragraph-power-workshop': 1,
            },
          },
          {
            label: 'Grades 6–8',
            hint: 'Ages 11–13',
            reason: 'Your child is in middle school, where subjects get bigger and more varied',
            scores: {
              'fractions-made-friendly': 1,
              'equation-detectives': 1,
              'young-coders-lab': 2,
              'paragraph-power-workshop': 2,
            },
          },
          {
            label: 'Grades 9–12',
            hint: 'Ages 14–17',
            reason: 'Your child is in high school and ready for deeper work',
            scores: {
              'equation-detectives': 2,
              'paragraph-power-workshop': 2,
              'young-coders-lab': 1,
            },
          },
        ],
      },
      {
        id: 'subject',
        prompt: 'What would you like to work on first?',
        help: 'Pick the subject that matters most right now.',
        options: [
          {
            label: 'Math',
            hint: 'Fractions, equations, problem solving',
            reason: 'You want more confidence in math',
            scores: { 'fractions-made-friendly': 2, 'equation-detectives': 2 },
          },
          {
            label: 'Reading & writing',
            hint: 'Paragraphs, clear ideas, revising',
            reason: 'You want your child to write more clearly',
            scores: { 'paragraph-power-workshop': 3 },
          },
          {
            label: 'Coding',
            hint: 'Games, animations, how apps work',
            reason: 'Your child likes building things with code',
            scores: { 'young-coders-lab': 3 },
          },
          {
            label: 'Not sure yet',
            hint: 'Start with something gentle',
            reason: "You are still exploring, so a gentle, hands-on start makes sense",
            scores: {
              'fractions-made-friendly': 1,
              'paragraph-power-workshop': 1,
              'young-coders-lab': 1,
            },
          },
        ],
      },
      {
        id: 'hard',
        prompt: 'What feels hardest right now?',
        help: 'Think about what causes the sighs at homework time.',
        options: [
          {
            label: 'Fractions and number sense',
            hint: 'Parts of a whole, comparing sizes',
            reason: 'Fractions and number sense feel shaky',
            scores: { 'fractions-made-friendly': 3 },
          },
          {
            label: 'Word problems and algebra',
            hint: 'Multi-step problems, equations',
            reason: 'Multi-step problems and equations are the sticking point',
            scores: { 'equation-detectives': 3, 'fractions-made-friendly': 1 },
          },
          {
            label: 'Getting ideas onto the page',
            hint: 'Organizing thoughts, writing clearly',
            reason: 'Turning ideas into clear writing is the tricky part',
            scores: { 'paragraph-power-workshop': 3 },
          },
          {
            label: 'Staying interested',
            hint: 'Learning feels dull unless they make something',
            reason: 'Your child learns best by making things',
            scores: { 'young-coders-lab': 2, 'paragraph-power-workshop': 1 },
          },
        ],
      },
      {
        id: 'time',
        prompt: 'How much time is realistic each week?',
        help: 'Short and steady beats long and rare.',
        options: [
          {
            label: 'About 1 hour',
            hint: 'A few 10–15 minute lessons',
            reason: 'You have a little time each week, so short lessons fit',
            scores: { 'fractions-made-friendly': 2, 'paragraph-power-workshop': 1 },
          },
          {
            label: 'About 2 hours',
            hint: 'A lesson on most school days',
            reason: 'You can fit in a lesson on most school days',
            scores: {
              'fractions-made-friendly': 1,
              'equation-detectives': 1,
              'paragraph-power-workshop': 1,
              'young-coders-lab': 1,
            },
          },
          {
            label: '3 hours or more',
            hint: 'Daily lessons or a weekend project',
            reason: 'You have room for deeper practice and longer projects',
            scores: {
              'equation-detectives': 2,
              'paragraph-power-workshop': 1,
              'young-coders-lab': 2,
            },
          },
          {
            label: 'Weekends only',
            hint: 'One longer session on Saturday or Sunday',
            reason: 'Weekends work best, so project-style lessons are a good match',
            scores: { 'young-coders-lab': 2, 'paragraph-power-workshop': 1 },
          },
        ],
      },
    ],
  },

  pricing: {
    title: 'Simple plans for families',
    lead: "Start free. Upgrade when you're ready. Switch plans or cancel whenever you like.",
    yearlyNote: 'Save 25–30% with yearly billing',
    plans: [
      {
        id: 'free',
        name: 'Free',
        tagline: 'Try it and see how it feels',
        monthly: 0,
        yearlyPerMonth: 0,
        unit: '/month',
        cta: 'Start free',
        features: [
          'Up to 3 lessons a week',
          'One child profile',
          'Sample lessons from every course',
          'Basic progress view',
          'Email support',
        ],
      },
      {
        id: 'plus',
        name: 'Plus',
        tagline: 'Everything for one learner',
        monthly: 14,
        yearlyPerMonth: 10,
        unit: '/month',
        cta: 'Choose Plus',
        highlight: true,
        features: [
          'Unlimited lessons in all four courses',
          'Smart practice that adapts to your child',
          'Hints and worked examples',
          'Weekly progress summary for parents',
          'Printable practice sheets',
          'One child profile',
        ],
      },
      {
        id: 'family',
        name: 'Family',
        tagline: 'For up to 4 kids',
        monthly: 24,
        yearlyPerMonth: 18,
        unit: '/month',
        cta: 'Choose Family',
        features: [
          'Everything in Plus',
          'Up to 4 child profiles',
          'One parent dashboard for all your kids',
          'Separate goals and pace for each child',
          'Priority email support',
        ],
      },
    ],
    guarantee:
      'Cancel any time in your account settings, and keep access until the end of the period you paid for.',
  },

  faq: [
    {
      q: 'Is Lessonlark safe for my child?',
      a: 'Kids learn in a space with no ads, no public profiles and no open chat. Lessons run 10 to 15 minutes and end with a clear finish line, and parents can set a daily lesson limit.',
    },
    {
      q: 'Which grades do you cover?',
      a: 'Our courses are designed for grades 3 through 12. The quick quiz suggests a starting course and level, and you can switch any time.',
    },
    {
      q: 'Does it match what my child learns in school?',
      a: "Lessons cover core skills that many US schools teach, but we don't follow one specific state or district curriculum. Think of it as extra practice that supports class work, not a replacement for it.",
    },
    {
      q: 'Can I cancel any time?',
      a: "Yes. Cancel in your account settings whenever you like and your plan stays active until the end of the period you paid for. Your child's progress is saved if you come back.",
    },
    {
      q: 'Will I get progress reports as a parent?',
      a: 'Yes. The parent dashboard shows lessons finished, topics your child is still working on and a short weekly summary in plain language.',
    },
    {
      q: 'What devices does it work on?',
      a: 'Any laptop, Chromebook, tablet or phone with a modern web browser. There is nothing to download, though a bigger screen is easier for coding.',
    },
  ],

  aboutLine:
    'For families, Lessonlark means short, friendly lessons that kids actually finish and progress updates that parents can actually read.',

  contact: {
    mode: 'contact',
    title: 'Questions? Ask a real person.',
    lead: "Not sure which course fits, or how the Family plan works? Send us a note and we'll help you sort it out.",
    topics: [
      'Choosing a course',
      'Plans and billing',
      'Account or login help',
      'Feedback or ideas',
    ],
    responseNote: 'We usually reply within one business day.',
  },

  signup: {
    title: 'Create your family account',
    lead: 'Setup takes about two minutes. Start on the Free plan and upgrade only if you want to.',
    perks: [
      'Free plan with no credit card',
      'Add a child profile in under a minute',
      'Change courses or pace any time',
    ],
  },

  onboarding: [
    {
      key: 'goal',
      question: 'What would you like help with most?',
      help: 'Pick what matters most right now. You can change it later.',
      options: [
        {
          value: 'confidence',
          label: 'More confidence',
          hint: 'Fewer “I can’t do this” moments',
        },
        {
          value: 'homework',
          label: 'Keep up with homework',
          hint: 'Extra practice alongside class work',
        },
        {
          value: 'catch-up',
          label: 'Catch up on a topic',
          hint: 'Fill a gap from an earlier grade',
        },
        {
          value: 'explore',
          label: 'Explore something new',
          hint: 'Coding, writing projects or a fresh topic',
        },
      ],
    },
    {
      key: 'level',
      question: 'Where is your child right now?',
      help: 'A rough guess is fine. Smart practice adjusts after the first few lessons.',
      options: [
        {
          value: 'Beginner',
          label: 'Just starting out',
          hint: 'New to the topic, or it feels tricky',
        },
        {
          value: 'Intermediate',
          label: 'Getting there',
          hint: 'Knows the basics and needs more practice',
        },
        {
          value: 'Advanced',
          label: 'Pretty comfortable',
          hint: 'Ready for a challenge',
        },
      ],
    },
    {
      key: 'time',
      question: 'How much time can your child spend each week?',
      help: 'Short and steady beats long and rare.',
      options: [
        {
          value: '1h',
          label: 'About 1 hour',
          hint: 'A few short lessons',
        },
        {
          value: '2h',
          label: 'About 2 hours',
          hint: 'A lesson on most school days',
        },
        {
          value: '3h',
          label: '3 hours or more',
          hint: 'Daily lessons or a weekend project',
        },
      ],
    },
  ],

  dashboard: {
    view: 'learner',
    fallbackName: 'Alex',
    nextLesson: {
      course: 'Fractions Made Friendly',
      title: 'Comparing and ordering fractions',
      minutes: 12,
    },
    weekPlan: [
      { day: 'Mon', item: 'Equal parts and fair shares', done: true },
      { day: 'Tue', item: 'Fractions on a number line', done: true },
      { day: 'Wed', item: 'Comparing and ordering fractions', done: false },
      { day: 'Thu', item: 'Topic sentences: start with the big idea', done: false },
      { day: 'Fri', item: 'Weekly review and a fun challenge', done: false },
    ],
    achievements: [
      { title: '5-day streak', text: 'Five days in a row. Short and steady wins.' },
      { title: 'Fair-share finisher', text: 'Completed the first module of Fractions Made Friendly.' },
      { title: 'Hint hero', text: 'Used a hint, then solved the next one alone.' },
    ],
  },
};
