import type { Lesson } from './types.js';

export const lesson: Lesson = {
  id: '08-bisect-debugging',
  title: 'Debugging with Bisect',
  description: 'Use binary search to find exactly which commit introduced a bug.',
  difficulty: 'advanced',
  steps: [
    {
      type: 'content',
      title: 'What is Git Bisect?',
      items: [
        {
          title: 'The problem',
          explanation: 'Something is broken but you don\'t know which commit caused it. There are 100 commits since it last worked. Checking them one by one would take forever.',
        },
        {
          title: 'The solution: binary search',
          explanation: 'Git bisect does a binary search through your commits. It picks a commit in the middle, you test it, and it narrows down by half each time. 100 commits = ~7 checks.',
        },
        {
          title: 'Start bisecting',
          explanation: 'Begin the bisect process.',
          command: 'git bisect start',
        },
        {
          title: 'Mark the current (broken) commit as bad',
          explanation: 'Tell Git the current state is broken.',
          command: 'git bisect bad',
        },
        {
          title: 'Mark a known good commit',
          explanation: 'Tell Git a commit hash (or tag) where things worked. Git will check out the middle commit for you to test.',
          command: 'git bisect good abc1234',
        },
      ],
    },
    {
      type: 'command-exercise',
      prompt: 'Start the bisect process.',
      acceptedAnswers: ['git bisect start'],
      hints: [
        'Use "git bisect start"',
        'Two words after git: bisect start',
      ],
      explanation: 'This puts Git into bisect mode. Now you need to mark good and bad commits.',
    },
    {
      type: 'command-exercise',
      prompt: 'Mark the current commit as bad (broken).',
      acceptedAnswers: ['git bisect bad'],
      hints: [
        'Use "git bisect bad"',
        'You\'re telling Git "this commit is broken"',
      ],
      explanation: '"git bisect bad" marks the current commit as having the bug.',
    },
    {
      type: 'content',
      title: 'The Bisect Loop',
      items: [
        {
          title: 'After marking good and bad',
          explanation: 'Git checks out a commit halfway between good and bad. Test your app, then mark it:',
        },
        {
          title: 'If this commit works:',
          explanation: 'Mark it as good. Git will check out another commit closer to the bad end.',
          command: 'git bisect good',
        },
        {
          title: 'If this commit is broken:',
          explanation: 'Mark it as bad. Git will check out another commit closer to the good end.',
          command: 'git bisect bad',
        },
        {
          title: 'When bisect finds the culprit',
          explanation: 'Git will tell you: "abc1234 is the first bad commit". Now you know exactly what broke things!',
        },
        {
          title: 'End bisect mode',
          explanation: 'Return to your original branch when done.',
          command: 'git bisect reset',
        },
      ],
    },
    {
      type: 'command-exercise',
      prompt: 'You found the bad commit. Exit bisect mode and return to your original branch.',
      acceptedAnswers: ['git bisect reset'],
      hints: [
        'Use "git bisect reset"',
        'This ends the bisect session and returns you to where you started',
      ],
      explanation: '"git bisect reset" cleans up and returns you to the branch you were on before bisecting.',
    },
    {
      type: 'multiple-choice',
      situation: 'There are 128 commits between the last known good state and the current broken state. How many steps will git bisect need to find the bad commit?',
      options: [
        '128 steps (check every commit)',
        '64 steps (check half)',
        '7 steps (binary search: log2 of 128)',
        '1 step (Git just knows)',
      ],
      correctAnswer: 2,
      explanation: 'Binary search halves the range each time. 128 \u2192 64 \u2192 32 \u2192 16 \u2192 8 \u2192 4 \u2192 2 \u2192 1 = 7 steps. That\'s the power of bisect!',
    },
    {
      type: 'scenario',
      title: 'Bug Hunt with Bisect',
      situation: 'The login page is broken. It worked 2 weeks ago at commit abc1234. Use bisect to find which commit broke it.',
      steps: [
        {
          prompt: 'Start the bisect process:',
          acceptedAnswers: ['git bisect start'],
          hint: 'Use git bisect start',
        },
        {
          prompt: 'Mark the current (broken) state as bad:',
          acceptedAnswers: ['git bisect bad'],
          hint: 'Use git bisect bad',
        },
        {
          prompt: 'Mark the known working commit abc1234 as good:',
          acceptedAnswers: ['git bisect good abc1234'],
          hint: 'Use git bisect good followed by the commit hash',
        },
        {
          prompt: 'Git checked out a middle commit. You tested it and the login works here. Mark it:',
          acceptedAnswers: ['git bisect good'],
          hint: 'It works, so mark it as good',
        },
        {
          prompt: 'Git checked out another commit. Login is broken here. Mark it:',
          acceptedAnswers: ['git bisect bad'],
          hint: 'It\'s broken, so mark it as bad',
        },
        {
          prompt: 'Git found the bad commit! Exit bisect mode:',
          acceptedAnswers: ['git bisect reset'],
          hint: 'Use git bisect reset to exit',
        },
      ],
      completionMessage: 'Bug hunter! Bisect is incredibly powerful for tracking down regressions. Pro tip: you can even automate it with "git bisect run <test-script>".',
    },
  ],
  completed: false,
};
