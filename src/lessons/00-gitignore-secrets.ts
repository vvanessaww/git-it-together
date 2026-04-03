import type { Lesson } from './types.js';

export const lesson: Lesson = {
  id: '00-gitignore-secrets',
  title: '.gitignore & Keeping Secrets Safe',
  description: 'Learn what should NEVER be committed and how to protect sensitive data.',
  difficulty: 'getting-started',
  steps: [
    {
      type: 'content',
      title: 'Why This Matters',
      items: [
        {
          title: 'Git remembers everything',
          explanation: 'Every file you commit is stored in Git history forever. Even if you delete it later, it is still in the history. This is dangerous for sensitive files.',
        },
        {
          title: 'Real-world horror stories',
          explanation: 'Companies have leaked API keys, database passwords, and cloud credentials by committing them to Git. One leaked AWS key can cost thousands of dollars in minutes.',
        },
        {
          title: 'The rule: never commit secrets',
          explanation: 'API keys, passwords, .env files, private keys, and tokens should NEVER be in Git. Period.',
        },
      ],
    },
    {
      type: 'multiple-choice',
      situation: 'You are working on a project and the AI created a .env file with your database password. You run "git add ." to stage everything. What is the risk?',
      options: [
        'No risk — .env files are automatically excluded',
        'The password would be committed to Git history and visible to anyone with repo access — potentially forever',
        'Git will warn you and refuse to add it',
        'The password is encrypted by Git automatically',
      ],
      correctAnswer: 1,
      explanation: 'Git does NOT automatically exclude anything. "git add ." stages everything, including .env files with secrets. Once pushed, anyone with repo access can see it — and it stays in history even after deletion.',
    },
    {
      type: 'content',
      title: 'The .gitignore File',
      items: [
        {
          title: 'What is .gitignore?',
          explanation: 'A special file that tells Git which files to ignore completely. Git will pretend these files do not exist.',
        },
        {
          title: 'Common entries you should always have',
          explanation: 'These should be in every project:',
          command: '# .gitignore\n.env\nnode_modules/\n.DS_Store\n*.log',
        },
        {
          title: '.env — environment variables',
          explanation: 'Contains API keys, database URLs, and secrets. Every project should have this in .gitignore.',
        },
        {
          title: 'node_modules/ — installed packages',
          explanation: 'The folder where npm installs dependencies. Huge and not needed in Git since "npm install" recreates it.',
        },
        {
          title: '.DS_Store — Mac system files',
          explanation: 'macOS creates these invisible files in every folder. They are useless clutter in a repo.',
        },
      ],
    },
    {
      type: 'multiple-choice',
      situation: 'Which of these should NEVER be committed to Git?',
      options: [
        'README.md',
        'package.json',
        '.env (contains DATABASE_URL and API_KEY)',
        'src/App.tsx',
      ],
      correctAnswer: 2,
      explanation: '.env files contain secrets like API keys and database credentials. These should always be in .gitignore. README.md, package.json, and source code are safe to commit.',
    },
    {
      type: 'content',
      title: 'What to Do If You Accidentally Committed a Secret',
      items: [
        {
          title: 'Step 1: Do NOT just delete the file',
          explanation: 'Deleting the file and making a new commit does NOT remove it from Git history. The secret is still visible in past commits.',
        },
        {
          title: 'Step 2: Rotate the secret immediately',
          explanation: 'Go to the service (AWS, Stripe, etc.) and generate a new key. This makes the leaked key useless.',
        },
        {
          title: 'Step 3: Add the file to .gitignore',
          explanation: 'Prevent it from happening again.',
        },
        {
          title: 'Step 4: Ask for help cleaning history',
          explanation: 'Tools like git-filter-repo or BFG Repo Cleaner can scrub secrets from history. Ask a developer for help with this.',
        },
      ],
    },
    {
      type: 'multiple-choice',
      situation: 'You accidentally committed your AWS API key and pushed it to GitHub. You quickly delete the file and push again. Is the key safe now?',
      options: [
        'Yes — the file is deleted, so the key is gone',
        'No — the key is still visible in Git history and should be rotated immediately',
        'Yes — GitHub automatically detects and removes leaked keys',
        'No, but only people with admin access can see the history',
      ],
      correctAnswer: 1,
      explanation: 'Git history keeps EVERYTHING. Even deleted files are visible in past commits. You must rotate (change) the key immediately and treat it as compromised.',
    },
    {
      type: 'content',
      title: 'Safe Patterns',
      items: [
        {
          title: 'Use .env.example instead',
          explanation: 'Commit a .env.example file with placeholder values (no real secrets) so teammates know what variables they need.',
          command: '# .env.example\nDATABASE_URL=your_database_url_here\nAPI_KEY=your_api_key_here',
        },
        {
          title: 'Check before you commit',
          explanation: 'Always run git status before committing to see exactly which files you are about to save.',
          command: 'git status',
        },
        {
          title: 'Review with git diff',
          explanation: 'Look at the actual changes to make sure no secrets are in there.',
          command: 'git diff --staged',
        },
      ],
    },
    {
      type: 'scenario',
      title: 'Protecting Your Project',
      situation: 'You just cloned a new project and need to set up your environment safely. Walk through the secure setup.',
      steps: [
        {
          prompt: 'Check if the project already has a .gitignore by listing all files including hidden ones:',
          acceptedAnswers: ['ls -la', 'ls -al', 'ls -a'],
          hint: 'Use ls -la to see hidden files (starting with .)',
        },
        {
          prompt: 'Check git status to see if any sensitive files are being tracked:',
          acceptedAnswers: ['git status'],
          hint: 'Use git status',
        },
        {
          prompt: 'Review your staged changes before committing to make sure no secrets are included:',
          acceptedAnswers: ['git diff --staged', 'git diff --cached'],
          hint: 'Use git diff --staged to see what is about to be committed',
        },
      ],
      completionMessage: 'Great safety habits! Always check git status and git diff before committing. Your future self (and your company) will thank you.',
    },
  ],
  completed: false,
};
