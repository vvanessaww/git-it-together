import type { Lesson } from './types.js';

export const lesson: Lesson = {
  id: '00-cloning-setup',
  title: 'Cloning & Getting Started',
  description: 'Learn how to get a project onto your computer and set up Git for the first time.',
  difficulty: 'getting-started',
  steps: [
    {
      type: 'content',
      title: 'What is Cloning?',
      items: [
        {
          title: 'Your code lives on GitHub',
          explanation: 'GitHub is like Google Drive for code. Projects live there as "repositories" (repos). To work on one, you need a copy on your computer.',
        },
        {
          title: 'git clone = download a project',
          explanation: 'Cloning downloads the entire project — all files, all history — to your machine.',
          command: 'git clone https://github.com/username/my-project.git',
        },
        {
          title: 'After cloning, cd into the folder',
          explanation: 'Clone creates a new folder with the project name. You need to enter it.',
          command: 'cd my-project',
        },
        {
          title: 'You only clone once',
          explanation: 'After the first clone, you use "git pull" to get updates. Cloning is just the initial download.',
        },
      ],
    },
    {
      type: 'command-exercise',
      prompt: 'Clone a project from GitHub at https://github.com/team/dashboard.git',
      acceptedAnswers: [
        'git clone https://github.com/team/dashboard.git',
        'git clone https://github.com/team/dashboard',
      ],
      hints: [
        'Use "git clone" followed by the URL',
        'git clone https://github.com/team/dashboard.git',
      ],
      explanation: '"git clone" downloads the entire repository. You can find the URL on any GitHub repo page by clicking the green "Code" button.',
    },
    {
      type: 'command-exercise',
      prompt: 'You just cloned the project. Now enter the project folder called "dashboard".',
      acceptedAnswers: ['cd dashboard', 'cd dashboard/'],
      hints: [
        'Use cd followed by the folder name',
        'cd dashboard',
      ],
      explanation: 'After cloning, you always need to cd into the project folder before running any commands.',
    },
    {
      type: 'content',
      title: 'First-Time Git Setup',
      items: [
        {
          title: 'Tell Git who you are',
          explanation: 'Git needs your name and email to label your commits. You only do this once on each computer.',
          command: 'git config --global user.name "Your Name"',
        },
        {
          title: 'Set your email',
          explanation: 'Use the same email as your GitHub account.',
          command: 'git config --global user.email "you@example.com"',
        },
        {
          title: 'Check your settings',
          explanation: 'Verify your configuration is correct.',
          command: 'git config --list',
        },
      ],
    },
    {
      type: 'command-exercise',
      prompt: 'Set your Git username to "Alex Chen".',
      acceptedAnswers: [
        'git config --global user.name "Alex Chen"',
        "git config --global user.name 'Alex Chen'",
      ],
      hints: [
        'Use git config --global user.name with your name in quotes',
        'git config --global user.name "Alex Chen"',
      ],
      explanation: 'The --global flag means this applies to all your repos on this computer. Without it, the setting only applies to the current repo.',
    },
    {
      type: 'content',
      title: 'Getting Updates',
      items: [
        {
          title: 'git pull = download latest changes',
          explanation: 'After the initial clone, use pull to get new changes your team has pushed.',
          command: 'git pull',
        },
        {
          title: 'When to pull',
          explanation: 'Pull before starting work each day. Pull before creating a new branch. Pull if someone says "I just pushed changes."',
        },
        {
          title: 'git pull vs git clone',
          explanation: 'Clone = first time download of a repo. Pull = get updates for a repo you already have.',
        },
      ],
    },
    {
      type: 'multiple-choice',
      situation: 'Your teammate says "I pushed the new design files to the repo." You already have the repo cloned on your machine. What do you do?',
      options: [
        'git clone the repo again',
        'git pull to download their changes',
        'Go to GitHub and download the files manually',
        'Ask them to email you the files',
      ],
      correctAnswer: 1,
      explanation: 'Since you already have the repo, just run "git pull" to get the latest changes. You only need to clone once!',
    },
    {
      type: 'scenario',
      title: 'Your First Day on a Project',
      situation: 'It is your first day and you need to get the team project set up on your machine. Walk through the complete setup.',
      steps: [
        {
          prompt: 'Clone the project from https://github.com/acme/webapp.git:',
          acceptedAnswers: [
            'git clone https://github.com/acme/webapp.git',
            'git clone https://github.com/acme/webapp',
          ],
          hint: 'Use git clone with the URL',
        },
        {
          prompt: 'Enter the project folder:',
          acceptedAnswers: ['cd webapp', 'cd webapp/'],
          hint: 'cd webapp',
        },
        {
          prompt: 'Check which branch you are on:',
          acceptedAnswers: ['git status', 'git branch'],
          hint: 'Use git status or git branch',
        },
      ],
      completionMessage: 'You are all set up! This is exactly what your first day on a new project looks like. Clone, cd in, and start working.',
    },
  ],
  completed: false,
};
