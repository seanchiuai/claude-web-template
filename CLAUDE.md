# CLAUDE.md

## Workflow
Check `docs/project_requirements.md` for product requirements → `.claude/skills/` → `.claude/agents/`

**Agents:** convex (backend), nextjs (frontend), shadcn (UI), vercel (deployment)

## Agent Experts (Self-Improving Agents)

**Pattern:** Agents that execute AND learn (not execute and forget)

**Ask Questions:**
```bash
/ask-expert convex "How do I handle CORS?"
/ask-expert nextjs "What's the Server Component pattern?"
/ask-expert shadcn "How do I use Button?"
/ask-expert vercel "How do I deploy?"
```

**Update Expertise:**
```bash
/sync-expertise convex    # After convex/ changes
/sync-expertise all       # After major refactoring
```

**How It Works:**
- Each expert has expertise file (`.claude/experts/{name}-expert/expertise.yaml`)
- Expertise = accumulated patterns validated against codebase
- Questions answered with evidence (file:line references)
- Self-improvement syncs expertise with code changes
- Git hook suggests syncing after commits

**Key Insight:** Expertise is working memory, codebase is source of truth. Always validate.

**Meta-Skills:**
- `creating-expert` - Generate new domain experts
- `meta-prompt` - Create prompt variations

**Read:** `docs/agent_experts.md` for full documentation

## Stack & Patterns
Next.js 15 • Tailwind 4 + shadcn/ui • Clerk → JWT → Convex • TypeScript strict • `@/*` imports

Auth: `ConvexProviderWithClerk` | Schema: `convex/schema.ts` | Protection: `middleware.ts`

**Clerk+Convex:** Create "convex" JWT in Clerk → set `CLERK_JWT_ISSUER_DOMAIN` → config `convex/auth.config.ts`

## Structure
`/app/(auth|protected)` `/components` `/convex` `/docs` (all docs here, `CHANGELOG.md` for critical notes) `/.claude`

## Reference Docs (Read for Specific Tasks)

**Project requirements and scope:**
- Read `docs/project_requirements.md` - PRD template: features, scope, tech stack, constraints

**Tech stack decisions:**
- Read `docs/tech_stack.md` - Frontend/backend technologies, infrastructure, integrations

**Frontend development:**
- Read `docs/frontend_guidelines.md` - Architecture, design principles, components, styling, state management, routing

**Backend development:**
- Read `docs/backend_structure.md` - Database schema, API design, Convex patterns, hosting, monitoring

**Security implementation:**
- Read `docs/security_guidelines.md` - Auth, access control, input handling, data protection, API security

**User flows and interactions:**
- Read `docs/app_flow.md` - Complete user journey, feature flows, error states
- Read `docs/app_flowchart.md` - Visual Mermaid flowchart of app navigation

**Critical changes:**
- Update `docs/CHANGELOG.md` after commits/pulls - concise, critical info only

**Always update docs/** when making significant changes. Fill in template sections as features are built.

## Rules
**TS:** Strict, no `any`, `@/*` imports | **React:** Functional, `"use client"`, Convex hooks, <200 LOC | **Style:** Tailwind, mobile-first | **Security:** OWASP Top 10, row-level filter, secrets in `.env.local` | **Quality:** >80% coverage, lint clean, build pass

**Convex:** Follow `docs/backend_structure.md` patterns | **Env:** Get key from user → add to `.env.local` | **Impl:** UI first → functionality. Modular code.

**Pre-commit:** Build + tests + lint, >80% coverage, no vulnerabilities

## Important Notes
- Never add backwards compatibility
- Always sacrifice grammar for the sake of conciseness in your responses
- **MANDATORY:** Git commit after every change (small, medium, or big). No exceptions. Commit immediately after completing any change, fix, or update.
- Always constantly update /docs/CHANGELOG.md after pulling in new commits or making new commits. Keep logs concise. Only log information critical information my engineers need to know.
- When a plan finishes executing, update the plan file in and the /docs/CHANGELOG.md on what is fdone