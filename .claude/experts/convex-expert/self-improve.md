---
name: Self-Improve Convex Expert
description: Sync Convex expertise with current codebase after changes
tools: Read, Grep, Glob, Edit
model: inherit
---

# Self-Improve: Convex Expert

Automatically update expertise.yaml based on current codebase state. This is how the agent learns.

## Purpose

**Goal:** Keep mental model synchronized with reality
- Expertise is working memory, code is source of truth
- Validate existing patterns against current code
- Discover new patterns and conventions
- Remove obsolete or incorrect patterns
- Increase confidence for validated patterns

## Workflow

### Step 1: Read Current Expertise

```
Read: .claude/experts/convex-expert/expertise.yaml
```

**Understand current state:**
- What patterns are documented?
- What confidence levels?
- What files are tracked?
- When was last update?

### Step 2: Explore Convex Codebase

**Critical: Thorough exploration before updates**

#### 2a. Find all Convex files
```bash
Glob: convex/*.ts
```

Count files, identify:
- New files since last run
- Files that no longer exist
- Most recently modified files

#### 2b. Read key files
```bash
Read: convex/schema.ts
Read: convex/http.ts
Read: convex/auth.config.ts
```

Also read any files mentioned in expertise that exist.

#### 2c. Search for patterns
For each pattern in expertise.yaml, verify:

```bash
# Example: Verify "schedule actions" pattern
Grep: "ctx.scheduler.runAfter" in convex/
Grep: "ctx.scheduler.runAt" in convex/

# Example: Verify CORS pattern
Grep: "CORS" in convex/
Grep: "Access-Control" in convex/

# Example: Verify storage pattern
Grep: "ctx.storage.getUrl" in convex/
Grep: "ctx.storage.store" in convex/
```

Count occurrences for each pattern.

### Step 3: Validate & Discover Patterns

**Pattern Validation Rules** (see `.claude/experts/_shared/validation-rules.md`):

#### Validate Existing Patterns

For each pattern in expertise:

1. **Count occurrences** (via Grep)
   - 0 found → Remove or mark for removal
   - 1-2 found → Keep but set confidence: low
   - 3-4 found → Set confidence: medium
   - 5+ found → Set confidence: high

2. **Check evidence paths**
   - Do referenced files still exist?
   - Are line numbers still accurate?
   - Update evidence with current locations

3. **Look for exceptions**
   - Pattern violated anywhere?
   - Conflicting implementations?
   - Lower confidence if exceptions found

#### Discover New Patterns

Look for:

1. **Repeated code structures** (3+ occurrences)
   - Function naming conventions
   - Error handling patterns
   - Data validation approaches
   - Common utilities

2. **Project conventions**
   - Naming patterns (e.g., all mutations named "create*", "update*")
   - File organization (e.g., one table per file)
   - Import patterns
   - Comment styles

3. **Common issues** (from code comments or try-catch)
   - Error messages
   - Edge case handling
   - Workarounds

### Step 4: Update Expertise File

**Use Edit tool to update expertise.yaml**

#### 4a. Update existing patterns

Example:
```yaml
# BEFORE
- pattern: "Schedule actions from mutations"
  confidence: "low"
  evidence: ".claude/agents/agent-convex.md:100-124"

# AFTER (found 5 occurrences)
- pattern: "Schedule actions from mutations, never call directly"
  confidence: "high"
  evidence: "convex/tasks.ts:45, convex/messages.ts:78, convex/users.ts:112, convex/projects.ts:203, convex/workflows.ts:89"
  last_validated: "2025-12-17"
```

#### 4b. Add new patterns

Only if seen 3+ times:
```yaml
- pattern: "All mutations return inserted ID"
  context: "Convex mutation pattern"
  evidence: "convex/tasks.ts:50, convex/messages.ts:85, convex/users.ts:120"
  learned_from: "Self-improve run 2025-12-17"
  importance: "medium"
  confidence: "medium"
```

#### 4c. Remove obsolete patterns

If pattern not found in 2+ consecutive runs:
```yaml
# Remove from convex_patterns list
# Add note to evolution_log about removal
```

#### 4d. Update common_issues

- Update `frequency` based on recent occurrences
- Update `last_seen` dates
- Add new issues discovered
- Remove issues no longer relevant

#### 4e. Update key_files

```yaml
key_files:
  schema: "convex/schema.ts"  # Verify exists
  http_routes: "convex/http.ts"  # Verify exists
  auth_config: "convex/auth.config.ts"  # Verify exists
  common_patterns:
    - "convex/messages.ts"  # Add all .ts files in convex/
    - "convex/tasks.ts"
    - "convex/users.ts"
    # ... discovered files
```

#### 4f. Update codebase_conventions

Discover project-specific patterns:
```yaml
codebase_conventions:
  - convention: "All mutations schedule actions, never call directly"
    evidence: "Pattern in 8 mutation files"
    confidence: "high"

  - convention: "Internal mutations prefixed with 'internal'"
    evidence: "Pattern in 6 files"
    confidence: "medium"
```

#### 4g. Update metadata

```yaml
version: "0.2.0"  # Increment appropriately
last_updated: "2025-12-17T14:00:00Z"  # Current timestamp
confidence: "medium"  # Overall confidence (based on validation)

metadata:
  self_improve_runs: 1  # Increment
  last_self_improve: "2025-12-17"  # Current date
  # questions_answered: unchanged
```

#### 4h. Add evolution log entry

```yaml
evolution_log:
  - date: "2025-12-17"
    change: "First self-improve run: validated 3 patterns (high confidence), added 2 new patterns, discovered 5 codebase conventions"
    confidence_before: "low"
    confidence_after: "medium"
    trigger: "self-improve"
```

### Step 5: Validation

Before saving, verify:

- [ ] YAML syntax is valid (no parsing errors)
- [ ] All file paths in evidence exist (use Read to check)
- [ ] Version incremented (MAJOR.MINOR.PATCH)
- [ ] Timestamp updated to current time
- [ ] Metadata counters incremented
- [ ] Evolution log has entry
- [ ] No contradictions within file
- [ ] Evidence uses `file:line` format or `file:line-range`
- [ ] Confidence levels match occurrence counts

### Step 6: Report Changes

**Output summary:**

```markdown
## Self-Improvement Summary

**Expert:** Convex Expert
**Run Date:** 2025-12-17
**Version:** 0.1.0 → 0.2.0

### Files Explored
- Found: 12 Convex files
- New since last run: 2 files
- Removed since last run: 0 files

### Pattern Validation
- **Validated:** 5 patterns
- **Confidence increased:** 3 patterns (low → high)
- **Confidence decreased:** 0 patterns
- **Removed:** 0 patterns

### New Discoveries
- **New patterns added:** 2
  - "All mutations return inserted ID" (medium confidence)
  - "Internal mutations for action→mutation flow" (medium confidence)

- **Codebase conventions discovered:** 5
  - Naming convention for mutations
  - File organization pattern
  - Error handling standard
  - Import organization
  - Comment style

### Common Issues
- **Updated:** 2 issues (frequency/last_seen)
- **Added:** 1 new issue
- **Removed:** 0 issues

### Confidence Evolution
- **Before:** low (initial state)
- **After:** medium (validated against codebase)
- **Reasoning:** Patterns validated in actual code, new conventions discovered

### Next Steps
- Continue monitoring for new patterns
- Validate low-confidence patterns
- Update after significant commits
```

## Update Rules

**PATCH version (0.1.0 → 0.1.1):**
- Minor updates (file paths, evidence)
- Small refinements
- Metadata updates

**MINOR version (0.1.0 → 0.2.0):**
- New patterns added
- Confidence level changes
- New issues discovered
- Significant updates to existing patterns

**MAJOR version (0.1.0 → 1.0.0):**
- Major architectural changes
- Significant pattern overhauls
- Multiple patterns added/removed
- High confidence achieved across domain
- Expert considered "mature"

## Pattern Detection Thresholds

**Add pattern:**
- Seen 3+ times
- Consistent implementation
- Meaningful (not trivial)
- Has evidence

**Increase confidence:**
- More occurrences found
- No exceptions discovered
- Validated in recent code
- Documented officially

**Decrease confidence:**
- Exceptions found
- Inconsistent usage
- Evidence outdated
- Not found in new code

**Remove pattern:**
- Not found in 2+ runs
- Contradicted by code
- Obsolete/deprecated
- False positive

## Common Self-Improve Scenarios

### Scenario 1: First Run (Initialization)

**Before:** Low confidence, patterns from agent docs
**Actions:**
- Validate all patterns against actual code
- Count occurrences
- Update confidence levels
- Populate key_files from Glob
- Discover initial conventions

**After:** Medium confidence, real evidence

### Scenario 2: After Feature Implementation

**Before:** Medium confidence, established patterns
**Actions:**
- Check if new files added
- Validate existing patterns still hold
- Look for new patterns in new code
- Update last_seen for used patterns

**After:** Higher confidence, possibly new patterns

### Scenario 3: After Refactoring

**Before:** High confidence, many patterns
**Actions:**
- Check if patterns changed
- Update file paths if moved
- Remove obsolete patterns
- Note architectural changes

**After:** Updated confidence, evolved patterns

### Scenario 4: After Bug Fix

**Before:** Existing expertise
**Actions:**
- Add issue to common_issues if recurring
- Update solution if better fix found
- Note pattern violation if relevant

**After:** More complete issue tracking

## Troubleshooting

### Issue: Can't find pattern that expertise claims exists

**Action:**
1. Search more broadly (different keywords)
2. Check if pattern was removed/refactored
3. Mark pattern for removal if truly gone
4. Log in evolution_log

### Issue: Found conflicting patterns

**Action:**
1. Investigate which is correct
2. Check git history for context
3. Update expertise with correct pattern
4. Note conflict in evolution_log
5. Add caveat if both patterns valid in different contexts

### Issue: Too many patterns (file growing large)

**Action:**
1. Remove low-confidence patterns (not validated in 3+ runs)
2. Merge similar patterns
3. Focus on most important patterns
4. Archive obsolete sections

### Issue: Evidence paths are broken (404)

**Action:**
1. Search for new file locations
2. Update paths if files moved
3. Remove patterns if files deleted
4. Log path updates in evolution_log

## Best Practices

**DO:**
✅ Run after significant commits (5+ files changed)
✅ Validate every pattern against actual code
✅ Count occurrences before updating confidence
✅ Provide specific file:line evidence
✅ Log all significant changes
✅ Increment version on every run
✅ Remove patterns not found

**DON'T:**
❌ Add patterns seen only once or twice
❌ Trust old evidence without validation
❌ Skip version increments
❌ Keep patterns not found in code
❌ Use relative paths
❌ Forget to update timestamp
❌ Leave metadata unchanged

## Integration with Workflows

**When to run self-improve:**

1. **After git commits** (via post-commit hook suggestion)
2. **After major features** (manual trigger)
3. **Monthly maintenance** (scheduled)
4. **After refactoring** (manual trigger)
5. **When expertise seems stale** (manual check)

**Avoid running:**
- During active development (wait for stable state)
- After every tiny commit (too frequent)
- When codebase is broken (build fails)

## Success Criteria

A successful self-improve run should:
- [ ] Validate all existing patterns
- [ ] Update confidence levels based on evidence
- [ ] Discover at least 1 new insight (if codebase changed)
- [ ] Update all file paths
- [ ] Increment version
- [ ] Add evolution log entry
- [ ] Complete in < 2 minutes
- [ ] Result in valid YAML
- [ ] Increase overall expertise confidence (over time)
