import type { AudienceContent } from './typen';

export const schools: AudienceContent = {
  key: 'schools',
  label: 'Schools',
  shortLabel: 'Schools',
  coursesWord: 'Programs',
  metaDescription:
    'Lessonlark gives schools short, structured lessons, adaptive practice and a clear class view. Start with a free classroom pilot and grow at your own pace.',

  hero: {
    eyebrow: 'For schools and districts',
    titleStart: 'Practice that fits the',
    accentWord: 'classroom',
    titleEnd: 'you already run.',
    lead: 'Lessonlark gives teachers short, structured lessons and a clear view of how the class is doing. Start with one class, then grow at your own pace.',
    primaryCta: 'Book a demo',
    secondaryCta: 'Preview a lesson',
    note: 'free classroom pilot',
    progressCard: {
      label: 'Class progress',
      lessonTitle: 'Break it apart: multiplying with known facts',
      percent: 72,
      streakDays: 9,
    },
  },

  stats: [
    { sample: true, value: '2 hrs', label: 'saved per teacher each week' },
    { sample: true, value: '10 min', label: 'typical time to set up a class' },
    { sample: true, value: '3 in 4', label: 'pilot teachers still using it after a month' },
  ],

  benefits: [
    {
      icon: 'clock',
      title: 'Less prep, more teaching',
      text: 'Ready-to-run lessons come with slides, practice and answer keys. Teachers plan in minutes, not evenings.',
    },
    {
      icon: 'chart',
      title: 'A clear view of every class',
      text: 'See progress by class, group and student. Spot who needs help while the lesson is still happening.',
    },
    {
      icon: 'target',
      title: 'Practice that adapts',
      text: 'Adaptive practice adjusts the next question to each student. Teachers stay in control of pace and topics.',
    },
    {
      icon: 'shield',
      title: 'Student data stays yours',
      text: 'No ads, ever. We keep only what lessons need to run. A data processing agreement is available on request.',
    },
  ],

  steps: [
    {
      title: 'Set up your class',
      text: 'Add students with a class code or a roster file. Most classes are ready in minutes.',
    },
    {
      title: 'Run a short lesson',
      text: 'Pick a lesson, project it and teach the way you normally do. Practice follows on student devices or on paper.',
    },
    {
      title: 'See who needs help',
      text: 'The class view shows progress and flags students who may need a nudge, so tomorrow’s plan is easy.',
    },
  ],

  testimonials: [
    {
      sample: true,
      quote:
        'We started with two classrooms. By week two, other teachers were asking to join. Setup took one afternoon.',
      name: 'Dana K.',
      role: 'Principal, K-8 school',
    },
    {
      sample: true,
      quote:
        'The class view shows me who is stuck before the lesson ends. I spend far less time digging through worksheets.',
      name: 'Luis M.',
      role: '5th grade teacher',
    },
    {
      sample: true,
      quote:
        'Rostering took one spreadsheet and a short call. Teachers got a clear first-week plan, which made the rollout calm.',
      name: 'Tamsin O.',
      role: 'Technology coordinator, district office',
    },
  ],

  finalCta: {
    title: 'Try it with one class first.',
    text: 'Run a free classroom pilot. No long forms and no commitment. Decide with your team once you have seen it in a real lesson.',
    cta: 'Book a demo',
  },

  courses: [
    {
      slug: 'math-fluency-grades-3-5',
      title: 'Math Fluency, Grades 3–5',
      tagline: 'Build quick, flexible recall of multiplication and division facts.',
      topic: 'Math',
      level: 'Beginner',
      durationWeeks: 8,
      hoursPerWeek: 1,
      lessons: 24,
      format: 'Teacher-led, 3 lessons per week',
      priceNote: 'Included in the School plan',
      imagePrompt:
        'colorful wooden counting blocks, a small brass globe and a stack of exercise books on a pale desk, soft light',
      outcomes: [
        'Recall multiplication and division facts with growing ease',
        'Use facts they know to work out new ones',
        'Explain a strategy in words, not only an answer',
        'Spot patterns in arrays, factors and multiples',
      ],
      modules: [
        {
          title: 'Equal groups and arrays',
          lessons: 5,
          summary: 'Picture multiplication as equal groups and neat rows.',
        },
        {
          title: 'Break it apart',
          lessons: 5,
          summary: 'Split a hard fact into two easier facts, then add.',
        },
        {
          title: 'Doubling and halving',
          lessons: 5,
          summary: 'Use doubles to reach the 4s and 8s from the 2s.',
        },
        {
          title: 'Division as a missing factor',
          lessons: 5,
          summary: 'Connect division to the multiplication facts students know.',
        },
        {
          title: 'Facts in word problems',
          lessons: 4,
          summary: 'Apply fluent facts to short, everyday problems.',
        },
      ],
      instructor: {
        sample: true,
        name: 'Elena Ortiz',
        title: 'Math coach, former 4th grade teacher',
        bio: 'Elena builds math practice around short routines and clear talk moves. She taught upper elementary for ten years.',
      },
      trial: {
        title: 'Break it apart: multiplying with known facts',
        minutes: 12,
        intro: {
          heading: 'Use a fact you already know',
          body: 'Some multiplication facts are easy to remember. Others take a little help. When you meet a hard one, split one number into two parts you know well. Find each part, then add the results. For 7 × 6, think 5 × 6 and 2 × 6. That is 30 plus 12, so 7 × 6 is 42.',
          keyIdea: 'Split a hard fact into two easier facts, then add the results.',
        },
        flashcard: {
          front: '7 × 6 = ?  Split 7 into 5 + 2.',
          back: '(5 × 6) + (2 × 6) = 30 + 12 = 42',
        },
        questions: [
          {
            prompt: 'Which breakdown correctly finds 8 × 4?',
            options: ['(5 × 4) + (2 × 4)', '(4 × 4) + (4 × 4)', '(8 × 4) + (4 × 4)'],
            correct: 1,
            explanation:
              '4 + 4 makes 8, so 8 × 4 equals 4 × 4 plus 4 × 4. That is 16 + 16 = 32.',
          },
          {
            prompt: 'A student knows 5 × 9 = 45. How can they find 6 × 9?',
            options: ['Add 6 to 45', 'Subtract 9 from 45', 'Add 9 to 45', 'Multiply 45 by 6'],
            correct: 2,
            explanation:
              '6 groups of 9 is one more group of 9 than 5 groups of 9. So 45 + 9 = 54.',
          },
        ],
      },
    },
    {
      slug: 'reading-comprehension-grades-6-8',
      title: 'Reading Comprehension, Grades 6–8',
      tagline: 'Read closely, find evidence and explain your thinking in writing.',
      topic: 'Literacy',
      level: 'Intermediate',
      durationWeeks: 10,
      hoursPerWeek: 2,
      lessons: 20,
      format: 'Teacher-led, 2 lessons per week',
      priceNote: 'Included in the School plan',
      imagePrompt:
        'a stack of paperback books, a brass reading lamp, a bookmark and a small potted plant on a wooden shelf',
      outcomes: [
        'Find the main idea and the details that support it',
        'Make inferences backed by evidence from the text',
        'Compare how two texts treat the same topic',
        'Write short responses that point back to the text',
      ],
      modules: [
        {
          title: 'Main idea and details',
          lessons: 4,
          summary: 'Separate what a text is about from what it says about it.',
        },
        {
          title: 'Making inferences',
          lessons: 4,
          summary: 'Combine clues in the text with what you already know.',
        },
        {
          title: 'Vocabulary in context',
          lessons: 4,
          summary: 'Use surrounding words to work out unfamiliar ones.',
        },
        {
          title: 'Comparing two texts',
          lessons: 4,
          summary: 'Notice how two authors handle the same topic differently.',
        },
        {
          title: 'Writing with evidence',
          lessons: 4,
          summary: 'Write short responses that quote and explain the text.',
        },
      ],
      instructor: {
        sample: true,
        name: 'Marcus Hale',
        title: 'Literacy lead, former 7th grade English teacher',
        bio: 'Marcus designs reading lessons around short passages and good class discussion. He taught middle school English for nine years.',
      },
      trial: {
        title: 'Reading between the lines: making inferences',
        minutes: 15,
        intro: {
          heading: 'Clues plus what you know',
          body: 'Writers do not always tell you everything. Sometimes they leave clues, and readers put them together. That is called making an inference. Start with what the text says. Add what you already know about the world. Then decide what the clues most likely mean. A strong inference can always point back to words on the page.',
          keyIdea: 'An inference is a reasonable conclusion that the clues in the text support.',
        },
        flashcard: {
          front: 'What is an inference?',
          back: 'A conclusion you reach by combining clues in the text with what you already know.',
        },
        questions: [
          {
            prompt:
              'Read: “Mia pulled her hood up, shoved her hands into her pockets and hurried past the bus shelter. Her breath made small clouds in the air.” Which inference do the clues best support?',
            options: [
              'Mia is late for a party.',
              'It is a cold day.',
              'Mia is afraid of buses.',
            ],
            correct: 1,
            explanation:
              'A hood, pockets and visible breath all point to cold weather. Nothing in the passage supports the other choices.',
          },
          {
            prompt: 'Which question best checks whether an inference is strong?',
            options: [
              'Does the text give clues that support it?',
              'Is it the first idea I had?',
              'Do I like this idea?',
            ],
            correct: 0,
            explanation:
              'A strong inference points back to clues in the text. Liking an idea, or having it first, does not make it well supported.',
          },
        ],
      },
    },
    {
      slug: 'coding-basics-grades-6-8',
      title: 'Coding Basics, Grades 6–8',
      tagline: 'Learn how programs think, from sequences to loops and debugging.',
      topic: 'Technology',
      level: 'Beginner',
      durationWeeks: 6,
      hoursPerWeek: 2,
      lessons: 12,
      format: 'Teacher-led, 2 lessons per week, unplugged + on-screen',
      priceNote: 'Included in the School plan',
      imagePrompt:
        'a small wooden robot toy, colorful puzzle pieces, a pencil and a graph-paper notebook arranged on a bright desk, soft light',
      outcomes: [
        'Write step-by-step instructions a computer can follow',
        'Use loops and conditions to shorten a program',
        'Trace a program by hand to predict what it will do',
        'Find and fix bugs calmly, one change at a time',
      ],
      modules: [
        {
          title: 'Sequences: order matters',
          lessons: 2,
          summary: 'Give precise instructions and see what happens when the order changes.',
        },
        {
          title: 'Loops: repeat, don’t rewrite',
          lessons: 3,
          summary: 'Replace repeated steps with a loop and trace it on paper first.',
        },
        {
          title: 'Conditions: if this, then that',
          lessons: 3,
          summary: 'Make programs choose between actions based on a rule.',
        },
        {
          title: 'Debugging: find the bug',
          lessons: 2,
          summary: 'Test, narrow down and fix a faulty program step by step.',
        },
        {
          title: 'Mini project',
          lessons: 2,
          summary: 'Plan and build a short program in pairs, then share it.',
        },
      ],
      instructor: {
        sample: true,
        name: 'Priya Nair',
        title: 'Computer science educator, former STEM coach',
        bio: 'Priya writes coding lessons that start on paper and move to the screen. She coached middle school STEM clubs for eight years.',
      },
      trial: {
        title: 'Loops: repeat instead of rewriting',
        minutes: 15,
        intro: {
          heading: 'Say it once, repeat it',
          body: 'A loop repeats a set of instructions. Instead of writing the same step again and again, you write it once and say how many times to repeat. Loops make programs shorter and easier to change. In this lesson, students trace short loops on paper first. They predict what happens, then check it as a class.',
          keyIdea: 'A loop lets you write a step once and repeat it as many times as you need.',
        },
        flashcard: {
          front: 'What does “repeat 4 times: move 3 steps” do?',
          back: 'It moves 3 steps, four times in a row. The total is 12 steps.',
        },
        questions: [
          {
            prompt:
              'A robot starts at 0 on a number line. The program says: repeat 4 times: move forward 3 steps. Where does the robot stop?',
            options: ['7', '9', '12', '15'],
            correct: 2,
            explanation: 'Each pass adds 3 steps. Four passes make 3 + 3 + 3 + 3 = 12.',
          },
          {
            prompt: 'Why use a loop instead of writing the same line 50 times?',
            options: [
              'The program is shorter and easier to change',
              'The computer forgets the earlier steps',
              'The program no longer needs instructions',
            ],
            correct: 0,
            explanation:
              'One short loop is easier to read, and changing the count means editing a single number.',
          },
        ],
      },
    },
    {
      slug: 'teacher-onboarding-track',
      title: 'Teacher Onboarding Track',
      tagline: 'Learn to run, read and adjust Lessonlark in your own classroom.',
      topic: 'Technology',
      level: 'Beginner',
      durationWeeks: 4,
      hoursPerWeek: 1,
      lessons: 8,
      format: 'Self-paced + a weekly staff huddle',
      priceNote: 'Included with every plan',
      imagePrompt:
        'a teacher’s desk with a wooden apple, a notebook, a small clock and a mug of pencils in warm morning light',
      outcomes: [
        'Set up a class and add students in minutes',
        'Run a ten-minute first session with the whole class',
        'Read the class view and spot who needs help',
        'Adjust pace and practice for different groups',
      ],
      modules: [
        {
          title: 'Set up your class',
          lessons: 2,
          summary: 'Create a class, add students and print or share class codes.',
        },
        {
          title: 'Your first session',
          lessons: 2,
          summary: 'Model one example, then let students practice while you circulate.',
        },
        {
          title: 'Reading the class view',
          lessons: 2,
          summary: 'Learn what the progress view shows and what to do with it.',
        },
        {
          title: 'Supporting small groups',
          lessons: 1,
          summary: 'Group students by need and choose the next practice for each group.',
        },
        {
          title: 'Planning the week',
          lessons: 1,
          summary: 'Fit Lessonlark into your timetable without adding to your workload.',
        },
      ],
      instructor: {
        sample: true,
        name: 'Dr. Naomi Brooks',
        title: 'Curriculum lead, former middle-school teacher',
        bio: 'Naomi designed the teacher track around real classroom routines. She taught middle school for twelve years before moving into curriculum.',
      },
      trial: {
        title: 'Run a ten-minute first session',
        minutes: 10,
        intro: {
          heading: 'Start small, model first',
          body: 'A first session can be short. Ten minutes is plenty. Sign in together, then show one example on the board. Say what you are doing as you do it. Next, let students try on their own while you walk around the room. Save the progress view for after class, when you can look at it calmly.',
          keyIdea: 'Model one example together, then let students practice while you circulate.',
        },
        flashcard: {
          front: 'Gradual release in three words',
          back: 'I do, we do, you do: model it, try it together, then let students work on their own.',
        },
        questions: [
          {
            prompt: 'What should happen before students practice on their own?',
            options: [
              'Model one example with the whole class',
              'Hand out a graded quiz',
              'Let students explore with no instructions',
            ],
            correct: 0,
            explanation:
              'Showing one example together gives everyone a clear picture of the task. Then students can practice with confidence.',
          },
          {
            prompt: 'While students practice, what is most useful for the teacher to do?',
            options: [
              'Grade the first results at the desk',
              'Wait silently at the front',
              'Prepare tomorrow’s slides',
              'Walk around and note who needs a nudge',
            ],
            correct: 3,
            explanation:
              'Moving around lets you spot students who are stuck early and help them while they are still practicing.',
          },
        ],
      },
    },
  ],

  quiz: {
    title: 'Find your first program',
    lead: 'Four quick questions about your school. We’ll suggest where to start.',
    questions: [
      {
        id: 'grades',
        prompt: 'Which group will you start with?',
        help: 'Pick the group you would pilot first. You can add others later.',
        options: [
          {
            label: 'Grades 3–5',
            hint: 'Upper elementary',
            reason: 'You’re focused on grades 3–5',
            scores: { 'math-fluency-grades-3-5': 3 },
          },
          {
            label: 'Grades 6–8',
            hint: 'Middle school',
            reason: 'You’re starting with middle school',
            scores: { 'reading-comprehension-grades-6-8': 2, 'coding-basics-grades-6-8': 2 },
          },
          {
            label: 'A mix of grades, K–8',
            hint: 'Several grade bands',
            reason: 'You’re planning across several grade bands',
            scores: {
              'math-fluency-grades-3-5': 1,
              'reading-comprehension-grades-6-8': 1,
              'coding-basics-grades-6-8': 1,
              'teacher-onboarding-track': 1,
            },
          },
          {
            label: 'Teachers and staff',
            hint: 'Training comes first',
            reason: 'You want to prepare your teachers first',
            scores: { 'teacher-onboarding-track': 3 },
          },
        ],
      },
      {
        id: 'subject',
        prompt: 'What do you want to focus on?',
        help: 'Choose the area where your students or teachers need the most support.',
        options: [
          {
            label: 'Math fluency',
            hint: 'Facts, strategies and problem solving',
            reason: 'You want to build math fluency',
            scores: { 'math-fluency-grades-3-5': 3 },
          },
          {
            label: 'Reading comprehension',
            hint: 'Evidence, inference and writing',
            reason: 'You want stronger reading comprehension',
            scores: { 'reading-comprehension-grades-6-8': 3 },
          },
          {
            label: 'Coding and computer science',
            hint: 'Logic, loops and debugging',
            reason: 'You want to introduce coding and computational thinking',
            scores: { 'coding-basics-grades-6-8': 3 },
          },
          {
            label: 'Teacher training and routines',
            hint: 'A confident start for staff',
            reason: 'You want teachers to feel confident from day one',
            scores: { 'teacher-onboarding-track': 3 },
          },
        ],
      },
      {
        id: 'goal',
        prompt: 'What is your main goal?',
        help: 'There is no wrong answer. This only changes our suggestion.',
        options: [
          {
            label: 'Intervention and catch-up',
            hint: 'Extra support for students who need it',
            reason: 'You want extra support for students who need it',
            scores: { 'math-fluency-grades-3-5': 2, 'reading-comprehension-grades-6-8': 2 },
          },
          {
            label: 'Enrichment and new skills',
            hint: 'Something fresh for curious students',
            reason: 'You want to stretch students with something new',
            scores: {
              'coding-basics-grades-6-8': 2,
              'reading-comprehension-grades-6-8': 1,
              'math-fluency-grades-3-5': 1,
            },
          },
          {
            label: 'Save teacher time',
            hint: 'Less prep and less marking',
            reason: 'You want to give teachers time back',
            scores: {
              'teacher-onboarding-track': 2,
              'math-fluency-grades-3-5': 1,
              'reading-comprehension-grades-6-8': 1,
            },
          },
          {
            label: 'One shared routine',
            hint: 'The same approach in every room',
            reason: 'You want one shared routine across classrooms',
            scores: { 'teacher-onboarding-track': 2, 'math-fluency-grades-3-5': 1 },
          },
        ],
      },
      {
        id: 'rollout',
        prompt: 'How big is your first rollout?',
        help: 'Think about the first term, not the long-term plan.',
        options: [
          {
            label: 'One classroom',
            hint: 'A small pilot',
            reason: 'You’re starting with a single classroom pilot',
            scores: {
              'math-fluency-grades-3-5': 1,
              'reading-comprehension-grades-6-8': 1,
              'coding-basics-grades-6-8': 1,
            },
          },
          {
            label: 'One grade level',
            hint: 'A handful of classes',
            reason: 'You’re rolling out to one grade level',
            scores: {
              'math-fluency-grades-3-5': 1,
              'reading-comprehension-grades-6-8': 1,
              'coding-basics-grades-6-8': 1,
            },
          },
          {
            label: 'A whole school',
            hint: 'Many classes at once',
            reason: 'You’re planning a whole-school rollout',
            scores: { 'teacher-onboarding-track': 2 },
          },
          {
            label: 'Several schools',
            hint: 'A district-level plan',
            reason: 'You’re planning for several schools',
            scores: { 'teacher-onboarding-track': 3 },
          },
        ],
      },
    ],
  },

  pricing: {
    title: 'Simple pricing for classes, schools and districts',
    lead: 'Start free with one class. Pay per student only when you roll out more widely.',
    yearlyNote: 'Most schools pay yearly and save 25%',
    plans: [
      {
        id: 'classroom',
        name: 'Classroom',
        tagline: 'For one teacher trying it with a class',
        monthly: 0,
        yearlyPerMonth: 0,
        unit: '/month',
        cta: 'Start free pilot',
        features: [
          'One teacher, up to 30 students',
          'Sample lessons from every program',
          'Basic class progress view',
          'Teacher onboarding track',
          'Help center and email support',
        ],
      },
      {
        id: 'school',
        name: 'School',
        tagline: 'For schools rolling out to many classes',
        monthly: 4,
        yearlyPerMonth: 3,
        unit: 'per student / month',
        cta: 'Book a demo',
        highlight: true,
        features: [
          'All four programs',
          'Class, grade and school progress views',
          'Roster import for fast class setup',
          'Adaptive practice with teacher controls',
          'Live training for your staff',
          'Data processing agreement on request',
        ],
      },
      {
        id: 'district',
        name: 'District',
        tagline: 'For rollouts across several schools',
        monthly: null,
        yearlyPerMonth: null,
        unit: '/month',
        cta: 'Talk to us',
        features: [
          'Everything in School',
          'Reporting across schools',
          'Custom quote, invoicing and purchase orders',
          'A named onboarding contact',
          'Rollout planning with your team',
          'Data processing agreement on request',
        ],
      },
    ],
    guarantee:
      'Start with a free classroom pilot. You only pay when you decide to roll out to more students.',
  },

  faq: [
    {
      q: 'Who owns our students’ data?',
      a: 'Your school does. Student data stays yours, we don’t sell it, and there are no ads, ever. We keep only what lessons need to run, and a data processing agreement is available on request.',
    },
    {
      q: 'How do students join their classes?',
      a: 'Teachers add students with a class code or a roster file. Students sign in with the class code or with sign-in details your school sets up, so younger students don’t need a personal email address.',
    },
    {
      q: 'How do teachers get started?',
      a: 'Every plan includes a short onboarding track. Most teachers are ready to run a first session in under an hour. School and District plans also include live training for your staff.',
    },
    {
      q: 'How does it fit our curriculum?',
      a: 'Lessons are aligned to common grade-level skills, and each program lists what it covers. Teachers choose the order, so lessons can follow your pacing guide. We’re happy to walk through a skills map in a demo.',
    },
    {
      q: 'What devices do students need?',
      a: 'Any computer or tablet with a current web browser works. Lessons also include paper activities, so a class can begin with a few shared devices.',
    },
    {
      q: 'Can we pilot first, and do you accept purchase orders?',
      a: 'Yes to both. Start with a free classroom pilot, then move to the School or District plan when you’re ready. We can provide quotes and invoices that fit your purchase order process.',
    },
  ],

  aboutLine:
    'For schools, Lessonlark means short, structured lessons and a clear class view, so teachers can spend their time teaching.',

  contact: {
    mode: 'demo',
    title: 'Book a demo',
    lead: 'See Lessonlark the way a teacher would. We’ll walk through a sample lesson, the class view and a rollout plan that fits your school.',
    topics: [
      'Pilot for one grade',
      'Whole-school rollout',
      'District quote and purchase orders',
      'Teacher training and onboarding',
    ],
    responseNote: 'We reply within two school days. Expect answers, not a hard sell.',
  },

  signup: {
    title: 'Create your teacher account',
    lead: 'Set up a free classroom in a few minutes. Add up to 30 students and try a sample lesson with your class.',
    perks: [
      'Free classroom for one teacher, up to 30 students',
      'Sample lessons from every program',
      'Teacher onboarding track included',
    ],
  },

  onboarding: [
    {
      key: 'goal',
      question: 'What will you use Lessonlark for?',
      help: 'Pick the main use. You can change it later.',
      options: [
        { value: 'practice', label: 'Daily skill practice', hint: 'Short, steady practice in class' },
        { value: 'intervention', label: 'Intervention groups', hint: 'Extra support for small groups' },
        { value: 'enrichment', label: 'Enrichment', hint: 'New challenges for ready students' },
        { value: 'prep', label: 'Cutting prep time', hint: 'Ready-made lessons to run' },
      ],
    },
    {
      key: 'level',
      question: 'Which grade band do you teach?',
      help: 'We’ll suggest programs that match.',
      options: [
        { value: 'grades-3-5', label: 'Grades 3–5', hint: 'Upper elementary' },
        { value: 'grades-6-8', label: 'Grades 6–8', hint: 'Middle school' },
        { value: 'mixed', label: 'Mixed or other', hint: 'We’ll suggest a starting point' },
      ],
    },
    {
      key: 'time',
      question: 'How much class time can you set aside each week?',
      help: 'A rough guess is fine. Short sessions work well.',
      options: [
        { value: '30', label: 'About 30 minutes', hint: 'One short session' },
        { value: '60', label: 'About an hour', hint: 'Two or three short sessions' },
        { value: '90', label: 'About 90 minutes', hint: 'A few sessions each week' },
        { value: '120', label: '2 hours or more', hint: 'Part of your regular schedule' },
      ],
    },
  ],

  dashboard: {
    view: 'teacher',
    fallbackName: 'Ms. Rivera',
    nextLesson: {
      course: 'Math Fluency, Grades 3–5',
      title: 'Doubling and halving to multiply',
      minutes: 20,
    },
    weekPlan: [
      { day: 'Mon', item: 'Warm-up: ten multiplication facts as a whole class', done: true },
      { day: 'Tue', item: 'Small groups: break apart facts with arrays', done: true },
      { day: 'Wed', item: 'Doubling and halving to multiply', done: false },
      { day: 'Thu', item: 'Check in with students who need help', done: false },
      { day: 'Fri', item: 'Class review and short practice set', done: false },
    ],
    achievements: [
      { title: '9-day class streak', text: 'Your class has practiced together nine school days in a row.' },
      { title: 'Everyone signed in', text: 'Every student has joined the class at least once.' },
      { title: 'First module complete', text: 'The class finished the first module of the program.' },
    ],
    classes: [
      { name: 'Grade 4 – Room 12', students: 26, progress: 72, needsHelp: 3 },
      { name: 'Grade 4 – Room 14', students: 22, progress: 54, needsHelp: 4 },
      { name: 'Grade 5 – Room 9', students: 28, progress: 88, needsHelp: 2 },
    ],
    assignments: [
      { title: 'Break it apart: practice set', due: 'Thu', submitted: 19, total: 26 },
      { title: 'Doubling and halving: warm-up', due: 'Wed', submitted: 22, total: 22 },
      { title: 'Fact families check-in', due: 'Fri', submitted: 8, total: 28 },
    ],
  },
};
