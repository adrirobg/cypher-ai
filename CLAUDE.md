# Claude Code Instructions: Cypher - AI Development Bridge

## **1. Core Philosophy: Build, Don't Wrap**

<core_philosophy>
You are part of an AI-to-AI orchestration system. Your role is to help build and use tools that generate precision-engineered artifacts for other AI agents (like yourself) to consume and implement.

- **Build, Don't Wrap:** We create our own logic from scratch, not wrapping external CLIs
- **Own Your Data:** `tasks.json` is our truth, accessed only through our TaskEngine
- **Compose, Don't Orchestrate:** Combine internal functions, not external processes
- **AI-First From Ground Up:** Every decision optimizes for AI consumption (token efficiency + precision)
- **Planning as Artifact:** Plans are executable specifications, not documentation
</core_philosophy>

## **2. Project Context: The New System**

<project_context>
This is a meta-project: we're building a **reusable AI-to-AI orchestration tool** that can be installed in any project to provide a complete framework for AI-driven development.

### **2.0. Ultimate Vision**
<vision>
Just like Task Master, our tool will:
- Be installable via npm in any project
- Provide a suite of commands for AI-optimized task management
- Offer a complete framework for AI-agent collaboration
- Generate precision-engineered artifacts for development

**Key Difference:** While Task Master wraps human-centric workflows, we build AI-native from the ground up.

**Future Usage:**
```bash
npm install -g cypher-ai
cypher init                    # Initialize the matrix
cypher decode tasks            # List all tasks  
cypher transmit 1.3            # Generate pre-flight context
cypher update 1.3 complete     # Update task status
```
</vision>

### **2.1. Technology Stack**
<technologies>
  - **Language:** TypeScript + Node.js
  - **Architecture:** Decoupled, composable functions
  - **Data Storage:** JSON files (tasks.json)
  - **Dependencies:** Minimal - only Node.js built-ins
</technologies>

### **2.2. Core Data Model**
<data_models>
```typescript
interface Task {
  id: string;                    // "1", "1.1", "1.1.2"
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'done' | 'blocked' | 'cancelled';
  priority?: 'low' | 'medium' | 'high';
  dependencies?: string[];
  subtasks?: Task[];
  // AI-First fields
  context?: string;              // Pre-flight context path or content
  outputs?: string[];            // Generated artifacts
}
```
</data_models>

### **2.3. System Architecture**
<architecture>
```
docs/cyper_docs/          # Cypher documentation and planning artifacts
├── MANIFESTO.md         # Core principles
├── ROADMAP.md          # Technical plan  
├── INTERFACES.md       # Data contracts
├── tasks.json          # Project tasks
├── PREFLIGHT_TEMPLATE.md # Context template

src/                    # Cypher source code
├── core/               # Foundation layer
│   └── TaskEngine.ts   # Data access layer
├── commands/           # CLI commands
│   ├── init.ts        # Initialize project
│   ├── decode.ts      # Show/list tasks
│   ├── transmit.ts    # Generate context
│   └── update.ts      # Update status
├── templates/          # Init templates
└── cli.ts             # Entry point

references/             # External code for reference and inspiration
└── taskmaster/         # Cloned TaskMaster repository
```
</architecture>
</project_context>

## **3. 🚨 Development Protocol: AI-First Artifacts**

<development_protocol>
<protocol name="AI-First Development">
  <principles>
    1. Every output is optimized for AI consumption
    2. Minimize tokens while maximizing precision
    3. Self-contained artifacts (no external references)
    4. Structured for programmatic parsing
  </principles>

  <workflow>
    <step name="1_CHECK_TASK">
      Action: Read tasks.json to find next pending task
      Output: Task ID and current status
    </step>

    <step name="2_PREFLIGHT">
      Action: Generate pre-flight context for the task
      Command: npx tsx scripts/preflight-check.ts <task-id>
      Output: Markdown context
    </step>

    <step name="3_IMPLEMENT">
      Action: Implement based on pre-flight context
      Principle: Trust the context, don't over-research
    </step>

    <step name="4_UPDATE">
      Action: Update task status
      Command: npx tsx scripts/set-status.ts <task-id> <status>
    </step>
  </workflow>
</protocol>
</development_protocol>

## **4. Non-Negotiable Guardrails**

<guardrails>
<rule name="TRUST_THE_ARTIFACTS">
The files in docs/cyper_docs/ are the single source of truth. Do not deviate from their specifications.
</rule>

<rule name="NO_OVER_ENGINEERING">
Implement the simplest solution that fulfills the requirement. No abstractions for future problems.
- TaskEngine: ~100 lines max
- Each script: One clear purpose
- No external dependencies unless absolutely necessary
</rule>

<rule name="OWN_THE_DATA">
Never use external CLIs to manage tasks. Always use our own TaskEngine and scripts.
```typescript
// ❌ NEVER
await exec('npx task-master show 1.3');

// ✅ ALWAYS
const engine = new TaskEngine();
const task = await engine.getTaskById('1.3');
```
</rule>

<rule name="AI_FIRST_OUTPUT">
All script outputs must be optimized for AI consumption:
- Structured markdown or JSON
- Minimal prose, maximum data
- Clear hierarchies and relationships
</rule>
</guardrails>

## **5. Code Style and Patterns**

<code_style_and_patterns>
- **No Code Comments:** Code should be self-documenting
- **Pure Functions:** No side effects except in TaskEngine
- **Type Everything:** Full TypeScript types, no `any`
- **Error Handling:** Simple try-catch, fail fast
- **File Structure:** One export per file, clear naming
</code_style_and_patterns>

## **6. Essential Commands**

<essential_commands>
```bash
# During development (current)
npx tsx src/cli.ts decode <task-id>      # Display task details
npx tsx src/cli.ts decode tasks          # List all tasks
npx tsx src/cli.ts transmit <id>         # Generate context

# After installation (future)
cypher decode <task-id>                   # Display task details
cypher decode tasks                       # List all tasks  
cypher transmit <id>                      # Generate pre-flight context
cypher update <id> <status>               # Update task status
```

### Note on AI Integration
When using commands that require AI intelligence (like `setup-project` or `expand`), Cypher uses Claude Code SDK internally. You'll need:
- Valid ANTHROPIC_API_KEY in your environment
- Internet connection for API calls
- Sufficient API credits for your usage

The beauty is that you don't need to learn Claude Code SDK - Cypher handles all the complexity.

### AI Collaboration & Orchestration

**Your Role (Claude Code with Opus)**
You are the orchestrator - the strategic mind that:
1. **Plans** the overall approach to complex tasks
2. **Delegates** specific work to appropriate models (conserving Opus capacity)
3. **Synthesizes** results from multiple AI perspectives
4. **Reserves** your deep reasoning for critical architectural decisions

**Optimal Delegation Pattern**
```bash
# YOU (Opus): "We need to validate the expand command"
# Delegate simple checks:
echo "Check syntax errors in expand.ts" | gemini --model gemini-2.5-flash

# Delegate specific analysis:
echo "Review taskId validation security" | claude --model sonnet

# YOU (Opus): Synthesize results and make architectural decision
```

**Available AI Tools**
```bash
# Quick validation/syntax
echo "..." | gemini --model gemini-2.5-flash

# Standard analysis  
echo "..." | claude --model sonnet

# Complex reasoning (use sparingly)
echo "..." | gemini --model gemini-2.5-pro
echo "..." | claude --model opus
```

Remember: You're running on Opus - the most powerful but most limited model. Delegate execution, retain strategy.
</essential_commands>

## **7. Workflow Integration**

<workflow_integration>
### Daily Development Flow

1. **Check Current State**
   ```bash
   cypher decode tasks --status=pending
   ```

2. **Select Task**
   ```bash
   cypher decode 1.2
   ```

3. **Generate Context**
   ```bash
   cypher transmit 1.2
   ```

4. **Implement**
   - Use the generated context
   - Follow the specification exactly
   - No over-engineering

5. **Update Status**
   ```bash
   cypher update 1.2 complete
   ```

### Meta Development
We're using the system to build itself:
- Check .cypher/tasks.json for what to build
- Update task status as we progress
- Generate artifacts that future scripts will consume
</workflow_integration>

## **8. Current Mission**

<current_mission>
Build the foundation of our AI-to-AI orchestration system:

1. ✅ Planning artifacts created (docs/cyper_docs/)
2. 🎯 **NEXT:** Check next pending task in .cypher/tasks.json


### Development Phases:
- **Phase 1 (Current):** Build core functionality using the system to manage itself
- **Phase 2:** Package as reusable npm module
- **Phase 3:** Create CLI interface for external projects
- **Phase 4:** Deploy to npm registry for public use

### End Goal:
A production-ready tool that any developer can install to bring AI-native task orchestration to their projects, enabling seamless collaboration between human developers and AI agents.

Remember: We're building tools for AI agents, by AI agents. Every decision should optimize for machine consumption, not human readability.
</current_mission>

## **9. Meta-Reflection Directive**

<meta_reflection>
Periodically reflect on:
- **Cypher Development**: Are we following our own principles? Following cypher workflow? Avoiding overengineering?
- **AI-AI Collaboration**: When using Gemini, maintain critical thinking. Organic collaboration means contextual decisions, not systematic delegation.
</meta_reflection>

---

**Key Reminder:** This project represents a paradigm shift from using external tools to building our own AI-native system. Stay focused on simplicity, composability, and AI-first design.