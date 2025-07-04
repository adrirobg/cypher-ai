import { TaskEngine, Task } from '../core/TaskEngine';
import { PromptManager } from '../utils/PromptManager';
import * as path from 'path';
import * as fs from 'fs-extra';

async function getParentTask(taskId: string, tasks: Task[]): Promise<Task | null> {
  for (const task of tasks) {
    if (task.subtasks) {
      for (const subtask of task.subtasks) {
        if (subtask.id === taskId) return task;
        if (subtask.subtasks) {
          const found = await getParentTask(taskId, subtask.subtasks);
          if (found) return found;
        }
      }
    }
  }
  return null;
}

function generatePrompt(task: Task, context: string): string {
  return `# Implementation Guide for Task ${task.id}: ${task.title}

## Role
Orchestrator implementing this task through strategic delegation and supervision.

## 1. WHAT: Task Description
**Goal**: ${task.description}

## 2. HOW: Patterns & Examples
**READ NOW**: \`cat cypher/cdd/${task.id}/context.md\`
- Contains complete implementation patterns
- Includes all external documentation
- Shows exact code examples to follow

## 3. EXECUTION: Orchestration Strategy

### Delegation Decision Matrix
| Strategy | When to Use | Example |
|----------|-------------|---------|
| **Monolithic** | Clear patterns, <500 lines | \`task --prompt "Implement complete task using context"\` |
| **Layered** | Distinct layers (DB/API/UI) | Structure → Logic → Integration |
| **Fragmented** | ❌ AVOID | Only for debugging/iteration |

### Workflow
1. **Read**: \`cypher/cdd/${task.id}/context.md\` - ALL patterns
2. **Decide**: Monolithic vs Layered based on matrix
3. **Delegate**: Rich context to implementer
4. **Validate**: Against patterns from context
5. **Update**: \`cypher update ${task.id} status=done\`

### Quality Gates
- [ ] Used patterns from context.md
- [ ] No reinventing (context has examples)
- [ ] Tests included
- [ ] Follows Cypher principles

### Critical Don'ts
- ❌ Skip reading context.md
- ❌ Fragment unnecessarily  
- ❌ Implement without delegating
- ❌ Ignore provided patterns

[Reference: docs/cyper_docs/AI_COLLABORATION_FULL.md for advanced patterns]`;
}

export async function delegate(taskId: string): Promise<void> {
  const engine = new TaskEngine();
  const promptManager = new PromptManager(path.join(__dirname, '../providers/prompts'));
  
  try {
    const task = await engine.getTaskById(taskId);
    if (!task) {
      console.log(`# Error\n\nTask with ID \`${taskId}\` not found.`);
      return;
    }
    
    const tasks = await engine.readTasks();
    const parentTask = await getParentTask(taskId, tasks);
    
    let siblingContext = '';
    if (parentTask) {
      const siblings = parentTask.subtasks?.filter(t => t.id !== taskId) || [];
      siblingContext = siblings.length > 0
        ? siblings.map(s => `- **${s.id} - ${s.title}** (Status: ${s.status})`).join('\n')
        : '- **No hay tareas hermanas.** Esta es la única subtarea.';
    } else {
      siblingContext = '- **Tarea de nivel superior.** No tiene tareas hermanas.';
    }
    
    const dependenciesContext = task.dependencies?.length
      ? task.dependencies.map(dep => `- **Depende de ${dep}:** Debes asumir que la funcionalidad de esta tarea ya está completada y disponible.`).join('\n')
      : '- **Sin dependencias directas.** Eres el punto de partida para esta sección del trabajo.';
    
    // Check for external documentation patterns
    const cddDir = path.resolve(process.cwd(), 'cypher/cdd', taskId);
    await fs.ensureDir(cddDir);
    
    let externalDocs = '';
    const patternFiles = await fs.readdir(cddDir).catch(() => []);
    const docFiles = patternFiles.filter(f => f.endsWith('.md') && f !== 'context.md' && f !== 'prompt.md');
    
    if (docFiles.length > 0) {
      console.log(`📚 **Found external documentation:** ${docFiles.join(', ')}\n`);
      for (const file of docFiles) {
        const content = await fs.readFile(path.join(cddDir, file), 'utf8');
        externalDocs += `\n## External Documentation: ${file}\n\n${content}\n`;
      }
    }
    
    // Generate context (reuse transmit logic)
    const baseContext = promptManager.render('commands/preflight', {
      current: task,
      parent: parentTask,
      siblingContext,
      dependenciesContext,
      executionHint: task.executionHint
    });
    
    const context = baseContext + externalDocs;
    
    // Generate prompt
    const prompt = generatePrompt(task, context);
    
    // Save artifacts to CDD directory (already ensured above)
    
    const contextPath = path.join(cddDir, 'context.md');
    const promptPath = path.join(cddDir, 'prompt.md');
    
    await fs.writeFile(contextPath, context, 'utf8');
    await fs.writeFile(promptPath, prompt, 'utf8');
    
    console.log(`# CDD Delegation Package for Task ${taskId}\n`);
    console.log(`✅ **Context saved to:** \`${contextPath}\``);
    console.log(`✅ **Prompt saved to:** \`${promptPath}\``);
    
    if (docFiles.length > 0) {
      console.log(`📚 **Context enriched with:** ${docFiles.map(f => `\`${f}\``).join(', ')}`);
      const totalLines = externalDocs.split('\n').length;
      console.log(`📊 **External docs added:** ${totalLines} lines\n`);
    } else {
      console.log(`\n💡 **Tip:** Add documentation files to \`${cddDir}/\` to enrich context\n`);
    }
    
    console.log(`## Delegation Command\n`);
    console.log(`\`\`\`bash`);
    console.log(`# Copy context and prompt to use with your implementation tool`);
    console.log(`cat "${contextPath}" "${promptPath}" | your-ai-tool`);
    console.log(`\`\`\``);
    
    console.log(`\n## Task Tool Usage\n`);
    console.log(`\`\`\`bash`);
    console.log(`task --description "Implement ${task.title}" --prompt "$(cat '${promptPath}')"`);
    console.log(`\`\`\``);
    
    console.log(`\n## Recovery\n`);
    console.log(`If work gets interrupted, you can resume with:`);
    console.log(`\`\`\`bash`);
    console.log(`cypher delegate ${taskId}  # Regenerates the same artifacts`);
    console.log(`\`\`\``);
    
  } catch (error: any) {
    console.log(`# Error\n\n${error.message}`);
  }
}