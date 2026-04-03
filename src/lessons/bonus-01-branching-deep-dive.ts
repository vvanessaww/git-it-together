import type { Lesson } from './types.js';

export const lesson: Lesson = {
  id: 'bonus-01-branching-deep-dive',
  title: 'Branching Strategies',
  description: 'Go deeper into branching — naming conventions, pull requests, merge vs rebase, and team workflows.',
  difficulty: 'bonus',
  steps: [
    {
      type: 'content',
      title: 'Branch Naming Conventions',
      items: [
        {
          title: 'Use prefixes to describe the work',
          explanation: 'Good branch names tell your team what kind of work is happening at a glance.',
        },
        {
          title: 'feature/ — new functionality',
          explanation: 'For building something new.',
          command: 'git checkout -b feature/user-dashboard',
        },
        {
          title: 'fix/ — bug fixes',
          explanation: 'For fixing something broken.',
          command: 'git checkout -b fix/login-timeout',
        },
        {
          title: 'chore/ — maintenance tasks',
          explanation: 'For cleanup, dependency updates, config changes.',
          command: 'git checkout -b chore/update-dependencies',
        },
        {
          title: 'docs/ — documentation',
          explanation: 'For updating READMEs, guides, or comments.',
          command: 'git checkout -b docs/api-reference',
        },
      ],
    },
    {
      type: 'command-exercise',
      prompt: 'Create a branch for fixing a broken search bar.',
      acceptedAnswers: [
        'git checkout -b fix/search-bar',
        'git checkout -b fix/broken-search-bar',
        'git checkout -b fix/search',
        'git switch -c fix/search-bar',
        'git switch -c fix/broken-search-bar',
        'git switch -c fix/search',
      ],
      hints: [
        'Use the fix/ prefix since it is a bug fix',
        'git checkout -b fix/search-bar',
      ],
      explanation: 'The fix/ prefix immediately tells your team this branch addresses a bug. Descriptive names like "search-bar" help too.',
    },
    {
      type: 'content',
      title: 'Pull Requests (PRs)',
      items: [
        {
          title: 'What is a Pull Request?',
          explanation: 'A PR is a request to merge your branch into main. It lets your team review your code before it goes live.',
        },
        {
          title: 'Creating a PR from the command line',
          explanation: 'If you have the GitHub CLI (gh) installed, you can create PRs without leaving your terminal.',
          command: 'gh pr create --title "Add search feature" --body "Implements full-text search"',
        },
        {
          title: 'Reviewing a PR',
          explanation: 'Check out a teammate\'s PR locally to test it.',
          command: 'gh pr checkout 42',
        },
        {
          title: 'PR best practices',
          explanation: 'Keep PRs small and focused. One feature per PR. Write a clear description. Add screenshots for UI changes.',
        },
      ],
    },
    {
      type: 'multiple-choice',
      situation: 'Your feature branch has 15 changed files across 3 unrelated features. What should you do?',
      options: [
        'Submit one big PR with everything',
        'Split it into 3 separate branches and PRs, one per feature',
        'Push directly to main to avoid the hassle',
        'Delete the branch and start over from scratch',
      ],
      correctAnswer: 1,
      explanation: 'Small, focused PRs are easier to review and less likely to introduce bugs. Split unrelated work into separate branches.',
    },
    {
      type: 'content',
      title: 'Merge vs Rebase',
      items: [
        {
          title: 'git merge',
          explanation: 'Creates a merge commit that joins two branches. Preserves the full history of both branches.',
          command: 'git merge feature/search',
        },
        {
          title: 'git rebase',
          explanation: 'Replays your commits on top of the target branch. Creates a cleaner, linear history.',
          command: 'git rebase main',
        },
        {
          title: 'When to merge',
          explanation: 'Use merge for shared branches and when you want to preserve the history of when things happened.',
        },
        {
          title: 'When to rebase',
          explanation: 'Use rebase to keep your feature branch up to date with main. Never rebase commits that others have pulled.',
        },
      ],
    },
    {
      type: 'multiple-choice',
      situation: 'Your feature branch is 20 commits behind main. You want to update it before creating a PR. What do you do?',
      options: [
        'Delete your branch and start over',
        'git rebase main — replay your commits on top of the latest main',
        'git push --force main — overwrite main with your branch',
        'Ignore it and create the PR anyway',
      ],
      correctAnswer: 1,
      explanation: 'Rebasing your feature branch onto main keeps your history clean and ensures your code works with the latest changes.',
    },
    {
      type: 'command-exercise',
      prompt: 'You want to update your feature branch with the latest changes from main. Rebase onto main.',
      acceptedAnswers: ['git rebase main'],
      hints: [
        'Use git rebase followed by the branch name',
        'git rebase main',
      ],
      explanation: 'This replays your feature commits on top of the latest main, keeping your branch current.',
    },
    {
      type: 'scenario',
      title: 'PR Workflow',
      situation: 'You finished a feature on your branch. Walk through the full PR workflow: update from main, push, and create a PR.',
      steps: [
        {
          prompt: 'First, fetch the latest changes from the remote:',
          acceptedAnswers: ['git fetch', 'git fetch origin'],
          hint: 'Use git fetch to download latest remote state',
        },
        {
          prompt: 'Rebase your branch onto the latest main:',
          acceptedAnswers: ['git rebase main', 'git rebase origin/main'],
          hint: 'Use git rebase main',
        },
        {
          prompt: 'Push your updated branch (you may need --force-with-lease since you rebased):',
          acceptedAnswers: [
            'git push --force-with-lease',
            'git push -f',
            'git push --force',
            'git push --force-with-lease origin',
          ],
          hint: 'Use git push --force-with-lease (safer than --force)',
        },
      ],
      completionMessage: 'Great workflow! fetch → rebase → push is the standard way to keep your branch clean before a PR.',
    },
  ],
  completed: false,
};
