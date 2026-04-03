import type { Lesson } from './types.js';

export const lesson: Lesson = {
  id: 'bonus-02-bash-essentials',
  title: 'Bash Commands 101',
  description: 'Learn the essential terminal commands you will use alongside Git every single day.',
  difficulty: 'bonus',
  steps: [
    {
      type: 'content',
      title: 'Navigating the File System',
      items: [
        {
          title: 'pwd — where am I?',
          explanation: 'Print Working Directory. Shows your current location in the file system.',
          command: 'pwd',
        },
        {
          title: 'ls — what is here?',
          explanation: 'List the files and folders in your current directory.',
          command: 'ls',
        },
        {
          title: 'ls -la — show everything',
          explanation: 'The -l flag shows details (size, date). The -a flag shows hidden files (like .git).',
          command: 'ls -la',
        },
        {
          title: 'cd — move to a directory',
          explanation: 'Change Directory. Use it to move around the file system.',
          command: 'cd src/components',
        },
        {
          title: 'cd .. — go up one level',
          explanation: 'Two dots means "parent directory." Go up one folder.',
          command: 'cd ..',
        },
        {
          title: 'cd ~ — go home',
          explanation: 'Tilde (~) is a shortcut for your home directory.',
          command: 'cd ~',
        },
      ],
    },
    {
      type: 'command-exercise',
      prompt: 'You want to see what files are in the current directory, including hidden ones. What command do you use?',
      acceptedAnswers: ['ls -la', 'ls -al', 'ls -a', 'ls --all'],
      hints: [
        'Use ls with a flag for "all" files',
        'The -a flag shows hidden files',
      ],
      explanation: '"ls -la" shows all files including hidden ones (starting with .) in a detailed list format.',
    },
    {
      type: 'command-exercise',
      prompt: 'Navigate into a folder called "src".',
      acceptedAnswers: ['cd src', 'cd src/'],
      hints: [
        'Use the cd command followed by the folder name',
        'cd src',
      ],
      explanation: '"cd" stands for Change Directory. It is the most common way to move around in the terminal.',
    },
    {
      type: 'command-exercise',
      prompt: 'Go back up to the parent directory.',
      acceptedAnswers: ['cd ..', 'cd ../'],
      hints: [
        'Two dots (..) means parent directory',
        'cd ..',
      ],
      explanation: '"cd .." moves you up one level. You can chain them: "cd ../.." goes up two levels.',
    },
    {
      type: 'content',
      title: 'Creating and Managing Files',
      items: [
        {
          title: 'mkdir — create a folder',
          explanation: 'Make Directory. Creates a new empty folder.',
          command: 'mkdir components',
        },
        {
          title: 'mkdir -p — create nested folders',
          explanation: 'The -p flag creates parent directories too. Saves you multiple mkdir calls.',
          command: 'mkdir -p src/components/ui',
        },
        {
          title: 'touch — create an empty file',
          explanation: 'Creates a new file if it does not exist, or updates the timestamp if it does.',
          command: 'touch index.tsx',
        },
        {
          title: 'cp — copy a file',
          explanation: 'Copy a file from one location to another.',
          command: 'cp config.json config.backup.json',
        },
        {
          title: 'mv — move or rename',
          explanation: 'Move a file to a new location, or rename it.',
          command: 'mv old-name.tsx new-name.tsx',
        },
        {
          title: 'rm — delete a file (careful!)',
          explanation: 'Remove a file permanently. There is no trash/recycle bin in the terminal!',
          command: 'rm unwanted-file.txt',
        },
      ],
    },
    {
      type: 'command-exercise',
      prompt: 'Create a nested directory structure: src/utils/helpers (all at once).',
      acceptedAnswers: [
        'mkdir -p src/utils/helpers',
      ],
      hints: [
        'Use mkdir with a flag that creates parent directories',
        'The -p flag creates all intermediate directories',
      ],
      explanation: '"mkdir -p" creates the entire path at once. Without -p, it would fail if src/ or src/utils/ do not exist.',
    },
    {
      type: 'command-exercise',
      prompt: 'Rename a file from "draft.txt" to "final.txt".',
      acceptedAnswers: [
        'mv draft.txt final.txt',
      ],
      hints: [
        'Use the mv command — it is for both moving AND renaming',
        'mv old-name new-name',
      ],
      explanation: '"mv" does double duty — it moves files between directories AND renames them. Same command, different use.',
    },
    {
      type: 'content',
      title: 'Reading File Contents',
      items: [
        {
          title: 'cat — print a file',
          explanation: 'Displays the entire contents of a file in the terminal.',
          command: 'cat README.md',
        },
        {
          title: 'head — see the beginning',
          explanation: 'Show the first 10 lines of a file. Great for peeking at large files.',
          command: 'head -20 package.json',
        },
        {
          title: 'tail — see the end',
          explanation: 'Show the last 10 lines. Perfect for checking logs.',
          command: 'tail -50 server.log',
        },
        {
          title: 'grep — search inside files',
          explanation: 'Find lines matching a pattern. Incredibly useful for searching codebases.',
          command: 'grep "TODO" src/*.tsx',
        },
      ],
    },
    {
      type: 'command-exercise',
      prompt: 'Search for all lines containing "error" in a file called app.log.',
      acceptedAnswers: [
        'grep "error" app.log',
        "grep 'error' app.log",
        'grep error app.log',
        'grep "Error" app.log',
        'grep -i "error" app.log',
        'grep -i error app.log',
      ],
      hints: [
        'Use grep with the search term and filename',
        'grep "error" app.log',
      ],
      explanation: '"grep" searches file contents line by line. Add -i for case-insensitive search, -r to search recursively through directories.',
    },
    {
      type: 'scenario',
      title: 'Project Setup',
      situation: 'You are setting up a new project from scratch. Create the folder structure, add some files, and verify everything.',
      steps: [
        {
          prompt: 'Create the project directory structure src/components:',
          acceptedAnswers: ['mkdir -p src/components'],
          hint: 'Use mkdir -p src/components',
        },
        {
          prompt: 'Create an empty file called App.tsx inside src/components:',
          acceptedAnswers: ['touch src/components/App.tsx'],
          hint: 'Use touch with the full path',
        },
        {
          prompt: 'List everything in the src directory to verify:',
          acceptedAnswers: ['ls src', 'ls src/', 'ls -la src', 'ls -la src/'],
          hint: 'Use ls src to see what is inside',
        },
      ],
      completionMessage: 'Nice! These basic file commands are the backbone of terminal work. You will use them every day alongside Git.',
    },
  ],
  completed: false,
};
