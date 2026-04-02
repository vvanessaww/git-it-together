import type { Lesson } from './types.js';

export const lesson: Lesson = {
  id: '05-stashing-work',
  title: 'Stashing Work',
  description: 'Learn to temporarily shelve changes when you need to switch context quickly.',
  difficulty: 'intermediate',
  steps: [
    {
      type: 'content',
      title: 'What is Stashing?',
      items: [
        {
          title: 'The problem',
          explanation: "You're in the middle of building a feature, but you need to switch branches to fix a bug. You can't switch with uncommitted changes.",
        },
        {
          title: 'The solution: git stash',
          explanation: 'Stash temporarily saves your uncommitted changes and gives you a clean working directory. Like putting your work in a drawer.',
          command: 'git stash',
        },
        {
          title: 'Get your changes back',
          explanation: 'After you finish the other task, restore your stashed changes.',
          command: 'git stash pop',
        },
      ],
    },
    {
      type: 'command-exercise',
      prompt: "You're mid-feature but need to switch branches. Save your uncommitted changes temporarily.",
      acceptedAnswers: ['git stash', 'git stash push'],
      hints: [
        'Use "git stash" to temporarily save changes',
        'Just "git stash" by itself works!',
      ],
      explanation: '"git stash" saves your uncommitted changes and reverts your working directory to the last commit. Your changes are safely stored.',
    },
    {
      type: 'content',
      title: 'Advanced Stash Commands',
      items: [
        {
          title: 'Stash with a description',
          explanation: 'Give your stash a name so you remember what it was.',
          command: 'git stash push -m "half-done navbar styling"',
        },
        {
          title: 'See all your stashes',
          explanation: 'View everything in your stash drawer.',
          command: 'git stash list',
        },
        {
          title: 'Apply without removing from stash',
          explanation: '"pop" restores AND removes from stash. "apply" restores but keeps it in the stash.',
          command: 'git stash apply',
        },
        {
          title: 'Drop a stash you no longer need',
          explanation: 'Remove a stash entry without applying it.',
          command: 'git stash drop',
        },
      ],
    },
    {
      type: 'command-exercise',
      prompt: 'Stash your current changes with the description "WIP: dashboard layout".',
      acceptedAnswers: [
        'git stash push -m "WIP: dashboard layout"',
        "git stash push -m 'WIP: dashboard layout'",
        'git stash -m "WIP: dashboard layout"',
        "git stash -m 'WIP: dashboard layout'",
      ],
      hints: [
        'Use git stash push -m with a message in quotes',
        'Similar to commit messages: git stash push -m "your message"',
      ],
      explanation: 'Named stashes are much easier to find later. Always use -m when you have multiple stashes!',
    },
    {
      type: 'command-exercise',
      prompt: 'You fixed the bug on another branch and switched back. Now restore your stashed changes.',
      acceptedAnswers: ['git stash pop', 'git stash apply'],
      hints: [
        'Use "git stash pop" to restore and remove, or "apply" to just restore',
        '"pop" is the most common choice',
      ],
      explanation: '"git stash pop" restores your changes AND removes them from the stash. "git stash apply" restores but keeps the stash entry.',
    },
    {
      type: 'scenario',
      title: 'Urgent Bug Fix Workflow',
      situation: "You're building a dashboard feature when your PM reports a critical bug in production. Stash your work, fix the bug, then get back to your feature.",
      steps: [
        {
          prompt: 'Save your in-progress dashboard work:',
          acceptedAnswers: [
            'git stash',
            'git stash push',
            'git stash push -m "WIP: dashboard"',
            "git stash push -m 'WIP: dashboard'",
          ],
          hint: 'Use git stash to save your changes temporarily',
        },
        {
          prompt: 'Switch to the main branch to start the bugfix:',
          acceptedAnswers: ['git switch main', 'git checkout main'],
          hint: 'Use git switch main',
        },
        {
          prompt: 'Create a bugfix branch:',
          acceptedAnswers: [
            'git checkout -b fix/critical-bug',
            'git switch -c fix/critical-bug',
            'git checkout -b hotfix/critical-bug',
            'git switch -c hotfix/critical-bug',
            'git checkout -b bugfix/critical-bug',
            'git switch -c bugfix/critical-bug',
          ],
          hint: 'Create a new branch like fix/critical-bug',
        },
        {
          prompt: 'After fixing and merging, switch back to your feature branch and restore your stash:',
          acceptedAnswers: ['git stash pop'],
          hint: 'Use git stash pop to get your changes back',
        },
      ],
      completionMessage: 'Smooth context-switching! Stash lets you jump between tasks without losing work or making messy "WIP" commits.',
    },
  ],
  completed: false,
};
