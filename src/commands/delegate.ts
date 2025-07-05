import { TaskEngine, Task } from '../core/TaskEngine';
import { TaskQueries } from '../core/TaskQueries';
import { PromptManager } from '../utils/PromptManager';
import * as path from 'path';
import * as fs from 'fs-extra';

function generatePrompt(task: Task, context: string): string {
  return `# Implementation Guide for Task ${task.id}: ${task.title}

## Role
Orchestrator implementing this task through strategic delegation and supervision.

## 1. WHAT: Task Description
**Goal**: ${task.description}

## 2. HOW: Patterns & Examples
**READ & ANALYZE DEEPLY (MANDATORY)**: @cypher/cdd/${task.id}/context.md
- Contains complete implementation patterns
- Includes all external documentation
- Shows exact code examples to follow

## 3. EXECUTION: Orchestration Strategy

### Delegation Decision Matrix
  | Strategy | When to Use | Example |
  |----------|-------------|---------|
  | **Single task** | Simple, cohesive task | "Add a button" |
  | **Parallel tasks** | Independent aspects | API + Tests + Docs |
  | **Sequential tasks** | Dependencies exist | DB → API → UI |

### Workflow
1. **Read**: \`cypher/cdd/${task.id}/context.md\` - ALL patterns
2. **Decide**: Execution strategy based on task complexity
3. **Delegate**: Rich context to implementer from context.md
4. **Validate**: Against patterns from context.md
5. **Update**: \`cypher update ${task.id} status=done\`

  ### Focused Prompts: Precision Artifacts
  When a task has independent aspects, create focused prompts.

  Focused prompts are NOT simple task descriptions. They are **precision-engineered artifacts** that:
  - Extract ONLY relevant sections from context.md
  - Include project-wide patterns the implementer needs
  - Provide constraints from your orchestrator knowledge
  - Define clear boundaries and interfaces

  ### Benefits of Precision Prompts
  - **Context Efficiency**: Agent gets EXACTLY what's needed
  - **Coherence**: All prompts share same extracted patterns
  - **Orchestrator Value**: Your project knowledge guides each agent
  - **No Context Drift**: Each prompt is anchored to context.md

  ### Delegation Through Agent Creation

  As orchestrator, you delegate by creating independent AI agents using your Task creation tool.

  Core principles:
  - Each agent receives context + prompt
  - Agents work independently (enabling parallelism)
  - You maintain orchestrator perspective
  - Implementation happens in agents, not in you

  The Task tool is your primary delegation mechanism - it creates agents that:
  - Operate with focused context
  - Use appropriate models for implementation
  - Work in isolation from each other
  - Return results for your synthesis

  ### Quality Gates
  - [ ] Each prompt extracts from context.md
  - [ ] Project patterns included
  - [ ] Clear boundaries defined
  - [ ] Follows Cypher principles
  - [ ] Implementer actually use context.md information
  - [ ] Validate results using context.md
  
  ### Critical Don'ts
- ❌ Skip reading context.md
- ❌ Fragment unnecessarily  
- ❌ Implement without delegating
- ❌ Ignore provided patterns
`;

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
    const parentTask = TaskQueries.getParent(tasks, taskId);
    
    let siblingContext = '';
    if (parentTask) {
      const siblings = TaskQueries.getSiblings(tasks, taskId);
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