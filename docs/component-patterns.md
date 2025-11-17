# Component Patterns

## Component Structure

### Functional Components (Required)
```tsx
"use client"; // Only if needed

import { ComponentProps } from "@/types";

export function MyComponent({ prop1, prop2 }: ComponentProps) {
  return <div>Content</div>;
}
```

### Props Patterns
```tsx
// Interface for props
interface ButtonProps {
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  onClick?: () => void;
}

// With HTML attributes
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}
```

## Hooks Usage

### Convex Hooks (Client Only)
```tsx
"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

function TodoList() {
  const todos = useQuery(api.todos.list);
  const addTodo = useMutation(api.todos.create);

  if (todos === undefined) return <div>Loading...</div>;

  return <div>{/* UI */}</div>;
}
```

### React Hooks
```tsx
import { useState, useEffect, useMemo, useCallback } from "react";

// State
const [count, setCount] = useState(0);

// Effects
useEffect(() => {
  // Side effects
}, [dependencies]);

// Memoization
const value = useMemo(() => expensiveCalc(), [deps]);
const callback = useCallback(() => {}, [deps]);
```

## Component Size
- Keep components <200 LOC
- Extract logic to custom hooks
- Split large components into smaller ones

## Patterns

### Composition
```tsx
function Card({ children }: { children: React.ReactNode }) {
  return <div className="card">{children}</div>;
}

function CardHeader({ children }: { children: React.ReactNode }) {
  return <div className="card-header">{children}</div>;
}

// Usage
<Card>
  <CardHeader>Title</CardHeader>
  <CardContent>Content</CardContent>
</Card>
```

### Conditional Rendering
```tsx
// Ternary
{isLoading ? <Spinner /> : <Content />}

// AND operator
{error && <ErrorMessage error={error} />}

// Early return
if (!data) return <Loading />;
return <Content data={data} />;
```

### Event Handlers
```tsx
"use client";

function Form() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle submit
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

## shadcn/ui Patterns
- Use pre-built components from `/components/ui`
- Customize via className prop
- Compose components for complex UI
