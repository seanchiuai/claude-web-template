# Sean's Claude Code Web Template

A production-ready, AI-assisted Next.js template with authentication, real-time database, and comprehensive documentation. Built for rapid development with Claude Code.

## ✨ What's Included

**Core Stack**
- **Frontend**: Next.js 15 (App Router) + React + TypeScript + Tailwind CSS 4
- **UI Components**: shadcn/ui (accessible, customizable)
- **Authentication**: Clerk (sign-up, sign-in, user management)
- **Backend**: Convex (real-time database + serverless functions)
- **AI Development**: Claude Code integration with custom agents, skills, and commands

**Template Features**
- ✅ Pre-configured authentication flow (Clerk ↔ Convex JWT)
- ✅ Real-time database with TypeScript schema
- ✅ Protected routes with middleware
- ✅ Comprehensive documentation templates
- ✅ Claude Code agents for backend, frontend, UI, and deployment
- ✅ Custom slash commands for common workflows
- ✅ Strict TypeScript configuration
- ✅ ESLint + Prettier setup
- ✅ Mobile-first responsive design

## 🚀 Quick Start

### 1. Prerequisites

- Node.js 18+
- npm or yarn
- [Clerk account](https://clerk.com) (free)
- [Convex account](https://convex.dev) (free)

### 2. Installation

```bash
# Clone and install
git clone <your-repo-url>
cd claude-web-template
npm install
```

### 3. Setup

**Option A: Detailed Manual Setup**
Follow the comprehensive step-by-step guide in [`SETUP.md`](./SETUP.md)

**Option B: Quick Setup (with Claude Code)**
If you're using Claude Code:
```bash
# Run the setup command
/setup
```
This will walk you through the entire setup process interactively.

### 4. Sync AI Experts (Critical for AI Development)

**If using Claude Code:**

After setup, sync the AI experts with your codebase so they can learn your patterns:

```bash
/sync-expertise all
```

This takes 2-4 minutes and:
- Validates expert knowledge against your actual code
- Discovers project-specific patterns
- Enables evidence-based answers to your questions
- Allows experts to suggest YOUR conventions (not generic ones)

**Skip this if:** You're not using Claude Code or AI-assisted development.

### 5. Run Development Server

**Important**: Run this command in your own terminal (not through AI):

```bash
npm run dev
```

This starts:
- Next.js frontend at `http://localhost:3000`
- Convex backend (dashboard opens automatically)

## 📚 Documentation

This template includes comprehensive documentation templates in the `docs/` folder:

| Document | Purpose |
|----------|---------|
| [`project_requirements.md`](./docs/project_requirements.md) | Product requirements, features, scope, tech stack |
| [`tech_stack.md`](./docs/tech_stack.md) | Technology decisions and rationale |
| [`frontend_guidelines.md`](./docs/frontend_guidelines.md) | Frontend architecture, components, styling |
| [`backend_structure.md`](./docs/backend_structure.md) | Convex patterns, database schema, API design |
| [`security_guidelines.md`](./docs/security_guidelines.md) | Authentication, access control, data protection |
| [`app_flow.md`](./docs/app_flow.md) | User journeys and feature flows |
| [`app_flowchart.md`](./docs/app_flowchart.md) | Visual Mermaid flowcharts |
| [`CHANGELOG.md`](./docs/CHANGELOG.md) | Critical changes and updates |

**📝 Fill in these templates as you build your application** to maintain clear, up-to-date documentation.

## 🤖 Claude Code Integration

This template is optimized for AI-assisted development with [Claude Code](https://claude.com/claude-code).

### Project Instructions

- **[`CLAUDE.md`](./CLAUDE.md)** - Main instructions for Claude Code
  - Workflow overview
  - Stack patterns
  - Reference docs
  - Development rules

### Available Resources

**📁 `.claude/` folder structure:**

```
.claude/
├── agents/              # Specialized AI agents
│   ├── agent-convex.md     # Backend/Convex expert
│   ├── agent-nextjs.md     # Frontend/Next.js expert
│   ├── agent-shadcn.md     # UI components expert
│   └── agent-vercel.md     # Deployment expert
│
├── commands/            # Custom slash commands
│   ├── /setup              # Interactive setup wizard
│   ├── /full-ui-test       # Test entire UI flow
│   ├── /npmrundev          # Run dev server with error fixing
│   ├── /refactor           # Safe codebase refactoring
│   ├── /cleanup            # Remove code slop
│   ├── /update-CLAUDE      # Update CLAUDE.md
│   └── /worktree           # Git worktree management
│
└── skills/              # Specialized workflows
    ├── frontend-design     # Build polished UI
    ├── integrating-stripe  # Add Stripe payments
    ├── vercel-deploying    # Deploy to production
    ├── agent-builder       # Create custom agents
    └── create-skill        # Create custom skills
```

### Using Claude Code

**Slash Commands:**
```bash
/setup                    # First-time project setup
/full-ui-test            # Test all UI functionality
/npmrundev               # Run dev with auto-fix
/refactor                # Refactor codebase safely
/cleanup                 # Remove AI code slop
/update-CLAUDE           # Keep CLAUDE.md current
```

**Skills:**
```
@frontend-design         # Create beautiful UI
@integrating-stripe      # Add payment processing
@vercel-deploying       # Deploy to production
```

**Agents:**
Specialized agents are invoked automatically based on task context (backend, frontend, UI, deployment).

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── (auth)/            # Public auth routes
│   ├── (protected)/       # Protected routes
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx           # Home page
│
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── ConvexClientProvider.tsx
│
├── convex/               # Convex backend
│   ├── auth.config.ts    # Clerk authentication
│   ├── schema.ts         # Database schema
│   └── *.ts              # Queries, mutations, actions
│
├── docs/                 # Documentation templates
│   ├── project_requirements.md
│   ├── tech_stack.md
│   ├── frontend_guidelines.md
│   ├── backend_structure.md
│   ├── security_guidelines.md
│   ├── app_flow.md
│   ├── app_flowchart.md
│   └── CHANGELOG.md
│
├── .claude/              # Claude Code integration
│   ├── agents/          # Specialized AI agents
│   ├── commands/        # Custom slash commands
│   └── skills/          # Specialized workflows
│
├── lib/                  # Utility functions
├── public/               # Static assets
├── middleware.ts         # Route protection
├── CLAUDE.md            # AI development instructions
├── SETUP.md             # Detailed setup guide
└── README.md            # This file
```

## 🔐 Authentication Flow

Pre-configured Clerk + Convex integration:

1. **Sign Up/Sign In**: Clerk handles UI and user management
2. **JWT Token**: Clerk issues "convex" JWT template
3. **Protected Routes**: Middleware guards authenticated routes
4. **Backend Auth**: Convex validates JWT for queries/mutations
5. **User Session**: Available in both frontend and backend

See [`security_guidelines.md`](./docs/security_guidelines.md) for implementation details.

## 🗄️ Database

Convex provides:
- Real-time database with TypeScript schema
- Serverless functions (queries, mutations, actions)
- Real-time subscriptions (automatic UI updates)
- Automatic scaling and deployment

Define schema in `convex/schema.ts` and create functions in `convex/*.ts`.

See [`backend_structure.md`](./docs/backend_structure.md) for patterns and best practices.

## 🎨 Styling

- **Tailwind CSS 4**: Utility-first styling
- **shadcn/ui**: Pre-built accessible components
- **Dark Mode**: Configured and ready
- **Mobile-First**: Responsive design utilities
- **Custom Theme**: Configured in `tailwind.config.ts`

See [`frontend_guidelines.md`](./docs/frontend_guidelines.md) for styling guide.

## 🔧 Available Scripts

```bash
npm run dev              # Start frontend + backend
npm run dev:frontend     # Start Next.js only
npm run dev:backend      # Start Convex only
npm run build           # Build for production
npm run start           # Start production server
npm run lint            # Run ESLint
```

## 🚢 Deployment

### Vercel (Frontend)

1. Push code to GitHub
2. Import repo to [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy automatically on push

### Convex (Backend)

Convex auto-deploys when you push to main. Configure in Convex Dashboard → Settings → Deploy Settings.

**Using Claude Code:**
```bash
@vercel-deploying       # Automated deployment with error fixing
```

See [`tech_stack.md`](./docs/tech_stack.md) for deployment details.

## 🧠 Customizing AI Development Environment

This template includes an intelligent Agent Experts system that learns and evolves with your codebase. Here's how to customize it for your project.

### Understanding the Expert System

**Agent Experts** are AI assistants specialized in different domains of your tech stack. They:
- Learn patterns from your actual codebase
- Answer questions with evidence-based responses
- Improve over time through self-learning
- Maintain a "mental model" of your project conventions

### Initial Expert Sync

**On First Use (Critical):**

When you first clone this template, the experts have only basic knowledge from their agent documentation. You MUST sync them with your codebase:

```bash
# Sync all experts with your codebase
/sync-expertise all
```

This explores your project and validates patterns. Run this:
- After cloning the template
- After significant code changes (5+ files)
- After major refactoring
- Monthly for maintenance

**What happens during sync:**
- Experts explore relevant directories (convex/, app/, components/)
- Validate existing patterns against actual code
- Discover new project-specific conventions
- Update confidence levels based on evidence
- Learn your coding style and patterns

### Using Experts

**Ask Questions:**

```bash
# Backend/database questions
/ask-expert convex "How do I handle CORS in HTTP endpoints?"

# Frontend/routing questions
/ask-expert nextjs "What's the pattern for Server Components with auth?"

# UI component questions
/ask-expert shadcn "How do I use the Button component?"

# Deployment questions
/ask-expert vercel "How do I deploy?"
```

**Expert responses include:**
- Direct, actionable answer
- Evidence from YOUR codebase (file paths, line numbers)
- Project-specific patterns and conventions
- Confidence level with reasoning
- Related patterns to explore

### Customizing Experts for Your Stack

**Scenario: You're using a different tech stack**

If you're not using the default stack (Next.js + Convex + shadcn + Vercel), customize the experts:

#### Option 1: Modify Existing Experts

Edit agent files to match your stack:

```bash
# Example: Switch from Convex to Supabase
1. Edit: .claude/agents/agent-convex.md → agent-supabase.md
2. Update domain knowledge and patterns
3. Edit: .claude/experts/convex-expert/ → supabase-expert/
4. Update expertise.yaml with Supabase patterns
5. Run: /sync-expertise supabase
```

#### Option 2: Create New Experts

Use the built-in creator tools:

```bash
# Create a new expert (interactive)
@creating-expert

# This walks you through:
# 1. Expert name (e.g., "django-expert")
# 2. Domain (e.g., "Django Backend Development")
# 3. Key patterns to track
# 4. File locations to monitor
# 5. Initial expertise structure
```

**Manual Creation:**

1. **Create expert directory:**
   ```bash
   mkdir -p .claude/experts/[your-expert-name]-expert
   ```

2. **Create expertise.yaml:**
   ```yaml
   ---
   expert: "your-expert-name"
   domain: "Your Domain Description"
   last_updated: "2025-12-18T00:00:00Z"
   version: "0.1.0"
   confidence: "low"
   ---

   patterns:
     - pattern: "Your pattern description"
       context: "When this pattern applies"
       evidence: "file.ts:123"
       importance: "critical"
       confidence: "low"

   key_files:
     main_config: "path/to/config.ts"

   common_issues: []
   codebase_conventions: []
   evolution_log: []
   ```

3. **Create workflows:**
   - `question.md` - How expert answers questions
   - `self-improve.md` - How expert learns from code

4. **Create agent file:**
   ```bash
   # .claude/agents/agent-[your-expert].md
   ```
   Define tools, patterns, and best practices

5. **Sync the new expert:**
   ```bash
   /sync-expertise your-expert-name
   ```

### Adapting Agents

**Agents** are the implementation workers that write code. Customize them:

**Edit existing agents:**
```bash
# Example: Customize Next.js agent for your patterns
Edit: .claude/agents/agent-nextjs.md

# Add your conventions:
- File organization rules
- Naming conventions
- Error handling patterns
- Import organization
- Testing requirements
```

**Create new agents:**
```bash
# Use the agent builder
@agent-builder

# Or create manually:
# .claude/agents/agent-[name].md
```

### Custom Slash Commands

Add project-specific workflows:

```bash
# Create new command file
# .claude/commands/your-command.md

---
description: What your command does
argument-hint: [arg1] [arg2]
---

# Your command implementation
# Can use any tools: Read, Grep, Glob, Bash, etc.
```

**Example custom commands:**
- `/deploy-staging` - Deploy to staging environment
- `/run-migrations` - Run database migrations
- `/generate-types` - Generate TypeScript types from schema
- `/backup-db` - Backup database before changes

### Evolution Tracking

Monitor how your experts improve over time:

```bash
# View expert's mental model
Read: .claude/experts/convex-expert/expertise.yaml

# Check evolution log
# Shows confidence growth, patterns learned, changes over time
```

**Healthy expert progression:**
```
Day 1:   version: 0.1.0, confidence: low,    patterns: 5
Day 7:   version: 0.3.0, confidence: medium, patterns: 12
Day 30:  version: 0.8.0, confidence: high,   patterns: 25
Day 90:  version: 1.2.0, confidence: high,   patterns: 35
```

### Expert Sync Workflow

**Automatic sync suggestions:**

The template can suggest syncs after commits (via git hooks):

```bash
# After commit with backend changes
git commit -m "Add new Convex endpoint"

# Hook output:
📚 Convex changes detected
💡 Consider: /sync-expertise convex
```

**Manual sync triggers:**

```bash
# Single expert
/sync-expertise convex

# All experts
/sync-expertise all
```

**Best practices:**
- ✅ Sync after merging features
- ✅ Sync before asking questions (for freshest answers)
- ✅ Sync monthly for maintenance
- ❌ Don't sync after every commit (too frequent)
- ❌ Don't sync during active development

### Template for Different Projects

**Example: Adapt for Django + PostgreSQL + React**

1. **Remove unused experts:**
   ```bash
   rm -rf .claude/experts/convex-expert
   rm -rf .claude/experts/nextjs-expert
   ```

2. **Create new experts:**
   ```bash
   @creating-expert  # Create "django-expert"
   @creating-expert  # Create "postgres-expert"
   @creating-expert  # Create "react-expert"
   ```

3. **Update CLAUDE.md:**
   ```markdown
   ## Stack
   Django 5 • PostgreSQL • React 18 • TypeScript

   ## Experts
   `/ask-expert {django|postgres|react} "question"`
   ```

4. **Sync all experts:**
   ```bash
   /sync-expertise all
   ```

5. **Update agents:**
   - Edit `.claude/agents/` to match your patterns
   - Remove skills you don't need
   - Add new skills for your stack

### Creating Skills

**Skills** are specialized workflows for complex tasks:

```bash
# Use the skill creator
@create-skill

# Or create manually:
# .claude/skills/[skill-name]/skill.md
```

**Example skills for your project:**
- `@database-migration` - Handle schema migrations
- `@api-endpoint` - Create new API endpoints following your patterns
- `@component-generator` - Generate components with your structure
- `@testing-suite` - Add comprehensive tests

### Project-Specific Conventions

**Teach experts your patterns:**

After writing code with specific patterns, sync experts to learn:

```bash
# Example: You always use a specific error handling pattern
# 1. Implement it consistently across 5+ files
# 2. Sync the expert
/sync-expertise convex

# 3. Expert learns: "All mutations use try-catch with custom error codes"
# 4. Next time you ask, expert suggests YOUR pattern
```

**Document in expertise.yaml:**
```yaml
codebase_conventions:
  - convention: "All mutations return { success, data, error }"
    evidence: "convex/users.ts:45, convex/tasks.ts:67, ..."
    confidence: "high"
```

### Troubleshooting AI Development

**Expert gives outdated answers:**
```bash
/sync-expertise [expert-name]  # Refresh their knowledge
```

**Expert low confidence:**
- Normal for new patterns (< 3 occurrences)
- Implement pattern in more places
- Run sync again to increase confidence

**Expert not finding pattern:**
- Pattern doesn't exist yet in codebase
- Expert will help you implement it

**YAML syntax error in expertise:**
```bash
# Fix manually or restore from git
git checkout .claude/experts/[expert-name]/expertise.yaml
# Then re-run sync
```

## 🆘 Troubleshooting

### Common Issues

**"Convex client not configured"**
- Check `NEXT_PUBLIC_CONVEX_URL` in `.env.local`
- Ensure Convex dev server is running

**Authentication not working**
- Verify JWT template in Clerk named "convex"
- Check `CLERK_JWT_ISSUER_DOMAIN` in Convex dashboard
- Ensure `convex/auth.config.ts` has correct domain

**Build errors**
- Run `npm run lint`
- Verify all environment variables set
- Clear `.next` cache: `rm -rf .next`

**Full troubleshooting guide:** See [`SETUP.md`](./SETUP.md#troubleshooting)

## 📖 Resources

**Official Documentation**
- [Convex Docs](https://docs.convex.dev)
- [Clerk Docs](https://clerk.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [shadcn/ui Docs](https://ui.shadcn.com)

**Integration Guides**
- [Convex + Clerk](https://docs.convex.dev/auth/clerk)
- [Next.js + Clerk](https://clerk.com/docs/quickstarts/nextjs)

**Claude Code**
- [Claude Code CLI](https://github.com/anthropics/claude-code)
- [Agent SDK](https://github.com/anthropics/anthropic-sdk-typescript)

## 🎯 Next Steps

After setup is complete:

1. **Fill in documentation templates** in `docs/` folder
2. **Define your database schema** in `convex/schema.ts`
3. **Create Convex functions** for your data operations
4. **Build UI components** using shadcn/ui
5. **Add protected routes** for authenticated features
6. **Customize styling** in `tailwind.config.ts`
7. **Deploy to production** on Vercel

**With Claude Code:**
- Use `/setup` to configure project
- Use `@frontend-design` to build polished UI
- Use `/full-ui-test` to verify functionality
- Use `@vercel-deploying` to deploy

## 📝 Development Workflow

**Recommended with Claude Code:**

1. Read `docs/project_requirements.md` for your feature
2. Use specialized agents (convex, nextjs, shadcn) for implementation
3. Use `/full-ui-test` to verify changes
4. Commit frequently (template encourages atomic commits)
5. Update `docs/CHANGELOG.md` after significant changes
6. Use `/update-CLAUDE` to keep AI context current

## 🔄 Common Customization Workflows

### Workflow 1: Adapting for a New Tech Stack

```bash
# 1. Clone template
git clone <repo-url> my-project
cd my-project

# 2. Run initial setup
/setup

# 3. Remove default experts you don't need
rm -rf .claude/experts/convex-expert  # If not using Convex
rm -rf .claude/experts/vercel-expert  # If not using Vercel

# 4. Create experts for your stack
@creating-expert  # Interactive creation

# 5. Update CLAUDE.md with your stack info
Edit: CLAUDE.md

# 6. Update agents to match your patterns
Edit: .claude/agents/agent-*.md

# 7. Sync all experts with your codebase
/sync-expertise all

# 8. Start development
npm run dev
```

### Workflow 2: Adding a New Expert to Existing Project

```bash
# 1. Create the expert
@creating-expert

# 2. Follow prompts to define:
#    - Expert name (e.g., "stripe-expert")
#    - Domain (e.g., "Stripe Payment Integration")
#    - Key patterns to track
#    - File locations

# 3. Create workflows (or use templates)
# .claude/experts/stripe-expert/question.md
# .claude/experts/stripe-expert/self-improve.md

# 4. Create corresponding agent
# .claude/agents/agent-stripe.md

# 5. Sync to learn from existing code
/sync-expertise stripe

# 6. Test it
/ask-expert stripe "How do I handle webhooks?"
```

### Workflow 3: Teaching Experts Your Coding Style

```bash
# 1. Write code following your preferred patterns
# Implement consistently across 5+ files

# 2. Sync expert to learn your patterns
/sync-expertise [expert-name]

# 3. Verify expert learned the pattern
/ask-expert [expert-name] "What's the pattern for [your-pattern]?"

# 4. Expert should respond with YOUR pattern as evidence
# Include: file paths, confidence level, recommendations

# 5. Keep syncing as patterns evolve
# After major changes: /sync-expertise all
```

### Workflow 4: Creating Project-Specific Commands

```bash
# 1. Create command file
# .claude/commands/my-command.md

# 2. Define behavior
---
description: Brief description
argument-hint: [optional-args]
---

# Command implementation using tools

# 3. Use it
/my-command [args]

# Example: Database backup command
# .claude/commands/backup-db.md
# Implementation: Uses Bash to run backup script
# Usage: /backup-db production
```

### Workflow 5: Monthly Maintenance

```bash
# Run monthly to keep experts sharp

# 1. Update all experts with latest patterns
/sync-expertise all

# 2. Review expert evolution
Read: .claude/experts/*/expertise.yaml
# Check: version numbers, confidence levels, pattern count

# 3. Clean up outdated patterns
# Experts auto-remove patterns not found
# Review evolution_log for changes

# 4. Update CLAUDE.md if stack changed
Edit: CLAUDE.md

# 5. Test experts with questions
/ask-expert convex "Show me our error handling pattern"
/ask-expert nextjs "What's our layout structure?"
```

## 📊 Expert Quality Indicators

**High-Quality Expert:**
- ✅ Version 1.0+ (mature)
- ✅ Confidence: high
- ✅ 25+ validated patterns
- ✅ Evidence from 10+ files
- ✅ Recent sync (< 30 days)
- ✅ Active evolution log

**Needs Attention:**
- ⚠️ Version < 0.5 (immature)
- ⚠️ Confidence: low
- ⚠️ < 10 patterns
- ⚠️ Evidence from < 5 files
- ⚠️ Last sync > 60 days
- ⚠️ Empty evolution log

**Action:** Run `/sync-expertise [expert]` to improve quality

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ for rapid development**

Questions or issues? Open a GitHub issue or check the documentation.
