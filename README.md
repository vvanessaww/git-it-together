# Git It Together

An interactive CLI tutorial for learning Git in AI-assisted workflows. Type real commands, grow your git tree, and go from zero to confident with Git.

## Why this exists?

After presenting at multiple AI workflow trainings at my company, I've realized people are excited about AI - they see what tools like Claude Code and Cursor can do and want to try it. But there's still a huge gap between what people want to do and what they feell like they can do.
The biggest barrier to meaningful AI adoption that I've seen is intimidation. Using Claude Desktop to rewrite emails and summarize docs feels safe, but real-leverage tools that exist in the terminal are a roadblock.
Existing Git tutorials are written for engineers... but the world is changing, and more people are empowered to ship than ever. 
My vision for git-it-together is to teach the 20% of Git you'll use 80% of the time, in a gameified, fun CLI that is anything but intimidating. 

## Who is this for?

**Non-technical users** who work with AI coding tools like Claude Code, Cursor, GitHub Copilot, v0.dev, or Bolt.

Perfect for **PMs, designers, and founders** who need to collaborate on projects but don't have a CS background.

## Features

- **Type real commands** — not multiple choice. You learn by doing.
- **15 lessons** across 5 levels (Getting Started, Beginner, Intermediate, Advanced, Bonus)
- **Grow your git tree** — a cute ASCII tree mascot that evolves as you complete lessons
- **Contextual reactions** — the tree's face changes when you get answers right or wrong
- **Instant feedback** — hints after wrong answers, explanations after correct ones
- **Multi-step scenarios** — walk through full real-world workflows command by command

## Lessons

### Getting Started (3 lessons)
- **Cloning & Getting Started** — git clone, cd, git config, git pull
- **.gitignore & Keeping Secrets Safe** — what never to commit, .env, rotating leaked keys
- **Reading Project History** — git log, git blame, git show, git diff

### Beginner (3 lessons)
- **After AI Makes Changes** — git status, add, commit, push
- **Working on Features** — branches, checkout, switch
- **Handling Merge Conflicts** — conflict markers, resolution workflow

### Intermediate (3 lessons)
- **Undoing Mistakes** — reset, revert, restore
- **Stashing Work** — stash, pop, apply
- **Rewriting History** — amend, interactive rebase

### Advanced (3 lessons)
- **Recovery with Reflog** — find and recover "lost" commits
- **Debugging with Bisect** — binary search for bugs
- **Cherry-pick & Advanced Workflows** — cherry-pick, worktrees, tags

### Bonus (3 lessons)
- **Branching Strategies** — naming conventions, PRs, merge vs rebase
- **Bash Commands 101** — cd, ls, mkdir, cat, grep, and more
- **Terminal Productivity** — keyboard shortcuts, pipes, history, chaining

## Installation

```bash
npm install -g git-it-together
```

## Usage

```bash
git-it-together
```

Then follow the interactive lessons in your terminal.

**Note:** Requires a terminal that supports raw mode (standard terminal emulators work fine — not piped/embedded terminals).

## Development

```bash
git clone https://github.com/vvanessaww/git-it-together.git
cd git-it-together
npm install
npm run dev
```

## License

MIT
