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

### 4. Run Development Server

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

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ for rapid development**

Questions or issues? Open a GitHub issue or check the documentation.
