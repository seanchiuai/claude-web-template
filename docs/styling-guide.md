# Styling Guide (Tailwind 4)

## Color System
```tsx
// Background
bg-background      // Main background
bg-foreground      // Foreground color
bg-card           // Card background
bg-popover        // Popover background
bg-primary        // Primary color
bg-secondary      // Secondary color
bg-muted          // Muted background
bg-accent         // Accent color
bg-destructive    // Error/danger color

// Text
text-foreground
text-muted-foreground
text-primary
text-secondary
text-destructive

// Border
border-border     // Default border
border-input      // Input border
border-primary
border-destructive
```

## Spacing Scale
```
p-0    (0px)      m-0
p-1    (4px)      m-1
p-2    (8px)      m-2
p-3    (12px)     m-3
p-4    (16px)     m-4
p-5    (20px)     m-5
p-6    (24px)     m-6
p-8    (32px)     m-8
p-10   (40px)     m-10
p-12   (48px)     m-12
p-16   (64px)     m-16
```

## Layout Patterns

### Container
```tsx
<div className="container mx-auto px-4">
  {/* Content */}
</div>
```

### Flexbox
```tsx
// Row
<div className="flex items-center gap-4">

// Column
<div className="flex flex-col gap-2">

// Center
<div className="flex items-center justify-center">

// Space between
<div className="flex items-center justify-between">
```

### Grid
```tsx
// Responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

// Equal columns
<div className="grid grid-cols-3 gap-4">

// Auto-fit
<div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
```

## Responsive Design (Mobile-First)
```tsx
// Small screens (default)
<div className="p-4">

// Medium screens (768px+)
<div className="p-4 md:p-6">

// Large screens (1024px+)
<div className="p-4 md:p-6 lg:p-8">

// XL screens (1280px+)
<div className="p-4 md:p-6 lg:p-8 xl:p-10">
```

## Animations
```tsx
// Transitions
transition-colors duration-200
transition-all duration-300
transition-opacity duration-150

// Hover states
hover:bg-accent hover:text-accent-foreground
hover:opacity-80
hover:scale-105

// Focus states
focus:ring-2 focus:ring-primary focus:ring-offset-2
focus-visible:outline-none focus-visible:ring-2

// Active states
active:scale-95
```

## Common Patterns

### Card
```tsx
<div className="rounded-lg border bg-card p-6 shadow-sm">
  {/* Content */}
</div>
```

### Button-like
```tsx
<div className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
  Button
</div>
```

### Input-like
```tsx
<input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
```

### Truncate Text
```tsx
<p className="truncate">Long text...</p>
<p className="line-clamp-2">Multi-line text...</p>
```

## Dark Mode
- Automatic based on CSS variables
- Use semantic color classes (bg-background, text-foreground)
- Avoid hardcoded colors

## Custom Utilities
- Defined in `tailwind.config.ts`
- Use `@apply` sparingly (prefer composition)
