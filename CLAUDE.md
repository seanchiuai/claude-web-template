## Workflow
`.claude/experts/` → `.claude/skills/` → `.claude/agents/` (convex, nextjs, shadcn, vercel)

## Experts
`/ask-expert {convex|nextjs|shadcn|vercel} "question"` → `/sync-expertise {agent|all}` after changes

Patterns: `.claude/experts/{name}-expert/expertise.yaml` | **On session start:** Check `.claude/pending-syncs.txt` → run syncs → delete file

## Stack
Next.js 15 • Tailwind 4 • shadcn/ui • Clerk→JWT→Convex • TS strict • `@/*` imports
Auth: `ConvexProviderWithClerk` | Schema: `convex/schema.ts` | Clerk JWT: `CLERK_JWT_ISSUER_DOMAIN` + `convex/auth.config.ts`

## Structure
`/app/(auth|protected)` `/components` `/convex` `/docs` (`CHANGELOG.md` only) `/.claude`

Update `docs/CHANGELOG.md` after commits.

## Rules
- **TS:** Strict, no `any`, `@/*` imports
- **React:** Functional, `"use client"`, Convex hooks, <200 LOC
- **Style:** Tailwind, mobile-first
- **Security:** OWASP Top 10, row-level filter, secrets in `.env.local`
- **Quality:** >80% coverage, lint clean, build pass
- **Pre-commit:** Build + tests + lint, >80% coverage, no vulnerabilities

## Crucial Notes (ALWAYS CHECK)
- No backwards compatibility
- Sacrifice grammar for conciseness
- **MANDATORY:** Commit after every change
- Update `/docs/CHANGELOG.md` after commits/pulls
- Update plan files (if any)
- UI first → functionality. Modular code.