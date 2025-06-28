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

## Key Design Decisions

1. **AI as a Service**: AI capabilities are optional - core task management works without AI
2. **Provider Abstraction**: AI logic is abstracted behind interfaces for future flexibility
3. **Local-First**: All data stored locally in `.cypher/`, no cloud dependencies for core features