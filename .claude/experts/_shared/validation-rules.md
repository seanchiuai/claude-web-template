# Expertise Validation Rules

## Purpose

This document defines the rules for validating, updating, and maintaining expertise files. These rules ensure expertise files remain accurate, useful, and synchronized with the codebase.

## Core Principles

1. **Expertise is working memory, NOT source of truth**
   - The codebase is always the source of truth
   - Expertise files are mental models that guide exploration
   - Always validate expertise claims against actual code

2. **Evidence-based learning**
   - Every pattern must have evidence (file paths, line numbers)
   - Confidence levels must reflect validation frequency
   - Remove unvalidated patterns after 2 self-improve runs

3. **Incremental improvement**
   - Small, frequent updates better than large, infrequent ones
   - Version increments track evolution
   - Evolution log provides audit trail

## Pattern Detection Rules

### When to ADD a Pattern

Add a new pattern when ALL conditions are met:

1. **Frequency threshold**: Pattern seen 3+ times in codebase
2. **Consistency**: Pattern implementation is consistent across occurrences
3. **Significance**: Pattern is meaningful (not trivial or one-off)
4. **Evidence**: Can provide file paths and line numbers

**Example:**
```yaml
domain_patterns:
  - pattern: "All mutations schedule actions, never call directly"
    context: "Convex backend architecture"
    evidence: "convex/messages.ts:45, convex/tasks.ts:78, convex/users.ts:112"
    learned_from: "Code exploration during self-improve"
    importance: "high"
    confidence: "high"
```

### When to UPDATE a Pattern

Update an existing pattern when:

1. **More evidence found**: Increase confidence, add to evidence list
2. **Exception discovered**: Decrease confidence, note caveats
3. **Context refined**: Better understanding of when pattern applies
4. **Evidence changed**: File paths moved, line numbers shifted

**Example:**
```yaml
# Before
confidence: "medium"
evidence: "convex/messages.ts:45, convex/tasks.ts:78"

# After (more occurrences found)
confidence: "high"
evidence: "convex/messages.ts:45, convex/tasks.ts:78, convex/users.ts:112, convex/projects.ts:203"
```

### When to REMOVE a Pattern

Remove a pattern when ANY condition is met:

1. **Not found in code**: Pattern not found during 2+ consecutive self-improve runs
2. **Contradicted**: Codebase shows opposite pattern is now standard
3. **Obsolete**: Technology or approach deprecated
4. **False positive**: Pattern was misidentified

**Example Evolution Log Entry:**
```yaml
evolution_log:
  - date: "2025-12-17"
    change: "Removed 'Always use class components' pattern - codebase now uses functional components exclusively"
    confidence_before: "high"
    confidence_after: "N/A (removed)"
    trigger: "self-improve run found 0 instances"
```

## Confidence Level Guidelines

### High Confidence (5+ validations, no exceptions)

- Pattern validated in 5+ files
- No exceptions or contradictions found
- Consistent implementation across codebase
- Documented in official docs or agent instructions

**Characteristics:**
- Can confidently recommend this pattern
- Questions can cite this without caveats
- Evidence is strong and recent

### Medium Confidence (3-4 validations, occasional exceptions)

- Pattern seen 3-4 times
- Minor variations in implementation
- Some edge cases where pattern doesn't apply
- Not yet documented officially

**Characteristics:**
- Recommend with caveats
- Note exceptions when answering questions
- Evidence is solid but limited

### Low Confidence (1-2 validations, hypothesis stage)

- Pattern seen 1-2 times
- Might be coincidence, not convention
- Needs more validation
- Recently added

**Characteristics:**
- Mention as possibility, not recommendation
- Explicitly state low confidence
- Mark for validation in next self-improve

## Issue Tracking Rules

### When to ADD an Issue

Add to `common_issues` when:

1. **Encountered in real work**: Not theoretical
2. **Non-obvious**: Solution isn't immediately clear
3. **Recurring**: Seen 2+ times or likely to recur
4. **Actionable**: Clear solution exists

**Example:**
```yaml
common_issues:
  - problem: "Storage URL returns null in development"
    solution: "Ensure file uploaded to storage first, then call ctx.storage.getUrl()"
    frequency: "high"
    evidence: "agent-convex.md:180-185"
    last_seen: "2025-12-17"
```

### When to UPDATE an Issue

Update when:

1. **Frequency changes**: Seen more/less often
2. **Better solution found**: More elegant or robust fix
3. **Context refined**: Better understanding of when issue occurs
4. **Recent occurrence**: Update `last_seen` date

### When to REMOVE an Issue

Remove when:

1. **Fixed in codebase**: Root cause eliminated
2. **No longer relevant**: Tech stack changed
3. **Obsolete**: Not seen in 6+ months

## File Location Tracking

### Key Files Section

Purpose: Quick reference for where to find implementations

**Update when:**
- New files added to domain
- Files moved or renamed
- Key implementations change location
- Architecture evolves

**Example:**
```yaml
key_files:
  schema: "convex/schema.ts"
  http_routes: "convex/http.ts"
  auth_config: "convex/auth.config.ts"
  common_patterns:
    - "convex/messages.ts"
    - "convex/tasks.ts"
    - "convex/users.ts"
```

**Validation:**
- All paths must exist (verify with Read tool)
- Remove paths that 404
- Add new significant files discovered

## Codebase Conventions

### Project-Specific Patterns

Distinguished from general best practices:

**Codebase Convention:**
```yaml
codebase_conventions:
  - convention: "All API errors return { success: false, error: string }"
    evidence: "Pattern in 12 API files"
    confidence: "high"
```

**General Pattern:**
```yaml
domain_patterns:
  - pattern: "Use try-catch for error handling"
    context: "General TypeScript best practice"
    evidence: "Throughout codebase"
    importance: "medium"
    confidence: "high"
```

## Evolution Log Best Practices

### What to Log

Log significant changes:

1. **Pattern additions/removals**
2. **Confidence level changes** (when shift is meaningful)
3. **Major discoveries** (architectural patterns, conventions)
4. **Corrections** (when expertise was wrong)

### What NOT to Log

Skip minor changes:

1. Typo fixes
2. Formatting adjustments
3. File path updates (unless architecture changed)
4. Timestamp updates

### Log Entry Format

```yaml
evolution_log:
  - date: "YYYY-MM-DD"
    change: "Brief description of what changed and why"
    confidence_before: "low | medium | high"
    confidence_after: "low | medium | high"
    trigger: "self-improve | manual | question-answer | commit"
```

## Metadata Management

### System Fields

These fields track expertise file usage:

```yaml
metadata:
  created: "2025-12-17"              # Never changes
  self_improve_runs: 5               # Increment each run
  last_self_improve: "2025-12-17"    # Update each run
  questions_answered: 23             # Increment when question.md used
```

**Update rules:**
- Increment counters automatically
- Update timestamps on each run
- Never delete metadata section

## Version Management

### Semantic Versioning

Format: `MAJOR.MINOR.PATCH`

**PATCH (0.1.0 → 0.1.1):**
- Minor updates (file paths, evidence)
- Small pattern refinements
- Metadata updates

**MINOR (0.1.0 → 0.2.0):**
- New patterns added
- Confidence level changes
- New issues discovered

**MAJOR (0.1.0 → 1.0.0):**
- Major architectural changes
- Significant pattern overhauls
- Multiple patterns added/removed
- High confidence achieved across domain

**Example:**
```yaml
version: "0.2.3"
# 0 = Pre-1.0, still learning
# 2 = 2 minor updates (new patterns added)
# 3 = 3 patches (refinements, evidence updates)
```

## Validation Checklist

Before saving updated expertise file:

- [ ] YAML syntax is valid
- [ ] All file paths exist (verified with Read)
- [ ] All patterns have evidence
- [ ] Confidence levels match validation count
- [ ] Version incremented appropriately
- [ ] `last_updated` timestamp current
- [ ] Evolution log entry added (if significant)
- [ ] Metadata updated (run counts, dates)
- [ ] No contradictions within file
- [ ] Evidence uses `file:line` format

## Self-Improve Workflow

### Standard Self-Improve Steps

1. **Read current expertise**
   ```
   Read: .claude/experts/{expert}-expert/expertise.yaml
   ```

2. **Explore domain files**
   ```
   Glob: {domain-specific-pattern}
   Read: Key files from expertise
   Grep: Patterns mentioned in expertise
   ```

3. **Validate patterns**
   - Count occurrences (3+ = keep/add, <3 = remove/lower confidence)
   - Check file paths still exist
   - Look for new patterns
   - Identify deprecated patterns

4. **Update expertise**
   ```
   Edit: .claude/experts/{expert}-expert/expertise.yaml
   - Add new patterns
   - Update confidence levels
   - Remove obsolete patterns
   - Update evolution log
   - Increment version
   - Update timestamp
   - Update metadata
   ```

5. **Validate**
   - Check YAML syntax
   - Verify all paths exist
   - Ensure no contradictions
   - Confirm evidence is current

### Self-Improve Frequency

**Recommended triggers:**
- After significant commits (5+ files changed)
- After major feature implementations
- After bug fixes that revealed patterns
- After refactoring
- Monthly maintenance (even if no changes)

**Avoid:**
- After every single commit (too frequent)
- Only when explicitly asked (too infrequent)
- During active development (wait for stable state)

## Best Practices

### DO:

✅ Always provide evidence (file paths)
✅ Update timestamps on every change
✅ Increment version on every change
✅ Validate patterns against code
✅ Remove patterns not found
✅ Track confidence levels accurately
✅ Log significant changes
✅ Keep expertise concise and scannable

### DON'T:

❌ Trust expertise without validation
❌ Add patterns seen only once
❌ Keep outdated patterns
❌ Use relative file paths
❌ Skip version increments
❌ Log trivial changes
❌ Let expertise files grow unbounded
❌ Treat expertise as source of truth

## Example Self-Improve Update

### Before Self-Improve

```yaml
version: "0.1.0"
last_updated: "2025-12-15T10:00:00Z"
confidence: "low"

domain_patterns:
  - pattern: "Use query for reads"
    context: "Convex data fetching"
    evidence: "convex/messages.ts:10"
    confidence: "low"

metadata:
  self_improve_runs: 0
  last_self_improve: "never"
```

### After Self-Improve

```yaml
version: "0.2.0"  # MINOR: New patterns added
last_updated: "2025-12-17T13:30:00Z"
confidence: "medium"  # Overall confidence increased

domain_patterns:
  - pattern: "Use query for reads"
    context: "Convex data fetching"
    evidence: "convex/messages.ts:10, convex/tasks.ts:45, convex/users.ts:78, convex/projects.ts:112"
    confidence: "high"  # Increased: 4 occurrences found

  - pattern: "Use mutation for writes"  # NEW
    context: "Convex data modification"
    evidence: "convex/messages.ts:50, convex/tasks.ts:90, convex/users.ts:120"
    confidence: "medium"

evolution_log:
  - date: "2025-12-17"
    change: "First self-improve run: validated query pattern (high confidence), added mutation pattern (medium confidence)"
    confidence_before: "low"
    confidence_after: "medium"
    trigger: "self-improve"

metadata:
  self_improve_runs: 1
  last_self_improve: "2025-12-17"
```

## Troubleshooting

### Issue: Expertise contradicts code

**Solution:**
1. Trust the code (source of truth)
2. Update or remove contradicting pattern
3. Log correction in evolution log
4. Lower confidence if pattern was wrong

### Issue: Too many patterns (file too large)

**Solution:**
1. Remove low-confidence patterns not validated in 3+ runs
2. Merge similar patterns
3. Archive obsolete patterns
4. Focus on most important patterns

### Issue: Evidence paths are 404

**Solution:**
1. Update paths if files moved
2. Remove patterns if files deleted
3. Search for new locations
4. Log changes in evolution log

### Issue: Confidence levels unclear

**Solution:**
1. Count validations: 1-2 = low, 3-4 = medium, 5+ = high
2. Check for exceptions: any = lower confidence
3. Validate recently: stale = lower confidence
4. Document in official sources: yes = higher confidence
