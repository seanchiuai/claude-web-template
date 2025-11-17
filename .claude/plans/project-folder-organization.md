# Plan: Project and Folder Organization

**Status:** Not Started
**Priority:** Must-have (MVP)
**Agent:** agent-convex, agent-nextjs, agent-ui

## Overview

Implement hierarchical organization where users create projects (top-level containers) that contain nested folders. Each bookmark belongs to one folder within one project. Users start with a default "Main" project.

## Technical Requirements

### Database Schema (Convex)

**Projects Table:**
```typescript
projects: defineTable({
  userId: v.string(),           // Clerk user ID
  name: v.string(),             // "Work", "Personal", etc.
  isDefault: v.boolean(),       // True for "Main" project
  createdAt: v.number(),
  updatedAt: v.number(),
})
  .index("by_user", ["userId"])
  .index("by_user_default", ["userId", "isDefault"]),
```

**Folders Table:**
```typescript
folders: defineTable({
  projectId: v.id("projects"),
  parentFolderId: v.optional(v.id("folders")), // Null = root folder
  name: v.string(),
  userId: v.string(),           // For security filtering
  createdAt: v.number(),
  updatedAt: v.number(),
})
  .index("by_project", ["projectId"])
  .index("by_parent", ["parentFolderId"])
  .index("by_user", ["userId"]),
```

### Convex Queries & Mutations

**convex/projects.ts:**
```typescript
// Queries
- listUserProjects({ userId }) - Get all projects for user
- getProject({ projectId }) - Get single project with auth check
- getDefaultProject({ userId }) - Get user's default project

// Mutations
- createProject({ name, isDefault? }) - Create new project
- updateProject({ projectId, name }) - Rename project
- deleteProject({ projectId }) - Delete project + all folders/bookmarks
- setDefaultProject({ projectId }) - Change default project

// Security: All operations filter by ctx.auth.getUserIdentity()
```

**convex/folders.ts:**
```typescript
// Queries
- listFoldersInProject({ projectId }) - Get all folders in project (tree structure)
- getFolder({ folderId }) - Get single folder with auth check
- getFolderPath({ folderId }) - Get breadcrumb path to root

// Mutations
- createFolder({ projectId, parentFolderId?, name }) - Create folder
- updateFolder({ folderId, name }) - Rename folder
- moveFolder({ folderId, newParentFolderId }) - Move to different parent
- deleteFolder({ folderId }) - Delete folder + all children + bookmarks

// Security: Always verify userId matches before operations
```

### Frontend Components

**Project Switcher:**
- Location: Top of left sidebar
- Dropdown showing all projects
- Highlight current project
- "+ New Project" option
- Default project marked with badge

**Folder Tree:**
- Location: Left sidebar below project switcher
- Collapsible nested tree
- Drag-and-drop to reorder (nice-to-have)
- Right-click context menu (rename, delete, new subfolder)
- Show bookmark count per folder

**File Structure:**
```
/components/features/
  project-switcher.tsx
  folder-tree.tsx
  folder-tree-item.tsx
  new-project-dialog.tsx
  new-folder-dialog.tsx
```

## Implementation Steps

### Phase 1: Database Schema
1. Update `convex/schema.ts` with projects and folders tables
2. Add indexes for efficient queries
3. Deploy schema: `npx convex dev` (auto-migrates)

### Phase 2: Convex Backend
1. Create `convex/projects.ts` with all queries/mutations
2. Create `convex/folders.ts` with all queries/mutations
3. Implement row-level security (filter by userId)
4. Add validation (name length, prevent deleting default project, etc.)
5. Test in Convex dashboard

### Phase 3: UI Components
1. Build ProjectSwitcher component
   - Fetch projects with `useQuery(api.projects.listUserProjects)`
   - Dropdown with shadcn/ui DropdownMenu
   - Create project dialog
2. Build FolderTree component
   - Fetch folders with `useQuery(api.folders.listFoldersInProject)`
   - Recursive rendering for nested structure
   - Collapsible with state management
3. Build dialogs (NewProjectDialog, NewFolderDialog)
   - Form with Input component
   - Validation (required, max length)
   - Call mutations on submit

### Phase 4: Default Project Setup
1. Create Convex function to initialize default project on first login
2. Hook into Clerk webhook or first app load
3. Create "Main" project and "Uncategorized" root folder

### Phase 5: Layout Integration
1. Update `app/layout.tsx` or create new authenticated layout
2. Sidebar with ProjectSwitcher + FolderTree
3. Main content area for bookmarks
4. Responsive - sidebar collapses on mobile

## Acceptance Criteria

- [ ] User can create multiple projects
- [ ] User can create nested folders (up to 5 levels deep)
- [ ] User can rename projects and folders
- [ ] User can delete folders (with confirmation if contains bookmarks)
- [ ] User cannot delete default project
- [ ] Folder tree shows correct hierarchy
- [ ] Project switcher shows all projects
- [ ] Default "Main" project created on first login
- [ ] All operations secured by userId
- [ ] UI is responsive (mobile-friendly)

## Edge Cases

1. **Delete project with bookmarks** - Show warning, delete all folders + bookmarks
2. **Delete folder with subfolders** - Cascade delete all children
3. **Rename to existing name** - Show error
4. **Move folder to its own child** - Prevent circular references
5. **Max nesting depth** - Limit to 5 levels, disable "New Subfolder" at max depth
6. **Empty states** - Show "No folders yet" with CTA to create first folder

## Testing Checklist

- [ ] Create project → appears in switcher
- [ ] Create nested folders → tree renders correctly
- [ ] Rename folder → updates immediately (real-time)
- [ ] Delete folder → removes from tree, deletes children
- [ ] Switch projects → folder tree updates
- [ ] Multiple users → data isolated (test with 2 accounts)
- [ ] Responsive → sidebar works on mobile
- [ ] Keyboard navigation → can navigate tree with arrow keys

## Dependencies

None - this is foundational feature, implement first.

## Files to Create

- `convex/projects.ts`
- `convex/folders.ts`
- `components/features/project-switcher.tsx`
- `components/features/folder-tree.tsx`
- `components/features/folder-tree-item.tsx`
- `components/features/new-project-dialog.tsx`
- `components/features/new-folder-dialog.tsx`
- `app/(authenticated)/layout.tsx` (new authenticated layout)

## Files to Modify

- `convex/schema.ts` - Add projects and folders tables
- `app/page.tsx` - Redirect to bookmarks page after auth

## Environment Variables

None required for this feature.

## Performance Considerations

- Use Convex indexes for fast lookups
- Limit folder tree depth to 5 levels
- Real-time updates via Convex subscriptions (automatic)
- Memoize folder tree rendering to prevent unnecessary re-renders

## Future Enhancements

- Drag-and-drop folder reordering
- Folder colors or icons
- Starred/favorite folders
- Folder templates
- Bulk folder operations
