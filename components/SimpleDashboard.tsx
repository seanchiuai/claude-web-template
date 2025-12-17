"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SignOutButton } from "@clerk/nextjs";
import { Card } from "@/components/ui/card";
import { CheckCircle2, XCircle, AlertCircle, Loader2 } from "lucide-react";

type TestStatus = "pending" | "running" | "passed" | "failed" | "skipped";

interface Test {
  id: string;
  name: string;
  description: string;
  status: TestStatus;
}

const tests: Test[] = [
  {
    id: "main-page-load",
    name: "Main page load",
    description: "Verify the main page loads correctly",
    status: "pending",
  },
  {
    id: "navigation",
    name: "Navigation elements",
    description: "Check for navigation elements (nav, header, navigation role)",
    status: "pending",
  },
  {
    id: "projects-page",
    name: "Projects page",
    description: "Test navigation to projects page",
    status: "pending",
  },
  {
    id: "bookmarks-folders",
    name: "Bookmarks/Folders functionality",
    description: "Verify bookmark and folder elements are present",
    status: "pending",
  },
  {
    id: "search",
    name: "Search functionality",
    description: "Test search input interaction",
    status: "pending",
  },
  {
    id: "ai-chat",
    name: "AI Chat functionality",
    description: "Test AI chat button and input interaction",
    status: "pending",
  },
  {
    id: "user-menu",
    name: "User menu/settings",
    description: "Test user menu and settings access",
    status: "pending",
  },
  {
    id: "console-errors",
    name: "Console errors",
    description: "Check for JavaScript console errors",
    status: "pending",
  },
];

export function SimpleDashboard() {
  const [message, setMessage] = useState("");
  const [messageStatus, setMessageStatus] = useState<"idle" | "success" | "error">("idle");
  const [testStates, setTestStates] = useState<Record<string, TestStatus>>(
    tests.reduce((acc, test) => ({ ...acc, [test.id]: test.status }), {})
  );
  const addMessage = useMutation(api.messages.addMessage);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      setMessageStatus("idle");
      await addMessage({ content: message });
      setMessageStatus("success");
      setMessage("");

      setTimeout(() => setMessageStatus("idle"), 3000);
    } catch (error) {
      console.error("Failed to send message:", error);
      setMessageStatus("error");
    }
  };

  const runTest = async (testId: string) => {
    setTestStates((prev) => ({ ...prev, [testId]: "running" }));
    
    // Simulate test execution
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // For demo purposes, randomly pass/fail
    const result = Math.random() > 0.3 ? "passed" : "failed";
    setTestStates((prev) => ({ ...prev, [testId]: result }));
  };

  const runAllTests = async () => {
    for (const test of tests) {
      await runTest(test.id);
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  };

  const getStatusIcon = (status: TestStatus) => {
    switch (status) {
      case "passed":
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case "failed":
        return <XCircle className="w-5 h-5 text-red-600" />;
      case "running":
        return <Loader2 className="w-5 h-5 text-primary animate-spin" />;
      case "skipped":
        return <AlertCircle className="w-5 h-5 text-muted-foreground" />;
      default:
        return <div className="w-5 h-5 rounded-full border-2 border-muted-foreground/30" />;
    }
  };

  const getStatusBadge = (status: TestStatus) => {
    const baseClasses = "px-2 py-1 rounded-md text-xs font-medium";
    switch (status) {
      case "passed":
        return `${baseClasses} bg-green-500/10 text-green-600 border border-green-500/20`;
      case "failed":
        return `${baseClasses} bg-red-500/10 text-red-600 border border-red-500/20`;
      case "running":
        return `${baseClasses} bg-primary/10 text-primary border border-primary/20`;
      case "skipped":
        return `${baseClasses} bg-muted text-muted-foreground border border-border`;
      default:
        return `${baseClasses} bg-muted/50 text-muted-foreground border border-border`;
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="absolute top-4 right-4">
        <SignOutButton>
          <Button variant="ghost" size="sm">
            Logout
          </Button>
        </SignOutButton>
      </div>

      <div className="max-w-4xl mx-auto space-y-8 pt-12">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-heading font-semibold tracking-tight">Test Dashboard</h1>
          <p className="text-muted-foreground">View and run all UI tests</p>
        </div>

        {/* Convex Test Section */}
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold mb-2">Convex Connection Test</h2>
              <p className="text-sm text-muted-foreground mb-4">
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
                  disabled={messageStatus === "success"}
                />
                <Button type="submit" disabled={!message.trim() || messageStatus === "success"}>
                  Send
                </Button>
              </div>

              {messageStatus === "success" && (
                <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-md text-green-600 text-sm">
                  Message sent successfully to Convex!
                </div>
              )}

              {messageStatus === "error" && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-md text-red-600 text-sm">
                  Failed to send message. Please try again.
                </div>
              )}
            </form>
          </div>
        </Card>

        {/* Tests Section */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold">UI Tests</h2>
              <p className="text-sm text-muted-foreground mt-1">
                All tests from test-ui.js
              </p>
            </div>
            <Button onClick={runAllTests} variant="outline">
              Run All Tests
            </Button>
          </div>

          <div className="space-y-3">
            {tests.map((test) => {
              const status = testStates[test.id];
              return (
                <div
                  key={test.id}
                  className="flex items-start gap-4 p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors"
                >
                  <div className="mt-0.5">{getStatusIcon(status)}</div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-foreground">{test.name}</h3>
                      <span className={getStatusBadge(status)}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{test.description}</p>
                  </div>
                  <Button
                    onClick={() => runTest(test.id)}
                    variant="ghost"
                    size="sm"
                    disabled={status === "running"}
                  >
                    Run
                  </Button>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
