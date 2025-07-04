import { TaskEngine, Task } from '../core/TaskEngine';

interface ListOptions {
  status?: string;
  priority?: string;
  fields?: string[];
}

function filterTasks(tasks: Task[], options: ListOptions): Task[] {
  const filtered: Task[] = [];
  
  const processTask = (task: Task) => {
    let matches = true;
    
    if (options.status && task.status !== options.status) {
      matches = false;
    }
    
    if (options.priority && task.priority !== options.priority) {
      matches = false;
    }
    
    if (matches) {
      filtered.push(task);
    }
    
    // Always process subtasks
    if (task.subtasks?.length) {
      task.subtasks.forEach(processTask);
    }
  };
  
  tasks.forEach(processTask);
  return filtered;
}

function formatTaskList(tasks: Task[], allTasks: Task[], options: ListOptions): string {
  const lines: string[] = [];
  
  // Count task statistics from all tasks
  let totalCount = 0;
  let pendingCount = 0;
  let inProgressCount = 0;
  let doneCount = 0;
  
  const countTasks = (taskList: Task[]) => {
    taskList.forEach(task => {
      totalCount++;
      if (task.status === 'pending') pendingCount++;
      else if (task.status === 'in-progress') inProgressCount++;
      else if (task.status === 'done') doneCount++;
      
      if (task.subtasks?.length) {
        countTasks(task.subtasks);
      }
    });
  };
  
  countTasks(allTasks);
  
  // Header with summary
  lines.push('## Task List\n');
  
  if (!options.status && !options.priority) {
    lines.push(`**Summary:** ${totalCount} total | ${pendingCount} pending | ${inProgressCount} in-progress | ${doneCount} done\n`);
  } else {
    const filters: string[] = [];
    if (options.status) filters.push(`status=${options.status}`);
    if (options.priority) filters.push(`priority=${options.priority}`);
    lines.push(`**Filters:** ${filters.join(', ')}`);
    lines.push(`**Showing:** ${tasks.length} tasks\n`);
  }
  
  if (tasks.length === 0) {
    lines.push('*No tasks match the specified filters.*');
    return lines.join('\n');
  }
  
  // Task list with hierarchy indication
  const displayedTasks = new Set<string>();
  
  const formatTask = (task: Task, depth: number = 0) => {
    if (displayedTasks.has(task.id)) return;
    displayedTasks.add(task.id);
    
    const indent = '  '.repeat(depth);
    const statusIcon = task.status === 'done' ? 'x' : 
                      task.status === 'in-progress' ? '▶' : 
                      task.status === 'blocked' ? '⚠' : ' ';
    
    let line = `${indent}- [${statusIcon}] **${task.id}** - ${task.title}`;
    
    if (options.fields) {
      const parts: string[] = [];
      if (options.fields.includes('status')) parts.push(`\`${task.status}\``);
      if (options.fields.includes('priority') && task.priority) parts.push(`[${task.priority}]`);
      if (parts.length > 0) line += ` | ${parts.join(' | ')}`;
    } else {
      // Default: show status and priority when not done
      if (task.status !== 'done') {
        line += ` | \`${task.status}\``;
        if (task.priority) line += ` | [${task.priority}]`;
      }
    }
    
    // Show blocking info
    if (task.dependencies?.length) {
      const unresolvedDeps = task.dependencies.filter(depId => {
        const dep = findTaskById(allTasks, depId);
        return dep && dep.status !== 'done';
      });
      if (unresolvedDeps.length > 0) {
        line += ` | **blocked by:** ${unresolvedDeps.join(', ')}`;
      }
    }
    
    lines.push(line);
    
    // Include subtasks if they match filters
    if (task.subtasks?.length) {
      task.subtasks.forEach(subtask => {
        if (tasks.some(t => t.id === subtask.id)) {
          formatTask(subtask, depth + 1);
        }
      });
    }
  };
  
  // Format root level tasks first
  tasks.forEach(task => {
    // Only format if it's a root task or hasn't been displayed as subtask
    if (!task.id.includes('.') || !displayedTasks.has(task.id)) {
      formatTask(task, 0);
    }
  });
  
  return lines.join('\n');
}

function findTaskById(tasks: Task[], id: string): Task | undefined {
  for (const task of tasks) {
    if (task.id === id) return task;
    if (task.subtasks) {
      const found = findTaskById(task.subtasks, id);
      if (found) return found;
    }
  }
  return undefined;
}

export async function list(options: ListOptions = {}): Promise<void> {
  const engine = new TaskEngine();
  
  try {
    const allTasks = await engine.readTasks();
    const filteredTasks = filterTasks(allTasks, options);
    const output = formatTaskList(filteredTasks, allTasks, options);
    console.log(output);
  } catch (error: any) {
    console.log(`# Error\n\n${error.message}`);
  }
}