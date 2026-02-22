# Git It Together 🤝

An interactive CLI tutorial for learning Git in AI-assisted workflows.

## 🎯 Who is this for?

**Non-technical users** who work with AI coding tools like:
- Claude Code / Cursor
- GitHub Copilot
- v0.dev / Bolt
- Any AI pair programming tool

Perfect for **PMs, designers, and founders** who need to collaborate on projects but don't have a CS background.

## 🚀 Why Git It Together?

AI tools like Claude Code can build entire features for you. But you still need to know:
- ✅ How to save those changes (commits)
- ✅ How to work on features without breaking main (branches)
- ✅ How to handle merge conflicts
- ✅ How to collaborate with developers

**This tutorial teaches you the essential Git commands through real AI workflow scenarios.**

## 📚 What you'll learn

### Lesson 1: After AI Makes Changes
Learn the exact workflow when Claude Code edits your files:
- `git status` - see what changed
- `git add .` - stage files
- `git commit` - save snapshot
- `git push` - upload to GitHub

**Knowledge check:** Real scenario about what to do after AI creates new files

### Lesson 2: Working on Features (Branches)
Understand why branches matter when building with AI:
- `git checkout -b` - create feature branch
- `git switch` - change branches
- `git push -u origin` - push branch to GitHub

**Knowledge check:** When to create a new branch before asking AI to code

### Lesson 3: Handling Merge Conflicts
Don't panic when Git says "CONFLICT":
- What merge conflicts are
- How to resolve them
- How to ask AI for help with conflicts

**Knowledge check:** Understand what conflict markers mean

## 🛠️ Installation

```bash
npm install -g git-it-together
```

## 🎮 Usage

```bash
git-it-together
```

Then follow the interactive lessons!

## 🧪 Development

```bash
# Clone the repo
git clone https://github.com/yourusername/git-it-together.git
cd git-it-together

# Install dependencies
npm install

# Run in dev mode
npm run dev

# Build
npm run build
```

## 🤔 Philosophy

**AI tools can write code. You need to know how to save it.**

This isn't a comprehensive Git course. It's focused on the **20% of Git commands** you'll use **80% of the time** when working with AI coding assistants.

## 📝 Future Lessons (Roadmap)

- [ ] Lesson 4: Pull Requests (PRs)
- [ ] Lesson 5: Undoing Mistakes (`git reset`, `git revert`)
- [ ] Lesson 6: Cloning Projects (`git clone`)
- [ ] Lesson 7: Keeping Your Branch Updated (`git pull`, `git merge`)
- [ ] Lesson 8: `.gitignore` - What not to commit

## 🙏 Contributing

Ideas for new lessons or better explanations? Open an issue or PR!

## 📄 License

MIT
