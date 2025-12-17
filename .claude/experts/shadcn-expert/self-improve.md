---
name: Self-Improve shadcn Expert
description: Sync shadcn/ui expertise with current components
tools: Read, Grep, Glob, Edit
model: inherit
---

# Self-Improve: shadcn/ui Expert

## Workflow

### 1. Read Current Expertise
```
Read: .claude/experts/shadcn-expert/expertise.yaml
```

### 2. Explore UI Components
```bash
Glob: components/ui/*.tsx
Read: components/ui/button.tsx
Read: lib/utils.ts
Read: tailwind.config.ts
Read: app/globals.css
```

### 3. Search for Patterns
```bash
Grep: "cn(" in components/
Grep: "cva(" in components/ui/
Grep: "className" in components/
```

### 4. Discover Conventions
- Count installed components
- Check variant patterns
- Verify Tailwind usage
- Find custom styling patterns
- Check theme customizations

### 5. Update Expertise
Edit expertise.yaml with:
- Installed components list
- Common variant patterns
- Styling conventions
- Custom utilities discovered
- Version increment
