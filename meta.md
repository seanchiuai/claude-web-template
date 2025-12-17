Based on the implementation of Agent Experts described in the sources, your repository structure would typically contain a specialized directory for prompts and, specifically, a folder for expert knowledge and their associated prompts.

The core structure for an expert, such as the `database expert` or the `websocket expert`, looks like this:

### Example Repository Structure

```
do.claw/
├── commands/ 
│   ├── experts/
│   │   ├── database_expert/
│   │   │   ├── expertise_file.yaml  <-- The mental model
│   │   │   ├── question_prompt
│   │   │   ├── self_improve_prompt
│   │   ├── websocket_expert/
│   │   │   ├── expertise_file.yaml
│   │   │   ├── question_prompt
│   │   │   ├── self_improve_prompt
```
*Note: The sources mention looking into the `do.claw` directory, specifically `commands` where prompts are stored, and within that, an `experts` directory.*

### Information Files Should Contain

Agent Experts rely on two primary types of files: the prompt files that dictate their actions and workflow, and the **expertise file** which serves as their continually updated mental model.

#### 1. The Expertise File (Mental Model)

This is the key component that enables an Agent Expert to learn and reuse expertise at runtime.

| File Detail | Information Contained |
| :--- | :--- |
| **Format** | The expertise file is implemented as a **YAML file**. |
| **Purpose** | It functions as the **mental model** of the problem space for the agent expert. This is a **working memory file**, not a source of truth like the code, but an auxiliary document that is highly valuable. |
| **Content** | This data structure evolves over time with each useful action, accumulating **information, examples, and ultimately expertise** around a specific topic. |
| **Usage** | When the agent begins a task (e.g., answering a question), the **first thing it does is read this expertise file**. |

#### 2. Prompt Files (Defining Actions)

Agent Experts use specific prompts to define how they leverage their mental model and how they update it.

**A. The Question Prompt (e.g., `database_question_prompt`)**

This prompt structures the agent's interaction when answering a query within its domain.

| Prompt Detail | Workflow/Content |
| :--- | :--- |
| **Input** | The prompt takes in an argument, which is the user question. |
| **Expertise Reference** | It includes a **static variable that references the expertise file**. |
| **Workflow** | The workflow for the question prompt is critical: the agent reads the expertise file right away, and then **validates its assumptions against the codebase** (the true source of truth) before reporting its answer. |

**B. The Self-Improve Prompt (e.g., `self_improve_database` or `self_improve_websocket_expert`)**

This prompt is what allows the agent expert to learn automatically without human intervention.

| Prompt Detail | Workflow/Content |
| :--- | :--- |
| **Purpose** | To allow the agent to **sync its mental model with the working codebase**. This enables the agent to accumulate and manage its own expertise. |
| **Usage** | It is often run as the final step in a multi-step workflow (e.g., after the plan and build steps). |
| **Outcome** | By running the self-improve step, the agent can keep track of what has changed in the system following codebase updates, ensuring the agent's expertise is always being updated. |

The structure of the self-improve prompt is similar across different experts, suggesting that a meta-expert or metaprompt could generate these repeatedly. This focus on automatic self-improvement and learning is what differentiates an Agent Expert—it executes and learns, rather than executing and forgetting.

## Video Transcription

Here is the formatted transcript for the video **"Agent Experts: Finally, Agents That ACTUALLY Learn"** by **IndyDevDan**.

### **Transcript**

**[00:00:00] The Problem with Today's Agents**
Agents of today have many problems. Most of them can be solved with great context engineering and great agentic prompt engineering, but there is one massive problem that persists no matter how great your context engineering or agentic prompt engineering becomes. Traditional software improves as it's used, storing user analytics, usage data, and patterns that create algorithms. Agents of today don't. The massive problem with agents is this: your agents forget, and that means your agents don't learn.

**[00:00:39] Current Solutions and Their Flaws**
There are a few solutions, but each has their own problems. Memory files are global forced context that always loads. As you know, expertise requires breaking rules when the time is right. Memory files also must be manually updated, consuming your time or your team's time. Then we have prime prompts, sub-agents, and skills—powerful agentic tools—but again, these all have to be manually updated when you want to add new information and steer your agents in a different direction.

**[00:01:12] Introducing Agent Experts**
So what if you could take the best tool for the job of engineering agents to the next level by teaching your agents to act, learn, and reuse its expertise at runtime? What if you could create **Agent Experts**? The difference between a generic agent and an agent expert is simple: one executes and forgets; the other executes and learns. In this lesson, all execute, and you'll learn to build agents that turn actions into expertise, automatically storing the right information and reusing it with no human in the loop.

**[00:01:57] The Expert's Mental Model**
This is key. This is what makes an expert an expert. You don't need to tell an expert to learn; it's in their DNA. Also, real experts don't relearn their craft every time they have a new task. True experts are always learning; they're updating their **mental model**. This mental model is, simply put, a data structure that evolves over time with each useful action. Experts accumulate information, examples, and ultimately expertise around a specific topic. You're not trying to solve every problem; you're trying to solve the one that matters the most to you, your business, and your customers.

**[00:03:00] Defining Agent Experts and Meta-Agentics**
So in the world of agent coding, prompt engineering, and context engineering, what is an agent expert exactly? The agent expert is a concrete form of a self-improving template meta-prompt. That's a mouthful. Let's break this down because if you understand meta-prompts, you will understand agent experts. In this lesson, we'll walk through **Meta-Agentics**—or put plainly, no fancy language—meta-prompts, meta-sub-agents, and meta-skills. We're going to do this to showcase the atoms of what makes up the agent expert.

**[00:04:29] Demonstration: Meta-Prompts, Agents, and Skills**
Let's run through each to showcase their value proposition. In this agent experts codebase... we'll start with our meta-prompt and have it create a new version of a question prompt called "question with mermaid diagrams." We'll fire that off. Let's fire off the meta-agent—the agent that builds the agent. We're going to have it create a new planner agent that directly reads and executes the plan prompt... And finally, we'll use the meta-skill to create a "start orchestrator" skill that's going to kick off the frontend and the backend of our multi-agent orchestration application.

**[00:06:53] Why Meta-Tools Aren't Experts**
Now let's ask an important question: are these meta-agentics agent experts? They're acting, but they're missing a key piece: they're not learning at all. Nothing inside of the meta-prompt, the meta-agent, or the meta-skill has updated automatically. Our meta-tools are not becoming more proficient; therefore, these are not agent experts. This is a key factor of what makes an agent expert: **they must learn on their own.**

**[00:07:42] The Database Expert Example**
Let's look at a concrete example... We have a **Database Expert**. Let's click into this... and ask this: "How does information flow between our database tables?" The first thing this agent does is critical... it first reads this **expertise file**. Now, what is this? The expertise file is the mental model of the problem space for your agent expert. You can see it first read the expertise file and then it started comparing its understanding against the actual code, and it did it instantly. It didn't need to go search or find these files; it knew where they were.

**[00:09:17] Expertise vs. Source of Truth**
Let me be ultra clear about this: this is **not** a source of truth. The mental model you have of your codebases... you don't have a source of truth in your mind; you have a working memory file. You have a mental model. The true source of truth is always the code... but that does not mean that auxiliary documents and memory and mental models (expertise) are not all too valuable.

**[00:11:53] The Websocket Expert Workflow**
Let's kick off a three-step agentic workflow here. We're going to do this: "Add a session-based counter to the app navbar that displays the total number of websocket events." Perfect for a websocket expert. It knows where all this stuff is. We have a three-step workflow:

1. **Plan:** Classic planning step.
2. **Build:** Executes the plan.
3. **Self-Improve:** This is where things get interesting.

**[00:15:09] The Self-Improve Step**
We're not just planning and building... we're really hitting on that key tactic. At step three, we are going to run the **self-improve prompt**. The agent expertise is ultra powerful because it lets our agent keep track of what changed. We have now deployed three websocket agent experts to answer one question. When they come back with their answer, we're going to be a lot more confident.

**[00:18:03] Conclusion: The Core Four**
We're entering this really weird phase where you can truly create high-performance agents, and all you need is the right information, the right prompts, and then you can compose them into whatever you want. Build a skill if you want, build a custom agent if you want... I always focus on the foundational units: **Context, Model, Prompt, Tools**—the Core Four. Everything is just that with some fancy tooling and a little bit of code structure.