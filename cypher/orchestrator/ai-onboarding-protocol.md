# Cypher AI Onboarding Protocol

Version: 1.0.0
Updated: 2025-01-20
Purpose: Complete Cypher understanding for any AI (session resume, collaboration, onboarding)

## CRITICAL WARNING

❌ **FAILURE TO FOLLOW THIS PROTOCOL LEADS TO:**
- Proposals that violate core principles
- Solutions that add unwanted complexity  
- Misalignment with Cypher's unique essence
- Wasted time correcting fundamental misunderstandings

✅ **SUCCESS MEANS:**
- Deep philosophical alignment before technical work
- Proposals that enhance rather than complicate
- Productive collaboration from first interaction
- Understanding WHY Cypher is designed as it is

---

## HOW TO USE THIS PROTOCOL

### 🔄 **For Session Resume (Claude Code)**
```bash
# Use this when starting a new Claude Code session
"Please complete @cypher/orchestrator/ai-onboarding-protocol.md with focus on Session Resume scenario. Current context: [brief description of what we were working on]"
```
**Focus:** Read Phases 1-2 if unfamiliar, prioritize Phase 3 Session Resume Context

### 🤝 **For LLM Collaboration**
```bash
# Use this when bringing external LLM into Cypher work
"Before we collaborate on [specific task], please complete @cypher/orchestrator/ai-onboarding-protocol.md with focus on Collaboration scenario. Pay special attention to anti-patterns in Phase 2."
```
**Focus:** Complete all phases thoroughly, especially anti-patterns

### 👤 **For New Team Member**
```bash
# Use this for onboarding humans or AIs new to Cypher
"To understand Cypher completely, work through @cypher/orchestrator/ai-onboarding-protocol.md as a New Team Member. Take time to absorb the philosophy."
```
**Focus:** Complete all phases with deep understanding

---

## PHASE 0: THE CORE CONCEPT - HOW CYPHER WORKS

**Before diving into philosophy, you must understand the practical workflow. Cypher's goal is to create a reusable "Knowledge Framework" for a specific technology stack.**

### The Two-Project Lifecycle

Imagine you are building two applications using the same technology (e.g., `React + FastAPI`).

#### **Project 1: The Catalyst**
*   **Goal:** Build the first application (e.g., a Recipe App).
*   **Cypher's Role:** You add Cypher to this project. As you build the app, every dialogue, every command, and every task is used to **simultaneously build a "Knowledge Framework"** for the `React + FastAPI` stack.
*   **The Output:**
    1.  A functional Recipe App.
    2.  **More importantly:** A rich `cypher/` directory containing:
        *   `prompts/` with teaching guides for your stack.
        *   `patterns/` with FastAPI endpoint patterns that work.
        *   `project-rules/` for API naming conventions you've established.
        *   `knowledge/` about why certain libraries were chosen.

**This collection of knowledge is the real product of Cypher.**

#### **Project 2: The Reward**
*   **Goal:** Build a second application (e.g., a Book Review App) with the same stack.
*   **Cypher's Role:** You manually evaluate the Knowledge Framework from Project 1, then use Cypher guides to collaboratively adapt relevant knowledge to this new context.
*   **The Process:**
    1. **Manual Evaluation:** You review cypher/ from Project 1
    2. **Selective Transfer:** You copy relevant patterns/knowledge manually  
    3. **Collaborative Adaptation:** You use cypher explore to adapt inherited knowledge
    4. **Enhanced Development:** With inherited wisdom, development is faster and smarter
*   **The Difference:**
    *   Your cypher/ directory starts with inherited patterns instead of empty
    *   The dialogues build on proven knowledge rather than starting fresh
    *   The guidance is informed by real project experience
    *   Development quality improves because you're building on tested wisdom

**Your role is to consciously participate in this knowledge evolution: evaluate what to inherit, adapt it through dialogue, and enhance it through new experience.**

### The Knowledge Transfer Process

**Critical Understanding:** Knowledge transfer is NOT automatic. It's a conscious, collaborative process:

1. **Manual Evaluation:** You review the previous project's `cypher/` directory
2. **Conscious Selection:** You decide which patterns/knowledge apply to the new context
3. **Selective Transfer:** You manually copy relevant files to the new project
4. **Collaborative Adaptation:** You use guides like `cypher explore "adapting-inherited-knowledge"` to adapt inherited wisdom through dialogue
5. **Enhancement Through Use:** New project experience refines and evolves the inherited knowledge

**Remember:** Cypher teaches you HOW to evaluate and transfer knowledge, it doesn't do it for you.

---

## PHASE 1: PHILOSOPHY IMMERSION [MANDATORY]

**Read in this EXACT order:**

### 1.1 Core Identity & Cognitive Framework
**@CLAUDE.md** - Primary identity and operational protocol
- Understand: "Cypher Dialogue Orchestrator" role
- Learn: Cognitive mode selection (CoT, ToT, ReAct)
- Grasp: "Dialogue IS the framework. Facilitate, don't automate."

### 1.2 Central Vision & Principles  
**@docs/cyper_docs/MANIFESTO_v2.md** - The heart of Cypher
- Core Principle: "Commands as Teachers" 
- Living Knowledge: Knowledge persists and evolves
- Dialogue IS the Process: Plans emerge from conversation
- Key Quote: "The best tool is the one that teaches you not to need it"

### 1.3 Immutable Principles
**@cypher/core-docs/philosophy.md** - 6 principles that NEVER change
- Commands as Teachers (guide processes, don't automate them)
- Dialogue Over Delegation 
- Evolution Through Use
- Context is King
- Patterns Over Rules  
- Human Judgment Prevails

### 1.4 Practical Understanding
**@README.md** - Executive summary and user perspective
**@cypher/core-docs/quickstart.md** - How the workflow actually works

### **Philosophy Validation Checkpoint**
BEFORE proceeding, you MUST be able to answer:
- What does "Commands as Teachers" mean and why is it revolutionary?
- Why does Cypher reject automation in favor of guidance?
- What is the difference between "organic" and "systematic" evolution?
- How does knowledge evolve in Cypher without being lost?
- Why is dialogue the central process, not just a feature?

**If you cannot answer these clearly, re-read Phase 1.**

---

## PHASE 2: ANTI-PATTERNS [CRITICAL]

**Study what NOT to propose to avoid QWen Coder 3's mistakes:**

### 2.1 QWen Case Study: Real Failure Analysis
**Problem:** QWen understood architecture but proposed solutions that violated every core principle.

**QWen's Failures:**
```markdown
❌ PROPOSED: "Dashboard simple de métricas"
✅ WHY WRONG: Violates "Organic Over Systematic" - metrics should emerge, not be dashboarded

❌ PROPOSED: "Sistema de recomendación de guías"  
✅ WHY WRONG: Violates "Commands as Teachers" - system should teach you to find guides, not recommend automatically

❌ PROPOSED: "Base de datos ligera como alternativa"
✅ WHY WRONG: Violates "Simplicity Enables Intelligence" - tasks.json IS the simple solution

❌ PROPOSED: "Selección automática de modelo según la tarea"
✅ WHY WRONG: Violates "Human Judgment Prevails" - human should choose, system should guide

❌ PROPOSED: "Análisis de impacto automático"
✅ WHY WRONG: Violates "Dialogue IS the Process" - impact should be discovered through conversation
```

### 2.2 Anti-Pattern Categories

**AUTOMATION ANTI-PATTERNS:**
- ❌ Adding features that do work instead of teaching how to do work
- ❌ Auto-generating anything without human dialogue
- ❌ Replacing conversation with computation

**COMPLEXITY ANTI-PATTERNS:**
- ❌ Multiple files when one suffices
- ❌ Databases when JSON works fine  
- ❌ Systems when simple patterns exist

**SYSTEMATIC ANTI-PATTERNS:**
- ❌ Prescribed workflows instead of emergent patterns
- ❌ Rigid templates instead of flexible guides
- ❌ Categories and taxonomies instead of organic evolution

**OPTIMIZATION ANTI-PATTERNS:**
- ❌ Performance metrics over wisdom quality
- ❌ Technical efficiency over learning effectiveness
- ❌ Scaling solutions before understanding the problem

### 2.3 Philosophy Misconceptions

**WRONG THINKING:**
```
"How can we automate this?"
"What dashboard would help here?"  
"We need a system to manage..."
"Let's optimize performance..."
"Users need more features..."
```

**RIGHT THINKING:**
```
"How can we teach this better?"
"What guidance is missing here?"
"How can we simplify this further?"
"What pattern is emerging naturally?"
"How does this make the system wiser?"
```

---

## PHASE 3: CURRENT CONTEXT [ADAPT TO YOUR SCENARIO]

### 🔄 **Session Resume Context**

**Immediate Context Check:**
```bash
# Run these to understand current state
git status
git log --oneline -5
git branch
```

**Essential Reading:**
- **@cypher/cdd/sessions/2025-01-20-task-definition-management.md** - Latest session context
- **@cypher/cdd/task-definition-management/** - Current active project
- **Recent commits** - What was accomplished recently

**Current Focus Areas:**
- Task Definition and Management (foundational work)
- Branch: `feature/task-definition-and-management`
- Goal: Implement Task v0.1 structure based on deep research
- Key Insight: "Commands operate on undefined data structures" - we're fixing this

**Next Steps Context:**
- We're implementing the Task interface informed by research
- Deep research already completed in `Task management systems deep dive.md`
- Decisions documented in `cypher/cdd/task-definition-management/decisions.md`

### 🤝 **Collaboration Context**

**Project State Understanding:**
- **@cypher/cdd/task-definition-management/roadmap.md** - Our current roadmap (Phase 1-6)
- **@cypher/cdd/task-definition-management/decisions.md** - Architectural decisions made
- **@cypher/research/Task management systems deep dive.md** - Research foundation

**Collaboration Objective:**
[To be specified by human when requesting collaboration]

**Key Constraints:**
- Must align with philosophy (commands teach, don't execute)
- Must build on existing research and decisions
- Must maintain simplicity while enabling intelligence
- Must support the "Plan as first-class citizen" concept from research

**What We Need Help With:**
[To be specified by human - e.g., "Design Task interface", "Validate PRD format", etc.]

### 👤 **New Team Context**

**Project Overview:**
- **@cypher/core-docs/quickstart.md** - How to use Cypher in 5 minutes
- **@cypher/tasks.json** - Example of current task structure
- **@docs/cyper_docs/EKP_v2_Commands_as_Teachers_Roadmap.md** - Implementation roadmap

**Understanding the Ecosystem:**
- **@cypher/prompts/** - The "teachers" (guides for commands)
- **@cypher/patterns/** - Extracted wisdom from experience
- **@cypher/knowledge/** - Strategic insights and evolution log

**First Tasks to Understand System:**
1. Read a complete guide (e.g., `@cypher/prompts/plan-guide.md`)
2. Understand the CDD structure (`@cypher/cdd/` examples)
3. See how knowledge evolves (`@cypher/knowledge/evolution-log.md`)

---

## PHASE 4: TECHNICAL ARCHITECTURE [AS NEEDED]

### 4.1 System Design Understanding
**@cypher/core-docs/architecture.md** - System layers and knowledge lifecycle
**@docs/cyper_docs/ARCHITECTURE.md** - Detailed EKP v2 architecture

**Key Concepts:**
- Command Layer: Simple commands (<50 lines) that load guides
- Knowledge Layer: `prompts/`, `patterns/`, `project-rules/`, `knowledge/`
- Dialogue Layer: `cdd/<task-id>/` temporary workspaces

### 4.2 Implementation Details
**@docs/cyper_docs/INTERFACES.md** - Current Task interface definition
**@src/core/TaskEngine.ts** - Core persistence layer (review structure, not implementation)
**@cypher/prompts/plan-guide.md** - Example of how guides work

### 4.3 AI Integration Protocols
**@cypher/orchestrator/documentation-protocol.md** - How to write for AI consumption
**@cypher/orchestrator/gemini-collaboration.md** - AI-AI collaboration patterns
**@cypher/orchestrator/git-protocol.md** - Git workflow integration

---

## VALIDATION CHECKLIST

**Before any collaboration, confirm you understand:**

### Philosophy Alignment
- [ ] I can explain "Commands as Teachers" without using the word "automation"
- [ ] I understand why QWen's proposals were fundamentally wrong
- [ ] I know the difference between organic and systematic evolution
- [ ] I grasp why dialogue is the central process, not a feature

### Current Context Awareness
- [ ] I know what we're currently working on (Task Definition and Management)
- [ ] I understand the research foundation already laid
- [ ] I'm aware of decisions already made and why
- [ ] I know what NOT to propose based on anti-patterns

### Technical Understanding
- [ ] I understand the architecture but prioritize philosophy
- [ ] I know how guides work and their role as "teachers"
- [ ] I understand the knowledge evolution process
- [ ] I can contribute to the system's wisdom, not just its features

### Collaboration Readiness
- [ ] I will propose enhancements, not additions
- [ ] I will ask "how can we teach this better?" not "how can we automate this?"
- [ ] I will respect the simplicity that enables intelligence
- [ ] I will contribute to organic evolution, not systematic solutions

---

## READY TO COLLABORATE

**If you've completed this protocol, you understand:**
- WHY Cypher is designed the way it is
- WHAT we're currently working on
- HOW to contribute value without adding complexity
- WHAT to avoid based on documented failures

**You're now ready to:**
- Resume a productive Claude Code session
- Collaborate effectively on Cypher development
- Contribute to the system's organic evolution
- Teach others about Cypher's unique approach

---

## PROTOCOL EVOLUTION

This protocol itself follows Cypher principles:
- **Evolves based on usage** - Each failed collaboration teaches us what to add
- **Captures anti-patterns** - Real failures become learning opportunities  
- **Organic growth** - Sections emerge from need, not pre-design
- **Teaching focus** - Guides understanding rather than prescribing actions

**Last Updated:** Based on QWen Coder 3 analysis failure (2025-01-20)
**Next Evolution:** Will incorporate learnings from first protocol usage

---

*"You are not implementing tasks. You are teaching an ecosystem to understand itself better."*