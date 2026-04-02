import type { Lesson } from './types.js';

export const lesson: Lesson = {
  id: '09-cherry-pick-advanced',
  title: 'Cherry-pick and Advanced Workflows',
  description: 'Learn to copy specific commits between branches and master advanced Git workflows.',
  difficulty: 'advanced',
  steps: [
    {
      type: 'content',
      title: 'Cherry-picking Commits',
      items: [
        {
          title: 'What is cherry-pick?',
          explanation: 'Copy a specific commit from one branch to another without merging the entire branch. Like picking a single cherry from a tree.',
        },
        {
          title: 'When to use it',
          explanation: 'A bugfix was committed to the wrong branch. A feature commit from a WIP branch is needed in main. You want just one specific change.',
        },
        {
          title: 'Cherry-pick a commit',
          explanation: 'Apply a specific commit by its hash to your current branch.',
          command: 'git cherry-pick abc1234',
        },
        {
          title: 'Cherry-pick without committing',
          explanation: 'Apply the changes but don\'t commit yet. Useful when you want to modify them first.',
          command: 'git cherry-pick --no-commit abc1234',
        },
      ],
    },
    {
      type: 'command-exercise',
      prompt: 'A critical bugfix was committed on develop (hash: def5678) but you need it on main right now. Cherry-pick it.',
      acceptedAnswers: [
        'git cherry-pick def5678',
      ],
      hints: [
        'Use "git cherry-pick" followed by the commit hash',
        'git cherry-pick def5678',
      ],
      explanation: 'Cherry-pick copies that exact commit to your current branch. The original commit stays on develop too.',
    },
    {
      type: 'multiple-choice',
      situation: 'Your feature branch has 10 commits. Only 2 of them are needed for an urgent release. What\'s the best approach?',
      options: [
        'Merge the entire feature branch into release',
        'Cherry-pick just the 2 needed commits onto the release branch',
        'Copy and paste the code manually',
        'Wait for the feature to be complete',
      ],
      correctAnswer: 1,
      explanation: 'Cherry-pick lets you take exactly what you need. Merging the whole branch would bring in 8 unfinished commits.',
    },
    {
      type: 'content',
      title: 'Advanced Workflows: Git Worktrees',
      items: [
        {
          title: 'What are worktrees?',
          explanation: 'Multiple working directories for the same repo. Work on two branches simultaneously without stashing or committing.',
          command: 'git worktree add ../project-hotfix hotfix/urgent-bug',
        },
        {
          title: 'Why worktrees?',
          explanation: 'Run your feature branch in one terminal and test a bugfix in another. No context switching. No stashing.',
        },
        {
          title: 'List worktrees',
          explanation: 'See all active worktrees.',
          command: 'git worktree list',
        },
        {
          title: 'Remove a worktree',
          explanation: 'Clean up when done.',
          command: 'git worktree remove ../project-hotfix',
        },
      ],
    },
    {
      type: 'command-exercise',
      prompt: 'Create a worktree for the branch "hotfix/login-bug" in a directory called "../login-fix".',
      acceptedAnswers: [
        'git worktree add ../login-fix hotfix/login-bug',
      ],
      hints: [
        'Use "git worktree add" with a path and branch name',
        'git worktree add <path> <branch>',
      ],
      explanation: 'Now you have two working directories! You can cd into ../login-fix and work on the hotfix while your main directory stays on your feature branch.',
    },
    {
      type: 'content',
      title: 'Advanced Workflows: Git Tags',
      items: [
        {
          title: 'What are tags?',
          explanation: 'Named bookmarks for important commits. Usually used for releases (v1.0.0, v2.1.3).',
        },
        {
          title: 'Create a tag',
          explanation: 'Mark the current commit with a version tag.',
          command: 'git tag v1.0.0',
        },
        {
          title: 'Create an annotated tag (recommended)',
          explanation: 'Annotated tags store who created them and when.',
          command: 'git tag -a v1.0.0 -m "First stable release"',
        },
        {
          title: 'Push tags to remote',
          explanation: 'Tags must be pushed separately from commits.',
          command: 'git push --tags',
        },
      ],
    },
    {
      type: 'command-exercise',
      prompt: 'Create an annotated tag "v2.0.0" with the message "Major redesign release".',
      acceptedAnswers: [
        'git tag -a v2.0.0 -m "Major redesign release"',
        "git tag -a v2.0.0 -m 'Major redesign release'",
      ],
      hints: [
        'Use "git tag -a" for an annotated tag with -m for the message',
        'git tag -a v2.0.0 -m "Major redesign release"',
      ],
      explanation: 'Annotated tags are the standard for releases. They include the tagger, date, and message.',
    },
    {
      type: 'scenario',
      title: 'Release Day Workflow',
      situation: 'Your feature is done and merged to main. Time to tag the release and cherry-pick a last-minute fix.',
      steps: [
        {
          prompt: 'Switch to the main branch:',
          acceptedAnswers: ['git switch main', 'git checkout main'],
          hint: 'Use git switch main',
        },
        {
          prompt: 'A last-minute fix was committed on develop (hash: fix9876). Cherry-pick it:',
          acceptedAnswers: ['git cherry-pick fix9876'],
          hint: 'Use git cherry-pick fix9876',
        },
        {
          prompt: 'Tag this release as v3.0.0 with message "Q2 release":',
          acceptedAnswers: [
            'git tag -a v3.0.0 -m "Q2 release"',
            "git tag -a v3.0.0 -m 'Q2 release'",
          ],
          hint: 'Use git tag -a v3.0.0 -m "Q2 release"',
        },
        {
          prompt: 'Push everything including the tag:',
          acceptedAnswers: [
            'git push --tags',
            'git push && git push --tags',
            'git push origin --tags',
          ],
          hint: 'Use git push --tags',
        },
      ],
      completionMessage: 'You\'ve mastered advanced Git workflows! Cherry-pick, worktrees, and tags are power tools that make complex workflows manageable.',
    },
  ],
  completed: false,
};
