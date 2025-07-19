# Cypher Architecture Overview

## Core Components

### 1. TaskEngine (Pure TypeScript)
- Handles all file I/O operations
- No external dependencies
- ~100 lines of clean code

### 2. Command Layer (TypeScript + Commander.js)
- CLI interface
- Routes commands to appropriate handlers
- Formats output for AI consumption

### 3. AI Integration Layer (Claude Code SDK)
- **Current**: Claude Code SDK (@anthropic-ai/claude-code)
- **Future**: Pluggable providers (Gemini, GPT)
- Used for intelligent operations:
  - PRD parsing
  - Task expansion
  - Context optimization

## Data Flow

```
User Input → CLI Parser → Command Handler → TaskEngine ↔ tasks.json
                              ↓
                        AI Provider (when needed)
                              ↓
                     AI-Optimized Output
```

## Evolving Knowledge Protocol (EKP) Architecture

The Evolving Knowledge Protocol (EKP) is the core architecture that allows Cypher to move beyond static, hard-coded logic. It establishes a system where the AI's intelligence and capabilities are defined in version-controlled, human-readable Markdown artifacts that evolve over time through usage.

### Core Philosophy: Commands as Teachers

The central principle of EKP is "Commands as Teachers." CLI commands (e.g., `plan`, `learn`, `context`) do not contain complex business logic. Instead, their primary function is to select an appropriate "teacher"—a Markdown guide from `cypher/prompts/`—and present it to the AI within a dedicated workspace. This transforms the AI from a simple tool into a collaborator being instructed on *how* to approach a task, rather than just executing it.

### Key Architectural Components

The EKP is composed of four key directories within the `cypher/` folder, each with a distinct role in the knowledge lifecycle.

- **`cypher/prompts/` (The Teachers):** Contains the archetypal guides that define roles, tasks, and dialogue structures for the AI. Files like `plan-guide.md` or `learn-guide.md` are the starting point for any collaborative session. They are the "curriculum" for the AI.

- **`cypher/cdd/<task-id>/` (The Workspace):** A "Collaborative Dialogue Document" directory is created for each task. This is the ephemeral workspace where a specific dialogue happens. It contains a copy of the initial prompt, the full conversation transcript, and any artifacts generated during the session. It is a complete record of a single learning interaction.

- **`cypher/patterns/` (The Toolkit):** A repository of proven, tactical solutions, code snippets, and reusable methods. These are concrete, practical patterns extracted from successful task dialogues by the `learn` command. The AI can reference this directory to find existing solutions to common problems.

- **`cypher/knowledge/` (The Library):** A store for curated, high-level strategic knowledge. Unlike the tactical nature of `patterns`, this holds architectural principles, long-term goals, and core philosophies extracted from dialogues. It represents the consolidated, stable wisdom of the system.

- **`cypher/project-rules/` (The Rulebook):** This directory stores the operational and process rules that all collaborators (human and AI) must follow. Unlike `patterns`, which focuses on *code*, `project-rules` focuses on *process*: how to name branches, the format of commit messages, and the required steps in the Git workflow. It provides the procedural guardrails to ensure the AI's output integrates safely and consistently into the project.

### EKP Knowledge Lifecycle Flow

The EKP is not a static structure but a dynamic, cyclical process. The flow is as follows:

1. **Initiation:** A user runs a guide command (e.g., `cypher plan "Refactor the auth module"`).
2. **Instruction:** The command creates a new workspace (`cypher/cdd/refactor-auth-module/`) and populates it with the relevant guide from `cypher/prompts/`.
3. **Collaboration:** The user and the AI interact within the CDD. The AI follows the instructions from the prompt, and the entire dialogue is recorded.
4. **Evolution:** Once the task is complete, the user runs the `cypher learn` command on the CDD directory.
5. **Extraction & Consolidation:** The `learn` command, guided by its own prompt (`learn-guide.md`), analyzes the successful dialogue. It extracts new, reusable patterns (which are saved to `cypher/patterns/`) or broader strategic insights (saved to `cypher/knowledge/`).
6. **Refinement:** Over time, the `learn` process itself can identify improvements for the initial prompts in `cypher/prompts/`, thus refining the "teachers" and completing the evolutionary loop.

This cycle ensures that with every task, the system becomes more intelligent and effective, capturing and structuring knowledge that would otherwise be lost.

### Data Flow Diagram (Conceptual)

A complete diagram should visualize this cyclical flow:

```
                               +----------------------+
                               | cypher/prompts/      |
                               | (Teachers)           |
                               +----------------------+
                                         | 1. Instruct
                                         v
+------+   1. Initiate   +---------+   +----------------------+   +-----------+
| User |---------------> | Command |-->| cypher/cdd/<task-id>/|-->| AI/User   |
+------+                 +---------+   | (Workspace)          |   | Dialogue  |
                                     +----------------------+   +-----------+
                                         ^      | 2. Collaborate
                                         |      |
                                5. Refine|      | 3. Learn
                                         |      v
                                     +----------------------+
                                     | learn Command        |
                                     +----------------------+
                                         | 4. Extract
                                         |
                  +----------------------+----------------------+
                  v                                             v
+----------------------+                               +----------------------+
| cypher/patterns/     |                               | cypher/knowledge/    |
| (Tactical Toolkit)   |                               | (Strategic Library)  |
+----------------------+                               +----------------------+
```

## Key Design Decisions

1. **AI as a Service**: AI capabilities are optional - core task management works without AI
2. **Provider Abstraction**: AI logic is abstracted behind interfaces for future flexibility
3. **Local-First**: All data stored locally in `cypher/`, no cloud dependencies for core features