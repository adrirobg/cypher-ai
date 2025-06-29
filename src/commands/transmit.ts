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

async function getSiblingTasks(taskId: string, parentTask: Task): Promise<Task[]> {
  return parentTask.subtasks?.filter(task => task.id !== taskId) || [];
}

function replaceTemplateVariables(template: string, data: {
  taskId: string;
  taskTitle: string;
  taskDescription: string;
  taskDetails?: string;
  taskTestStrategy?: string;
  parentId?: string;
  parentTitle?: string;
  parentDescription?: string;
  siblingContext: string;
  dependenciesContext: string;
}): string {
  let result = template;
  
  result = result.replace(/{{current\.id}}/g, data.taskId)
    .replace(/{{current\.title}}/g, data.taskTitle)
    .replace(/{{current\.description}}/g, data.taskDescription);
  
  if (data.parentId && data.parentTitle && data.parentDescription) {
    result = result.replace(/{{parent\.id}}/g, data.parentId)
      .replace(/{{parent\.title}}/g, data.parentTitle)
      .replace(/{{parent\.description}}/g, data.parentDescription);
  } else {
    result = result.replace(/`## 2\. OBJETIVO PRINCIPAL[^`]*`\n`[^`]*`\n\n`---`/, '');
  }
  
  result = result.replace(/`{{#if current\.details}}`[\s\S]*?`{{\/if}}`/g, '')
    .replace(/`{{#if current\.testStrategy}}`[\s\S]*?`{{\/if}}`/g, '');
  
  const siblingSection = /`{{#each parent\.subtasks}}`[\s\S]*?`{{\/each}}`/g;
  result = result.replace(siblingSection, data.siblingContext);
  
  const depsIfSection = /`{{#if current\.dependencies}}`[\s\S]*?`{{else}}`[\s\S]*?`{{\/if}}`/g;
  result = result.replace(depsIfSection, data.dependenciesContext);
  
  result = result.replace(/`/g, '');
  
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
    
    const templatePath = path.resolve(__dirname, '../templates/PREFLIGHT_TEMPLATE.md');
    const template = await fs.readFile(templatePath, 'utf8');
    
    const tasks = await engine.readTasks();
    const parentTask = await getParentTask(taskId, tasks);
    
    let siblingContext = '';
    if (parentTask) {
      const siblings = await getSiblingTasks(taskId, parentTask);
      if (siblings.length > 0) {
        siblingContext = siblings
          .map(sibling => `- **${sibling.id} - ${sibling.title}** (Status: ${sibling.status})`)
          .join('\n');
      } else {
        siblingContext = '- **No hay tareas hermanas.** Esta es la única subtarea.';
      }
    } else {
      siblingContext = '- **Tarea de nivel superior.** No tiene tareas hermanas.';
    }
    
    let dependenciesContext = '';
    if (task.dependencies && task.dependencies.length > 0) {
      dependenciesContext = task.dependencies
        .map(dep => `- **Depende de ${dep}:** Debes asumir que la funcionalidad de esta tarea ya está completada y disponible.`)
        .join('\n');
    } else {
      dependenciesContext = '- **Sin dependencias directas.** Eres el punto de partida para esta sección del trabajo.';
    }
    
    const data = {
      taskId: task.id,
      taskTitle: task.title,
      taskDescription: task.description,
      parentId: parentTask?.id,
      parentTitle: parentTask?.title,
      parentDescription: parentTask?.description,
      siblingContext,
      dependenciesContext
    };
    
    const output = replaceTemplateVariables(template, data);
    console.log(output);
    
  } catch (error: any) {
    console.log(`# Error\n\n${error.message}`);
  }
}