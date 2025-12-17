---
description: Sync expert expertise with current codebase (trigger self-improvement)
argument-hint: [expert-name or "all"]
---

# Command: Sync Expertise

Trigger self-improvement for one or all experts to sync their mental models with the current codebase.

## Usage

```bash
/sync-expertise convex        # Update convex expert only
/sync-expertise all           # Update all experts
/sync-expertise               # Interactive: ask which expert
```

## What is Sync Expertise?

**Self-Improvement = Learning from the Codebase**

Each expert has an expertise file (mental model) that evolves over time. Sync expertise:

1. **Reads current expertise** (mental model)
2. **Explores codebase** (source of truth)
3. **Validates patterns** (checks what's still true)
4. **Discovers new patterns** (finds new conventions)
5. **Updates expertise file** (writes learnings)

**Result:** Expert knowledge synchronized with reality

## When to Run

**Recommended triggers:**

1. **After significant commits** (5+ files changed)
   - Git hook will suggest this automatically
   - Manual: `/sync-expertise [affected-expert]`

2. **After major features**
   - New patterns likely introduced
   - Manual: `/sync-expertise [domain-expert]`

3. **After refactoring**
   - Patterns may have changed
   - Manual: `/sync-expertise all`

4. **Monthly maintenance**
   - Keep expertise fresh
   - Manual: `/sync-expertise all`

5. **When answers seem outdated**
   - Expert gave wrong/outdated answer
   - Manual: `/sync-expertise [that-expert]`

**Don't run:**
- After every tiny commit (too frequent)
- During active development (wait for stable state)
- When build is broken (fix first)

## How It Works

### For Single Expert

```bash
/sync-expertise convex
```

**Process:**
1. Load `.claude/experts/convex-expert/self-improve.md`
2. Expert reads their current expertise.yaml
3. Expert explores convex/ directory
4. Expert validates existing patterns
5. Expert discovers new patterns
6. Expert updates expertise.yaml:
   - Add new patterns
   - Update confidence levels
   - Remove obsolete patterns
   - Update file locations
   - Increment version
   - Add evolution log entry

**Output:** Summary of what changed

### For All Experts

```bash
/sync-expertise all
```

**Process:**
1. Run self-improvement for each expert sequentially:
   - convex-expert
   - nextjs-expert
   - shadcn-expert
   - vercel-expert
2. Aggregate results
3. Show summary for all experts

**Note:** Takes longer (4x single expert time)

## Example Output

### Single Expert Sync

```markdown
## Syncing convex-expert...

### Exploration
- Found: 12 Convex files
- New files: 2 (convex/webhooks.ts, convex/cron.ts)
- Modified: 3 files since last sync

### Pattern Validation
- ✅ "Schedule actions from mutations" - VALIDATED (5 occurrences → high confidence)
- ✅ "CORS headers for HTTP endpoints" - VALIDATED (1 occurrence → medium confidence)
- ✅ "Use ctx.storage.getUrl()" - VALIDATED (3 occurrences → high confidence)
- ⚠️  "Storage URLs never expire" - REMOVED (contradicted by new code)

### New Discoveries
- 🆕 "Cron jobs in convex/cron.ts" (2 occurrences → low confidence)
- 🆕 "Webhook validation pattern" (1 occurrence → low confidence)
- 🆕 "File organization: one table per file" (12 files → high confidence)

### Updates
- **Patterns added:** 3
- **Patterns updated:** 3
- **Patterns removed:** 1
- **Confidence increased:** 2 patterns
- **Version:** 0.1.0 → 0.2.0

### Evolution
- **Before:** low confidence (initialization)
- **After:** medium confidence (validated)
- **Reasoning:** Core patterns validated, new patterns discovered

✅ convex-expert expertise synchronized
```

### All Experts Sync

```markdown
## Syncing all experts...

### convex-expert ✅
- Version: 0.1.0 → 0.2.0
- Patterns added: 3
- Confidence: low → medium

### nextjs-expert ✅
- Version: 0.1.0 → 0.2.0
- Patterns added: 5
- Confidence: low → medium

### shadcn-expert ✅
- Version: 0.1.0 → 0.1.1
- Patterns added: 0 (no changes)
- Confidence: low → low

### vercel-expert ✅
- Version: 0.1.0 → 0.1.2
- Patterns added: 1
- Confidence: low → medium

---

**Summary:**
- Total patterns added: 9
- Total patterns validated: 18
- Experts improved: 3/4
- Average confidence: medium

✅ All experts synchronized
```

## Implementation

Execute self-improve workflow for specified expert(s):

```typescript
const expertMap = {
  'convex': '.claude/experts/convex-expert/self-improve.md',
  'nextjs': '.claude/experts/nextjs-expert/self-improve.md',
  'shadcn': '.claude/experts/shadcn-expert/self-improve.md',
  'vercel': '.claude/experts/vercel-expert/self-improve.md',
};

const target = args[0] || 'prompt-user';

if (target === 'all') {
  // Run all experts sequentially
  for (const [name, path] of Object.entries(expertMap)) {
    console.log(`\n## Syncing ${name}-expert...\n`);
    await runSelfImprove(path);
  }
} else if (expertMap[target]) {
  // Run single expert
  await runSelfImprove(expertMap[target]);
} else {
  // Show options
  console.log('Which expert would you like to sync?');
  console.log('- convex');
  console.log('- nextjs');
  console.log('- shadcn');
  console.log('- vercel');
  console.log('- all');
}
```

## What Changes

**Expertise file updates:**

```yaml
# Before sync
version: "0.1.0"
confidence: "low"
convex_patterns:
  - pattern: "Use queries for reads"
    confidence: "low"
    evidence: "agent docs"

# After sync
version: "0.2.0"
confidence: "medium"
convex_patterns:
  - pattern: "Use queries for reads"
    confidence: "high"
    evidence: "convex/messages.ts:10, convex/tasks.ts:45, convex/users.ts:78"
  - pattern: "All queries return arrays"  # NEW
    confidence: "medium"
    evidence: "convex/messages.ts:15, convex/tasks.ts:50"

evolution_log:
  - date: "2025-12-17"
    change: "First sync: validated 5 patterns, added 2 new patterns"
    confidence_before: "low"
    confidence_after: "medium"
    trigger: "manual sync"
```

**File changes:**
- `.claude/experts/{expert}-expert/expertise.yaml` - Updated with learnings
- No other files modified (read-only exploration)

## Time Estimates

**Single expert:** 30-60 seconds
- File exploration
- Pattern validation
- Expertise update

**All experts:** 2-4 minutes
- 4 experts × 30-60 seconds each
- Sequential execution

## Verification

After sync, you can verify changes:

```bash
# View updated expertise
Read: .claude/experts/convex-expert/expertise.yaml

# Check version increment
# Should see: version incremented, timestamp updated

# Check evolution log
# Should have new entry with date and changes

# Test with question
/ask-expert convex "How do I handle CORS?"
# Should give answer with higher confidence
```

## Troubleshooting

### Issue: Expert not found

```
Expert 'database' not found.
Available: convex, nextjs, shadcn, vercel
```

**Solution:** Use correct expert name

### Issue: No changes after sync

```
⚠️ No significant changes detected
- All patterns still valid
- No new patterns found (threshold: 3+ occurrences)
- Confidence levels unchanged
```

**Reason:** Codebase hasn't changed significantly since last sync
**Action:** This is normal! Not every sync needs changes.

### Issue: YAML syntax error

```
❌ Error updating expertise: Invalid YAML syntax
```

**Solution:**
1. Read expertise file to see issue
2. Fix syntax manually or restore from git
3. Re-run sync

### Issue: Patterns removed unexpectedly

**Reason:** Pattern not found in codebase (obsolete or false positive)
**Check:** Look at evolution_log for details
**Action:** Review changes, restore if needed

## Best Practices

**DO:**
✅ Run after significant changes
✅ Run before asking questions (for freshest answers)
✅ Review changes in expertise files
✅ Commit updated expertise files
✅ Use "all" after major refactoring

**DON'T:**
❌ Run after every commit (too frequent)
❌ Run during active development
❌ Ignore sync suggestions from git hooks
❌ Skip committing updated expertise
❌ Run when build is broken

## Integration with Git Hooks

After commits, git post-commit hook suggests syncing:

```bash
# After commit
git commit -m "Add new Convex endpoint"

# Hook output
📚 Convex changes detected
💡 Consider: /sync-expertise convex
```

**You can:**
- Run suggested command immediately
- Wait and batch with other commits
- Skip if change was trivial

## Related Commands

- `/ask-expert [expert]` - Ask questions (uses current expertise)
- Sync before asking if you suspect expertise is stale
- Git hooks suggest when to sync

## Monitoring Expertise Evolution

Track expert improvement over time:

```yaml
# Initial state (Day 1)
version: "0.1.0"
confidence: "low"
patterns: 5

# After first sync (Day 1)
version: "0.2.0"
confidence: "medium"
patterns: 8

# After month (Day 30)
version: "0.8.0"
confidence: "high"
patterns: 25

# Mature expert (Day 90)
version: "1.2.0"
confidence: "high"
patterns: 35
```

**Healthy progression:**
- Versions increment steadily
- Confidence increases over time
- Patterns stabilize (fewer additions, more validations)
- Evidence becomes more specific

## Success Metrics

A successful sync should:
- [ ] Complete without errors
- [ ] Increment version
- [ ] Update timestamp
- [ ] Add evolution log entry
- [ ] Validate existing patterns
- [ ] Discover insights if codebase changed
- [ ] Increase confidence (over time)
- [ ] Take < 2 minutes

## Notes

- Self-improvement is the key differentiator of Agent Experts
- Regular syncing keeps expertise accurate
- Expertise evolves with your codebase
- Patterns validated 5+ times reach high confidence
- Obsolete patterns are automatically removed
- Each sync makes future answers better
