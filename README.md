<div align="center">

# 🔐 Cypher

### Bridging Human Intent and AI Implementation

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://img.shields.io/npm/v/cypher-ai.svg?style=flat)](https://www.npmjs.com/package/cypher-ai)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Node.js Version](https://img.shields.io/node/v/cypher-ai.svg)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3+-blue.svg)](https://www.typescriptlang.org/)

**Cypher is an AI-native development orchestration tool that transforms human requirements into precision-engineered contexts for AI implementation.**

[Features](#-features) • [Installation](#-installation) • [Quick Start](#-quick-start) • [Documentation](#-documentation) • [Contributing](#-contributing)

</div>

---

## 🎯 Why Cypher?

Traditional task management tools are built for humans. When AI agents use them, they're forced to adapt to human-centric interfaces, creating inefficiency and fragility.

**Cypher has evolved beyond automation:**

- 🧑‍🏫 **Commands as Teachers** - Each command guides your process, not replaces it
- 🤖 **Built BY AI, FOR AI** - Every decision optimizes for AI collaboration
- 📦 **Zero External Dependencies** - No brittle CLI wrappers, pure TypeScript
- ⚡ **90% Token Reduction** - Pre-flight contexts use ~500 tokens vs ~5000
- 🔄 **Self-Hosted Development** - Cypher manages its own development using itself
- 📚 **Evolving Knowledge** - The system gets wiser with every use

> "Unfortunately, no one can be told what Cypher is. You have to see it for yourself."

## 🌟 The Philosophy: Commands as Teachers

Cypher commands don't execute tasks - they teach you to execute them better. Each command is a guide that facilitates human-AI collaboration, not automation.

### Process Commands (Interactive Guides)
- **`cypher plan`** - Guides collaborative planning with cognitive strategies
- **`cypher context`** - Teaches effective context construction
- **`cypher learn`** - Facilitates knowledge extraction and pattern discovery
- **`cypher validate`** - Guides comprehensive validation processes
- **`cypher explore`** - Assists open-ended research and discovery

### Information Commands (Simple Queries)
- **`cypher list`** - Lists tasks with filters
- **`cypher show`** - Displays task details
- **`cypher update`** - Updates task status
- **`cypher next`** - Shows next pending task

### AI-Native Architecture
```
cypher/
├── prompts/           # Archetype guides (system intelligence)
│   ├── planning-guide.md
│   ├── context-guide.md
│   └── learning-guide.md
├── patterns/          # Discovered patterns
├── knowledge/         # Accumulated wisdom
└── cdd/              # Collaborative dialogue artifacts
    └── <task-id>/
        ├── plan.md
        ├── context.md
        └── retrospective.md
```

## 🧠 Powered by AI

Cypher itself is AI-powered, using Claude Code SDK (@anthropic-ai/claude-code) internally to provide intelligent orchestration:

- **Task Generation**: Transforms PRDs into structured tasks using AI
- **Smart Expansion**: Breaks complex tasks into subtasks with AI analysis
- **Context Optimization**: Uses AI to generate the most efficient pre-flight contexts

This creates a unique **AI-to-AI pipeline**: Cypher (powered by Claude) generates perfect contexts for other AI agents (Claude, GPT, Gemini) to implement.

## 📦 Installation

### Prerequisites
- Node.js >= 18.0.0
- npm or yarn

### Install (Coming Soon)
```bash
npm install -g cypher-ai
```

### Development Installation
```bash
git clone https://github.com/adrirobg/cypher-ai.git
cd cypher-ai
npm install
npm run build
npm link
```

## 🚀 Quick Start

👉 **New to Cypher?** Check out our [interactive tutorial](docs/tutorial/FIRST_TASK_EKP.md) for a complete walkthrough of the Commands as Teachers philosophy.

### 1. Initialize Cypher in Your Project
```bash
cypher init
```
This creates:
```
your-project/
└── cypher/
    ├── manifest.md      # Core philosophy
    ├── tasks.json       # Task database
    └── interfaces.ts    # Type definitions
```

### 2. Define Your Tasks
Edit `cypher/tasks.json`:
```json
{
  "id": "1",
  "title": "Implement authentication system",
  "description": "JWT-based auth with refresh tokens",
  "status": "pending",
  "subtasks": [
    {
      "id": "1.1",
      "title": "Create user model",
      "status": "pending"
    }
  ]
}
```

### 3. Plan with AI Guidance
```bash
cypher plan 1.1
```
Engages an interactive planning dialogue with your AI orchestrator.

### 4. Build Context Collaboratively
```bash
cypher context 1.1
```
Guides you through effective context construction for the task.

### 5. Execute with Your Tools
Use your preferred editor, terminal, and development tools. Cypher guides the process but you maintain control.

### 6. Extract Knowledge
```bash
cypher learn 1.1
```
Facilitates pattern extraction and system evolution from completed work.

## 📖 Documentation

### Command Reference

| Command | Type | Description | Example |
|---------|------|-------------|---------|
| `cypher init` | Setup | Initialize Cypher in current directory | `cypher init` |
| **Process Commands** | | | |
| `cypher plan <id>` | Guide | Interactive planning dialogue | `cypher plan 1.2` |
| `cypher context <id>` | Guide | Context construction assistance | `cypher context 1.2` |
| `cypher learn <id>` | Guide | Knowledge extraction facilitation | `cypher learn 1.2` |
| `cypher validate <id>` | Guide | Comprehensive validation guidance | `cypher validate 1.2` |
| `cypher explore <topic>` | Guide | Research and discovery assistance | `cypher explore auth` |
| **Information Commands** | | | |
| `cypher list` | Query | List tasks with filters | `cypher list --status=pending` |
| `cypher show <id>` | Query | Display task details | `cypher show 1.2` |
| `cypher update <id> <field>=<value>` | Action | Update task fields | `cypher update 1.2 status=done` |
| `cypher next` | Query | Show next pending task | `cypher next` |

### Core Philosophy

Cypher is built on 6 immutable principles:

1. **Commands as Teachers** - Guide processes, don't automate them
2. **Build, Don't Wrap** - Own the implementation, no external CLI dependencies
3. **Own Your Data** - Complete control over task data structure
4. **Compose, Don't Orchestrate** - Internal function composition over process spawning
5. **AI-First From Ground Up** - Every byte optimized for AI collaboration
6. **Knowledge Evolution** - The system learns and improves with every use

## 🛠️ Development

### Project Structure
```
cypher/
├── src/
│   ├── core/          # TaskEngine - data layer
│   ├── commands/      # CLI command implementations
│   └── templates/     # Init templates
├── cypher/           # Self-hosted development
│   └── tasks.json     # Cypher's own tasks
|── docs/             # Documentation
    cypher_docs/
    task_master_docs/
    claude_code_sdk_docs/    

└── package.json
```

### Building from Source
```bash
npm install
npm run build
npm test
```

### Running in Development
```bash
npm run dev -- list
```

## 🗺️ Roadmap

- [x] **Phase 0:** Planning & Architecture
- [x] **Phase 1:** Core TaskEngine & Basic Commands
- [x] **Phase 2:** EKP v1 - External Knowledge Protocol
- [x] **Phase 3:** Commands as Teachers Migration
- [ ] **Phase 4:** Documentation & Polish (Current)
- [ ] **Phase 5:** npm Package & Distribution
- [ ] **Phase 6:** Community Patterns & Evolution



## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

<div align="center">

**Built with 🤖 by AI, for AI**

*"Welcome to the real world."*

</div>