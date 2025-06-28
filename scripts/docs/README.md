# Task Master Automation Scripts

## Overview

This directory contains standalone scripts that automate Task Master workflows using the Claude Code SDK. These scripts demonstrate a new paradigm: **AI-orchestrated tooling** - where Claude intelligently coordinates existing tools to accomplish complex workflows.

## CORE GUIDELINES

### 1. NO OVER-ENGINEERING
Apply what has been planned without adding unnecessary complexity. Build from the ground up, focusing on simplicity and clarity.

### 3. TRUST THE PLAN
Planning is an optimized process for implementation, not a reference document. Plans are immutable artifacts that guide implementation without being part of it.

### 3. PLANNING AS ARTIFACT
Planning serves to generate artifacts that add context, guidance, and structure for implementation. These artifacts are consumed by AI agents like Claude Code. Document for yourself, not for humans. 

### 4. AI-FIRST ARTIFACTS
All outputs are optimized for consumption by AI coding agents (Claude Code), not human developers. Optimized artifacts are structured to minimize token usage while maximizing implementation accuracy.

### 5. TOOL FOR AI AGENTS
These scripts are designed to be used by AI agents (like Claude Code) as tools for executing complex workflows. They provide the necessary context and structure for AI agents to operate effectively. AI Agents are smart but they need the right context, tools and directions to implement complex features.

### 6. AI-TO-AI ORCHESTRATION
These scripts are not traditional developer tools. They are designed for **AI-to-AI orchestration**, where Claude Code acts as the intelligent controller, executing complex workflows with minimal human intervention.

### 7. ORCHESTRATION TOOL
//translate
These scripts are orchestration tools, not documentation generators. They enable AI agents to implement complex features with minimal token usage and maximum accuracy. They create AI-optimized context that allows agents to execute tasks efficiently. A tool to create to create tools.

**Critical Insight**
The core guidelines are not just best practices - they are the foundation of a new paradigm in AI development.
They are interconnected and mutually reinforcing, each one deduced from the previous.

## Directory Structure

```
scripts/
├── docs/                         # All documentation
│   ├── README.md                # This file
│   ├── QUICKSTART.md           # Get started in 5 minutes
│   ├── ai-first-artifacts.md   # Core design principle
│   ├── conversion-roadmap.json # What to build next
│   └── conversion-lessons.md   # Problems & solutions
├── analyze-tasks.ts            # Generate task analysis reports
├── tep-analyze.ts             # Task Enrichment Protocol
└── template-workflow.ts.example # Template for new scripts
```

## Implemented Scripts

### 1. `analyze-tasks.ts` - Task Analysis Report
Generates AI-optimized markdown report of all project tasks.
```bash
npx tsx scripts/analyze-tasks.ts
```
**Output**: `task-analysis-report.md` - Structured for AI agent parsing

### 2. `tep-analyze.ts` - Task Enrichment Protocol  
Executes 5-phase analysis for complex tasks, generating AI-first planning artifacts.
```bash
npx tsx scripts/tep-analyze.ts <task-id>
```
**Output**: `.taskmaster/enriched/{taskId}-enriched.json` - Precision-engineered context for Claude Code

## Documentation Guide

### For New Contributors (LLMs or Humans)

1. **Start Here**: [QUICKSTART.md](./QUICKSTART.md) - Setup and first script in 5 minutes
2. **Core Principle**: [ai-first-artifacts.md](./ai-first-artifacts.md) - Understanding AI-to-AI design
3. **Understand Pattern**: Review existing scripts (`analyze-tasks.ts`, `tep-analyze.ts`)
4. **Check Roadmap**: [conversion-roadmap.json](./conversion-roadmap.json) - What to build next
5. **Learn from Mistakes**: [conversion-lessons.md](./conversion-lessons.md) - Common issues & solutions
6. **Use Template**: Copy `template-workflow.ts.example` for new scripts

### Core Documents

#### Project-Level Documentation
Located in `/docs/`:
- `tep-implementation-summary.md` - Technical summary of TEP implementation
- `taskmaster-to-claude-sdk-meta-analysis.md` - Conversion pattern analysis

#### Script-Level Documentation  
Located in `/scripts/docs/`:
- This README - Overview and navigation
- QUICKSTART.md - Immediate productivity
- **ai-first-artifacts.md - Core design principle (MUST READ)**
- conversion-roadmap.json - Development priorities
- conversion-lessons.md - Practical wisdom

## Key Concepts

### What Makes a Good Conversion Candidate?
1. Multi-step workflow requiring coordination
2. Variable outputs needing intelligent handling
3. Research or analysis components
4. **Generates AI-optimized artifacts** (JSON/Markdown for LLM consumption)
5. Artifacts: precision-engineered context that enables AI agents to implement complex features with minimal token usage and maximum accuracy.

### What to Avoid Converting?
1. Simple CRUD operations
2. Deterministic transformations
3. Performance-critical operations
4. Single-command executions

### AI-First Artifact Design Principles

1. **Token Efficiency**: Minimize redundancy while preserving essential context
2. **Structured for Parsing**: Clear sections, consistent formatting
3. **Action-Oriented**: Focus on what to implement, not why
4. **Self-Contained**: Each artifact has all context needed for implementation
5. **Machine-Readable**: JSON for data, Markdown with clear headers for reports

## Technical Stack

- **Claude Code SDK**: `@anthropic-ai/claude-code`
- **Language**: TypeScript
- **Runtime**: Node.js via tsx
- **Tools**: Bash, filesystem, Context7 MCP

## Design Principles

1. **One Script, One Workflow**: Each script has a single, clear purpose
2. **No Shared State**: Scripts are independent and stateless
3. **Minimal Code**: Target <200 lines per script
4. **Intelligent Orchestration**: Let Claude handle complexity
5. **Persistent Artifacts**: Generate files, not ephemeral output

## Quick Examples

### Creating a New Workflow Script
```bash
# 1. Copy template
cp scripts/template-workflow.ts.example scripts/my-workflow.ts

# 2. Edit the prompt and options
# 3. Run it
npx tsx scripts/my-workflow.ts
```

### Understanding Existing Scripts
```bash
# See what analyze-tasks does
head -50 scripts/analyze-tasks.ts

# See what it produces
cat task-analysis-report.md
```

## Contributing New Scripts

1. **Read First**: [ai-first-artifacts.md](./docs/ai-first-artifacts.md) - Understand the core principle
2. Check `conversion-roadmap.json` for high-value AI-to-AI targets
3. Use `template-workflow.ts.example` as starting point
4. Keep it simple - one workflow, one file
5. Generate AI-optimized artifacts (token-efficient JSON/Markdown)
6. Test artifacts with Claude Code before committing
7. Document any new lessons learned

## Future Vision

These scripts represent a shift from traditional programming to AI-orchestrated automation. As Claude's capabilities grow, these workflows can become increasingly sophisticated while remaining simple to implement and maintain.

## The AI-to-AI Pipeline

This project implements a complete AI orchestration pipeline:

```
Human Request → Claude (Orchestrator) → Task Master → Artifacts → Claude Code (Implementer)
```

### Why This Matters

1. **Context Optimization**: Artifacts are structured to minimize tokens while maximizing implementation accuracy
2. **Deterministic Planning**: AI generates consistent, reviewable plans before any code is written  
3. **Scalable Complexity**: Complex multi-phase implementations become manageable through structured artifacts
4. **Cost Efficiency**: Optimized artifacts reduce API costs for implementation agents

### Example Flow

```bash
# Human: "I need to implement the data models for my PKM app"

# 1. Claude Orchestrator generates planning artifact
npx tsx scripts/tep-analyze.ts 2

# 2. Artifact optimized for Claude Code consumption
cat .taskmaster/enriched/2-enriched.json

# 3. Claude Code implements using the artifact
# (Future: auto-implement.ts that feeds artifact to Claude Code)
```

The artifacts aren't documentation - they're **precision-engineered context** for AI agents.

---

*For immediate hands-on experience, proceed to [QUICKSTART.md](./QUICKSTART.md)*