import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const addMessage = mutation({
  args: { content: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    await ctx.db.insert("messages", {
      userId: identity.subject,
      content: args.content,
      createdAt: Date.now(),
    });
  },
});

export const getUserMessages = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return [];
    }

    const messages = await ctx.db
      .query("messages")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .order("desc")
      .collect();

    return messages;
  },
});
