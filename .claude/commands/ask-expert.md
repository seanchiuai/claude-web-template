---
description: Ask domain expert a question (convex, nextjs, shadcn, vercel)
argument-hint: [expert-name] [your question]
---

# Command: Ask Expert

Route questions to domain experts who answer using accumulated expertise validated against the codebase.

## Usage

```bash
/ask-expert convex "How do I handle CORS in HTTP endpoints?"
/ask-expert nextjs "What's the pattern for Server Components with auth?"
/ask-expert shadcn "How do I use the Button component?"
/ask-expert vercel "How do I deploy?"
```

## How It Works

1. **Parse Arguments**
   - First argument: expert name (convex | nextjs | shadcn | vercel)
   - Remaining arguments: your question

2. **Route to Expert**
   - Each expert has a question.md workflow
   - Expert reads their expertise.yaml (mental model)
   - Expert validates expertise against actual codebase
   - Expert answers with evidence

3. **Expert Workflow**
   - Read expertise file (accumulated knowledge)
   - Search codebase for validation
   - Compare expertise vs reality
   - Provide answer with:
     - Direct answer
     - File paths as evidence
     - Confidence level
     - Related patterns
     - Recommendations

## Available Experts

### convex
**Domain:** Convex Backend Development
**Expertise:** queries, mutations, actions, schemas, CORS, HTTP endpoints, storage
**Use for:** Backend implementation, database operations, real-time data

### nextjs (Coming Soon)
**Domain:** Next.js App Router Development
**Expertise:** Server/Client Components, routing, data fetching, layouts
**Use for:** Frontend implementation, page structure, navigation

### shadcn (Coming Soon)
**Domain:** shadcn/ui + Tailwind CSS
**Expertise:** UI components, styling, theming, responsive design
**Use for:** Component usage, styling patterns, design system

### vercel (Coming Soon)
**Domain:** Vercel Deployment
**Expertise:** deployment config, env vars, builds, production optimization
**Use for:** Deployment issues, configuration, environment setup

## Workflow

When you run `/ask-expert [expert-name] [question]`:

1. **Validate Expert**
   - Check if expert exists
   - If not: "Expert '{name}' not found. Available: convex, nextjs, shadcn, vercel"

2. **Route Question**
   - Load expert's question.md workflow
   - Pass question as argument
   - Expert executes their question workflow

3. **Expert Process**
   - Reads `.claude/experts/{expert-name}/expertise.yaml`
   - Validates patterns against codebase
   - Searches for evidence
   - Provides structured answer

## Example Interactions

### Example 1: Convex Question

```bash
/ask-expert convex "How do I schedule an action from a mutation?"
```

**Expert Response:**
```markdown
#### Direct Answer
Use `ctx.scheduler.runAfter()` in your mutation to schedule an action asynchronously.

#### Evidence from Codebase
- **Pattern:** Found in convex/tasks.ts:45, convex/messages.ts:78
- **Implementation:**
  ```typescript
  await ctx.scheduler.runAfter(0, internal.tasks.actionName, {
    taskId,
    data,
  });
  ```

#### From Expertise
- **Pattern:** "Schedule actions from mutations, never call directly"
- **Confidence:** high (validated in 5 files)
- **Importance:** critical (architectural rule)

#### Recommendations
- Always use internal actions for scheduled work
- Set delay to 0 for immediate execution
- Handle errors in the action, not mutation

#### Confidence
- **Level:** high
- **Reasoning:** Pattern validated across codebase, documented in expertise
```

### Example 2: Expert Not Available

```bash
/ask-expert database "How do I optimize queries?"
```

**Response:**
```
Expert 'database' not found.

Available experts:
- convex: Convex Backend Development
- nextjs: Next.js App Router (coming soon)
- shadcn: shadcn/ui + Tailwind CSS (coming soon)
- vercel: Vercel Deployment (coming soon)

Did you mean 'convex'? The Convex expert can help with database and query optimization.
```

## Implementation

Execute the appropriate expert's question workflow:

```typescript
const expertMap = {
  'convex': '.claude/experts/convex-expert/question.md',
  'nextjs': '.claude/experts/nextjs-expert/question.md',
  'shadcn': '.claude/experts/shadcn-expert/question.md',
  'vercel': '.claude/experts/vercel-expert/question.md',
};

const expertName = args[0];
const question = args.slice(1).join(' ');

if (!expertMap[expertName]) {
  // Show error with available experts
  return;
}

// Run the expert's question workflow with the question
// The expert will handle the rest
```

## When to Use

**Use ask-expert when:**
- You have a specific question about a domain
- You want validated answers (not just documentation)
- You need to understand existing patterns
- You're debugging domain-specific issues
- You want recommendations based on project conventions

**Don't use ask-expert for:**
- General programming questions (use web search)
- Questions outside expert domains
- Requests to write code (use agents directly)
- Questions about other projects

## Expert Quality

**What makes expert answers valuable:**

1. **Evidence-based:** Always includes file paths and line numbers
2. **Validated:** Checks expertise against actual codebase
3. **Context-aware:** Knows project-specific conventions
4. **Confident:** Provides confidence levels
5. **Evolving:** Expertise improves with self-improvement runs

**Expert answers include:**
- Direct, actionable answer
- Evidence from your codebase
- Relevant patterns from expertise
- Confidence level with reasoning
- Specific recommendations
- Related patterns to explore

## Tips for Better Answers

**Be specific:**
- ✅ "How do I add CORS to HTTP endpoints?"
- ❌ "Help with HTTP"

**Ask one thing:**
- ✅ "What's the pattern for mutations that schedule actions?"
- ❌ "Tell me everything about Convex"

**Provide context:**
- ✅ "Why am I getting 404 on /uploadFile endpoint?"
- ❌ "It's broken"

**Use the right expert:**
- Convex: Backend, database, actions
- Next.js: Frontend, routing, components
- shadcn: UI components, styling
- Vercel: Deployment, config

## Troubleshooting

### Issue: Expert gives outdated answer

**Solution:** Run `/sync-expertise [expert-name]` to update expertise with current codebase

### Issue: Expert says "low confidence"

**Reason:** Pattern not well-validated yet
**Solution:** This is normal for new patterns. Expert will improve with more usage.

### Issue: Expert can't find pattern

**Reason:** Pattern doesn't exist in codebase yet
**Response:** Expert will search codebase and report findings

## Related Commands

- `/sync-expertise [expert]` - Update expert's expertise with current codebase
- Use agent directly (e.g., `agent-convex`) for implementation tasks
- Use `/ask-expert` for questions, agents for doing work

## Notes

- Experts learn over time through self-improvement
- First answers may have lower confidence (experts are new)
- Confidence increases as patterns are validated
- Expertise files track what experts have learned
- You can view expertise: `Read: .claude/experts/{expert}-expert/expertise.yaml`
