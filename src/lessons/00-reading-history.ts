import type { Lesson } from './types.js';

export const lesson: Lesson = {
  id: '00-reading-history',
  title: 'Reading Project History',
  description: 'Learn to read git log, understand who changed what, and navigate your project\'s timeline.',
  difficulty: 'getting-started',
  steps: [
    {
      type: 'content',
      title: 'Why Read History?',
      items: [
        {
          title: 'Git is a time machine',
          explanation: 'Every commit is a snapshot of your project at a point in time. You can see exactly what changed, when, and who did it.',
        },
        {
          title: 'Common questions history answers',
          explanation: '"When did this feature get added?" "Who changed this file last?" "What did the code look like last week?" "Why was this line changed?"',
        },
      ],
    },
    {
      type: 'content',
      title: 'git log — The Timeline',
      items: [
        {
          title: 'Basic log',
          explanation: 'Shows a list of all commits, newest first. Each entry has a hash, author, date, and message.',
          command: 'git log',
        },
        {
          title: 'Compact log (one line per commit)',
          explanation: 'Much easier to scan through. Shows the short hash and commit message.',
          command: 'git log --oneline',
        },
        {
          title: 'Show the last N commits',
          explanation: 'Limit how many commits you see. Great when you just want recent activity.',
          command: 'git log --oneline -5',
        },
        {
          title: 'See a visual branch diagram',
          explanation: 'Shows branches and merges as a text-based graph.',
          command: 'git log --oneline --graph',
        },
      ],
    },
    {
      type: 'command-exercise',
      prompt: 'View the last 10 commits in compact format (one line each).',
      acceptedAnswers: [
        'git log --oneline -10',
        'git log -10 --oneline',
        'git log --oneline -n 10',
        'git log -n 10 --oneline',
      ],
      hints: [
        'Combine --oneline with -10 to limit the output',
        'git log --oneline -10',
      ],
      explanation: '"--oneline" condenses each commit to a single line. "-10" limits to the last 10. This is probably the git log command you will use most.',
    },
    {
      type: 'content',
      title: 'git blame — Who Changed This Line?',
      items: [
        {
          title: 'What is git blame?',
          explanation: 'Shows who last modified each line of a file, and when. Despite the name, it is not about blaming — it is about understanding.',
        },
        {
          title: 'Blame a file',
          explanation: 'See the author and commit for every line.',
          command: 'git blame src/App.tsx',
        },
        {
          title: 'Reading the output',
          explanation: 'Each line shows: commit hash | author | date | line number | code. This tells you exactly who wrote each line and when.',
        },
        {
          title: 'When to use it',
          explanation: '"Who changed the login logic?" "When was this API endpoint added?" "Why is this code here?" — blame answers all of these.',
        },
      ],
    },
    {
      type: 'command-exercise',
      prompt: 'Find out who last modified each line of a file called "Header.tsx".',
      acceptedAnswers: [
        'git blame Header.tsx',
        'git blame src/Header.tsx',
      ],
      hints: [
        'Use "git blame" followed by the filename',
        'git blame Header.tsx',
      ],
      explanation: '"git blame" is your detective tool. It shows the commit, author, and date for every single line in a file.',
    },
    {
      type: 'content',
      title: 'git show & git diff — What Actually Changed?',
      items: [
        {
          title: 'git show — see a specific commit',
          explanation: 'Shows the full details of a commit — the message, author, and exact code changes.',
          command: 'git show abc1234',
        },
        {
          title: 'git diff — compare changes',
          explanation: 'Shows the difference between two states. Without arguments, shows your uncommitted changes.',
          command: 'git diff',
        },
        {
          title: 'Compare two branches',
          explanation: 'See what is different between your branch and main.',
          command: 'git diff main..feature/search',
        },
        {
          title: 'Reading diffs',
          explanation: 'Lines starting with + (green) are additions. Lines starting with - (red) are deletions. This is exactly what you see in GitHub PRs.',
        },
      ],
    },
    {
      type: 'command-exercise',
      prompt: 'View the details and changes of a specific commit with hash abc1234.',
      acceptedAnswers: ['git show abc1234'],
      hints: [
        'Use "git show" followed by the commit hash',
        'git show abc1234',
      ],
      explanation: '"git show" displays the full commit — message, author, date, and the exact code diff. It is like opening a single commit on GitHub.',
    },
    {
      type: 'multiple-choice',
      situation: 'A teammate asks: "When was the payment feature added and who built it?" What is the fastest way to find out?',
      options: [
        'Search through every file manually',
        'Ask everyone on the team',
        'git log --oneline and look for a commit about "payment", then git show that commit',
        'Check the project management tool and hope it is documented',
      ],
      correctAnswer: 2,
      explanation: 'Git log tells you when every change was made and by whom. Search the log for relevant commits, then use git show to see the details.',
    },
    {
      type: 'scenario',
      title: 'Investigation Mode',
      situation: 'Something broke on the dashboard page. Use Git history to investigate what changed recently.',
      steps: [
        {
          prompt: 'View the last 5 commits to see recent activity:',
          acceptedAnswers: [
            'git log --oneline -5',
            'git log -5 --oneline',
            'git log --oneline -n 5',
          ],
          hint: 'Use git log --oneline -5',
        },
        {
          prompt: 'Check who last modified Dashboard.tsx:',
          acceptedAnswers: [
            'git blame Dashboard.tsx',
            'git blame src/Dashboard.tsx',
          ],
          hint: 'Use git blame Dashboard.tsx',
        },
        {
          prompt: 'You spotted a suspicious commit hash def5678. View its full details:',
          acceptedAnswers: ['git show def5678'],
          hint: 'Use git show def5678',
        },
      ],
      completionMessage: 'Detective work done! log → blame → show is the classic investigation workflow. You will use this pattern all the time.',
    },
  ],
  completed: false,
};
