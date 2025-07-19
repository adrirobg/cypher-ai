# Cypher Distribution Cleanup Checklist

## Purpose
This checklist guides the process of cleaning Cypher for distribution, removing all development artifacts while preserving essential functionality.

## Pre-Cleanup Steps

1. **Create Archive Branch** ✅
   ```bash
   git checkout -b archive/development-documentation
   ```

2. **Commit All Current Work**
   ```bash
   git add .
   git commit -m "Archive: Final state before cleanup"
   ```

3. **Create Clean Distribution Branch**
   ```bash
   git checkout feature/ekp-v2-refactor
   git checkout -b release/clean-distribution
   ```

## Files to Remove

### Root Level
- [ ] `codebase-audit-results.md`
- [ ] `docs-audit-results.md`
- [ ] `gemini-docs-audit-request.md`
- [ ] `git-integration-proposal.md`
- [ ] `CLAUDE.md`
- [ ] `GEMINI.md`
- [ ] `CLEANUP_CHECKLIST.md` (this file, after use)

### Directories to Remove Entirely
- [ ] `.claude/`
- [ ] `references/`
- [ ] `scripts/`
- [ ] `taskmaster/`
- [ ] `team/`
- [ ] `example/`
- [ ] `tests/` (optional - may keep for development)

### Documentation Cleanup

#### Remove from `docs/`
- [ ] `docs/research/` (entire directory)
- [ ] `docs/taskmaster_docs/` (entire directory)
- [ ] `docs/phase2-implementation-review.md`
- [ ] `docs/phase3-commands-audit.md`
- [ ] `docs/phase3-migration-philosophy.md`

#### Remove from `docs/cyper_docs/`
- [ ] `ROADMAP.md`
- [ ] `COLLABORATION_PLAN.md`
- [ ] `COMMAND_REFACTOR_TASKS.md`
- [ ] `EXECUTION_PATTERNS.md`
- [ ] `MANIFESTO.md`
- [ ] `GENESIS_PROTOCOL_AND_CRITIQUE.md`
- [ ] `AI_COLLABORATION_ESSENCE.md`
- [ ] `AI_COLLABORATION_FULL.md`
- [ ] `AI_COLLABORATION_OPTIMIZATION.md`
- [ ] `CONTEXTUAL_AI_TEAMS.md`
- [ ] `CONTEXTUAL_CLAUDE.md`
- [ ] `USING_GEMINI_AS_CLAUDE.md`
- [ ] `TECHNICAL_NOTES.md`
- [ ] `UI_STRATEGY.md`

### Cypher Directory Cleanup

#### Remove from `cypher/`
- [ ] `cypher/cdd/` (entire directory - user artifacts)
- [ ] `cypher/knowledge/evolution-log.md`
- [ ] `cypher/knowledge/metrics.json`
- [ ] `cypher/knowledge/claude-hooks-guide.md`
- [ ] `cypher/knowledge/cypher-hooks-proposal.md`
- [ ] `cypher/knowledge/cypher-vscode-gui-proposal.md`

## Documentation Reorganization

### Create New Structure
1. [ ] Create `docs/cypher-core/` directory
2. [ ] Move essential docs to `docs/cypher-core/`:
   - `MANIFESTO_v2.md` (from cyper_docs)
   - `THE_CYPHER_EVOLUTION.md` (from research)
   - `EKP_v2_Commands_as_Teachers_Roadmap.md` (from cyper_docs)
   - `IA_Pensamiento_CoT_ToT_ReAct.md` (from research)
   - `INTERFACES.md` (from cyper_docs)
   - `AI_ECOSYSTEM_PHILOSOPHY.md` (from cyper_docs)

### Update Existing Documentation
- [ ] Update `docs/cyper_docs/README.md` - Fix paths and commands
- [ ] Update `docs/cyper_docs/ONBOARDING.md` - New workflow
- [ ] Update `docs/cyper_docs/ARCHITECTURE.md` - Add EKP section

## Post-Cleanup Verification

### Essential Files Present
- [ ] `README.md`
- [ ] `package.json` & `package-lock.json`
- [ ] `tsconfig.json`
- [ ] `jest.config.js`
- [ ] `.gitignore`
- [ ] `src/` directory (all source code)
- [ ] `docs/tutorial/FIRST_TASK_EKP.md`
- [ ] `docs/claude_code_sdk_docs/`
- [ ] `cypher/prompts/`
- [ ] `cypher/patterns/`
- [ ] `cypher/project-rules/`
- [ ] `cypher/tasks.json`
- [ ] `cypher/knowledge/future-ideas.md`

### Test Basic Functionality
```bash
# Build the project
npm run build

# Test basic commands
npm run dev -- init
npm run dev -- list
npm run dev -- plan 1
```

## Final Steps

1. **Commit Cleanup**
   ```bash
   git add -A
   git commit -m "chore: Clean distribution - Remove development artifacts

   - Remove all research, analysis, and development documentation
   - Remove legacy system files (taskmaster, .claude)
   - Reorganize essential docs into docs/cypher-core/
   - Keep only user-facing documentation and core functionality
   - Ready for distribution/installation in other projects"
   ```

2. **Create Release Tag**
   ```bash
   git tag -a v2.0.0-clean -m "Cypher v2.0.0 - Commands as Teachers (Clean Distribution)"
   ```

3. **Push to Remote**
   ```bash
   # Push archive branch
   git push origin archive/development-documentation

   # Push clean distribution
   git push origin release/clean-distribution
   git push origin v2.0.0-clean
   ```

## Installation Methods for Users

After cleanup, users can install Cypher via:

### Option 1: Fork & Clone
```bash
git clone https://github.com/[user]/cypher.git
cd cypher
npm install
npm link
```

### Option 2: Direct GitHub Install (Future)
```bash
npm install github:adrirobg/cypher#v2.0.0-clean
```

### Option 3: NPM Package (Future - Phase 5)
```bash
npm install -g cypher-ai
```

## Notes

- The archive branch preserves all development history
- The clean distribution focuses on user needs
- Development can continue on feature branches
- Documentation can be accessed from archive branch when needed