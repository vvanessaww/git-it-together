import type { Lesson } from './types.js';

export const lesson: Lesson = {
  id: '07-reflog-recovery',
  title: 'Recovery with Reflog',
  description: 'Learn Git\'s secret safety net - the reflog. Recover "lost" commits and undo almost anything.',
  difficulty: 'advanced',
  steps: [
    {
      type: 'content',
      title: 'Git\'s Safety Net: The Reflog',
      items: [
        {
          title: 'What is the reflog?',
          explanation: 'The reflog records every time HEAD moves - every commit, checkout, rebase, reset. Even "deleted" commits are still there for ~90 days.',
        },
        {
          title: 'View the reflog',
          explanation: 'See a log of everywhere HEAD has been.',
          command: 'git reflog',
        },
        {
          title: 'Why it matters',
          explanation: 'Did you accidentally git reset --hard? Rebased and lost commits? The reflog lets you find and recover them.',
        },
        {
          title: 'Recover a lost commit',
          explanation: 'Find the commit hash in the reflog, then create a branch from it.',
          command: 'git branch recovery-branch abc1234',
        },
      ],
    },
    {
      type: 'command-exercise',
      prompt: 'You think you lost a commit after a bad rebase. View the reflog to find it.',
      acceptedAnswers: ['git reflog', 'git reflog show', 'git reflog show HEAD'],
      hints: [
        'The command is "git reflog"',
        'Just two words: git reflog',
      ],
      explanation: 'The reflog shows every position HEAD has been in. You\'ll see entries like "HEAD@{3}: commit: Add feature" with their hashes.',
    },
    {
      type: 'command-exercise',
      prompt: 'You found the lost commit at hash abc1234 in the reflog. Create a branch called "recovered" pointing to it.',
      acceptedAnswers: [
        'git branch recovered abc1234',
        'git checkout -b recovered abc1234',
        'git switch -c recovered abc1234',
      ],
      hints: [
        'Use "git branch <name> <hash>" to create a branch at a specific commit',
        'git branch recovered abc1234',
      ],
      explanation: 'Creating a branch at a commit hash "rescues" it. The commit and all its parents are now reachable and won\'t be garbage collected.',
    },
    {
      type: 'multiple-choice',
      situation: 'You ran "git reset --hard HEAD~3" and lost 3 commits. Can you get them back?',
      options: [
        'No, they are permanently deleted',
        'Yes, use git reflog to find the commit hashes, then git branch or git reset to recover',
        'Only if you pushed them to GitHub first',
        'Only if you had a backup',
      ],
      correctAnswer: 1,
      explanation: 'The reflog keeps track of where HEAD was before the reset. Find the hash of where you were, and you can reset back or create a branch there.',
    },
    {
      type: 'content',
      title: 'Reflog Recovery Patterns',
      items: [
        {
          title: 'Undo a bad reset',
          explanation: 'Reset back to where you were before.',
          command: 'git reset --hard HEAD@{1}',
        },
        {
          title: 'Undo a bad rebase',
          explanation: 'Find the pre-rebase state and reset to it.',
          command: 'git reset --hard ORIG_HEAD',
        },
        {
          title: 'Recover a deleted branch',
          explanation: 'Find the last commit of the deleted branch in reflog, then recreate it.',
          command: 'git branch my-branch HEAD@{5}',
        },
        {
          title: 'Reflog expiration',
          explanation: 'Reflog entries expire after 90 days (30 for unreachable commits). Don\'t wait too long to recover!',
        },
      ],
    },
    {
      type: 'scenario',
      title: 'Disaster Recovery',
      situation: 'You accidentally ran "git reset --hard HEAD~3" and lost your last 3 commits. Walk through the recovery process.',
      steps: [
        {
          prompt: 'First, check the reflog to find your lost commits:',
          acceptedAnswers: ['git reflog'],
          hint: 'Use git reflog to see HEAD history',
        },
        {
          prompt: 'You see the commit you want was at HEAD@{1}. Reset back to it:',
          acceptedAnswers: [
            'git reset --hard HEAD@{1}',
            'git reset --hard head@{1}',
          ],
          hint: 'Use git reset --hard HEAD@{1} to go back to that state',
        },
      ],
      completionMessage: 'Crisis averted! The reflog is your time machine. Remember: in Git, almost nothing is truly lost if you act within 90 days.',
    },
  ],
  completed: false,
};
