# EKP Implementation Roadmap

## Objective

To refactor the Cypher CLI and associated workflows to fully implement the Evolving Knowledge Protocol (EKP). This involves shifting from a task-execution model to a dialogue-centric framework that facilitates the growth and refinement of a persistent, versionable knowledge base.

---

## Phase 1: Build the Knowledge Ecosystem Scaffolding

This initial phase focuses on creating the foundational directory structure that will house the project's evolving intelligence. These are the prerequisites for the new dialogue-driven workflow.

### Task 1.1: Create Core Knowledge Directories

*   **Action:** Create two new top-level directories within the `cypher/` folder.
*   **Command:** `mkdir cypher/prompts cypher/patterns`
*   **Purpose:**
    *   `cypher/prompts/`: Will store the archetypal prompts for different roles (e.g., `orchestrator-planning.md`, `react-developer.md`). This is the home of our reusable instruction sets.
    *   `cypher/patterns/`: Will store consolidated wisdom, best practices, and reusable solution patterns (e.g., `api-error-handling.md`).
*   **Acceptance Criteria:** The directories `cypher/prompts` and `cypher/patterns` must exist.

### Task 1.2: Create the First Archetype - The Orchestrator's Guide

*   **Action:** Create the first and most critical prompt archetype, which will guide the AI Orchestrator during the planning dialogue.
*   **File to Create:** `cypher/prompts/orchestrator-planning.md`
*   **Initial Content:**
    ```markdown
    # Orchestrator Planning Protocol (v1)

    ## Task: {{task.title}}
    **Description:** {{task.description}}

    ## Prime Directive:
    Your goal is to facilitate a collaborative dialogue with the Supervisor to create a precise, context-rich plan. Do not automate; facilitate.

    ## Planning Sequence:

    1.  **Analyze the Task:** Identify the core challenges. Propose a cognitive strategy (ToT for exploration, CoT for sequence, ReAct for interaction).

    2.  **Seek Prior Wisdom:** Before proposing a solution, search for relevant knowledge.
        *   Check for similar tasks in `cypher/cdd/*/retrospective.md`.
        *   Check for established solutions in `cypher/patterns/`.
        *   Reference these findings in your opening proposal (e.g., "Based on our experience in task-123...").

    3.  **Co-Create Artifacts:** Through dialogue, incrementally build the necessary artifacts (`plan.md`, `context.md`, `prompts.md`) in the `cypher/cdd/{{task.id}}/` directory.

    **Begin the dialogue now.**
    ```
*   **Acceptance Criteria:** The file `cypher/prompts/orchestrator-planning.md` must be created with the specified content.

---

## Phase 2: Implement the Dialogue Framework

This phase focuses on creating the `cypher plan` command, the primary entry point for the EKP workflow. The command itself will be extremely simple, acting only as a catalyst for the human-AI dialogue.

### Task 2.1: Create the `cypher plan` Command

*   **Action:** Create a new command file `src/commands/plan.ts`.
*   **Dependencies:** This command will need to interact with the `TaskEngine` to retrieve task details.
*   **Core Logic:** The command must perform the following actions:
    1.  Accept a `<task-id>` as a required argument.
    2.  Use `TaskEngine.getTaskById()` to fetch the corresponding task data.
    3.  Read the content of the orchestrator's archetype prompt from `cypher/prompts/orchestrator-planning.md`.
    4.  Replace the `{{task.title}}` and `{{task.description}}` placeholders in the prompt with the actual data from the task.
    5.  Print the final, populated prompt to the console.
    6.  **Crucially, the command then terminates.** It does not wait for input or orchestrate any further steps. Its sole purpose is to present the starting prompt for the dialogue.
*   **Acceptance Criteria:**
    *   Running `npx tsx src/cli.ts plan <some-id>` successfully prints the formatted content of `orchestrator-planning.md` populated with the details of the specified task.
    *   The command exits with a success code after printing the prompt.

---

## Phase 3: Implement the Learning Cycle

This phase introduces the `cypher learn` command, which is the mechanism for closing the feedback loop and making the system self-improving. This command facilitates the process of analyzing a completed task and updating the core knowledge archetypes.

### Task 3.1: Design the `cypher learn` Command

*   **Action:** Create a new command file `src/commands/learn.ts`.
*   **Core Logic:** The initial version of this command will, much like `plan`, be a dialogue catalyst. It will gather and present the relevant information to the Supervisor and Orchestrator so they can collaboratively decide how to update the system's knowledge.
    1.  Accept a `<task-id>` as a required argument.
    2.  Verify that the task has a `retrospective.md` file in its `cypher/cdd/<task-id>/` directory. If not, exit with an error.
    3.  Read the content of the `retrospective.md` file.
    4.  Read the content of the original `plan.md` for the same task.
    5.  Present a summary of the retrospective and the original plan to the user.
    6.  Generate a new prompt that guides the learning dialogue. This prompt will be hardcoded in the command for v1.
*   **Learning Dialogue Prompt (v1):**
    ```markdown
    # Learning Cycle Initiated for Task {{task.id}}

    ## Original Plan:
    {{plan_content}}

    ## Retrospective Summary:
    {{retrospective_content}}

    ## Learning & Integration Dialogue:

    Based on the retrospective, let's decide how to improve the system's core knowledge.

    1.  **Pattern Extraction:** Did we discover a reusable pattern or solution? If so, it should be documented in `cypher/patterns/`.
    2.  **Archetype Refinement:** Was the initial prompt effective? Should we update the archetype in `cypher/prompts/` to incorporate these learnings?
    3.  **Orchestrator Improvement:** Should the `orchestrator-planning.md` prompt be updated to include new heuristics?

    Please discuss and apply any necessary changes to the files in `cypher/prompts/` and `cypher/patterns/`.
    ```
*   **Acceptance Criteria:**
    *   Running `npx tsx src/cli.ts learn <some-id>` successfully prints the formatted prompt containing the plan and retrospective for the specified task.
    *   The command provides the necessary information to start a productive learning dialogue.

---

## Phase 4: Refactor and Align

With the core EKP workflow in place, this final phase ensures the rest of the system aligns with the new, dialogue-centric philosophy. The goal is to simplify, remove obsolete code, and ensure every command serves a clear purpose within the new framework.

### Task 4.1: Audit and Refactor Existing Commands

*   **Action:** Review every command in `src/commands/` to determine its role in the EKP.
*   **Guiding Principle:** Commands should either be simple, direct tools that an Orchestrator can use during a dialogue (e.g., `ls`, `cat`-like functionality) or catalysts for a specific dialogue (`plan`, `learn`). Any command with complex, automated logic should be questioned.
*   **Specific Reviews:**
    *   `list`, `show`: These are likely still useful as simple information-retrieval tools. Ensure their output is clean and easily consumable by an AI.
    *   `update`: Still necessary for making direct, supervised changes to `tasks.json`.
    *   `delegate`, `transmit`, `expand`, `research`: These commands contain logic that is now superseded by the dialogue-driven planning process. They should be deprecated or radically simplified. The functionality they provided (e.g., context generation) will now be handled dynamically by the Orchestrator during the `plan` dialogue.
*   **Acceptance Criteria:**
    *   A clear decision (keep, refactor, or deprecate) is made for every existing command.
    *   All remaining commands have a well-defined, minimal purpose that supports the EKP.

### Task 4.2: Update Core Documentation

*   **Action:** Update all user-facing and contributor-facing documentation to reflect the new EKP workflow.
*   **Files to Update:**
    *   `README.md`: The main project description and usage examples must be updated.
    *   `docs/cyper_docs/ONBOARDING.md`: The onboarding process for new contributors must be completely rewritten to focus on the dialogue-first approach.
    *   `CLAUDE.md` / `GEMINI.md`: The root-level directives for the primary AI personas must be aligned with the EKP.
*   **Acceptance Criteria:** All project documentation accurately reflects the new philosophy and workflows, ensuring a consistent understanding for all participants.
