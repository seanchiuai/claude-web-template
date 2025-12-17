---
name: Self-Improve Next.js Expert
description: Sync Next.js expertise with current codebase after changes
tools: Read, Grep, Glob, Edit
model: inherit
---

# Self-Improve: Next.js Expert

Automatically update expertise.yaml based on current Next.js codebase state.

## Workflow

### 1. Read Current Expertise
```
Read: .claude/experts/nextjs-expert/expertise.yaml
```

### 2. Explore Next.js Codebase
```bash
# Find all pages and layouts
Glob: app/**/page.tsx
Glob: app/**/layout.tsx

# Read key files
Read: app/layout.tsx
Read: app/page.tsx
Read: middleware.ts
Read: next.config.ts
```

### 3. Search for Patterns
```bash
# Client vs Server Components
Grep: "use client" in app/
Grep: "async function" in app/

# Navigation patterns
Grep: "useRouter" in app/
Grep: "usePathname" in app/
Grep: "Link" in app/

# Data fetching
Grep: "fetch" in app/
Grep: "useQuery" in app/
```

### 4. Validate & Discover
- Count "use client" occurrences (Client Component usage)
- Check async Server Components
- Verify navigation patterns
- Discover routing conventions
- Find data fetching patterns

### 5. Update Expertise
Use Edit tool to update patterns, confidence levels, file locations, and conventions.

## Update Rules
- **PATCH** (0.1.0 → 0.1.1): Minor updates
- **MINOR** (0.1.0 → 0.2.0): New patterns, confidence changes
- **MAJOR** (0.1.0 → 1.0.0): Major architectural changes

## Pattern Thresholds
- 3+ occurrences → Add pattern
- 5+ occurrences → High confidence
- 0 occurrences in 2 runs → Remove

## Success Criteria
- [ ] All patterns validated
- [ ] New patterns discovered
- [ ] File paths updated
- [ ] Version incremented
- [ ] Evolution log entry added
- [ ] Complete in < 2 minutes
