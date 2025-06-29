import { TaskEngine, Task } from '../core/TaskEngine';

async function formatTaskList(tasks: Task[]): Promise<string> {
  const lines: string[] = ['# Tasks Overview\n'];
  
  const flattenTasks = (taskList: Task[], depth: number = 0): void => {
    taskList.forEach(task => {
      const indent = '  '.repeat(depth);
      const deps = task.dependencies?.length || 0;
      lines.push(`${indent}- **${task.id}** | ${task.title} | \`${task.status}\` | deps: ${deps}`);
      
      if (task.subtasks?.length) {
        flattenTasks(task.subtasks, depth + 1);
      }
    });
  };
  
  flattenTasks(tasks);
  return lines.join('\n');
}

async function formatTaskDetail(task: Task): Promise<string> {
  const lines: string[] = [`# Task ${task.id}\n`];
  
  lines.push(`**Title:** ${task.title}`);
  lines.push(`**Status:** \`${task.status}\``);
  
  if (task.priority) {
    lines.push(`**Priority:** ${task.priority}`);
  }
  
  lines.push(`\n**Description:**\n${task.description}`);
  
  if (task.dependencies?.length) {
    lines.push(`\n**Dependencies:** ${task.dependencies.join(', ')}`);
  }
  
  if (task.executionHint) {
    lines.push(`\n## Execution Hint`);
    const strategyEmoji = task.executionHint.strategy === 'direct' ? '💻' : '👥';
    lines.push(`**Strategy:** ${strategyEmoji} ${task.executionHint.strategy}`);
    lines.push(`**Parallelizable:** ${task.executionHint.parallelizable ? 'Yes' : 'No'}`);
    lines.push(`**Estimated Files:** ${task.executionHint.estimatedFiles}`);
  }
  
  if (task.context) {
    lines.push(`\n**Context:** ${task.context}`);
  }
  
  if (task.outputs?.length) {
    lines.push(`\n**Outputs:**`);
    task.outputs.forEach(output => lines.push(`- ${output}`));
  }
  
  if (task.subtasks?.length) {
    lines.push(`\n## Subtasks\n`);
    const formatSubtasks = (subtasks: Task[], depth: number = 0): void => {
      subtasks.forEach(subtask => {
        const indent = '  '.repeat(depth);
        lines.push(`${indent}- **${subtask.id}** | ${subtask.title} | \`${subtask.status}\``);
        if (subtask.subtasks?.length) {
          formatSubtasks(subtask.subtasks, depth + 1);
        }
      });
    };
    formatSubtasks(task.subtasks);
  }
  
  return lines.join('\n');
}

export async function decode(taskId?: string): Promise<void> {
  const engine = new TaskEngine();
  
  try {
    if (taskId) {
      const task = await engine.getTaskById(taskId);
      if (!task) {
        console.log(`# Error\n\nTask with ID \`${taskId}\` not found.`);
        return;
      }
      const output = await formatTaskDetail(task);
      console.log(output);
    } else {
      const tasks = await engine.readTasks();
      if (tasks.length === 0) {
        console.log('# No Tasks\n\nNo tasks found in the system.');
        return;
      }
      const output = await formatTaskList(tasks);
      console.log(output);
    }
  } catch (error: any) {
    console.log(`# Error\n\n${error.message}`);
  }
}