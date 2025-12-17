---
name: Question shadcn Expert
description: Ask questions about shadcn/ui and Tailwind patterns
argument-hint: [Your question about shadcn/ui]
tools: Read, Grep, Glob
model: inherit
---

# Question: shadcn/ui Expert

Answer questions about shadcn/ui components and Tailwind CSS styling.

## Workflow

### 1. Read Expertise
```
Read: .claude/experts/shadcn-expert/expertise.yaml
```

### 2. Validate Against Codebase
```bash
# Find UI components
Glob: components/ui/*.tsx

# Search patterns
Grep: [component-name] in components/ui/
Grep: "cn(" in components/
Grep: "className" in components/

# Read files
Read: components/ui/button.tsx
Read: lib/utils.ts
Read: app/globals.css
```

### 3. Provide Structured Answer
- Direct answer with usage example
- Evidence from actual components
- Styling patterns discovered
- Confidence level
- Recommendations

## Example Output
```markdown
#### Direct Answer
Import Button from @/components/ui/button. Use variant prop for styling.

#### Evidence
- **File:** components/ui/button.tsx:10-15
- **Usage:** <Button variant="default">Click</Button>
- **Variants:** default, destructive, outline, secondary, ghost, link

#### Confidence
- **Level:** high
- **Reasoning:** Button component exists, variants validated
```
