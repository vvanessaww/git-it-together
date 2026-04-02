import type { Lesson } from './types.js';

export const lesson: Lesson = {
  id: '01-ai-workflow-basics',
  title: 'After AI Makes Changes',
  description: 'Learn what to do after Claude Code, Cursor, or another AI tool edits your files.',
  difficulty: 'beginner',
  steps: [
    {
      type: 'content',
      title: 'The AI to Git Workflow',
      items: [
        {
          title: '1. Check what changed',
          explanation: 'Before saving changes, see what the AI modified.',
          command: 'git status',
        },
        {
          title: '2. Review the changes',
          explanation: "Look at the actual code differences to make sure they're correct.",
          command: 'git diff',
        },
        {
          title: '3. Stage the files',
          explanation: 'Tell Git which changes you want to save.',
          command: 'git add .',
        },
        {
          title: '4. Save a snapshot (commit)',
          explanation: 'Create a save point with a message describing what changed.',
          command: 'git commit -m "Add user profile page"',
        },
        {
          title: '5. Upload to GitHub',
          explanation: 'Share your changes with your team.',
          command: 'git push',
        },
      ],
    },
    {
      type: 'command-exercise',
      prompt: 'The AI just edited some files. What command do you run first to see which files changed?',
      acceptedAnswers: ['git status'],
      hints: [
        'It starts with "git"...',
        'Think about checking the "status" of your files',
      ],
      explanation: '"git status" shows you which files have been modified, added, or deleted. Always check this first!',
    },
    {
      type: 'command-exercise',
      prompt: 'You reviewed the changes and they look good. Now stage ALL changed files for commit.',
      acceptedAnswers: ['git add .', 'git add -A', 'git add --all'],
      hints: [
        'Use "git add" with something that means "everything"',
        'The dot (.) means "all files in current directory"',
      ],
      explanation: '"git add ." stages all modified and new files. You can also stage specific files with "git add filename.tsx".',
    },
    {
      type: 'command-exercise',
      prompt: 'Now commit your staged changes with the message "Add login page".',
      acceptedAnswers: [
        'git commit -m "Add login page"',
        "git commit -m 'Add login page'",
      ],
      hints: [
        'Use git commit with the -m flag for a message',
        'Put your message in quotes after -m',
      ],
      explanation: 'The -m flag lets you write your commit message inline. Always write descriptive messages!',
    },
    {
      type: 'multiple-choice',
      situation: 'Claude Code just created 3 new files for your login feature. You reviewed the code and it looks good. What should you do first?',
      options: [
        'git push (upload immediately)',
        'git commit -m "add login" (save without staging)',
        'git status (check what changed)',
        'git pull (download changes)',
      ],
      correctAnswer: 2,
      explanation: 'Always start with "git status" to see what files changed. Then: git add . \u2192 git commit -m "..." \u2192 git push',
    },
    {
      type: 'scenario',
      title: 'Full Workflow Practice',
      situation: 'Cursor just finished building a new navbar component. You checked the code and it looks great. Walk through the complete workflow to save and upload your changes.',
      steps: [
        {
          prompt: 'First, check which files were changed:',
          acceptedAnswers: ['git status'],
          hint: 'Use git status to see changed files',
        },
        {
          prompt: 'Stage all the changes:',
          acceptedAnswers: ['git add .', 'git add -A', 'git add --all'],
          hint: 'Use git add with . to stage everything',
        },
        {
          prompt: 'Commit with the message "Add navbar component":',
          acceptedAnswers: [
            'git commit -m "Add navbar component"',
            "git commit -m 'Add navbar component'",
          ],
          hint: 'Use git commit -m with your message in quotes',
        },
        {
          prompt: 'Push your changes to GitHub:',
          acceptedAnswers: ['git push'],
          hint: 'Use git push to upload',
        },
      ],
      completionMessage: 'You nailed the full workflow! status \u2192 add \u2192 commit \u2192 push. This is the bread and butter of Git.',
    },
  ],
  completed: false,
};
