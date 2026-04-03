import type { Lesson } from './types.js';

export const lesson: Lesson = {
  id: 'bonus-03-terminal-productivity',
  title: 'Terminal Productivity',
  description: 'Shortcuts, tricks, and power moves that make you faster in the terminal.',
  difficulty: 'bonus',
  steps: [
    {
      type: 'content',
      title: 'Keyboard Shortcuts That Save Hours',
      items: [
        {
          title: 'Tab — autocomplete',
          explanation: 'Start typing a filename or command and press Tab to autocomplete. Press Tab twice to see all matches. This alone will save you 30% of your typing.',
        },
        {
          title: 'Ctrl+C — stop/cancel',
          explanation: 'Kills the current running process or cancels the current line. Your emergency stop button.',
        },
        {
          title: 'Ctrl+L — clear the screen',
          explanation: 'Clears all the terminal output. Same as typing "clear" but faster.',
        },
        {
          title: 'Ctrl+A / Ctrl+E — jump to start/end of line',
          explanation: 'Ctrl+A moves your cursor to the beginning of the line. Ctrl+E moves to the end. Much faster than holding arrow keys.',
        },
        {
          title: 'Ctrl+W — delete last word',
          explanation: 'Deletes the word before your cursor. Great for fixing typos without backspacing through everything.',
        },
        {
          title: 'Ctrl+U — delete entire line',
          explanation: 'Clears everything before your cursor. Start fresh without hitting backspace 50 times.',
        },
      ],
    },
    {
      type: 'multiple-choice',
      situation: 'You are typing a long file path: src/components/dashboard/widgets/Ch... What is the fastest way to complete the filename?',
      options: [
        'Type out the whole name manually',
        'Press Tab to autocomplete',
        'Copy and paste from a file manager',
        'Use the mouse to click on the file',
      ],
      correctAnswer: 1,
      explanation: 'Tab completion is the #1 terminal productivity hack. Start typing and press Tab — the terminal fills in the rest. If multiple matches exist, press Tab twice to see them all.',
    },
    {
      type: 'content',
      title: 'Command History',
      items: [
        {
          title: 'Up arrow — previous command',
          explanation: 'Press Up to cycle through your command history. Press Down to go forward. Your most recent commands are always one arrow away.',
        },
        {
          title: 'Ctrl+R — reverse search',
          explanation: 'Start typing and it searches your history for matching commands. Hit Ctrl+R again to cycle through matches.',
        },
        {
          title: 'history — see all past commands',
          explanation: 'Shows your full command history with line numbers.',
          command: 'history',
        },
        {
          title: '!! — repeat the last command',
          explanation: 'Runs whatever you just ran. Most useful when you forgot sudo.',
          command: 'sudo !!',
        },
      ],
    },
    {
      type: 'multiple-choice',
      situation: 'You ran "npm test" 5 commands ago and want to run it again. What is the fastest way?',
      options: [
        'Type it out again manually',
        'Press Up arrow 5 times',
        'Press Ctrl+R, then type "npm" to search your history',
        'Open a new terminal and type it fresh',
      ],
      correctAnswer: 2,
      explanation: 'Ctrl+R is the power move. Type a few characters and it instantly finds the matching command from your history. Way faster than arrowing through one by one.',
    },
    {
      type: 'content',
      title: 'Pipes and Chaining',
      items: [
        {
          title: '| (pipe) — connect commands',
          explanation: 'Send the output of one command as input to another. Extremely powerful.',
          command: 'cat package.json | grep "react"',
        },
        {
          title: '&& — run if previous succeeds',
          explanation: 'Run the next command only if the first one succeeds. Great for build-then-deploy.',
          command: 'npm run build && npm run deploy',
        },
        {
          title: '> — write output to a file',
          explanation: 'Redirect command output into a file (overwrites existing content).',
          command: 'echo "hello" > greeting.txt',
        },
        {
          title: '>> — append output to a file',
          explanation: 'Same as > but appends instead of overwriting.',
          command: 'echo "another line" >> greeting.txt',
        },
      ],
    },
    {
      type: 'multiple-choice',
      situation: 'You want to build your project AND start the dev server, but only if the build succeeds. Which command?',
      options: [
        'npm run build; npm run dev (runs dev even if build fails)',
        'npm run build && npm run dev (runs dev only if build succeeds)',
        'npm run build | npm run dev (pipes build output into dev)',
        'npm run build + npm run dev (invalid syntax)',
      ],
      correctAnswer: 1,
      explanation: '"&&" means "run the next command only if the previous one succeeded." The semicolon (;) runs both regardless. The pipe (|) is for chaining output, not sequencing.',
    },
    {
      type: 'content',
      title: 'Handy Everyday Commands',
      items: [
        {
          title: 'which — find where a command lives',
          explanation: 'Shows the full path to a command. Useful for debugging "command not found" errors.',
          command: 'which node',
        },
        {
          title: 'wc -l — count lines',
          explanation: 'Count lines in a file. Great for checking file sizes.',
          command: 'wc -l src/App.tsx',
        },
        {
          title: 'find — search for files by name',
          explanation: 'Find files in a directory tree matching a pattern.',
          command: 'find . -name "*.tsx"',
        },
        {
          title: 'xargs — pass output as arguments',
          explanation: 'Takes input from a pipe and uses it as arguments for another command.',
          command: 'find . -name "*.test.ts" | xargs grep "describe"',
        },
      ],
    },
    {
      type: 'command-exercise',
      prompt: 'Find all TypeScript files (*.ts) in the current directory and subdirectories.',
      acceptedAnswers: [
        'find . -name "*.ts"',
        "find . -name '*.ts'",
        'find . -name *.ts',
        'find . -name "*.tsx"',
        "find . -name '*.tsx'",
      ],
      hints: [
        'Use the find command with -name flag',
        'find . -name "*.ts"',
      ],
      explanation: '"find ." starts from the current directory and searches recursively. The -name flag matches filenames by pattern.',
    },
    {
      type: 'scenario',
      title: 'Power User Combo',
      situation: 'You want to find all TODO comments across your TypeScript files and save them to a report file.',
      steps: [
        {
          prompt: 'Search for "TODO" in all .tsx files in the src directory:',
          acceptedAnswers: [
            'grep "TODO" src/*.tsx',
            "grep 'TODO' src/*.tsx",
            'grep TODO src/*.tsx',
            'grep -r "TODO" src/',
            "grep -r 'TODO' src/",
            'grep -r TODO src/',
            'grep -r "TODO" src',
            "grep -r 'TODO' src",
          ],
          hint: 'Use grep "TODO" with a file pattern',
        },
        {
          prompt: 'Now save that output to a file called todos.txt:',
          acceptedAnswers: [
            'grep -r "TODO" src/ > todos.txt',
            "grep -r 'TODO' src/ > todos.txt",
            'grep -r TODO src/ > todos.txt',
            'grep -r "TODO" src > todos.txt',
            'grep "TODO" src/*.tsx > todos.txt',
            "grep 'TODO' src/*.tsx > todos.txt",
          ],
          hint: 'Use > to redirect output to a file',
        },
        {
          prompt: 'Count how many TODOs you found in the file:',
          acceptedAnswers: [
            'wc -l todos.txt',
            'cat todos.txt | wc -l',
          ],
          hint: 'Use wc -l to count lines in a file',
        },
      ],
      completionMessage: 'Now you are chaining commands like a pro! grep + pipes + redirection is the terminal power combo.',
    },
  ],
  completed: false,
};
