import type { Lesson } from './types.js';

export const lesson: Lesson = {
  id: '03-merge-conflicts',
  title: 'Lesson 3: Handling Merge Conflicts',
  description: 'Learn what to do when Git says there\'s a conflict (don\'t panic!).',
  contentTitle: 'Understanding Conflicts',
  content: [
    {
      title: 'What is a merge conflict?',
      explanation: 'When two people (or you and AI) edit the same part of a file differently, Git doesn\'t know which version to keep. You have to decide.',
    },
    {
      title: 'When do conflicts happen?',
      explanation: 'Usually when you pull changes from GitHub and someone modified the same file you did.',
      command: 'git pull',
    },
    {
      title: 'How to fix a conflict',
      explanation: 'Open the conflicted file. Look for markers like <<<<<<<, =======, and >>>>>>>. Choose which code to keep, remove the markers, then stage and commit.',
    },
    {
      title: 'Mark as resolved',
      explanation: 'After fixing the conflict, stage the file.',
      command: 'git add filename.tsx',
    },
    {
      title: 'Complete the merge',
      explanation: 'Commit the resolved conflict.',
      command: 'git commit -m "Resolve conflict in filename.tsx"',
    },
    {
      title: 'Pro tip: Ask AI for help',
      explanation: 'Paste the conflicted code into Claude Code and ask: "Help me resolve this merge conflict"',
    },
  ],
  knowledgeCheck: {
    situation: 'You run "git pull" and Git says: CONFLICT in HomePage.tsx. You open the file and see weird markers like <<<<<<< HEAD. What does this mean?',
    options: [
      'Your file is corrupted - delete it and start over',
      'Git is showing you conflicting changes - you need to choose which code to keep',
      'Someone deleted your code - restore it from backup',
      'GitHub is down - try again later',
    ],
    correctAnswer: 1,
    explanation: 'Those markers show you TWO versions of the same code. The part between <<<<<< and ====== is YOUR version. The part between ====== and >>>>>> is THEIR version. Delete the markers, choose or combine the code, then git add + commit.',
  },
  completed: false,
};
