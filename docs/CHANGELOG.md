# Changelog

> **Purpose**: Track critical changes engineers need to know. Keep concise, update after commits/pulls.

## [Unreleased] - 2025-12-17

### Added - Agent Experts System

**Summary:**
- Implemented complete Agent Experts framework: agents that execute AND learn
- Created 4 domain experts (convex, nextjs, shadcn, vercel) with self-improvement capability
- Added question/answer workflows with codebase validation
- Integrated git hooks for automatic learning suggestions
- Created meta-skills for building new experts and prompts

**What's new:**
- **Experts:** `.claude/experts/{name}-expert/` with expertise.yaml, question.md, self-improve.md
- **Commands:** `/ask-expert [domain] "question"` and `/sync-expertise [domain]`
- **Git Hook:** `.git/hooks/post-commit` suggests self-improvement after commits
- **Meta-Skills:** `creating-expert` and `meta-prompt` for tools-that-build-tools
- **Documentation:** `docs/agent_experts.md` comprehensive guide

**Key features:**
- Ask questions, get answers with evidence (file:line references)
- Expertise files track patterns, issues, conventions with confidence levels
- Self-improvement syncs mental models with codebase changes
- Automatic learning via git hook suggestions
- Pattern detection: 3+ occurrences = add pattern, 5+ = high confidence

**How to use:**
```bash
/ask-expert convex "How do I handle CORS?"        # Ask questions
/sync-expertise convex                            # Update expertise
/sync-expertise all                               # Update all experts
```

**Files affected:**
- `.claude/experts/` - New expert system (4 experts + shared templates)
- `.claude/commands/` - New: ask-expert.md, sync-expertise.md
- `.claude/agents/` - Enhanced with expertise references
- `.claude/skills/` - New: creating-expert, meta-prompt
- `.claude/hooks/` - New: post-commit.template
- `.git/hooks/post-commit` - Installed
- `CLAUDE.md` - Added Agent Experts section
- `docs/agent_experts.md` - New comprehensive documentation

**Important notes:**
- Expertise is working memory, codebase is source of truth - always validate
- Run self-improve after significant changes to keep expertise current
- Git hook suggests syncing automatically after domain-specific commits
- Low confidence initially, improves with usage and self-improvement runs
- Meta-skills enable rapid creation of new experts for additional domains

---

### Changed - README Enhancement

**Summary:**
- Completely rewrote README.md for easier onboarding
- Added comprehensive Claude Code integration documentation
- Included documentation templates overview
- Streamlined quick start instructions

**What's new in README:**
- ✨ What's Included section highlighting all template features
- 🤖 Claude Code Integration section with agents/commands/skills
- 📚 Documentation section with table of all docs/ templates
- 📁 Complete project structure visualization
- 🎯 Next Steps guide for new users
- 📝 Development Workflow recommendations

**What's improved:**
- Clearer quick start (Option A: Manual, Option B: Claude Code)
- Better organization with emoji headers for scannability
- Reference links to detailed docs instead of repeating info
- Highlights Claude Code as first-class development tool
- More concise while being more comprehensive

**Files affected:**
- README.md - Complete rewrite

---

### Documentation - update-CLAUDE Command Executed

**Summary:**
- Ran `/update-CLAUDE` command to verify CLAUDE.md accuracy
- Confirmed CLAUDE.md already reflects recent template restructuring
- Documentation structure validated against git history

**What's verified:**
- CLAUDE.md references correct doc paths (project_requirements, tech_stack, frontend_guidelines, backend_structure, security_guidelines, app_flow, app_flowchart)
- Workflow section accurate (agents: convex, nextjs, shadcn, vercel)
- No updates needed - CLAUDE.md already current

---

## Changes History - 2025-12-17

### Removed - Template Cleanup

**Summary:**
- Cleaned up root folder for template repository
- Removed test-ui.js (Playwright test script)
- Removed .DS_Store (macOS system file)

**What's affected:**
- Root folder structure now cleaner for template use

---

### Changed - Documentation Structure

**Summary:**
- Reorganized `/docs` folder with comprehensive template structure
- Replaced 8 old docs with 7 new template documents
- Updated CLAUDE.md references to new doc structure

**What's affected:**
- `/docs` folder: complete restructure
- CLAUDE.md: updated workflow and reference docs sections
- All documentation references in project

**New docs structure:**
- `project_requirements.md` - PRD template
- `tech_stack.md` - Technology choices
- `frontend_guidelines.md` - Frontend architecture
- `backend_structure.md` - Backend patterns
- `security_guidelines.md` - Security best practices
- `app_flow.md` - User journey documentation
- `app_flowchart.md` - Visual flow diagrams
- `CHANGELOG.md` - This file (template format)

**Important notes:**
- Fill in template sections as you build features
- Keep documentation in sync with code changes
- Preserved `human-only-DONOTMODIFY/` folder

---

## Template Format Guide

Use these section headings as needed:

### Added - [Feature Name]
For new features, components, or capabilities

### Changed - [Feature Name]
For modifications to existing functionality

### Removed - [Feature Name]
For deleted features or deprecated code

### Fixed - [Issue Description]
For bug fixes

### Security - [Update Description]
For security-related changes

### Performance - [Optimization Description]
For performance improvements

**Common subsections:**
- **Backend:** Convex changes, API endpoints
- **Frontend:** Components, pages, routes
- **Configuration:** Env vars, settings
- **Dependencies:** Package updates
- **Documentation:** Doc updates

**Keep logs:**
- Concise (bullet points)
- Critical info only
- Actionable when needed
- Dated with YYYY-MM-DD format
