# Cypher VSCode Extension: Knowledge Shelf (Refined Proposal)

> "The best GUI is one that barely exists." - Post-Gemini insight

## Executive Summary

After brutal but valuable feedback from Gemini, this proposal has been dramatically simplified. What remains is a **minimal VSCode extension** that acts as a "knowledge shelf" - organized, accessible, but passive. No gardens to tend, no metrics to optimize, just simple visibility into Cypher's living knowledge.

## Core Concept: Knowledge Shelf, Not Garden

A VSCode extension that provides **visibility without automation**, **navigation without shortcuts**, and **discovery without distraction**.

## What We're Building (Phase 1 Only)

### 1. Cypher Knowledge Explorer (TreeView)

```typescript
CypherShelf/
├── 📚 Guides/
│   ├── plan-guide.md (v3.1.0 | Used 27x | Last: task-121)
│   ├── context-guide.md (v2.4.0 | Used 45x | Last: task-118)
│   └── explore-guide.md (v1.0.0 | Used 3x | Last: task-125)
├── 🧬 Patterns/
│   ├── authentication-pattern.md (Created: task-89)
│   └── error-handling-pattern.md (Created: task-45)
└── 🎯 Active Tasks/
    ├── task-123 (in progress)
    └── phase-4-documentation (planned)
```

**Key Design Decisions:**
- **Concrete metadata only**: Version, usage count, last used
- **No abstract metrics**: No effectiveness scores, no learning velocity
- **No actions**: Clicking opens file in editor, nothing more
- **Git-based facts**: All metadata derived from git history

### 2. Quick Search (The Most Valuable Feature)

```typescript
[🔍 Search guides and patterns...]
```

- Simple text search across all knowledge files
- Opens results in editor
- No fancy semantic search or AI
- Just fast, reliable text matching

### 3. Minimal Status Bar

```
[📚 Cypher: task-123]
```

- Shows current task context
- Click opens task directory
- Nothing more

## What We're NOT Building

### ❌ Rejected Features (Thanks Gemini)

1. **All Abstract Metrics**
   - ~~Effectiveness percentages~~
   - ~~Learning velocity~~
   - ~~Intelligence scores~~
   - Why: Impossible to calculate objectively, pure vanity

2. **Quick Actions / Right-Click Menus**
   - ~~"Use for current task"~~
   - ~~"Mark as complete"~~
   - ~~"Evolve guide"~~
   - Why: Shortcuts that bypass learning

3. **Drag & Drop Pattern Creation**
   - Why: Reduces conscious synthesis to mechanical gesture

4. **Complex Visualizations**
   - ~~Chart.js dashboards~~
   - ~~Evolution timelines~~
   - ~~Pattern detection~~
   - Why: Reinventing existing tools (git log, git blame)

5. **WebView Panels**
   - Why: Unnecessary complexity for simple data display

## Implementation (1 Week Maximum)

### Technical Stack (Minimal)
- VSCode Extension API only
- TypeScript
- No external dependencies (no Chart.js, no React)
- Total size target: <100KB

### Day-by-Day Plan
- **Day 1-2**: Basic TreeDataProvider
- **Day 3**: Git integration for metadata
- **Day 4**: Search implementation  
- **Day 5**: Polish and testing
- **Day 6-7**: Buffer/documentation

### File Structure (Simple)
```
cypher-vscode/
├── src/
│   ├── extension.ts        (50 lines)
│   ├── knowledgeProvider.ts (100 lines)
│   └── search.ts           (50 lines)
├── package.json
└── README.md
```

## Philosophy Alignment Checklist

✅ **Shows without doing**: Pure visualization, no automation
✅ **Teaches through transparency**: Makes knowledge discoverable
✅ **Respects the CLI**: All actions happen in terminal
✅ **Minimal maintenance**: No complex state synchronization
✅ **Fails gracefully**: If git is slow, shows stale data
✅ **Invisible until useful**: Doesn't demand attention

## The 80/20 Rule Applied

**80% of value from:**
- Seeing what guides exist
- Knowing which are actively used
- Quick search when needed

**20% of effort via:**
- Simple TreeView
- Git command parsing
- Basic text search

## Gemini's Wisdom Incorporated

> "The goal is not to create a 'visual knowledge garden' that needs its own full-time gardener. The goal is a simple **tool shelf** where each tool is clearly labeled and within reach."

This refined proposal embraces that vision completely.

## What Success Looks Like

A developer installs the extension and:
1. Immediately sees all available guides in the sidebar
2. Notices which guides are frequently used (social proof)
3. Can search for specific patterns quickly
4. **Still uses the CLI for all actual work**

The extension becomes invisible after the first week - it's just there when needed, like a good shelf.

## Future Considerations (Explicitly Deferred)

These ideas are noted but explicitly rejected for v1:
- Integration with task management
- Any form of metrics dashboard
- Pattern suggestion or detection
- CodeLens or hover providers
- Any feature that executes Cypher commands

## Conclusion

This isn't a GUI for Cypher. It's a **window into Cypher's knowledge** - nothing more, nothing less. It respects the principle that the best teacher shows you where to look, not what to see.

**Target delivery**: 1 week
**Target size**: <100KB  
**Target complexity**: So simple it's boring
**Target value**: Exactly what's needed

---

*"Simplicity is the ultimate sophistication." - Leonardo da Vinci*
*"The best GUI is one that barely exists." - Gemini's wisdom*