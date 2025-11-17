# Plan: AI Agent with RAG Retrieval and Memory

**Status:** Not Started
**Priority:** Must-have (MVP)
**Agent:** agent-openai, agent-convex, agent-nextjs, agent-ui

## Overview

Conversational AI sidebar that understands natural language queries, searches bookmarks using vector similarity (RAG), and responds with helpful answers plus clickable bookmark recommendations. Agent has global memory of user preferences and conversation context.

## Technical Requirements

### Database Schema

**ChatMessages Table:**
```typescript
chatMessages: defineTable({
  userId: v.string(),
  role: v.union(v.literal("user"), v.literal("assistant")),
  content: v.string(),
  bookmarkReferences: v.optional(v.array(v.id("bookmarks"))), // Bookmarks mentioned in response
  projectId: v.optional(v.id("projects")), // Context: which project user was in
  createdAt: v.number(),
})
  .index("by_user", ["userId"])
  .index("by_user_created", ["userId", "createdAt"]),
```

**UserMemory Table:**
```typescript
userMemory: defineTable({
  userId: v.string(),
  memoryType: v.union(v.literal("preference"), v.literal("context")),
  key: v.string(),           // e.g., "favorite_language", "work_interests"
  value: v.string(),         // e.g., "TypeScript", "React, Next.js, Convex"
  createdAt: v.number(),
  updatedAt: v.number(),
})
  .index("by_user", ["userId"])
  .index("by_user_type", ["userId", "memoryType"]),
```

### RAG Pipeline

**User Query Flow:**
1. User types question in chat
2. Generate embedding for query using OpenAI
3. Search bookmarks using vector similarity (from `vector-embeddings-search.md`)
4. Retrieve top 5-10 most relevant bookmarks
5. Build context with bookmark details
6. Add user memory (preferences) to context
7. Send to GPT-4o-mini with full context
8. GPT generates response + suggests bookmarks
9. Display response in chat with bookmark cards

### Convex Actions

**convex/chat.ts:**
```typescript
import { action } from "./_generated/server";
import { v } from "convex/values";
import OpenAI from "openai";
import { api } from "./_generated/api";

export const getChatResponse = action({
  args: {
    userMessage: v.string(),
    projectId: v.optional(v.id("projects")),
    conversationHistory: v.optional(
      v.array(
        v.object({
          role: v.union(v.literal("user"), v.literal("assistant")),
          content: v.string(),
        })
      )
    ),
  },
  handler: async (ctx, args): Promise<{
    response: string;
    bookmarkIds: string[];
    suggestedMemories?: Array<{ key: string; value: string }>;
  }> => {
    const userId = (await ctx.auth.getUserIdentity())?.subject;
    if (!userId) throw new Error("Unauthorized");

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // 1. Generate embedding for user query
    const queryEmbedding = await ctx.runAction(api.embeddings.generateEmbedding, {
      text: args.userMessage,
    });

    // 2. Search for relevant bookmarks
    const relevantBookmarks = await ctx.runQuery(api.search.searchBookmarks, {
      embedding: queryEmbedding,
      userId,
      projectId: args.projectId,
      limit: 8,
    });

    // 3. Get user memory/preferences
    const userMemories = await ctx.runQuery(api.memory.getUserMemories, {
      userId,
    });

    // 4. Build context
    const bookmarksContext = relevantBookmarks
      .map(
        (b, i) =>
          `[${i + 1}] ${b.title}\nURL: ${b.url}\nDescription: ${b.description || "No description"}\n`
      )
      .join("\n");

    const memoriesContext = userMemories
      .map((m) => `${m.key}: ${m.value}`)
      .join("\n");

    // 5. System prompt
    const systemPrompt = `You are a helpful AI assistant for a bookmark manager. Your job is to help users find and organize their saved bookmarks.

User's saved interests and preferences:
${memoriesContext || "None yet"}

Relevant bookmarks from their collection:
${bookmarksContext || "No bookmarks found"}

Guidelines:
- Be concise and friendly (2-3 sentences max)
- Reference bookmarks by number [1], [2], etc.
- If no relevant bookmarks found, say so and suggest saving new ones
- Remember user preferences and suggest accordingly
- If you notice patterns in user interests, you can suggest new memories to save

When referencing bookmarks, use this format: "Check out [1] for React tutorials"`;

    // 6. Get GPT response
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        ...(args.conversationHistory || []).slice(-10), // Last 10 messages
        { role: "user", content: args.userMessage },
      ],
      temperature: 0.7,
      max_tokens: 400,
    });

    const response = completion.choices[0].message.content || "I couldn't generate a response.";

    // 7. Save chat messages
    await ctx.runMutation(api.chatMessages.saveMessage, {
      role: "user",
      content: args.userMessage,
      projectId: args.projectId,
    });

    await ctx.runMutation(api.chatMessages.saveMessage, {
      role: "assistant",
      content: response,
      bookmarkReferences: relevantBookmarks.map((b) => b._id),
      projectId: args.projectId,
    });

    return {
      response,
      bookmarkIds: relevantBookmarks.map((b) => b._id),
    };
  },
});
```

**convex/chatMessages.ts:**
```typescript
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const saveMessage = mutation({
  args: {
    role: v.union(v.literal("user"), v.literal("assistant")),
    content: v.string(),
    bookmarkReferences: v.optional(v.array(v.id("bookmarks"))),
    projectId: v.optional(v.id("projects")),
  },
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx);

    await ctx.db.insert("chatMessages", {
      userId,
      role: args.role,
      content: args.content,
      bookmarkReferences: args.bookmarkReferences,
      projectId: args.projectId,
      createdAt: Date.now(),
    });
  },
});

export const listRecentMessages = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx);

    return await ctx.db
      .query("chatMessages")
      .withIndex("by_user_created", (q) => q.eq("userId", userId))
      .order("desc")
      .take(args.limit ?? 50);
  },
});

export const clearHistory = mutation({
  handler: async (ctx) => {
    const userId = await getUserId(ctx);

    const messages = await ctx.db
      .query("chatMessages")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    for (const msg of messages) {
      await ctx.db.delete(msg._id);
    }
  },
});
```

**convex/memory.ts:**
```typescript
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const saveMemory = mutation({
  args: {
    key: v.string(),
    value: v.string(),
    memoryType: v.union(v.literal("preference"), v.literal("context")),
  },
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx);

    // Check if memory exists
    const existing = await ctx.db
      .query("userMemory")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("key"), args.key))
      .first();

    if (existing) {
      // Update existing
      await ctx.db.patch(existing._id, {
        value: args.value,
        updatedAt: Date.now(),
      });
    } else {
      // Create new
      await ctx.db.insert("userMemory", {
        userId,
        key: args.key,
        value: args.value,
        memoryType: args.memoryType,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
    }
  },
});

export const getUserMemories = query({
  handler: async (ctx) => {
    const userId = await getUserId(ctx);

    return await ctx.db
      .query("userMemory")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();
  },
});

export const deleteMemory = mutation({
  args: { memoryId: v.id("userMemory") },
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx);

    const memory = await ctx.db.get(args.memoryId);
    if (!memory || memory.userId !== userId) {
      throw new Error("Memory not found or unauthorized");
    }

    await ctx.db.delete(args.memoryId);
  },
});
```

### Frontend Components

**Chat Sidebar:**
- Right sidebar (collapsible)
- Message history (scrollable)
- User/assistant message bubbles
- Bookmark cards embedded in assistant messages
- Input field at bottom
- Loading indicator while AI responds
- Keyboard shortcut to open/close (Cmd+J)

**File Structure:**
```
/components/features/chat/
  chat-sidebar.tsx
  chat-message.tsx
  chat-input.tsx
  bookmark-reference-card.tsx
  chat-header.tsx
  memory-panel.tsx (view/edit memories)
```

## Implementation Steps

### Phase 1: Database Schema
1. Update `convex/schema.ts` with chatMessages and userMemory tables
2. Add indexes for efficient queries
3. Deploy schema

### Phase 2: Chat Backend
1. Create `convex/chat.ts` with getChatResponse action
2. Create `convex/chatMessages.ts` with save/list/clear
3. Create `convex/memory.ts` with CRUD operations
4. Test RAG pipeline in Convex dashboard

### Phase 3: Chat UI - Basic Structure
1. Create `ChatSidebar` component
   - Fixed right sidebar (300-400px wide)
   - Collapsible with toggle button
   - Sticky header with title + collapse button
2. Create `ChatMessage` component
   - User messages: right-aligned, primary color
   - Assistant messages: left-aligned, secondary color
   - Markdown support for formatting
3. Create `ChatInput` component
   - Textarea with auto-resize
   - Send button
   - Enter to send, Shift+Enter for newline

### Phase 4: Chat Integration
1. Fetch recent messages with `useQuery(api.chatMessages.listRecentMessages)`
2. Display in reverse chronological order (newest at bottom)
3. Auto-scroll to bottom when new message added
4. Send message → call `getChatResponse` action
5. Show loading indicator while waiting
6. Display assistant response + bookmark cards

### Phase 5: Bookmark Reference Cards
1. Create `BookmarkReferenceCard` component
   - Mini version of regular bookmark card
   - Show favicon, title, URL
   - Click to open URL or view full bookmark
2. Embed in assistant messages
3. Load bookmark details from IDs returned by action

### Phase 6: Memory Management
1. Create `MemoryPanel` component (accessible from chat header)
2. List all user memories
3. Add/edit/delete memories
4. Manual entry for now (future: AI suggests memories)

### Phase 7: Keyboard Shortcuts
1. Implement global shortcut to toggle chat (Cmd+J)
2. Focus input when chat opens
3. Escape to close chat

### Phase 8: Conversation Context
1. Pass last 10 messages to GPT for context
2. Clear history button
3. Show conversation count in header

## Acceptance Criteria

- [ ] User can open chat sidebar (Cmd+J or button)
- [ ] User can type question and send
- [ ] AI responds within 3 seconds
- [ ] Response includes relevant bookmark suggestions
- [ ] Bookmark cards are clickable
- [ ] Conversation history persists across sessions
- [ ] User can clear conversation history
- [ ] Memory panel shows saved preferences
- [ ] AI uses memories to personalize responses
- [ ] Multiple users have isolated conversations
- [ ] Chat works on mobile (full screen overlay)

## Edge Cases

1. **No bookmarks in collection** - AI responds "You haven't saved any bookmarks yet"
2. **No relevant bookmarks** - AI suggests saving new bookmarks
3. **OpenAI API down** - Show error message, retry button
4. **Rate limit** - Graceful error, suggest trying again later
5. **Very long conversation** - Only send last 10 messages to avoid context length issues
6. **Empty message** - Disable send button
7. **Rapid messages** - Queue messages, process sequentially

## Testing Checklist

- [ ] Ask "Show me React tutorials" → returns React bookmarks
- [ ] Ask vague question → AI asks for clarification
- [ ] No relevant bookmarks → AI suggests saving new ones
- [ ] Conversation context maintained across messages
- [ ] Click bookmark card → opens URL
- [ ] Clear history → messages removed
- [ ] Add memory → AI uses in next response
- [ ] Keyboard shortcut (Cmd+J) → opens/closes chat
- [ ] Mobile → chat opens in full screen
- [ ] Multiple users → conversations isolated

## Dependencies

**npm packages:**
- `openai` - Already installed for embeddings
- `react-markdown` - For formatting assistant messages (optional)

**Environment Variables:**
- `OPENAI_API_KEY` - Already configured for embeddings

**Prerequisite plans:**
- `vector-embeddings-search.md` - Vector search must work first
- `bookmark-management-metadata.md` - Bookmarks must exist

## Files to Create

- `convex/chat.ts`
- `convex/chatMessages.ts`
- `convex/memory.ts`
- `components/features/chat/chat-sidebar.tsx`
- `components/features/chat/chat-message.tsx`
- `components/features/chat/chat-input.tsx`
- `components/features/chat/bookmark-reference-card.tsx`
- `components/features/chat/chat-header.tsx`
- `components/features/chat/memory-panel.tsx`

## Files to Modify

- `convex/schema.ts` - Add chatMessages and userMemory tables
- `app/(authenticated)/layout.tsx` - Add ChatSidebar component
- Global keyboard shortcut handler

## Environment Variables

None new - reuses `OPENAI_API_KEY`.

## Performance Considerations

- Limit conversation history to last 50 messages
- Only send last 10 messages to GPT (reduce tokens)
- Debounce input (prevent spam)
- Stream responses for better UX (future enhancement)
- Cache bookmark details to avoid redundant queries

## Cost Estimation

**GPT-4o-mini pricing:**
- $0.15 per 1M input tokens
- $0.60 per 1M output tokens
- Average conversation: ~500 input tokens, ~100 output tokens
- Cost per message: ~$0.00015
- 1000 messages: ~$0.15
- Very affordable for MVP

## Future Enhancements

1. **Streaming responses** - Better UX, show response as it generates
2. **Function calling** - Let GPT trigger bookmark operations (add, edit, delete)
3. **Project-specific memory** - Different memories per project
4. **Multi-query retrieval** - Generate multiple search queries for better results
5. **Conversation branching** - Fork conversations
6. **Export conversations** - Download as markdown
7. **Voice input** - Speak queries instead of typing
8. **Suggested questions** - Show common queries to get started
9. **Bookmark previews** - Hover over bookmark card for full preview
10. **Reaction buttons** - Thumbs up/down for responses (feedback loop)

## UI/UX Considerations

**Chat Sidebar Design:**
- 350px wide on desktop
- Full screen on mobile
- Light background, dark text
- User messages: primary color bubble
- Assistant messages: muted color bubble
- Smooth animations (slide in/out)
- Loading dots while AI thinks
- Timestamp on each message (on hover)

**Accessibility:**
- Keyboard navigable
- Screen reader friendly (ARIA labels)
- Focus management (auto-focus input)
- High contrast mode support

## Error Handling

**OpenAI Errors:**
```typescript
try {
  const completion = await openai.chat.completions.create({...});
} catch (error: any) {
  if (error.status === 429) {
    return { response: "I'm a bit overloaded right now. Please try again in a moment.", bookmarkIds: [] };
  } else if (error.status === 401) {
    return { response: "Authentication error. Please contact support.", bookmarkIds: [] };
  } else {
    return { response: "Sorry, I encountered an error. Please try again.", bookmarkIds: [] };
  }
}
```

## Monitoring

Track these metrics:
- Messages per day
- Average response time
- GPT token usage
- Error rate
- User engagement (messages per session)
- Most common queries (for improvement)
