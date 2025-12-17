# Changelog

> **Purpose**: Track critical changes engineers need to know. Keep concise, update after commits/pulls.

## [Unreleased] - 2025-12-17

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
