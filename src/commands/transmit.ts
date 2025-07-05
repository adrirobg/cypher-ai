import { TaskEngine, Task } from '../core/TaskEngine';
import { TaskQueries } from '../core/TaskQueries';
import { PromptManager } from '../utils/PromptManager';
import * as path from 'path';
import * as fs from 'fs-extra';

export async function transmit(taskId: string): Promise<void> {
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
    
    const output = promptManager.render('commands/preflight', {
      current: task,
      parent: parentTask,
      siblingContext,
      dependenciesContext,
      executionHint: task.executionHint
    });
    
    // Save context to CDD artifacts
    try {
      const cddDir = path.resolve(process.cwd(), 'cypher/cdd', taskId);
      await fs.ensureDir(cddDir);
      
      const contextPath = path.join(cddDir, 'context.md');
      await fs.writeFile(contextPath, output, 'utf8');
      
      console.log(`# Context Generated for Task ${taskId}\n`);
      console.log(`📁 **Saved to:** \`${contextPath}\`\n`);
      console.log(output);
    } catch (saveError: any) {
      console.log(`# Warning: Could not save context to file: ${saveError.message}\n`);
      console.log(output);
    }
  } catch (error: any) {
    console.log(`# Error\n\n${error.message}`);
  }
}