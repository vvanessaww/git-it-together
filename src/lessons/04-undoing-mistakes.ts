import type { Lesson } from './types.js';

export const lesson: Lesson = {
  id: '04-undoing-mistakes',
  title: 'Undoing Mistakes',
  description: 'Learn how to undo changes at every stage - unstage files, revert commits, and recover from errors.',
  difficulty: 'intermediate',
  steps: [
    {
      type: 'content',
      title: 'The Undo Toolkit',
      items: [
        {
          title: 'Discard uncommitted changes to a file',
          explanation: 'Throws away your working changes and restores the file to the last commit.',
          command: 'git checkout -- filename.tsx',
        },
        {
          title: 'Unstage a file (keep changes)',
          explanation: "You ran git add but changed your mind. This removes the file from staging but keeps your edits.",
          command: 'git restore --staged filename.tsx',
        },
        {
          title: 'Undo the last commit (keep changes)',
          explanation: 'Moves HEAD back one commit but leaves your files unchanged. Great for fixing commit messages or adding forgotten files.',
          command: 'git reset --soft HEAD~1',
        },
        {
          title: 'Undo the last commit (discard changes)',
          explanation: 'WARNING: This permanently deletes the changes from the last commit. Use with caution!',
          command: 'git reset --hard HEAD~1',
        },
        {
          title: 'Create a new commit that undoes a previous one',
          explanation: 'The safest way to undo - creates a NEW commit that reverses the changes. Safe for shared branches.',
          command: 'git revert HEAD',
        },
      ],
    },
    {
      type: 'multiple-choice',
      situation: 'You committed and pushed a broken feature to a shared branch. Your teammate is also working on that branch. How should you undo it?',
      options: [
        'git reset --hard HEAD~1 (delete the commit)',
        'git revert HEAD (create a new commit that undoes it)',
        'Delete the branch and start over',
        'Just leave it broken and fix it later',
      ],
      correctAnswer: 1,
      explanation: '"git revert" is the safe choice for shared branches. It creates a NEW commit that undoes the bad one, so your teammate\'s history isn\'t broken. "git reset" rewrites history and would cause conflicts for others.',
    },
    {
      type: 'command-exercise',
      prompt: 'You accidentally staged config.json but only want to commit index.tsx. Unstage config.json.',
      acceptedAnswers: [
        'git restore --staged config.json',
        'git reset HEAD config.json',
        'git reset config.json',
      ],
      hints: [
        'Use "git restore --staged" with the filename',
        'This removes it from staging but keeps your edits',
      ],
      explanation: '"git restore --staged" is the modern way to unstage. The older "git reset HEAD" also works.',
    },
    {
      type: 'command-exercise',
      prompt: 'You just committed but forgot to include a file. Undo the last commit but keep your changes.',
      acceptedAnswers: [
        'git reset --soft HEAD~1',
        'git reset --soft head~1',
      ],
      hints: [
        'Use "git reset" with a flag that keeps changes',
        '--soft keeps your changes staged, HEAD~1 means "one commit back"',
      ],
      explanation: '"git reset --soft HEAD~1" undoes the commit but keeps all your changes staged. Then you can add the missing file and commit again.',
    },
    {
      type: 'command-exercise',
      prompt: 'Safely undo the most recent commit on a shared branch by creating a reverting commit.',
      acceptedAnswers: ['git revert HEAD', 'git revert head'],
      hints: [
        'Use "git revert" to create a new undo commit',
        'HEAD refers to the most recent commit',
      ],
      explanation: '"git revert HEAD" creates a new commit that does the exact opposite of the last commit. Safe for shared branches!',
    },
    {
      type: 'multiple-choice',
      situation: 'What is the difference between "git reset" and "git revert"?',
      options: [
        'They do the same thing',
        'reset rewrites history (removes commits), revert creates a new commit that undoes changes',
        'reset is for files, revert is for commits',
        'reset is newer, revert is deprecated',
      ],
      correctAnswer: 1,
      explanation: 'Reset REMOVES commits from history (dangerous on shared branches). Revert ADDS a new commit that undoes changes (safe for shared branches). Use revert when others have pulled your commits.',
    },
    {
      type: 'scenario',
      title: 'Fixing a Bad Commit',
      situation: "You committed a change but realize you also need to update the tests. Let's undo the commit, add the tests, and recommit.",
      steps: [
        {
          prompt: 'Undo the last commit but keep all your changes:',
          acceptedAnswers: ['git reset --soft HEAD~1', 'git reset --soft head~1'],
          hint: 'Use git reset --soft HEAD~1',
        },
        {
          prompt: 'Now stage everything including the new test file:',
          acceptedAnswers: ['git add .', 'git add -A', 'git add --all'],
          hint: 'Use git add . to stage all files',
        },
        {
          prompt: 'Recommit with message "Add feature with tests":',
          acceptedAnswers: [
            'git commit -m "Add feature with tests"',
            "git commit -m 'Add feature with tests'",
          ],
          hint: 'Use git commit -m "Add feature with tests"',
        },
      ],
      completionMessage: 'Nicely done! Soft reset is perfect for "oops, I forgot something" moments. Your commit history stays clean.',
    },
  ],
  completed: false,
};
