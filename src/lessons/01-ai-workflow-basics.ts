import type { Lesson } from './types.js';

export const lesson: Lesson = {
  id: '01-ai-workflow-basics',
  title: 'Lesson 1: After AI Makes Changes',
  description: 'Learn what to do after Claude Code, Cursor, or another AI tool edits your files.',
  contentTitle: 'The AI → Git Workflow',
  content: [
    {
      title: '1. Check what changed',
      explanation: 'Before saving changes, see what the AI modified.',
      command: 'git status',
    },
    {
      title: '2. Review the changes',
      explanation: 'Look at the actual code differences to make sure they\'re correct.',
      command: 'git diff',
    },
    {
      title: '3. Stage the files',
      explanation: 'Tell Git which changes you want to save (usually all of them after AI edits).',
      command: 'git add .',
    },
    {
      title: '4. Save a snapshot (commit)',
      explanation: 'Create a save point with a message describing what changed.',
      command: 'git commit -m "Add user profile page"',
    },
    {
      title: '5. Upload to GitHub',
      explanation: 'Share your changes with your team by pushing to the remote repository.',
      command: 'git push',
    },
  ],
  knowledgeCheck: {
    situation: 'Claude Code just created 3 new files for your login feature: LoginForm.tsx, useAuth.ts, and login.css. You reviewed the code and it looks good. What should you do first?',
    options: [
      'git push (upload immediately)',
      'git commit -m "add login" (save without staging)',
      'git status (check what changed)',
      'git pull (download changes)',
    ],
    correctAnswer: 2,
    explanation: 'Always start with "git status" to see what files changed. This helps you verify the AI touched the right files before saving them. Then you\'d do: git add . → git commit -m "..." → git push',
  },
  completed: false,
};
