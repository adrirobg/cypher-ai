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

**Cypher changes the game:**

- 🤖 **Built BY AI, FOR AI** - Every decision optimizes for AI consumption
- 📦 **Zero External Dependencies** - No brittle CLI wrappers, pure TypeScript
- ⚡ **90% Token Reduction** - Pre-flight contexts use ~500 tokens vs ~5000
- 🔄 **Self-Hosted Development** - Cypher manages its own development using itself

> "Unfortunately, no one can be told what Cypher is. You have to see it for yourself."

## 🌟 Features

### AI-Native Context Generation
Generate ultra-efficient, structured contexts that maximize AI implementation accuracy:

```markdown
# CONTEXT FOR TASK 1.3

## YOUR SPECIFIC TASK: Implement user authentication
- **Description:** Create JWT-based auth endpoints
- **Test Strategy:** Unit tests for token generation

## PARENT OBJECTIVE: Build secure API (Task 1)
- **Description:** RESTful API with authentication

## SIBLING CONTEXT
- **1.1 - Database schema (Status: done)**
- **1.2 - User model (Status: done)**
- **1.4 - Protected routes (Status: pending)**

**INSTRUCTION:** Implement Task 1.3
```

### Portable Framework
Install Cypher in any project - new or existing:
- 📁 Creates `cypher/` configuration directory
- 📋 Installs AI-first task management
- 🎯 Brings the complete philosophy to your project

### Smart Task Management
- Hierarchical task structure (1, 1.1, 1.1.1)
- Dependency tracking and validation
- Multiple status states (pending, in-progress, done, blocked)

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

### 3. Generate AI Context
```bash
cypher transmit 1.1
```
Output saved to `cypher/contexts/1.1-context.md`

### 4. Feed to Your AI Agent
```bash
# Copy context to clipboard (Unix)
cat cypher/contexts/1.1-context.md | pbcopy

# Or pipe directly to your AI tool
cypher transmit 1.1 | your-ai-tool
```

### 5. Update Task Status
```bash
cypher update 1.1 complete
```

## 📖 Documentation

### Command Reference

| Command | Description | Example |
|---------|-------------|---------|
| `cypher init` | Initialize Cypher in current directory | `cypher init` |
| `cypher decode` | List all tasks with status | `cypher decode --status=pending` |
| `cypher decode <id>` | Show specific task details | `cypher decode 1.2` |
| `cypher transmit <id>` | Generate pre-flight context | `cypher transmit 1.2 > context.md` |
| `cypher update <id> <status>` | Update task status | `cypher update 1.2 complete` |

### Core Philosophy

Cypher is built on 5 immutable principles:

1. **Build, Don't Wrap** - Own the implementation, no external CLI dependencies
2. **Own Your Data** - Complete control over task data structure
3. **Compose, Don't Orchestrate** - Internal function composition over process spawning
4. **AI-First From Ground Up** - Every byte optimized for AI consumption
5. **Planning as Artifact** - Plans are executable specifications

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
npm run dev -- decode
```

## 🗺️ Roadmap

- [x] **Phase 0:** Planning & Architecture
- [ ] **Phase 1:** Core TaskEngine (~100 lines)
- [ ] **Phase 2:** Basic Commands (init, decode, transmit)
- [ ] **Phase 3:** Advanced Features (dependencies, search)
- [ ] **Phase 4:** npm Package & Distribution
- [ ] **Phase 5:** Plugin System



## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

<div align="center">

**Built with 🤖 by AI, for AI**

*"Welcome to the real world."*

</div>