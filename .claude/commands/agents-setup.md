---
description: Creates agents for your tech stack
allowed-tools: Bash, Edit
argument-hint: [PRD.json or doc describing what agent is in charge of]
---

# Command: /agents-setup

If not already existing, create agents and plans under .claude/agents/ for each tool in the tech stack describes in the mentioned document.

Notes:
- Agents are created with kebab-case naming: `agent-feature-name.md`
- Use skill `agent-creating` to create agents
- Always use context7 for the latest information, documentation, and best practices