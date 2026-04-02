import type { Lesson } from './types.js';

export const lesson: Lesson = {
  id: '06-rewriting-history',
  title: 'Rewriting History',
  description: 'Learn to amend commits and clean up your commit history with interactive rebase.',
  difficulty: 'intermediate',
  steps: [
    {
      type: 'content',
      title: 'Amending Commits',
      items: [
        {
          title: 'Fix the last commit message',
          explanation: 'Made a typo in your commit message? Fix it without creating a new commit.',
          command: 'git commit --amend -m "Fixed commit message"',
        },
        {
          title: 'Add forgotten files to last commit',
          explanation: 'Stage the forgotten file, then amend to include it in the previous commit.',
          command: 'git add forgotten-file.tsx && git commit --amend --no-edit',
        },
        {
          title: 'WARNING: Only amend unpushed commits!',
          explanation: "Amending rewrites history. If you've already pushed, use a new commit instead. Rewriting pushed commits causes problems for teammates.",
        },
      ],
    },
    {
      type: 'command-exercise',
      prompt: 'You just committed but the message has a typo. Fix it to say "Add search feature".',
      acceptedAnswers: [
        'git commit --amend -m "Add search feature"',
        "git commit --amend -m 'Add search feature'",
      ],
      hints: [
        'Use git commit --amend -m with the corrected message',
        'The --amend flag modifies the most recent commit',
      ],
      explanation: '"--amend" replaces the last commit entirely. The old commit is gone, replaced by a new one with the correct message.',
    },
    {
      type: 'content',
      title: 'Interactive Rebase',
      items: [
        {
          title: 'What is interactive rebase?',
          explanation: 'Lets you edit, reorder, squash, or drop commits in your branch history. Think of it as editing a playlist of commits.',
        },
        {
          title: 'Start an interactive rebase',
          explanation: 'This opens an editor showing your last 3 commits. Change "pick" to the action you want.',
          command: 'git rebase -i HEAD~3',
        },
        {
          title: 'Common rebase actions',
          explanation: 'pick = keep as is, reword = change message, squash = merge into previous commit, drop = delete the commit.',
        },
        {
          title: 'When to use it',
          explanation: 'Clean up messy "WIP" commits before creating a Pull Request. Squash 5 small commits into 1 clean one.',
        },
      ],
    },
    {
      type: 'command-exercise',
      prompt: 'You have 4 messy commits you want to clean up before making a PR. Start an interactive rebase for the last 4 commits.',
      acceptedAnswers: [
        'git rebase -i HEAD~4',
        'git rebase -i head~4',
        'git rebase --interactive HEAD~4',
      ],
      hints: [
        'Use "git rebase -i" followed by how far back to go',
        'HEAD~4 means "the last 4 commits"',
      ],
      explanation: 'This opens an editor where you can squash, reorder, or edit those 4 commits. Perfect for cleaning up before a PR!',
    },
    {
      type: 'multiple-choice',
      situation: 'You have these commits on your feature branch: "WIP", "more WIP", "fix typo", "actually add the feature". You want to create a clean PR. What should you do?',
      options: [
        'Push all 4 commits as-is',
        'Use git rebase -i to squash them into one clean commit',
        'Delete the branch and start over',
        'Use git reset --hard to remove them all',
      ],
      correctAnswer: 1,
      explanation: 'Interactive rebase lets you squash all 4 into one clean commit like "Add search feature". Reviewers love clean history!',
    },
    {
      type: 'multiple-choice',
      situation: 'When is it safe to rewrite history (amend or rebase)?',
      options: [
        'Anytime, history rewriting is always safe',
        'Only on commits that haven\'t been pushed yet (or on your own branch that nobody else uses)',
        'Only on the main branch',
        'Never, you should never rewrite history',
      ],
      correctAnswer: 1,
      explanation: 'Rewriting history changes commit hashes. If others have already pulled those commits, you\'ll create conflicts. Only rewrite unpushed commits or commits on your private branch.',
    },
  ],
  completed: false,
};
