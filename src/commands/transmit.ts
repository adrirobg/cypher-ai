import { TaskEngine, Task } from '../core/TaskEngine';
import { PromptManager } from '../utils/PromptManager';
import * as path from 'path';

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
    
    const output = promptManager.render('commands/preflight', {
      current: task,
      parent: parentTask,
      siblingContext,
      dependenciesContext,
      executionHint: task.executionHint
    });
    
    console.log(output);
  } catch (error: any) {
    console.log(`# Error\n\n${error.message}`);
  }
}