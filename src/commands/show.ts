import { TaskEngine, Task } from '../core/TaskEngine';
import { TaskQueries } from '../core/TaskQueries';

async function formatTaskDetail(task: Task, allTasks: Task[]): Promise<string> {
  const lines: string[] = [];
  
  // Header with immediate status info
  lines.push(`## Task ${task.id}: ${task.title}\n`);
  
  // Status line with actionable info
  let statusLine = `**Status:** \`${task.status}\``;
  
  // Check if task is ready to work on
  if (task.status === 'pending' || task.status === 'in-progress') {
    const isBlocked = TaskQueries.isBlocked(task, allTasks);
    statusLine += isBlocked ? ' | **Blocked**' : ' | **Ready**';
  }
  
  lines.push(statusLine);
  
  if (task.priority) {
    lines.push(`**Priority:** ${task.priority}`);
  }
  
  lines.push(`\n### Description\n${task.description}`);
  
  // Dependencies with their status
  if (task.dependencies?.length) {
    lines.push(`\n### Dependencies`);
    task.dependencies.forEach(depId => {
      const dep = TaskQueries.findById(allTasks, depId);
      if (dep) {
        const status = dep.status === 'done' ? 'x' : dep.status === 'in-progress' ? '>' : ' ';
        lines.push(`- [${status}] **${dep.id}** - ${dep.title}`);
      } else {
        lines.push(`- [?] **${depId}** - *Not found*`);
      }
    });
  }
  
  // Parent context
  const parent = TaskQueries.getParent(allTasks, task.id);
  if (parent) {
    lines.push(`\n### Parent Task\n**${parent.id}** - ${parent.title}`);
  }
  
  // Blocks which tasks
  const blockedTasks = findTasksBlockedBy(allTasks, task.id);
  if (blockedTasks.length > 0) {
    lines.push(`\n### Blocks`);
    blockedTasks.forEach(blocked => {
      lines.push(`- **${blocked.id}** - ${blocked.title}`);
    });
  }
  
  if (task.executionHint) {
    lines.push(`\n### Execution Strategy`);
    const strategy = task.executionHint.strategy === 'direct' ? 'Direct Implementation' : 'Supervisor-Executor Pattern';
    lines.push(`**Approach:** ${strategy}`);
    if (task.executionHint.parallelizable) {
      lines.push(`**Parallelizable:** Yes - Can work on subtasks simultaneously`);
    }
    if (task.executionHint.estimatedFiles) {
      lines.push(`**Estimated Scope:** ~${task.executionHint.estimatedFiles} files`);
    }
  }
  
  // Implementation hints
  if (task.context || task.outputs?.length) {
    lines.push(`\n### Implementation Notes`);
    if (task.context) {
      lines.push(`**Context:** ${task.context}`);
    }
    if (task.outputs?.length) {
      lines.push(`**Expected Outputs:**`);
      task.outputs.forEach(output => lines.push(`- ${output}`));
    }
  }
  
  // Subtasks overview
  if (task.subtasks?.length) {
    lines.push(`\n### Subtasks (${task.subtasks.length})`);
    const pending = task.subtasks.filter(t => t.status === 'pending').length;
    const inProgress = task.subtasks.filter(t => t.status === 'in-progress').length;
    const done = task.subtasks.filter(t => t.status === 'done').length;
    
    lines.push(`**Progress:** ${done}/${task.subtasks.length} completed | ${inProgress} in-progress | ${pending} pending\n`);
    
    task.subtasks.forEach(subtask => {
      const icon = subtask.status === 'done' ? 'x' : 
                   subtask.status === 'in-progress' ? '>' : ' ';
      lines.push(`- [${icon}] **${subtask.id}** - ${subtask.title}`);
    });
  }
  
  // Suggested next action
  lines.push(`\n### Next Action`);
  if (task.status === 'done') {
    lines.push(`Task completed. No action needed.`);
  } else if (task.dependencies?.some(depId => {
    const dep = TaskQueries.findById(allTasks, depId);
    return dep && dep.status !== 'done';
  })) {
    lines.push(`Wait for dependencies to complete before starting.`);
  } else if (task.status === 'pending') {
    lines.push(`1. Run: \`cypher update ${task.id} status=in-progress\``);
    lines.push(`2. Run: \`cypher transmit ${task.id}\` to generate context`);
  } else {
    lines.push(`Continue implementation. When complete:`);
    lines.push(`- Run: \`cypher update ${task.id} status=done\``);
  }
  
  return lines.join('\n');
}

function findTasksBlockedBy(tasks: Task[], blockerId: string): Task[] {
  return TaskQueries.findDependents(tasks, blockerId).filter(
    task => task.status !== 'done'
  );
}

export async function show(taskId: string): Promise<void> {
  const engine = new TaskEngine();
  
  try {
    const task = await engine.getTaskById(taskId);
    if (!task) {
      console.log(`# Error\n\nTask with ID \`${taskId}\` not found.`);
      return;
    }
    const allTasks = await engine.readTasks();
    const output = await formatTaskDetail(task, allTasks);
    console.log(output);
  } catch (error: any) {
    console.log(`# Error\n\n${error.message}`);
  }
}