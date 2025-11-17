# Plan: Bookmark Management with Auto-Fetching Metadata

**Status:** Not Started
**Priority:** Must-have (MVP)
**Agent:** agent-convex, agent-nextjs, agent-ui, agent-openai

## Overview

Implement full CRUD for bookmarks with automatic metadata fetching from URLs. When user pastes URL, auto-fetch title, description, preview image, and favicon using Unfurl.js. User can edit before saving.

## Technical Requirements

### Database Schema (Convex)

**Bookmarks Table:**
```typescript
bookmarks: defineTable({
  folderId: v.id("folders"),
  userId: v.string(),           // For security filtering
  url: v.string(),              // Required field
  title: v.string(),            // Auto-filled, editable
  description: v.optional(v.string()), // Auto-filled, editable
  previewImageId: v.optional(v.id("_storage")), // Convex storage ID
  faviconId: v.optional(v.id("_storage")),      // Convex storage ID
  embedding: v.optional(v.array(v.float64())),  // Vector for search (1536 dims)
  tags: v.optional(v.array(v.string())),        // Future: manual tags
  createdAt: v.number(),
  updatedAt: v.number(),
})
  .index("by_folder", ["folderId"])
  .index("by_user", ["userId"])
  .searchIndex("by_embedding", {
    searchField: "embedding",
    filterFields: ["userId", "folderId"],
  }),
```

### Metadata Fetching (Convex Action)

**convex/metadata.ts:**
```typescript
import { action } from "./_generated/server";
import { v } from "convex/values";
import { unfurl } from "unfurl.js";

export const fetchMetadata = action({
  args: { url: v.string() },
  handler: async (ctx, { url }): Promise<{
    title: string;
    description?: string;
    imageUrl?: string;
    faviconUrl?: string;
  }> => {
    try {
      const result = await unfurl(url, {
        timeout: 5000, // 5 second timeout
      });

      return {
        title: result.title || new URL(url).hostname,
        description: result.description,
        imageUrl: result.open_graph?.images?.[0]?.url || result.twitter_card?.images?.[0]?.url,
        faviconUrl: result.favicon,
      };
    } catch (error) {
      // Fallback to URL hostname as title
      return {
        title: new URL(url).hostname,
      };
    }
  },
});

export const downloadAndStoreImage = action({
  args: {
    imageUrl: v.string(),
  },
  handler: async (ctx, { imageUrl }): Promise<string> => {
    try {
      const response = await fetch(imageUrl);
      if (!response.ok) throw new Error("Failed to download image");

      const blob = await response.blob();
      const storageId = await ctx.storage.store(blob);
      return storageId;
    } catch (error) {
      throw new Error(`Failed to download image: ${error.message}`);
    }
  },
});
```

**Dependencies to install:**
```bash
npm install unfurl.js
```

### Convex Mutations & Queries

**convex/bookmarks.ts:**
```typescript
// Queries
- listBookmarksInFolder({ folderId }) - Get all bookmarks in folder
- getBookmark({ bookmarkId }) - Get single bookmark
- searchBookmarksInProject({ projectId, query }) - Full-text search (future)

// Mutations
- createBookmark({ folderId, url, title, description, previewImageId?, faviconId? })
- updateBookmark({ bookmarkId, title?, description?, folderId? })
- deleteBookmark({ bookmarkId })
- moveBookmark({ bookmarkId, newFolderId })

// Security: All operations filter by userId
```

### Frontend Components

**Add Bookmark Flow:**
1. User clicks "+ Add Bookmark" button
2. Dialog opens with URL input
3. User pastes URL → triggers metadata fetch
4. Loading state while fetching
5. Form pre-fills with fetched metadata
6. User can edit title/description
7. Select folder (dropdown)
8. Click "Save" → creates bookmark

**Bookmark Display:**
- Grid or list view (toggle)
- Card shows: favicon, title, description (truncated), preview image
- Hover: show full description
- Click card → open URL in new tab
- Right-click → context menu (edit, move, delete)

**File Structure:**
```
/components/features/
  add-bookmark-dialog.tsx
  bookmark-card.tsx
  bookmark-list.tsx
  bookmark-grid.tsx
  edit-bookmark-dialog.tsx
  view-toggle.tsx (grid/list)
```

## Implementation Steps

### Phase 1: Database Schema
1. Update `convex/schema.ts` with bookmarks table
2. Add search index for vector embeddings
3. Deploy schema

### Phase 2: Metadata Fetching
1. Install `unfurl.js`: `npm install unfurl.js`
2. Create `convex/metadata.ts` with fetchMetadata action
3. Create `downloadAndStoreImage` action for images
4. Test in Convex dashboard with sample URLs

### Phase 3: Bookmarks Backend
1. Create `convex/bookmarks.ts` with all queries/mutations
2. Implement createBookmark mutation (does NOT generate embedding yet - that's separate plan)
3. Add validation (URL format, title length, etc.)
4. Test CRUD operations in dashboard

### Phase 4: Add Bookmark Dialog
1. Create `AddBookmarkDialog` component
2. URL input field (required)
3. On URL input (debounced):
   - Validate URL format
   - Call `fetchMetadata` action
   - Show loading spinner
   - Populate title/description fields
4. Editable title/description inputs
5. Folder selector dropdown
6. "Save" button → calls createBookmark mutation

### Phase 5: Bookmark Display
1. Create `BookmarkCard` component
   - Show preview image (if exists)
   - Show favicon + title
   - Show truncated description
   - Click → open URL
   - Context menu → edit/delete
2. Create `BookmarkGrid` component
   - Responsive grid (1 col mobile, 2-3 col desktop)
   - Empty state ("No bookmarks yet")
3. Create `BookmarkList` component (alternative view)
   - Compact list view
   - Same data, different layout

### Phase 6: Edit & Delete
1. Create `EditBookmarkDialog`
   - Pre-fill current values
   - Allow editing title/description/folder
   - Cannot edit URL (delete + re-add if needed)
2. Delete confirmation dialog
   - Warn if bookmark has embedding (will lose AI search capability)

### Phase 7: Storage & Images
1. Implement image download in `createBookmark` flow
   - If metadata has imageUrl, download to Convex storage
   - Store storage ID in previewImageId field
   - Same for favicon
2. Create helper to get image URL from storage ID
3. Display images in BookmarkCard using storage URLs

### Phase 8: Integration with Folders
1. Show bookmarks when folder is selected in sidebar
2. Main content area shows bookmark grid/list
3. Breadcrumb navigation (Project > Folder > ...)
4. Bookmark count badge on folders

## Acceptance Criteria

- [ ] User can add bookmark by pasting URL
- [ ] Metadata auto-fetches within 2 seconds
- [ ] Title and description pre-filled from metadata
- [ ] User can edit metadata before saving
- [ ] Preview image and favicon stored and displayed
- [ ] Bookmark saved to selected folder
- [ ] User can view bookmarks in grid or list layout
- [ ] User can edit bookmark title/description
- [ ] User can move bookmark to different folder
- [ ] User can delete bookmark (with confirmation)
- [ ] Clicking bookmark opens URL in new tab
- [ ] All operations secured by userId
- [ ] UI is responsive (mobile-friendly)

## Edge Cases

1. **Invalid URL** - Show error, don't fetch metadata
2. **Metadata fetch fails** - Use hostname as title, allow manual entry
3. **Image download fails** - Save bookmark without image
4. **Duplicate URL in same folder** - Allow (user might want multiple entries)
5. **Very long title/description** - Truncate in UI, store full text
6. **Slow metadata fetch** - Show "Fetching..." for up to 5s, then fallback
7. **URL with authentication** - Metadata fetch will fail, use manual entry

## Testing Checklist

- [ ] Add bookmark with valid URL → metadata fetches
- [ ] Add bookmark with invalid URL → shows error
- [ ] Edit bookmark → updates immediately
- [ ] Delete bookmark → removes from list
- [ ] Move bookmark to different folder → appears in new location
- [ ] Grid/list view toggle → layout changes
- [ ] Click bookmark card → opens in new tab
- [ ] Image loading → shows placeholder while loading
- [ ] Multiple users → bookmarks isolated
- [ ] Responsive → cards stack on mobile

## Dependencies

**npm packages:**
- `unfurl.js` - Metadata fetching

**Convex features:**
- Storage API - For images/favicons
- Actions - For external API calls

**Prerequisite plans:**
- `project-folder-organization.md` - Folders must exist first

## Files to Create

- `convex/metadata.ts`
- `convex/bookmarks.ts`
- `components/features/add-bookmark-dialog.tsx`
- `components/features/bookmark-card.tsx`
- `components/features/bookmark-grid.tsx`
- `components/features/bookmark-list.tsx`
- `components/features/edit-bookmark-dialog.tsx`
- `components/features/view-toggle.tsx`
- `app/(authenticated)/bookmarks/page.tsx`

## Files to Modify

- `convex/schema.ts` - Add bookmarks table
- `package.json` - Add unfurl.js dependency

## Environment Variables

None required (OpenAI will be added in separate embedding plan).

## Performance Considerations

- Debounce URL input (500ms) before fetching metadata
- Cache metadata fetches (if same URL added multiple times)
- Lazy load images in bookmark cards
- Limit bookmark display to 50 per page (pagination for large folders)
- Use Convex indexes for fast folder queries

## Future Enhancements

- Browser extension for quick-save
- Bulk import from browser bookmarks
- Duplicate detection (warn if similar URL exists)
- Auto-tagging based on URL domain
- Archive/unarchive bookmarks
- Bookmark history (track edits)
- Share bookmark collections
