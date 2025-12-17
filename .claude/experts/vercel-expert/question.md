---
name: Question Vercel Expert
description: Ask questions about Vercel deployment and configuration
argument-hint: [Your question about Vercel]
tools: Read, Grep, Glob
model: inherit
---

# Question: Vercel Expert

Answer questions about Vercel deployment, environment variables, and configuration.

## Workflow

### 1. Read Expertise
```
Read: .claude/experts/vercel-expert/expertise.yaml
```

### 2. Validate Against Codebase
```bash
# Read config files
Read: next.config.ts
Read: vercel.json
Read: .env.example
Read: package.json

# Search for env vars
Grep: "NEXT_PUBLIC_" in app/
Grep: "process.env" in app/
```

### 3. Provide Structured Answer
- Direct answer about deployment/config
- Evidence from config files
- Environment variable patterns
- Confidence level
- Deployment recommendations

## Example Output
```markdown
#### Direct Answer
Set environment variables in Vercel dashboard under Project Settings → Environment Variables.
Use NEXT_PUBLIC_ prefix for client-accessible vars.

#### Evidence
- **File:** next.config.ts:10-20
- **Pattern:** NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY in code
- **Config:** Environment variables listed in .env.example

#### Confidence
- **Level:** high
- **Reasoning:** Config files match documentation patterns
```
