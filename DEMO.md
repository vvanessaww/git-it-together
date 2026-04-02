# 🎬 Git It Together - Interactive Demo

## What You'll See

### 1. Welcome Screen
Beautiful bordered welcome explaining the tool is for AI-assisted workflows.
Mentions Claude Code, Cursor, Copilot, v0.dev, Bolt.

### 2. Lesson Menu
Three lessons with progress indicators:
- ○ Lesson 1: After AI Makes Changes
- ○ Lesson 2: Working on Features (Branches)  
- ○ Lesson 3: Handling Merge Conflicts

### 3. Lesson Flow (Example: Lesson 1)

**Step A: Introduction**
```
→ Lesson 1: After AI Makes Changes

Learn what to do after Claude Code, Cursor, or another AI tool 
edits your files.

Press any key to continue...
```

**Step B: Content**
```
ℹ The AI → Git Workflow

1. Check what changed
   Before saving changes, see what the AI modified.
   $ git status

2. Review the changes
   Look at the actual code differences to make sure they're correct.
   $ git diff

3. Stage the files
   Tell Git which changes you want to save.
   $ git add .

4. Save a snapshot (commit)
   Create a save point with a message describing what changed.
   $ git commit -m "Add user profile page"

5. Upload to GitHub
   Share your changes with your team.
   $ git push

Press any key for knowledge check...
```

**Step C: Knowledge Check**
```
? Knowledge Check

┌────────────────────────────────────────────────────────────┐
│ Claude Code just created 3 new files for your login        │
│ feature: LoginForm.tsx, useAuth.ts, and login.css.         │
│ You reviewed the code and it looks good.                   │
│ What should you do first?                                  │
└────────────────────────────────────────────────────────────┘

What should you do?

  git push (upload immediately)
  git commit -m "add login" (save without staging)
> git status (check what changed)
  git pull (download changes)
```

**After selecting answer:**

✅ **If correct:**
```
Your answer:
  ✔ git status (check what changed)

┌─────────────────────────────────────────────────────────────┐
│ ✔ Correct!                                                  │
│                                                             │
│ Always start with "git status" to see what files changed.  │
│ This helps you verify the AI touched the right files       │
│ before saving them. Then you'd do:                          │
│ git add . → git commit -m "..." → git push                 │
└─────────────────────────────────────────────────────────────┘

Press any key to continue...
```

❌ **If wrong:**
```
Your answer:
  ✗ git push (upload immediately)

┌─────────────────────────────────────────────────────────────┐
│ ✗ Not quite...                                              │
│                                                             │
│ Always start with "git status" to see what files changed.  │
│ You need to stage and commit before pushing.               │
└─────────────────────────────────────────────────────────────┘

The correct answer is: git status (check what changed)

Press any key to continue...
```

### 4. Back to Menu
Returns to lesson selection with progress indicator:
```
→ Choose a lesson:

  ✔ Lesson 1: After AI Makes Changes
  ○ Lesson 2: Working on Features (Branches)
  ○ Lesson 3: Handling Merge Conflicts
```

## Try It Yourself!

```bash
npm run dev
```

Use arrow keys to navigate, Enter to select, Ctrl+C to exit.

## Key Features Demonstrated

✅ **Real AI Workflow Scenarios** - Questions about what to do after Claude Code edits files
✅ **Interactive Navigation** - Arrow keys, Enter, and responsive UI
✅ **Instant Feedback** - Know immediately if you got it right
✅ **Contextual Explanations** - Learn WHY, not just HOW
✅ **Beautiful Terminal UI** - Clean borders, colors, and icons
✅ **Progress Tracking** - See which lessons you've completed
