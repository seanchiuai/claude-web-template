# CHANGELOG

## 2025-11-16

### AI Agent with RAG & Memory Implementation
- **Database**: Added `chatMessages` and `userMemory` tables to Convex schema
- **Backend**:
  - `convex/chat.ts`: GPT-4o-mini integration for AI responses
  - `convex/chatMessages.ts`: Message CRUD operations
  - `convex/memory.ts`: User preference/context management
- **Frontend Components**:
  - ChatSidebar with conversation history
  - ChatMessage, ChatInput, ChatHeader components
  - MemoryPanel for managing user preferences
  - BookmarkReferenceCard for bookmark suggestions
- **Features**:
  - Keyboard shortcut (⌘J) to toggle chat
  - Conversation persistence
  - Memory system for personalized AI responses
  - Responsive mobile/desktop design
- **Dependencies**: Installed `openai` package
- **Setup Required**:
  - Run `npx convex dev` to deploy schema
  - Add `OPENAI_API_KEY` to `.env.local` (see `.env.local.example`)

### Code Quality & Accessibility Fixes (Round 1)
- **Frontend**:
  - Added `type="button"` to all buttons to prevent form submissions
  - Safe URL parsing with error handling in BookmarkReferenceCard
  - Stable React keys using message IDs instead of array indices
  - Toast notifications for all user operations (send, clear, save, delete)
  - Keyboard accessibility for overlays (role, tabIndex, ARIA labels)
- **Backend**:
  - OpenAI parameters configurable via environment variables
  - Early validation for OPENAI_API_KEY
  - Proper TypeScript error handling (type guards instead of `any`)
  - Batched deletion in clearHistory (100 records/batch)
  - Server-side pagination support in getUserMemories
  - Type-safe Convex ID handling

### Code Quality & Performance Fixes (Round 2)
- **Internationalization**:
  - Timestamp formatting now uses user's locale instead of hardcoded "en-US"
  - Unicode support in memory values (preserves emojis, accented characters)
- **Keyboard UX**:
  - Removed Space key from overlay dismiss handlers (standard pattern)
  - Only Enter/Escape close overlays
- **Configuration Validation**:
  - OPENAI_MODEL validated for non-empty with whitespace trim
  - CHAT_TEMPERATURE validated: 0.0-2.0 range, finite number check
  - CHAT_MAX_TOKENS validated: 1-32768 range, integer check
  - Console warnings for invalid values with safe fallbacks
- **Performance**:
  - Fixed Convex query filter boolean issue in clearHistory
  - Server-side pagination in getUserMemories (`.take()` instead of `.collect().slice()`)
  - API simplified: `limit` param instead of `pageSize/offset`

### Rebranding
- App rebranded from "Vibed" to "Sean's Claude Code Web Template"
- Updated all UI components, metadata, and documentation
- Package name changed to `seans-claude-code-web-template`
