---
description: Set up the project for first-time use by following setup.md and walking through any steps that require human intervention
---

# Command: Setup

Read and execute all instructions in `/docs/setup.md` in the project root to perform initial project setup.

For each step in `/docs/setup.md`:
1. If the step can be automated, perform it directly using available tools (e.g., Bash, Edit).
2. If the step requires human action (manual configuration, external signup, secrets input, etc.), pause and display detailed instructions/highlights for the user to follow.
3. Track setup progress and verify completion status for each step.
4. Tackle each step one at a time with the user, do not show all the actions required at once

## Automatic Steps

### 1. Install Git Hooks (Agent Experts Integration)

After completing main setup, automatically install git hooks:

```bash
# Create post-commit hook if it doesn't exist
if [ ! -f .git/hooks/post-commit ]; then
  cp .claude/hooks/post-commit.template .git/hooks/post-commit
  chmod +x .git/hooks/post-commit
  echo "✅ Installed post-commit hook for Agent Experts"
else
  echo "✅ Post-commit hook already exists"
fi
```

This hook enables automatic learning by suggesting expert self-improvement runs after commits.

At the end, summarize what was completed automatically and what needs human follow-up.
