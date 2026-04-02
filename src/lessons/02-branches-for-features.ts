import type { Lesson } from './types.js';

export const lesson: Lesson = {
  id: '02-branches-for-features',
  title: 'Working on Features (Branches)',
  description: 'Learn why and how to use branches when building new features with AI assistance.',
  difficulty: 'beginner',
  steps: [
    {
      type: 'content',
      title: 'Why Branches Matter',
      items: [
        {
          title: 'What is a branch?',
          explanation: 'A branch is like a parallel version of your code. You can experiment without breaking the main version.',
        },
        {
          title: 'Why use branches?',
          explanation: 'When AI helps you build a feature, work on a branch so you can test it before merging into main. If something breaks, main is still safe.',
        },
        {
          title: 'The golden rule',
          explanation: 'Never work directly on main. Always create a branch first!',
        },
      ],
    },
    {
      type: 'content',
      title: 'Branch Commands',
      items: [
        {
          title: 'Create and switch to a new branch',
          explanation: 'This creates a branch AND moves you onto it in one step.',
          command: 'git checkout -b feature/user-profile',
        },
        {
          title: 'See all your branches',
          explanation: 'Lists branches. The starred one is where you are now.',
          command: 'git branch',
        },
        {
          title: 'Switch between branches',
          explanation: 'Move to a different branch.',
          command: 'git switch main',
        },
        {
          title: 'Push your branch to GitHub',
          explanation: 'The -u flag links your local branch to the remote.',
          command: 'git push -u origin feature/user-profile',
        },
      ],
    },
    {
      type: 'command-exercise',
      prompt: 'Create a new branch called "feature/checkout-page" and switch to it.',
      acceptedAnswers: [
        'git checkout -b feature/checkout-page',
        'git switch -c feature/checkout-page',
      ],
      hints: [
        'Use git checkout -b followed by the branch name',
        'The -b flag means "create a new branch"',
      ],
      explanation: '"git checkout -b" creates and switches in one command. "git switch -c" does the same thing with newer syntax.',
    },
    {
      type: 'command-exercise',
      prompt: 'You want to see all your local branches. What command do you use?',
      acceptedAnswers: ['git branch', 'git branch -a', 'git branch --list'],
      hints: [
        'It starts with "git branch"',
        'Just "git branch" with nothing else works!',
      ],
      explanation: '"git branch" lists all local branches. Add -a to also see remote branches.',
    },
    {
      type: 'command-exercise',
      prompt: 'Switch back to the main branch.',
      acceptedAnswers: ['git switch main', 'git checkout main'],
      hints: [
        'Use git switch or git checkout',
        'The branch name is "main"',
      ],
      explanation: '"git switch main" moves you back to the main branch. Your feature branch is still there!',
    },
    {
      type: 'multiple-choice',
      situation: "You're about to ask Claude Code to build a payment checkout feature. Your teammate is working on the homepage. What should you do before the AI starts coding?",
      options: [
        'Nothing - just start coding on main',
        'Create a new branch: git checkout -b feature/checkout',
        "Delete your teammate's changes first",
        'Wait for your teammate to finish',
      ],
      correctAnswer: 1,
      explanation: "Create a branch! This keeps your checkout feature separate from your teammate's work. You can both work in parallel.",
    },
    {
      type: 'scenario',
      title: 'Feature Branch Workflow',
      situation: 'You need to build a user settings page. Walk through the complete branch workflow.',
      steps: [
        {
          prompt: 'Create and switch to a new branch called "feature/settings-page":',
          acceptedAnswers: [
            'git checkout -b feature/settings-page',
            'git switch -c feature/settings-page',
          ],
          hint: 'Use git checkout -b feature/settings-page',
        },
        {
          prompt: 'After the AI builds the page, stage all files:',
          acceptedAnswers: ['git add .', 'git add -A', 'git add --all'],
          hint: 'Use git add . to stage everything',
        },
        {
          prompt: 'Commit with message "Add settings page":',
          acceptedAnswers: [
            'git commit -m "Add settings page"',
            "git commit -m 'Add settings page'",
          ],
          hint: 'Use git commit -m "Add settings page"',
        },
        {
          prompt: 'Push your branch to GitHub for the first time:',
          acceptedAnswers: [
            'git push -u origin feature/settings-page',
            'git push --set-upstream origin feature/settings-page',
          ],
          hint: 'Use git push -u origin followed by your branch name',
        },
      ],
      completionMessage: 'Branch workflow mastered! Now you can create a Pull Request on GitHub to merge your feature into main.',
    },
  ],
  completed: false,
};
