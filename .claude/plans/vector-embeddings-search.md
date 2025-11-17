# Plan: Vector Embeddings and Semantic Search

**Status:** Not Started
**Priority:** Must-have (MVP)
**Agent:** agent-openai, agent-convex

## Overview

Generate vector embeddings for bookmark content using OpenAI's text-embedding-3-small model. Store embeddings in Convex and enable semantic search using Convex's built-in vector search. This is the foundation for the AI agent to find relevant bookmarks.

## Technical Requirements

### OpenAI Integration

**Model:** `text-embedding-3-small`
- Dimensions: 1536
- Cost: $0.02 per 1M tokens (~$0.000002 per bookmark)
- Input: Title + Description + URL (combined)

**What to embed:**
```typescript
const textToEmbed = [
  bookmark.title,
  bookmark.description || '',
  bookmark.url,
].filter(Boolean).join('\n');
```

### Database Schema

Already defined in `bookmark-management-metadata.md`:
```typescript
bookmarks: defineTable({
  // ... other fields
  embedding: v.optional(v.array(v.float64())), // 1536 dimensions
})
  .searchIndex("by_embedding", {
    searchField: "embedding",
    filterFields: ["userId", "folderId"],
  }),
```

### Convex Actions

**convex/embeddings.ts:**
```typescript
import { action } from "./_generated/server";
import { v } from "convex/values";
import OpenAI from "openai";
import { api } from "./_generated/api";

// Generate embedding for text
export const generateEmbedding = action({
  args: {
    text: v.string(),
  },
  handler: async (ctx, { text }): Promise<number[]> => {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    try {
      const response = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: text.substring(0, 8000), // Truncate to ~8k chars
      });

      return response.data[0].embedding;
    } catch (error) {
      console.error("Failed to generate embedding:", error);
      throw error;
    }
  },
});

// Generate embedding and update bookmark
export const generateBookmarkEmbedding = action({
  args: {
    bookmarkId: v.id("bookmarks"),
  },
  handler: async (ctx, { bookmarkId }): Promise<void> => {
    // Get bookmark
    const bookmark = await ctx.runQuery(api.bookmarks.getBookmark, {
      bookmarkId,
    });

    if (!bookmark) throw new Error("Bookmark not found");

    // Create text to embed
    const textToEmbed = [
      bookmark.title,
      bookmark.description || "",
      bookmark.url,
    ]
      .filter(Boolean)
      .join("\n");

    // Generate embedding
    const embedding = await generateEmbedding({ text: textToEmbed });

    // Update bookmark with embedding
    await ctx.runMutation(api.bookmarks.updateBookmarkEmbedding, {
      bookmarkId,
      embedding,
    });
  },
});

// Batch generate embeddings (for migration)
export const batchGenerateEmbeddings = action({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, { userId }): Promise<number> => {
    // Get all bookmarks without embeddings
    const bookmarks = await ctx.runQuery(
      api.bookmarks.listBookmarksWithoutEmbeddings,
      { userId }
    );

    let count = 0;
    for (const bookmark of bookmarks) {
      try {
        await generateBookmarkEmbedding({ bookmarkId: bookmark._id });
        count++;
      } catch (error) {
        console.error(`Failed to generate embedding for ${bookmark._id}:`, error);
      }
    }

    return count;
  },
});
```

**Update convex/bookmarks.ts:**
```typescript
// Add this mutation
export const updateBookmarkEmbedding = mutation({
  args: {
    bookmarkId: v.id("bookmarks"),
    embedding: v.array(v.float64()),
  },
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx);

    const bookmark = await ctx.db.get(args.bookmarkId);
    if (!bookmark || bookmark.userId !== userId) {
      throw new Error("Bookmark not found or unauthorized");
    }

    await ctx.db.patch(args.bookmarkId, {
      embedding: args.embedding,
      updatedAt: Date.now(),
    });
  },
});

// Add this query
export const listBookmarksWithoutEmbeddings = query({
  args: { userId: v.string() },
  handler: async (ctx, { userId }) => {
    return await ctx.db
      .query("bookmarks")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("embedding"), undefined))
      .collect();
  },
});
```

### Vector Search

**convex/search.ts:**
```typescript
import { query } from "./_generated/server";
import { v } from "convex/values";

export const searchBookmarks = query({
  args: {
    embedding: v.array(v.float64()),
    userId: v.string(),
    projectId: v.optional(v.id("projects")),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 10;

    // Search by embedding
    let results = await ctx.db
      .query("bookmarks")
      .withSearchIndex("by_embedding", (q) =>
        q.search("embedding", args.embedding).eq("userId", args.userId)
      )
      .take(limit);

    // If projectId provided, filter to that project's folders
    if (args.projectId) {
      const folders = await ctx.db
        .query("folders")
        .withIndex("by_project", (q) => q.eq("projectId", args.projectId))
        .collect();

      const folderIds = new Set(folders.map((f) => f._id));
      results = results.filter((b) => folderIds.has(b.folderId));
    }

    return results;
  },
});

// Search within specific folder
export const searchBookmarksInFolder = query({
  args: {
    embedding: v.array(v.float64()),
    folderId: v.id("folders"),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx);

    return await ctx.db
      .query("bookmarks")
      .withSearchIndex("by_embedding", (q) =>
        q
          .search("embedding", args.embedding)
          .eq("userId", userId)
          .eq("folderId", args.folderId)
      )
      .take(args.limit ?? 10);
  },
});
```

## Implementation Steps

### Phase 1: Setup OpenAI
1. Sign up for OpenAI API key
2. Add to `.env.local`: `OPENAI_API_KEY=sk-...`
3. Add to Convex dashboard environment variables
4. Install OpenAI SDK: `npm install openai`

### Phase 2: Embedding Generation
1. Create `convex/embeddings.ts` with actions
2. Test `generateEmbedding` with sample text in Convex dashboard
3. Verify embedding is 1536 dimensions
4. Test error handling (invalid API key, timeout, etc.)

### Phase 3: Integrate with Bookmark Creation
1. Update `createBookmark` mutation in `convex/bookmarks.ts`
2. After bookmark created, trigger `generateBookmarkEmbedding` action
3. Handle async - don't block bookmark creation if embedding fails
4. Update bookmark with embedding when ready

**Pattern:**
```typescript
// In frontend
const bookmarkId = await createBookmark({...});

// Trigger embedding generation (don't await - async)
generateBookmarkEmbedding({ bookmarkId }).catch(console.error);
```

### Phase 4: Vector Search Implementation
1. Create `convex/search.ts` with search queries
2. Test search with known bookmarks in dashboard
3. Verify results are semantically relevant
4. Add project/folder filtering

### Phase 5: Batch Embedding for Existing Bookmarks
1. Create admin UI or script to run `batchGenerateEmbeddings`
2. Generate embeddings for any bookmarks created before this feature
3. Show progress indicator

### Phase 6: Search UI (Basic - full AI chat in separate plan)
1. Create simple search input in bookmarks page
2. On search:
   - Generate embedding for query
   - Call `searchBookmarks` query
   - Display results in grid/list
3. Show "No results" if empty
4. Clear search to return to folder view

## Acceptance Criteria

- [ ] Embedding generated when bookmark created
- [ ] Embedding stored in database (1536 dimensions)
- [ ] Embedding generation fails gracefully (bookmark still saved)
- [ ] Vector search returns relevant results
- [ ] Search works across all bookmarks in project
- [ ] Search can filter by folder
- [ ] Batch embedding works for existing bookmarks
- [ ] Basic search UI functional
- [ ] Search results show relevance scores (Convex provides this)
- [ ] OpenAI API key secured (not exposed to client)

## Edge Cases

1. **OpenAI API down** - Bookmark saves without embedding, retry later
2. **Rate limit (429)** - Implement exponential backoff retry
3. **Invalid API key** - Log error, notify admin, don't crash
4. **Very long content** - Truncate to 8000 chars before embedding
5. **Empty title/description** - Use URL only, still generate embedding
6. **Duplicate embeddings** - Only generate if embedding doesn't exist
7. **Cost explosion** - Monitor usage, set monthly budget alert

## Testing Checklist

- [ ] Generate embedding for sample text → 1536 dimensions
- [ ] Create bookmark → embedding generated within 2 seconds
- [ ] Search "React tutorial" → finds React bookmarks
- [ ] Search "machine learning" → finds ML bookmarks
- [ ] Semantic search works (e.g., "JS frameworks" finds React/Vue/Angular)
- [ ] Search filters by project correctly
- [ ] Search filters by folder correctly
- [ ] Batch generation processes 100 bookmarks successfully
- [ ] Invalid API key → graceful error
- [ ] Rate limit → retries with backoff

## Dependencies

**npm packages:**
- `openai` - Official OpenAI SDK

**Environment Variables:**
- `OPENAI_API_KEY` - OpenAI API key (in Convex dashboard)

**Prerequisite plans:**
- `bookmark-management-metadata.md` - Bookmarks must exist first

## Files to Create

- `convex/embeddings.ts`
- `convex/search.ts`
- `components/features/search-input.tsx` (basic version)

## Files to Modify

- `convex/bookmarks.ts` - Add updateBookmarkEmbedding, listBookmarksWithoutEmbeddings
- `.env.local` - Add OPENAI_API_KEY (developer only, not committed)
- `package.json` - Add openai dependency

## Environment Variables

**Required:**
```
OPENAI_API_KEY=sk-...
```

Add to:
1. `.env.local` (for local dev)
2. Convex dashboard → Settings → Environment Variables (for production)
3. `.env.example` (template for other devs)

## Performance Considerations

- **Async embedding generation** - Don't block bookmark creation
- **Batch processing** - Process embeddings in chunks of 10-20
- **Caching** - Don't regenerate if embedding exists
- **Rate limiting** - Respect OpenAI rate limits (3000 RPM on free tier)
- **Cost monitoring** - Track embedding generation count

## Cost Estimation

**text-embedding-3-small pricing:**
- $0.02 per 1M tokens
- Average bookmark: ~100 tokens (title + description + URL)
- Cost per bookmark: ~$0.000002 (negligible)
- 1000 bookmarks: ~$0.002
- 10,000 bookmarks: ~$0.02

**Conclusion:** Cost is minimal, not a concern for MVP.

## Error Handling

**Retry logic for rate limits:**
```typescript
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries = 3
): Promise<T> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error: any) {
      if (error.status === 429 && i < maxRetries - 1) {
        const delay = Math.pow(2, i) * 1000; // 1s, 2s, 4s
        await new Promise((resolve) => setTimeout(resolve, delay));
        continue;
      }
      throw error;
    }
  }
  throw new Error("Max retries exceeded");
}
```

## Monitoring

Track these metrics:
- Embeddings generated per day
- Embedding generation failures
- Average embedding time
- OpenAI API costs
- Search query latency

## Future Enhancements

- **Hybrid search** - Combine vector + keyword search
- **Reranking** - Use Cohere/Jina to rerank results
- **Multi-query** - Generate multiple search queries from user input
- **Embedding updates** - Regenerate when bookmark edited
- **Embedding versioning** - Support model upgrades (ada-002 → text-embedding-3)
- **Custom embeddings** - Fine-tune model on user's bookmark collection
