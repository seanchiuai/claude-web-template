"use client";

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SignOutButton } from "@clerk/nextjs";
import { Card } from "@/components/ui/card";

export function SimpleDashboard() {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const addMessage = useMutation(api.messages.addMessage);
  const messages = useQuery(api.messages.getMessages);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      setStatus("idle");
      await addMessage({ content: message });
      setStatus("success");
      setMessage("");

      // Clear success message after 3 seconds
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      console.error("Failed to send message:", error);
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="absolute top-4 right-4">
        <SignOutButton>
          <Button variant="ghost" size="sm">
            Logout
          </Button>
        </SignOutButton>
      </div>

      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Convex Test</h1>
          <p className="text-muted-foreground">
            Send a message to test your Convex connection
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1"
              disabled={status === "success"}
            />
            <Button type="submit" disabled={!message.trim() || status === "success"}>
              Send
            </Button>
          </div>

          {status === "success" && (
            <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-md text-green-600 text-sm">
              Message sent successfully to Convex!
            </div>
          )}

          {status === "error" && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-md text-red-600 text-sm">
              Failed to send message. Please try again.
            </div>
          )}
        </form>

        {/* Messages List */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">Your Messages</h2>
          {messages === undefined ? (
            <div className="text-sm text-muted-foreground">Loading messages...</div>
          ) : messages.length === 0 ? (
            <div className="text-sm text-muted-foreground">No messages yet. Send one above!</div>
          ) : (
            <div className="space-y-2">
              {messages.map((msg) => (
                <Card key={msg._id} className="p-4">
                  <p className="text-sm text-foreground">{msg.content}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {new Date(msg.createdAt).toLocaleString()}
                  </p>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
