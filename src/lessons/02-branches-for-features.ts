import type { Lesson } from './types.js';

export const lesson: Lesson = {
  id: '02-branches-for-features',
  title: 'Lesson 2: Working on Features (Branches)',
  description: 'Learn why and how to use branches when building new features with AI assistance.',
  contentTitle: 'Why Branches Matter',
  content: [
    {
      title: 'What is a branch?',
      explanation: 'A branch is like a parallel version of your code. You can experiment without breaking the main version.',
    },
    {
      title: 'Why use branches?',
      explanation: 'When AI helps you build a new feature, work on a branch so you can test it before merging into main. If something breaks, main is still safe.',
    },
    {
      title: 'Create a new branch',
      explanation: 'Make a new branch for your feature. Give it a descriptive name.',
      command: 'git checkout -b feature/user-profile',
    },
    {
      title: 'Work normally',
      explanation: 'Ask the AI to build your feature. Use git add, commit, and push as usual.',
      command: 'git add . && git commit -m "Add profile page"',
    },
    {
      title: 'Push your branch',
      explanation: 'Upload your branch to GitHub so others can see it.',
      command: 'git push -u origin feature/user-profile',
    },
    {
      title: 'Switch branches',
      explanation: 'Move back to main or another branch.',
      command: 'git switch main',
    },
  ],
  knowledgeCheck: {
    situation: 'You\'re about to ask Claude Code to build a new payment checkout feature. Your teammate is working on the homepage redesign. What should you do before asking Claude to start coding?',
    options: [
      'Nothing - just start coding on main',
      'Create a new branch: git checkout -b feature/checkout',
      'Delete your teammate\'s changes first',
      'Wait for your teammate to finish',
    ],
    correctAnswer: 1,
    explanation: 'Create a new branch! This keeps your checkout feature separate from your teammate\'s homepage work. You can both work in parallel without conflicts. When you\'re done, you\'ll merge your branches separately.',
  },
  completed: false,
};
