# Frontend Guidelines

This document outlines the frontend architecture, design principles, and technologies. Written in everyday language so anyone can understand how the frontend is set up.

---

## 1. Frontend Architecture

**Frameworks & Libraries**
- **Next.js 15 (App Router)**: Server-side rendering (SSR), file-based routing, layouts, and server actions
- **React (Server & Client Components)**: Clean separation of data-fetching (server) and interactive UI (client)
- **Tailwind CSS 4**: Utility-first CSS framework for rapid styling
- **shadcn/ui**: Pre-built, accessible React components styled with Tailwind
- **Clerk**: User sign-up, sign-in, and session management with pre-built UI
- **Convex**: Real-time database with `useQuery` and `useMutation` hooks
- **TypeScript**: Enforces types across entire stack to catch errors early

**How It Supports Scalability, Maintainability, and Performance**
- **Modular Folder Structure**: Separates routes (`app/`), components (`components/`), utilities (`lib/`), serverless logic (`convex/`)
- **Server Components & Actions**: Offload data-intensive tasks to server, keep client bundle small
- **Real-Time Updates**: Convex subscriptions automatically push changes to UI
- **Type Safety End to End**: TypeScript ensures data shapes match across stack

---

## 2. Design Principles

1. **Usability**:
   - Simple, focused screens
   - Clear calls to action using shadcn/ui styles

2. **Accessibility**:
   - All interactive elements include ARIA labels and keyboard focus
   - Color choices meet WCAG 2.1 AA contrast standards
   - shadcn/ui components built with accessibility best practices

3. **Responsiveness**:
   - Mobile-first design with Tailwind responsive utilities
   - Layouts adjust from narrow phone screens to wide desktop views

4. **Consistency**:
   - Unified design language via Tailwind and custom theme
   - Reusable components ensure same UI patterns throughout

**Applied in UI**
- Forms and lists resize gracefully
- Navigation remains reachable (hamburger on mobile, sidebar on desktop)
- Error and success states use consistent colors and iconography

---

## 3. Styling and Theming

**Styling Approach**
- **Utility-First**: Tailwind CSS provides atomic classes (e.g., `p-4`, `bg-gray-900`, `text-white`)
- **Component Styling**: shadcn/ui components customized via Tailwind config
- **No Traditional CSS**: Utility classes replace BEM/SMACSS naming conventions

**Theming**
- **Dark-Mode-First**: Base colors and surfaces are dark; light mode optional
- Defined in `tailwind.config.ts` under `theme.extend.colors`

**Visual Style**
- Modern, flat design with subtle shadows and rounding
- Focus on clarity: minimal ornamentation, sharp typography, consistent spacing

**Color Palette** (Customize for your project)
- Background: `#121212`
- Surface (cards, modals): `#1E1E1E`
- Primary: `#3B82F6` (blue-500)
- Secondary: `#EC4899` (pink-500)
- Accent: `#10B981` (green-500)
- Text Primary: `#E5E7EB` (gray-200)
- Text Secondary: `#9CA3AF` (gray-400)
- Error: `#F87171` (red-400)

**Font**
- **Primary**: Inter (or system UI sans-serif fallback)
- **Fallback**: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`

---

## 4. Component Structure

**Folder Organization**
```
components/              # App-specific components
  ├─ [FeatureComponents]/  # Feature-specific UI
  ├─ ui/                   # shadcn/ui components
  └─ ConvexClientProvider/ # Wraps app with Convex + Clerk context

app/                     # Next.js App Router
  ├─ layout.tsx           # Root layout
  ├─ page.tsx             # Home page
  └─ [routes]/            # Additional routes
```

**Reuse & Maintainability**
- Each component in own folder with clear responsibility
- Props define data and event handlers
- Internal state minimized
- Utility components from `components/ui` reused everywhere

**Why Component-Based?**
- **Encapsulation**: Styles and logic scoped to each piece
- **Reusability**: Share patterns across multiple places
- **Testability**: Isolated components easier to test

---

## 5. State Management

- **Convex Hooks**:
  - `useQuery('table.operation')` to subscribe to data in real time
  - `useMutation('table.operation')` for data changes

- **Local Component State**:
  - `useState` for form inputs, modals, transient UI flags

- **Context API**:
  - `ConvexClientProvider` shares Convex client (authenticated via Clerk) across component tree

This combination keeps global data in Convex (real-time, shared) and UI-specific state local to components.

---

## 6. Routing and Navigation

- **Next.js App Router**:
  - **File-based**: Folders under `app/` become routes
  - **Layouts**: `app/layout.tsx` defines common page shell
  - **Server Components**: Default pages/layouts can fetch data on server

- **Protected Routes**:
  - Clerk middleware in `middleware.ts` guards authenticated routes

- **Linking & Navigation**:
  - Next.js `Link` component for client-side transitions
  - Active-state highlighting in navigation

Users move fluidly between pages without full page reloads.

---

## 7. Performance Optimization

1. **Server Components & Server Actions**
   - Keep heavy logic off main bundle

2. **Automatic Code Splitting**
   - Next.js splits each page into own chunk

3. **Lazy Loading**
   - Dynamically import non-critical components

4. **Asset Optimization**
   - Next.js Image component for optimized images
   - Tailwind purges unused CSS in production

5. **Real-Time Subscriptions**
   - Only fetch data needed by current view

Together, these keep initial loads quick and subsequent interactions instantaneous.

---

## 8. Testing and Quality Assurance

**Linting & Formatting**
- **ESLint**: Enforces code style, catches common bugs
- **Prettier**: Automatic code formatting

**Unit & Integration Tests** (Recommended)
- **Jest + React Testing Library**: Test component rendering and interactions
- Mock Convex hooks to simulate data

**End-to-End Tests**
- **Playwright** or **Cypress**: Automate key user flows
- Run against staging with test data

**Convex Function Tests**
- Write tests against local Convex or sandbox
- Verify queries/mutations behave as expected

Regular code reviews with automated CI checks (lint, build, test) ensure code quality.

---

## 9. Frontend Summary

Built on Next.js, React, Tailwind CSS, shadcn/ui, Clerk, and Convex—glued with TypeScript for type safety. This ensures:

- **Scalability**: Modular folders, server actions, real-time subscriptions
- **Maintainability**: Clear separation of concerns, reusable components
- **Performance**: SSR, code splitting, lazy loading, optimized assets
- **Accessibility**: Built-in ARIA support, responsive layouts, theme system

These guidelines help contributors understand and extend the frontend with confidence.
