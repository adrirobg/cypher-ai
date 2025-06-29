import { TaskEngine, Task } from '../core/TaskEngine';
import * as fs from 'fs-extra';
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

function replaceTemplateVariables(template: string, data: Record<string, any>): string {
  let result = template
    .replace(/{{current\.id}}/g, data.taskId)
    .replace(/{{current\.title}}/g, data.taskTitle)
    .replace(/{{current\.description}}/g, data.taskDescription);
  
  if (data.parentId && data.parentTitle && data.parentDescription) {
    result = result
      .replace(/{{parent\.id}}/g, data.parentId)
      .replace(/{{parent\.title}}/g, data.parentTitle)
      .replace(/{{parent\.description}}/g, data.parentDescription);
  } else {
    result = result.replace(/`## 2\. OBJETIVO PRINCIPAL[^`]*`\n`[^`]*`\n\n`---`/, '');
  }
  
  result = result
    .replace(/`{{#if current\.details}}`[\s\S]*?`{{\/if}}`/g, '')
    .replace(/`{{#if current\.testStrategy}}`[\s\S]*?`{{\/if}}`/g, '')
    .replace(/`{{#each parent\.subtasks}}`[\s\S]*?`{{\/each}}`/g, data.siblingContext)
    .replace(/`{{#if current\.dependencies}}`[\s\S]*?`{{else}}`[\s\S]*?`{{\/if}}`/g, data.dependenciesContext)
    .replace(/`/g, '');
  
  return result.trim();
}

export async function transmit(taskId: string): Promise<void> {
  const engine = new TaskEngine();
  
  try {
    const task = await engine.getTaskById(taskId);
    if (!task) {
      console.log(`# Error\n\nTask with ID \`${taskId}\` not found.`);
      return;
    }
    
    const template = await fs.readFile(path.resolve(__dirname, '../templates/PREFLIGHT_TEMPLATE.md'), 'utf8');
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
    
    const output = replaceTemplateVariables(template, {
      taskId: task.id,
      taskTitle: task.title,
      taskDescription: task.description,
      parentId: parentTask?.id,
      parentTitle: parentTask?.title,
      parentDescription: parentTask?.description,
      siblingContext,
      dependenciesContext
    });
    
    console.log(output);
  } catch (error: any) {
    console.log(`# Error\n\n${error.message}`);
  }
}