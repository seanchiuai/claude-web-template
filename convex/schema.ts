import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// The schema is entirely optional.
// You can delete this file (schema.ts) and the
// app will continue to work.
// The schema provides more precise TypeScript types.
export default defineSchema({
  // Simple test table for storing messages
  messages: defineTable({
    userId: v.string(),
    content: v.string(),
    createdAt: v.number(),
  }).index("by_user", ["userId"]),
});
