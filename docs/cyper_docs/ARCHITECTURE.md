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

The EKP introduces a dynamic layer of intelligence by leveraging structured knowledge artifacts within the `cypher/` directory. This architecture facilitates a collaborative dialogue between the user and the AI, guided by evolving patterns and prompts.

### Key EKP Components:

- **`cypher/prompts/`**: Contains archetypal markdown guides for various AI roles and commands (e.g., `plan-guide.md`, `learn-guide.md`). These are the "teachers" that instruct the AI on how to approach specific tasks or dialogues. Commands like `plan`, `context`, `learn`, and `validate` read these guides to structure their interactions.
- **`cypher/patterns/`**: A repository of proven solutions, architectural patterns, and strategic guides extracted from successful tasks. These patterns represent consolidated wisdom that can be referenced by AI agents during planning and execution.
- **Guide Commands (`plan`, `context`, `learn`, `validate`, etc.)**: These CLI commands are designed to initiate and facilitate specific dialogues. Instead of directly executing complex logic, they present the AI with a relevant guide from `cypher/prompts/`, enabling a collaborative, iterative process.

### EKP Data Flow:

```
User Input → CLI Parser → Guide Command (e.g., plan)
                                ↓
                      Reads Guide from cypher/prompts/
                                ↓
                      AI Dialogue (User ↔ AI)
                                ↓
                      AI references cypher/patterns/ (for wisdom)
                                ↓
                      TaskEngine ↔ tasks.json (updates task state)
                                ↓
                      AI-Optimized Output / New Artifacts in cypher/cdd/
```

## Key Design Decisions

1. **AI as a Service**: AI capabilities are optional - core task management works without AI
2. **Provider Abstraction**: AI logic is abstracted behind interfaces for future flexibility
3. **Local-First**: All data stored locally in `cypher/`, no cloud dependencies for core features