---
name: Self-Improve Vercel Expert
description: Sync Vercel expertise with current deployment configuration
tools: Read, Grep, Glob, Edit
model: inherit
---

# Self-Improve: Vercel Expert

## Workflow

### 1. Read Current Expertise
```
Read: .claude/experts/vercel-expert/expertise.yaml
```

### 2. Explore Configuration
```bash
Read: next.config.ts
Read: vercel.json
Read: .env.example
Read: package.json
```

### 3. Search for Patterns
```bash
Grep: "NEXT_PUBLIC_" in app/
Grep: "process.env" in app/
Grep: "remotePatterns" in next.config.ts
```

### 4. Discover Conventions
- Count environment variables used
- Check image domain configurations
- Verify build scripts
- Find deployment-specific patterns
- Check API routes configuration

### 5. Update Expertise
Edit expertise.yaml with:
- Required environment variables
- Image domain patterns
- Build configuration patterns
- Deployment conventions discovered
- Version increment
