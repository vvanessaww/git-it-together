import type { Lesson } from './types.js';

export const lesson: Lesson = {
  id: '03-merge-conflicts',
  title: 'Handling Merge Conflicts',
  description: "Learn what to do when Git says there's a conflict (don't panic!).",
  difficulty: 'beginner',
  steps: [
    {
      type: 'content',
      title: 'Understanding Conflicts',
      items: [
        {
          title: 'What is a merge conflict?',
          explanation: "When two people (or you and AI) edit the same part of a file differently, Git doesn't know which version to keep.",
        },
        {
          title: 'When do conflicts happen?',
          explanation: 'Usually when you pull changes from GitHub and someone modified the same file you did.',
          command: 'git pull',
        },
        {
          title: 'What conflict markers look like',
          explanation: '<<<<<<< HEAD marks YOUR version. ======= separates the two. >>>>>>> marks THEIR version. Delete the markers and keep the right code.',
        },
      ],
    },
    {
      type: 'multiple-choice',
      situation: 'You run "git pull" and see: CONFLICT in HomePage.tsx. You open the file and see <<<<<<< HEAD markers. What does this mean?',
      options: [
        'Your file is corrupted - delete it and start over',
        'Git is showing two conflicting versions - you need to choose which code to keep',
        'Someone deleted your code - restore it from backup',
        'GitHub is down - try again later',
      ],
      correctAnswer: 1,
      explanation: 'The markers show TWO versions of the same code. Between <<<<<< and ====== is YOUR version. Between ====== and >>>>>> is THEIR version.',
    },
    {
      type: 'content',
      title: 'How to Fix Conflicts',
      items: [
        {
          title: 'Step 1: Open the file',
          explanation: 'Open the conflicted file in your editor. Look for the <<<<<<< markers.',
        },
        {
          title: 'Step 2: Choose the right code',
          explanation: 'Keep the version you want (or combine both). Delete ALL the conflict markers.',
        },
        {
          title: 'Step 3: Stage the fix',
          explanation: 'After fixing, tell Git the conflict is resolved.',
          command: 'git add HomePage.tsx',
        },
        {
          title: 'Step 4: Complete the merge',
          explanation: 'Commit to finalize the resolved conflict.',
          command: 'git commit -m "Resolve conflict in HomePage.tsx"',
        },
        {
          title: 'Pro tip: Ask AI for help!',
          explanation: 'Paste the conflicted code into Claude and say: "Help me resolve this merge conflict."',
        },
      ],
    },
    {
      type: 'command-exercise',
      prompt: "You've fixed the conflict markers in Header.tsx. Now mark it as resolved.",
      acceptedAnswers: ['git add Header.tsx', 'git add header.tsx'],
      hints: [
        'Use git add with the specific filename',
        'Stage the fixed file: git add Header.tsx',
      ],
      explanation: '"git add" on a conflicted file tells Git you\'ve resolved it. Then you can commit.',
    },
    {
      type: 'command-exercise',
      prompt: 'After resolving and staging, complete the merge with a commit message.',
      acceptedAnswers: [
        'git commit -m "Resolve conflict in Header.tsx"',
        "git commit -m 'Resolve conflict in Header.tsx'",
        'git commit -m "Resolve merge conflict"',
        "git commit -m 'Resolve merge conflict'",
        'git commit -m "Fix merge conflict"',
        "git commit -m 'Fix merge conflict'",
        'git commit -m "resolve conflict in Header.tsx"',
        'git commit -m "resolve merge conflict"',
        'git commit -m "fix merge conflict"',
      ],
      hints: [
        'Use git commit -m with a descriptive message',
        'Something like "Resolve conflict in Header.tsx"',
      ],
      explanation: 'A clear commit message helps your team understand what was resolved.',
    },
    {
      type: 'multiple-choice',
      situation: "What's the BEST strategy to minimize merge conflicts?",
      options: [
        'Never pull from GitHub',
        'Always work on main so there are no branches to merge',
        'Pull frequently and communicate with your team about which files you are editing',
        'Delete the repo and re-clone whenever there is a conflict',
      ],
      correctAnswer: 2,
      explanation: 'Pulling frequently means smaller, easier conflicts. Communicating helps avoid editing the same files simultaneously.',
    },
  ],
  completed: false,
};
