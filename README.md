# Cypher: An AI-to-AI Orchestration Framework

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![npm version](https://img.shields.io/npm/v/cypher-ai.svg?style=flat)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

**Cypher is a development tool that bridges human intent and AI implementation. It provides an AI-first framework for orchestrating complex software development tasks, built by AI, for AI.**

---

## The Vision: Welcome to the Construct

In today's development landscape, AI agents are powerful but lack optimal context. Existing tools are built for humans, and forcing AIs to adapt to them is inefficient and fragile.

**Cypher flips the script.**

Instead of orchestrating external tools, we build our own composable, AI-native logic. Cypher is a portable command-line tool that installs a complete, AI-first development philosophy into any project. It doesn't just manage tasks; it **engineers the perfect context** for an AI agent to implement them.

## The Philosophy: The 5 Core Principles

Cypher is built on an immutable set of principles, ensuring every part of the system serves the AI-first vision.

1.  **Build, Don't Wrap:** We create our own logic from the ground up. No fragile dependencies on external CLIs.
2.  **Own Your Data:** The project's tasks and state (`.cypher/tasks.json`) are a transparent source of truth, managed exclusively by our own internal engine.
3.  **Compose, Don't Orchestrate:** We build complex workflows by composing simple, internal functions, not by orchestrating brittle external commands.
4.  **AI-First From Ground Up:** Every artifact, data structure, and output is optimized for an AI agent's consumption, prioritizing token efficiency and structural clarity.
5.  **Planning as Artifact:** Planning is a "compilation" step that produces precise, actionable specifications for the implementation phase.

## Key Features

-   **AI-Native Context Generation:** The `preflight` command generates ultra-efficient, structured context to maximize an AI agent's implementation accuracy.
-   **Portable Framework:** Install Cypher into any new or existing project with a single `init` command.
-   **Composable & Internal Logic:** A robust internal `TaskEngine` provides a stable, testable foundation, free from external dependencies.
-   **Thematic & Intuitive CLI:** A clear command structure (`decode`, `transmit`, `update`) makes interaction predictable and powerful.
-   **Self-Hosted Task Management:** The entire development of Cypher is managed by Cypher itself, using the `.cypher/tasks.json` file.

## Installation (Future)

```bash
npm install -g cypher-ai
```

## Quick Start: A Typical Workflow

1.  **Initialize Cypher in your project:**
    ```bash
    cypher init
    ```
    *(This creates the `.cypher/` directory with foundational templates.)*

2.  **Define your high-level tasks in `.cypher/tasks.json` or use a future `generate` command.**

3.  **List your current tasks:**
    ```bash
    cypher decode tasks
    ```

4.  **Generate the perfect context for your AI agent to start work:**
    ```bash
    cypher transmit 1.1
    ```
    *(This creates a highly-optimized context artifact for task 1.1.)*.

5.  **Feed the generated context to your implementation agent (e.g., Claude, Gemini).**

6.  **Once the task is complete, update its status:**
    ```bash
    cypher update 1.1 done
    ```

## Command Reference

-   `cypher init`: Initializes the Cypher framework in the current directory.
-   `cypher decode tasks`: Lists all tasks.
-   `cypher decode <task-id>`: Shows the details of a specific task.
-   `cypher transmit <task-id>`: Generates the pre-flight context artifact for a task.
-   `cypher update <task-id> <status>`: Updates the status of a task.

## Project Roadmap

Cypher is being built in clearly defined phases:

-   [x] **Phase -1: Planning & Vision:** Define the philosophy and create planning artifacts.
-   [ ] **Phase 0: The Core Engine:** Implement the internal `TaskEngine`.
-   [ ] **Phase 1: Core Commands:** Build the `init`, `decode`, `transmit`, and `update` commands.
-   [ ] **Phase 2: Complex Workflows:** Implement intelligent commands for task generation and expansion (e.g., `setup-project`).
-   [ ] **Phase 3: Packaging & Distribution:** Package Cypher as a public npm tool.

## Contributing

Contributions are welcome! Please read the `MANIFESTO.md` in the `.cypher/` directory to understand the core philosophy before contributing.

## License

This project is licensed under the MIT License.
