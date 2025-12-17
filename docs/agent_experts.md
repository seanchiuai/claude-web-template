# Agent Experts Documentation

## Overview

**Agent Experts** are self-improving agents that execute AND learn (not execute and forget). They accumulate domain expertise through self-improvement runs and use it to answer questions with validated, evidence-based answers.

**Key Difference:**
- Traditional agents: Execute → Forget
- Agent Experts: Execute → Learn → Reuse expertise

## Architecture

### Three Core Components

1. **Expertise Files** (`expertise.yaml`)
   - Living mental models that evolve over time
   - YAML format for human readability
   - Track patterns, issues, conventions
   - Include confidence levels and evidence

2. **Question Workflows** (`question.md`)
   - Read expertise as starting context
   - Validate against actual codebase
   - Answer with evidence (file:line)
   - Note discrepancies for improvement

3. **Self-Improve Workflows** (`self-improve.md`)
   - Explore codebase systematically
   - Validate existing patterns
   - Discover new patterns (3+ occurrences)
   - Update expertise with learnings

### Directory Structure

```
.claude/
├── experts/
│   ├── convex-expert/
│   │   ├── expertise.yaml      # Mental model
│   │   ├── question.md         # Q&A workflow
│   │   └── self-improve.md     # Learning workflow
│   ├── nextjs-expert/
│   ├── shadcn-expert/
│   ├── vercel-expert/
│   └── _shared/
│       ├── expertise-schema.yaml
│       └── validation-rules.md
├── commands/
│   ├── ask-expert.md           # Question dispatcher
│   └── sync-expertise.md       # Self-improve dispatcher
├── agents/                      # Enhanced with expertise refs
│   ├── agent-convex.md
│   ├── agent-nextjs.md
│   ├── agent-shadcn.md
│   └── agent-vercel.md
└── skills/
    ├── creating-expert/         # Meta-skill: create experts
    └── meta-prompt/             # Meta-skill: create prompts
```

## Usage

### Ask Questions

```bash
# Ask domain-specific questions
/ask-expert convex "How do I handle CORS in HTTP endpoints?"
/ask-expert nextjs "What's the pattern for Server Components?"
/ask-expert shadcn "How do I use the Button component?"
/ask-expert vercel "How do I set environment variables?"
```

**What You Get:**
- Direct answer to your question
- Evidence from your codebase (file:line references)
- Related patterns from expertise
- Confidence level (high/medium/low)
- Specific recommendations

**Example Response:**
```markdown
#### Direct Answer
CORS headers required for all HTTP endpoints. Use reusable CORS_HEADERS constant.

#### Evidence from Codebase
- **File:** convex/http.ts:220-225
- **Pattern:** const CORS_HEADERS = { "Access-Control-Allow-Origin": "*", ... }
- **Validation:** Found in 1 file, used in 3 endpoints

#### From Expertise
- **Pattern:** "CORS headers required for HTTP endpoints"
- **Confidence:** high (validated in production code)

#### Recommendations
- Always include in responses
- Handle OPTIONS preflight
- Include in error responses

#### Confidence: High
- **Reasoning:** Pattern validated in actual codebase, matches expertise
```

### Update Expertise

```bash
# After significant changes to a domain
/sync-expertise convex       # Update Convex expert
/sync-expertise nextjs       # Update Next.js expert
/sync-expertise all          # Update all experts

# Git hook suggests automatically after commits
```

**What Happens:**
1. Reads current expertise.yaml
2. Explores relevant codebase files
3. Validates existing patterns (counts occurrences)
4. Discovers new patterns (3+ = add)
5. Updates expertise.yaml with:
   - New patterns found
   - Updated confidence levels
   - Removed obsolete patterns
   - File location updates
   - Version increment
   - Evolution log entry

**When to Run:**
- After significant commits (5+ files)
- After major features
- After refactoring
- Monthly maintenance
- When answers seem outdated

**When NOT to Run:**
- After every tiny commit (too frequent)
- During active development (wait for stable)
- When build is broken (fix first)

## How It Works

### The Mental Model

Expertise files are **working memory**, not source of truth:

```yaml
---
expert: "convex-expert"
domain: "Convex Backend Development"
version: "0.2.0"
confidence: "medium"
---

convex_patterns:
  - pattern: "Schedule actions from mutations, never call directly"
    context: "Asynchronous side effects"
    evidence: "convex/tasks.ts:45, convex/messages.ts:78, convex/users.ts:112"
    confidence: "high"  # 5+ validations
    importance: "critical"

common_issues:
  - problem: "CORS policy blocked in browser"
    solution: "Add CORS_HEADERS to all HTTP responses"
    frequency: "high"
    last_seen: "2025-12-17"

key_files:
  schema: "convex/schema.ts"
  http_routes: "convex/http.ts"

codebase_conventions:
  - convention: "One table per file"
    evidence: "Pattern in 12 files"
    confidence: "high"

evolution_log:
  - date: "2025-12-17"
    change: "Validated 3 patterns, added 2 new patterns"
    confidence_before: "low"
    confidence_after: "medium"
```

### Confidence Levels

- **High:** 5+ validations, no exceptions, recent
- **Medium:** 3-4 validations, occasional exceptions
- **Low:** 1-2 validations, hypothesis stage

### Pattern Detection Rules

**Add pattern when:**
- Seen 3+ times in codebase
- Implementation is consistent
- Pattern is meaningful (not trivial)
- Can provide evidence (file:line)

**Update pattern when:**
- More evidence found → increase confidence
- Exception discovered → decrease confidence
- Context refined → update description

**Remove pattern when:**
- Not found in 2+ consecutive self-improve runs
- Contradicted by codebase
- Technology deprecated

## Git Hook Integration

**Automatic Suggestions:**

After commits, hook detects changes and suggests:

```bash
$ git commit -m "Add new Convex endpoint"

📚 Convex backend changes detected
💡 Consider running: /sync-expertise convex
   (Updates Convex expert with new patterns from convex/)
```

**Hook Location:** `.git/hooks/post-commit`

**Pattern Detection:**
- `convex/*.ts` → Suggest convex expert
- `app/**/*.tsx` → Suggest nextjs expert
- `components/ui/*.tsx` → Suggest shadcn expert
- `next.config.ts`, `vercel.json` → Suggest vercel expert

**Installation:** Automatic via `/setup` command

## Meta-Skills (Tools That Build Tools)

### creating-expert

Generate new domain expert:

```bash
# Use skill to create new expert
Use skill: creating-expert

# Prompts for:
- Expert name (e.g., "postgres-expert")
- Domain description
- Initial knowledge sources
- Related agents

# Creates:
- expertise.yaml with initial patterns
- question.md customized for domain
- self-improve.md with exploration logic
- Updates ask-expert dispatcher
```

**When to Use:**
- Adding new tech to stack
- Creating domain specialist
- Expanding beyond core 4 experts

### meta-prompt

Generate prompt variations:

```bash
# Use skill to adapt existing prompt
Use skill: meta-prompt

# Prompts for:
- Template to base on
- What should differ
- Domain/technology
- Tool requirements

# Creates:
- New prompt with structure
- Customized for domain
- Validated YAML
- Ready to use
```

**When to Use:**
- Creating new slash command
- Adapting workflow for new domain
- Creating skill variation

## Best Practices

### For Users

**DO:**
- Ask specific questions (not "tell me everything")
- Run self-improve after significant changes
- Review expertise files periodically
- Trust high-confidence answers
- Question low-confidence answers
- Provide feedback if answers wrong

**DON'T:**
- Treat expertise as source of truth (code is)
- Skip self-improvement for months
- Ignore git hook suggestions
- Add patterns manually (use self-improve)
- Over-rely on outdated expertise

### For Maintainers

**Expertise File Maintenance:**
- Review evolution log monthly
- Archive obsolete patterns
- Merge similar patterns
- Keep files < 100KB
- Commit expertise updates

**Quality Checks:**
- Verify file paths exist
- Check YAML syntax
- Validate confidence levels match occurrences
- Ensure evidence is current
- Remove contradictions

## Troubleshooting

### Low Confidence Answers

**Cause:** Pattern not well-validated yet
**Solution:** Normal for new patterns, improves with usage

### Expert Can't Find Pattern

**Cause:** Pattern doesn't exist in codebase yet
**Solution:** Expert searches and reports findings honestly

### Outdated Answer

**Cause:** Expertise hasn't synced with recent changes
**Solution:** Run `/sync-expertise [expert]`

### Expertise File Too Large

**Cause:** Too many patterns accumulated
**Solution:** Remove low-confidence patterns, merge similar

### YAML Syntax Error

**Cause:** Manual edit or corruption
**Solution:** Restore from git or fix syntax

## Advanced Topics

### Creating Custom Experts

See `.claude/skills/creating-expert/SKILL.md` for full workflow.

**Summary:**
1. Use creating-expert skill
2. Provide domain info
3. Review generated files
4. Run initial self-improvement
5. Test with sample questions

### Expert Hierarchies

Future enhancement: Sub-experts

```
convex-expert/
├── webhooks-expert/
├── storage-expert/
└── auth-expert/
```

### Cross-Expert Queries

Future enhancement: Ask multiple experts

```bash
/ask-experts convex,nextjs "How do I integrate Convex with Server Components?"
```

### Expertise Backup/Restore

```bash
# Backup
cp -r .claude/experts/ .claude/experts.backup/

# Restore
cp -r .claude/experts.backup/ .claude/experts/
```

## Monitoring & Metrics

Track expert evolution:

```yaml
# Initial (Day 1)
version: "0.1.0"
confidence: "low"
patterns: 5
self_improve_runs: 0

# After first sync (Day 1)
version: "0.2.0"
confidence: "medium"
patterns: 8
self_improve_runs: 1

# Mature (Day 90)
version: "1.2.0"
confidence: "high"
patterns: 35
self_improve_runs: 45
```

**Healthy Progression:**
- Versions increment steadily
- Confidence increases over time
- Patterns stabilize (fewer additions)
- Evidence becomes specific
- Questions answered increases

## Future Enhancements

**Planned:**
- Expert hierarchies (sub-experts)
- Cross-expert queries
- Automated testing of expertise accuracy
- Expertise sharing across projects
- AI-assisted pattern discovery
- Real-time expertise updates
- Expert performance analytics

## Reference

**Key Files:**
- `.claude/experts/_shared/expertise-schema.yaml` - Template
- `.claude/experts/_shared/validation-rules.md` - Guidelines
- `.claude/commands/ask-expert.md` - Question dispatcher
- `.claude/commands/sync-expertise.md` - Self-improve dispatcher

**Related Docs:**
- CLAUDE.md - Quick reference
- meta.md - Original Agent Experts concept
- Plan file - Implementation details

## Support

**Issues:**
- Check expertise file syntax
- Verify file paths exist
- Review evolution log
- Run self-improve
- Restore from git if corrupted

**Questions:**
- Ask an expert: `/ask-expert [domain] "your question"`
- Review this doc
- Check plan file for implementation details

---

**Remember:** Expertise is working memory, codebase is source of truth. Always validate.
