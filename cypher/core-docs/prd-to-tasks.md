# From PRD to Tasks: The Missing Link

Version: 1.0.0
Updated: 2025-01-20

## Overview

Before commands can teach, we need tasks to work with. This guide bridges PRD (Product Requirements Document) to Cypher's task system.

## The Complete Flow

```
PRD → tasks.json → cypher plan → cypher context → execute → cypher learn
```

## PRD Structure for Cypher

### Template
```markdown
# PRD: [Project Name]

## Overview
[Clear description of what we're building and why]

## Core Features

### Feature 1: [Name]
**Description**: [What it does for users]
**Technical Requirements**: 
- [APIs, frameworks, dependencies]
- [Data structures needed]
**Constraints**: 
- [What to avoid]
- [Performance requirements]
**Success Criteria**: 
- [ ] [Measurable outcome 1]
- [ ] [Measurable outcome 2]

### Feature 2: [Name]
[Same structure...]
```

### Why This Structure?
- **Description** → Becomes task title/description
- **Technical Requirements** → Used by `cypher context` to gather dependencies
- **Constraints** → Guides `cypher plan` strategy selection
- **Success Criteria** → Used by `cypher validate` for verification

## Task Object Structure

```typescript
interface Task {
  id: string;              // "1", "1.1", "1.1.1"
  title: string;           // From feature name
  description: string;     // From feature description
  
  // From PRD
  requirements?: string[];     // Technical requirements
  constraints?: string[];      // What to avoid
  successCriteria?: string[];  // How to validate
  
  // Filled by commands
  context?: string;           // Added by 'cypher context'
  strategy?: string;          // Added by 'cypher plan'
  patterns?: string[];        // Added by 'cypher learn'
  
  // Workflow
  status: 'pending' | 'in-progress' | 'done';
  subtasks?: Task[];
}
```

## Transformation Process

### Step 1: Identify Main Tasks
Each core feature becomes a main task:
- Feature → Task (1.0, 2.0, etc.)
- Sub-features → Subtasks (1.1, 1.2, etc.)

### Step 2: Map Information
```
PRD Feature                    → Task Field
-----------------------------------------
Feature Name                   → title
Description                    → description  
Technical Requirements         → requirements[]
Constraints                    → constraints[]
Success Criteria              → successCriteria[]
```

### Step 3: Create tasks.json
```json
{
  "tasks": [
    {
      "id": "1",
      "title": "User Authentication System",
      "description": "JWT-based auth with refresh tokens",
      "requirements": [
        "Node.js Express server",
        "JWT libraries",
        "PostgreSQL for user storage"
      ],
      "constraints": [
        "Must not store passwords in plain text",
        "Tokens must expire after 24 hours"
      ],
      "successCriteria": [
        "Users can register with email/password",
        "Users can login and receive JWT",
        "Tokens refresh automatically"
      ],
      "status": "pending",
      "subtasks": [
        {
          "id": "1.1",
          "title": "Create User Model",
          "description": "Database schema and model",
          "status": "pending"
        }
      ]
    }
  ]
}
```

## Best Practices

### DO
- Keep tasks focused on single deliverables
- Include enough detail for context gathering
- Make success criteria measurable
- Use consistent ID numbering (1, 1.1, 1.1.1)

### DON'T
- Create tasks for project setup (handled by init)
- Over-nest subtasks (max 3 levels)
- Mix multiple features in one task
- Leave success criteria vague

## Example: E-commerce Cart

### PRD Section
```markdown
### Feature: Shopping Cart
**Description**: Persistent cart that saves items across sessions
**Technical Requirements**: 
- React with Redux/Context
- LocalStorage for persistence
- Cart API endpoints
**Constraints**: 
- Must sync with backend on login
- Handle concurrent modifications
**Success Criteria**: 
- [ ] Items persist after browser refresh
- [ ] Cart syncs when user logs in
- [ ] Can update quantities and remove items
```

### Resulting Task
```json
{
  "id": "3",
  "title": "Shopping Cart",
  "description": "Persistent cart that saves items across sessions",
  "requirements": [
    "React with Redux/Context",
    "LocalStorage for persistence",
    "Cart API endpoints"
  ],
  "constraints": [
    "Must sync with backend on login",
    "Handle concurrent modifications"
  ],
  "successCriteria": [
    "Items persist after browser refresh",
    "Cart syncs when user logs in",
    "Can update quantities and remove items"
  ],
  "status": "pending"
}
```

## The Commands Connection

Once tasks exist, commands enhance them:

1. **cypher plan 3** → Adds strategy based on requirements
2. **cypher context 3** → Gathers info about React, Redux, APIs
3. **cypher validate 3** → Checks against success criteria
4. **cypher learn 3** → Extracts patterns for future carts

## Quick Reference

```bash
# 1. Create PRD with proper structure
# 2. Transform to tasks.json manually
# 3. Initialize project
cypher init

# 4. Start working
cypher list
cypher plan 1
cypher context 1
# ... implement ...
cypher learn 1
```

Remember: Tasks are the bridge between human intent (PRD) and AI collaboration (commands).