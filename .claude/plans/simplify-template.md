# Simplify Claude Web Template to Minimal Version

## Overview
Convert the complex bookmark manager template with 8 Convex tables, multiple routes, and feature systems into a minimal template with:
- Single protected dashboard route
- One test table in Convex (text messages)
- Simple text input component
- Clerk auth + Convex integration preserved

## Current State Analysis

### Convex Schema (convex/schema.ts)
8 tables to remove:
- `numbers` - unused demo table
- `todos` - task system (no longer needed)
- `chatMessages` - AI chat (remove)
- `userMemory` - AI memory system (remove)
- `projects` - bookmark project system (remove)
- `folders` - bookmark folder system (remove)
- `bookmarks` - bookmark storage (remove)
- `_storage` - image storage references (remove)

### App Routes
Routes to delete:
- `/tasks` - Task management system (root protected route)
- `/tasks/layout.tsx` - Task layout with sidebar
- `/bookmarks` - Bookmark manager
- `/search-demo` - Search demo page
- `/server` - Server component example
- `/font-test` - Font testing page

Route to keep:
- `/` - Home page (redirects authenticated users to dashboard)

Route to create:
- `/dashboard` - New protected dashboard route

### Components to Delete
Features/components that depend on removed tables:
- `/components/features/` (entire directory)
  - `add-bookmark-example.tsx`
  - `chat/` (entire chat system)
  - `folder-tree.tsx`, `folder-tree-item.tsx`
  - `new-folder-dialog.tsx`, `new-project-dialog.tsx`
  - `project-switcher.tsx`
  - `rename-folder-dialog.tsx`
  - `semantic-search.tsx`
- `/components/TodoDashboard.tsx` - Task dashboard
- `/components/data-table.tsx` - Complex data table
- `/components/chart-area-interactive.tsx` - Charts
- `/components/nav-documents.tsx` - Document navigation
- `/components/section-cards.tsx` - Section cards

Components to keep:
- `/components/ConvexClientProvider.tsx` - Convex setup
- `/components/ClientBody.tsx` - Client body wrapper
- `/components/app-sidebar.tsx` - Sidebar (simplify nav)
- `/components/nav-main.tsx` - Navigation (simplify)
- `/components/nav-secondary.tsx` - Secondary nav (remove)
- `/components/nav-user.tsx` - User menu
- `/components/site-header.tsx` - Header (simplify)
- `/components/ui/` - All UI components (needed by dashboard)

### Convex Functions
Files to delete (entire files):
- `/convex/todos.ts` - Todo mutations/queries
- `/convex/chat.ts` - AI chat logic
- `/convex/chatMessages.ts` - Chat message functions
- `/convex/embeddings.ts` - Vector embeddings
- `/convex/bookmarks.ts` - Bookmark CRUD
- `/convex/folders.ts` - Folder CRUD
- `/convex/projects.ts` - Project CRUD
- `/convex/search.ts` - Semantic search
- `/convex/memory.ts` - Memory management

Files to keep:
- `/convex/auth.config.ts` - Auth setup
- `/convex/init.ts` - Initialization
- `/convex/myFunctions.ts` - Keep as pattern reference

## Implementation Plan

### Phase 1: Create New Convex Schema (FIRST - DO THIS FIRST)
This must be done first because tests will use the new schema.

**File**: `/convex/schema.ts`

Replace entire file with minimal schema:
```
export default defineSchema({
  textMessages: defineTable({
    userId: v.string(),
    content: v.string(),
    createdAt: v.number(),
  }).index("by_user", ["userId"]),
});
```

**Why first**: The new schema is the foundation. Other operations depend on this existing.

### Phase 2: Create New Convex Functions
Create new mutations/queries for text messages.

**File**: `/convex/textMessages.ts` (NEW)

Simple functions:
- `addTextMessage`: mutation to save text message
- `getTextMessages`: query to retrieve user's messages

### Phase 3: Create New Dashboard Component
Simple component with text input.

**File**: `/components/SimpleDashboard.tsx` (NEW)

Component features:
- Text input field
- Send button
- Disabled state while sending
- Error handling
- Display list of saved messages
- Uses Convex `addTextMessage` mutation

### Phase 4: Create New Protected Dashboard Route
New route to replace `/tasks`.

**File**: `/app/dashboard/page.tsx` (NEW)

Content:
- Import SimpleDashboard
- Wrap in authenticated check
- Simple layout

**File**: `/app/dashboard/layout.tsx` (NEW)

Content:
- Use existing layout structure
- Simplified sidebar (remove chat toggle, project switcher)
- Keep header, sidebar structure

### Phase 5: Update Root Page
Update homepage redirect.

**File**: `/app/page.tsx` (MODIFY)

Changes:
- Change redirect from `/tasks` to `/dashboard` (line 27)

### Phase 6: Update Navigation Components
Simplify navigation to remove extra routes.

**File**: `/components/app-sidebar.tsx` (MODIFY)

Changes:
- Line 26-30: Change navMain to point to `/dashboard` instead of `/tasks`
- Remove Settings and Help from navSecondary (lines 33-42)
- Update sidebar header link from `/tasks` to `/dashboard` (line 56)

**File**: `/components/nav-main.tsx` (MODIFY)

Changes:
- Remove "Add Task" button logic (lines 25-31, 40)
- Keep simple navigation menu

**File**: `/components/site-header.tsx` (MODIFY)

Changes:
- Remove AI Assistant toggle button (lines 23-37)
- Change title from "Tasks" to "Dashboard" (line 19)
- Remove onToggleChat prop handling

**File**: `/components/nav-secondary.tsx` (REMOVE)

No longer needed - delete or empty.

### Phase 7: Update Middleware
Ensure protection works for new route.

**File**: `/middleware.ts` (MODIFY)

Changes:
- Update protected route matcher from `/server` to `/dashboard` (line 3)

### Phase 8: Delete Unused Files
Delete all feature components and unused routes.

**Delete entire directories/files**:
1. `/app/tasks/` - entire directory
2. `/app/bookmarks/` - entire directory
3. `/app/search-demo/` - entire directory
4. `/app/server/` - entire directory
5. `/app/font-test/` - entire directory
6. `/components/features/` - entire directory
7. `/components/TodoDashboard.tsx`
8. `/components/data-table.tsx`
9. `/components/chart-area-interactive.tsx`
10. `/components/nav-documents.tsx`
11. `/components/section-cards.tsx`
12. `/convex/todos.ts`
13. `/convex/chat.ts`
14. `/convex/chatMessages.ts`
15. `/convex/embeddings.ts`
16. `/convex/bookmarks.ts`
17. `/convex/folders.ts`
18. `/convex/projects.ts`
19. `/convex/search.ts`
20. `/convex/memory.ts`

### Phase 9: Update Layout Components
Remove references to deleted components.

**File**: `/components/nav-user.tsx` (CHECK)

Review for any references to removed features - likely clean since it's just user menu.

**File**: `/app/layout.tsx` (CHECK)

Review for any references to removed features - should be clean as root layout is minimal.

## Order of Operations

This order prevents breaking dependencies:

1. Phase 1: Update schema first (foundation)
2. Phase 2: Create new Convex functions
3. Phase 3: Create new dashboard component
4. Phase 4: Create new dashboard routes (layout + page)
5. Phase 5: Update app/page.tsx redirect
6. Phase 6: Simplify navigation components
7. Phase 7: Update middleware
8. Phase 8: Delete unused files
9. Phase 9: Verify no broken imports in kept components

## Testing Points

After each phase, verify:

1. After Phase 1: `npm run dev` backend works without errors
2. After Phase 2: `convex` shows new functions in dashboard
3. After Phase 3: Component renders without errors
4. After Phase 4: Route `/dashboard` accessible when authenticated
5. After Phase 5: Home redirects to `/dashboard` when authenticated
6. After Phase 6: Navigation shows only Dashboard link
7. After Phase 7: `/dashboard` requires authentication
8. After Phase 8: No import errors from deleted files
9. Final: Text can be sent and persists in Convex

## Files to Keep/Modify Summary

**Keep (no changes)**:
- `/app/layout.tsx` - Root layout
- `/app/page.tsx` - Home (1 line change)
- `/app/globals.css` - Styles
- `/components/ConvexClientProvider.tsx` - Convex setup
- `/components/ClientBody.tsx` - Body wrapper
- `/components/nav-user.tsx` - User menu
- `/components/ui/*` - All UI components
- `/convex/auth.config.ts` - Auth config
- `/convex/init.ts` - Init function
- `/convex/myFunctions.ts` - Example functions
- `package.json` - Dependencies
- `tsconfig.json` - TypeScript config
- `.env.local` - Environment variables

**Create (new)**:
- `/app/dashboard/page.tsx` - Dashboard page
- `/app/dashboard/layout.tsx` - Dashboard layout
- `/components/SimpleDashboard.tsx` - Simple dashboard component
- `/convex/textMessages.ts` - Text message functions

**Modify (changes)**:
- `/app/page.tsx` - Change redirect path (1 line)
- `/components/app-sidebar.tsx` - Update nav data and header link
- `/components/nav-main.tsx` - Remove "Add Task" button
- `/components/site-header.tsx` - Remove chat toggle, change title
- `/middleware.ts` - Update protected route path

**Delete (entire)**:
- `/app/tasks/` directory
- `/app/bookmarks/` directory
- `/app/search-demo/` directory
- `/app/server/` directory
- `/app/font-test/` directory
- `/components/features/` directory
- `/components/TodoDashboard.tsx`
- `/components/data-table.tsx`
- `/components/chart-area-interactive.tsx`
- `/components/nav-documents.tsx`
- `/components/section-cards.tsx`
- `/components/nav-secondary.tsx` (or empty)
- `/convex/todos.ts`
- `/convex/chat.ts`
- `/convex/chatMessages.ts`
- `/convex/embeddings.ts`
- `/convex/bookmarks.ts`
- `/convex/folders.ts`
- `/convex/projects.ts`
- `/convex/search.ts`
- `/convex/memory.ts`

## Implementation Details

### SimpleDashboard.tsx Structure
```tsx
"use client";

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SimpleDashboard() {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const addMessage = useMutation(api.textMessages.addTextMessage);
  const messages = useQuery(api.textMessages.getTextMessages);
  
  const handleSend = async () => {
    if (!text.trim()) return;
    setIsLoading(true);
    try {
      await addMessage({ content: text });
      setText("");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex gap-2">
        <Input
          placeholder="Enter text..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          disabled={isLoading}
        />
        <Button onClick={handleSend} disabled={isLoading || !text.trim()}>
          Send
        </Button>
      </div>
      <div className="space-y-2">
        {messages?.map((msg) => (
          <div key={msg._id} className="p-2 bg-muted rounded">
            {msg.content}
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Dashboard Layout Structure
```tsx
"use client";

import { useState, useEffect } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Authenticated } from "convex/react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Authenticated>
      <SidebarProvider>
        <AppSidebar variant="inset" />
        <SidebarInset className="texture-minimal">
          <SiteHeader />
          <div className="flex flex-1 flex-col">
            <div className="flex flex-1 flex-col gap-2">
              {children}
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </Authenticated>
  );
}
```

### Dashboard Page Structure
```tsx
import SimpleDashboard from "@/components/SimpleDashboard";

export default function Page() {
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="px-4 lg:px-6">
        <SimpleDashboard />
      </div>
    </div>
  );
}
```

### textMessages.ts Functions
```tsx
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const addTextMessage = mutation({
  args: {
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    
    return await ctx.db.insert("textMessages", {
      userId: identity.sub,
      content: args.content,
      createdAt: Date.now(),
    });
  },
});

export const getTextMessages = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];
    
    return await ctx.db
      .query("textMessages")
      .withIndex("by_user", (q) => q.eq("userId", identity.sub))
      .collect();
  },
});
```

## Potential Issues & Mitigations

1. **Orphaned imports in kept components**
   - Solution: Use IDE to find broken imports after deletions
   - Check especially: SimpleDashboard usage, navigation links

2. **Convex _generated files**
   - Solution: They auto-regenerate after schema update
   - Run `convex dev` to regenerate

3. **Tailwind classes from deleted components**
   - Solution: Not an issue - Tailwind only includes used classes
   - No need to clean CSS

4. **Environment variables**
   - Solution: Clerk JWT issuer already configured
   - No changes needed to `.env.local`

## Verification Checklist

- [ ] Schema updated with only textMessages table
- [ ] textMessages.ts functions created and tested
- [ ] SimpleDashboard.tsx renders correctly
- [ ] /dashboard route accessible when authenticated
- [ ] /dashboard returns to login when unauthenticated
- [ ] Text input sends message to Convex
- [ ] Messages displayed correctly in dashboard
- [ ] Home page redirects to /dashboard
- [ ] Sidebar shows only Dashboard link
- [ ] No broken imports in any kept files
- [ ] Build succeeds with `next build`
- [ ] No console errors in browser
- [ ] All deleted files removed successfully
