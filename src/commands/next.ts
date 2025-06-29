import { TaskEngine, Task } from '../core/TaskEngine';

const PRIORITY_WEIGHT = { high: 3, medium: 2, low: 1 };

export async function next() {
  const engine = new TaskEngine();
  const allTasks = await engine.readTasks();
  
  const flattenedTasks = flattenTasks(allTasks);
  const eligibleTasks = flattenedTasks.filter(isEligible(flattenedTasks));
  
  if (eligibleTasks.length === 0) {
    console.log('## No Eligible Tasks\n');
    console.log('All tasks are either completed, blocked, or have unfinished dependencies.');
    console.log('\nConsider:');
    console.log('- Checking blocked tasks to see if they can be unblocked');
    console.log('- Reviewing completed tasks for follow-up work');
    return;
  }
  
  const sortedTasks = sortTasks(eligibleTasks);
  const nextTask = sortedTasks[0];
  
  displayNextTask(nextTask);
}

function flattenTasks(tasks: Task[]): Task[] {
  const flattened: Task[] = [];
  
  const processTask = (task: Task) => {
    flattened.push(task);
    if (task.subtasks) {
      task.subtasks.forEach(processTask);
    }
  };
  
  tasks.forEach(processTask);
  return flattened;
}

function isEligible(allTasks: Task[]) {
  return (task: Task): boolean => {
    if (task.status !== 'pending' && task.status !== 'in-progress') {
      return false;
    }
    
    if (!task.dependencies || task.dependencies.length === 0) {
      return true;
    }
    
    return task.dependencies.every(depId => {
      const dep = allTasks.find(t => t.id === depId);
      return dep && dep.status === 'done';
    });
  };
}

function sortTasks(tasks: Task[]): Task[] {
  return tasks.sort((a, b) => {
    const priorityA = PRIORITY_WEIGHT[a.priority || 'medium'];
    const priorityB = PRIORITY_WEIGHT[b.priority || 'medium'];
    
    if (priorityA !== priorityB) {
      return priorityB - priorityA;
    }
    
    return a.id.localeCompare(b.id);
  });
}

function displayNextTask(task: Task) {
  console.log('## Next Task\n');
  console.log(`**ID:** ${task.id}`);
  console.log(`**Title:** ${task.title}`);
  console.log(`**Status:** ${task.status}`);
  console.log(`**Priority:** ${task.priority || 'medium'}\n`);
  
  if (task.description) {
    console.log('**Description:**');
    console.log(task.description + '\n');
  }
  
  if (task.dependencies && task.dependencies.length > 0) {
    console.log(`**Dependencies:** ${task.dependencies.join(', ')} (all completed)\n`);
  }
  
  if (task.executionHint) {
    console.log('### Execution Strategy\n');
    console.log(`**Strategy:** ${task.executionHint.strategy || 'direct'}`);
    
    if (task.executionHint.strategy === 'supervisor-executor') {
      console.log('> This task is designed for supervisor-executor pattern.');
      console.log('> Consider using subagents for better task decomposition and execution.\n');
    } else {
      console.log();
    }
  }
  
  console.log('### Suggested Actions\n');
  
  if (task.status === 'pending') {
    console.log(`1. Mark as in-progress: \`cypher update ${task.id} in-progress\``);
    console.log(`2. Generate context: \`cypher transmit ${task.id}\``);
  } else {
    console.log(`1. Generate context: \`cypher transmit ${task.id}\``);
    console.log(`2. Complete task: \`cypher update ${task.id} done\``);
  }
  
  console.log(`3. View full details: \`cypher decode ${task.id}\``);
}