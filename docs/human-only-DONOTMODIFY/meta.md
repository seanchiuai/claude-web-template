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