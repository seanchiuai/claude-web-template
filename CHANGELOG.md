# Changelog

## [Unreleased]

### Added - 2025-11-16

#### Initial Implementation

- **Project & Folder Organization System**: Full hierarchical bookmark organization
  - Projects table with default project support
  - Folders table with nested structure (max 5 levels deep for user-facing nesting)
  - Bookmarks table linking to folders
  - Auto-initialization: Default "Main" project + "Uncategorized" folder on first login
  - Defense-in-depth: 5-level UI limit, 50-depth circular reference checks, 100-depth breadcrumb safeguard

- **Backend (Convex)**:
  - `convex/projects.ts`: CRUD operations, default project management, validation
  - `convex/folders.ts`: Nested folder operations, circular reference prevention, tree building
  - `convex/init.ts`: User initialization mutation
  - Updated schema with indexes for efficient queries

- **Frontend Components**:
  - `ProjectSwitcher`: Dropdown for switching/creating projects
  - `FolderTree` + `FolderTreeItem`: Recursive folder tree with expand/collapse
  - `NewProjectDialog` + `NewFolderDialog`: Creation dialogs with validation
  - `/bookmarks` route with custom sidebar layout
  - Added dialog component from shadcn/ui

#### Quality & Performance Improvements

- **Type Safety**: Replaced all `any` types with proper Convex types (QueryCtx, MutationCtx, Doc<T>)
- **Cycle Detection**: Added layered guards to prevent infinite loops in folder hierarchy traversal
  - getFolderDepth: Iterative with visited set (primary 5-level enforcement)
  - wouldCreateCircularReference: 50-depth technical limit + cycle detection (10x safety buffer)
  - getFolderPath: 100-depth safeguard for breadcrumb traversal
  - getSubtreeDepth: Recursive depth parameter
  - Note: Multiple thresholds provide defense-in-depth against data corruption and cycles
- **Performance**: Parallelized delete operations, added compound indexes
  - `by_user_name` on projects for efficient duplicate checks
  - `by_project_parent` on folders for sibling queries
  - Parallel deletes in deleteProject (bookmarks + folders)
- **TOCTOU Fixes**: Replaced full-table scans with targeted index queries
- **UX**: RenameFolderDialog component with validation
- **Default Project Deletion**: Auto-promotes fallback project instead of blocking

### Important Notes

- **Setup Required**: Run `npx convex dev` to deploy schema and generate types
- All operations secured with row-level filtering by userId
- Real-time updates via Convex subscriptions (automatic)
- **Depth Limits**: 5-level user-facing limit with layered safeguards (50/100-depth technical limits) for robustness
