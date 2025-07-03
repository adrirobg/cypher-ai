import { TaskEngine, Task } from '../core/TaskEngine';

const VALID_STATUSES = ['pending', 'in-progress', 'done', 'blocked', 'cancelled'];
const VALID_PRIORITIES = ['low', 'medium', 'high'];

export async function update(taskId: string, updates: Record<string, any>, options?: { isJsonBatch?: boolean }): Promise<void> {
  try {
    const engine = new TaskEngine();
    const task = await engine.getTaskById(taskId);
    
    if (!task) {
      console.log(`# Error: Task ${taskId} not found`);
      return;
    }

    const before = { ...task };
    const processedUpdates: Record<string, any> = {};
    const errors: string[] = [];

    // Check if this is a JSON batch update (contains subtasks and complex structures)
    const isJsonBatchUpdate = options?.isJsonBatch || updates.hasOwnProperty('subtasks');

    for (const [key, value] of Object.entries(updates)) {
      switch (key) {
        case 'status':
          if (!VALID_STATUSES.includes(value)) {
            errors.push(`Invalid status '${value}'. Must be one of: ${VALID_STATUSES.join(', ')}`);
          } else {
            processedUpdates.status = value;
          }
          break;
          
        case 'priority':
          if (value && !VALID_PRIORITIES.includes(value)) {
            errors.push(`Invalid priority '${value}'. Must be one of: ${VALID_PRIORITIES.join(', ')}`);
          } else {
            processedUpdates.priority = value || undefined;
          }
          break;
          
        case 'dependencies':
          if (typeof value === 'string') {
            processedUpdates.dependencies = value.split(',').map(d => d.trim()).filter(Boolean);
          } else if (Array.isArray(value)) {
            processedUpdates.dependencies = value;
          } else {
            errors.push(`Dependencies must be a comma-separated string or array`);
          }
          break;
          
        case 'id':
          errors.push(`Cannot update '${key}' field directly`);
          break;
          
        case 'subtasks':
          if (!options?.isJsonBatch && !Array.isArray(value)) {
            errors.push(`Cannot update 'subtasks' field directly. Use --json flag for batch updates.`);
            break;
          }
          
          // Validate subtasks structure
          const subtaskErrors = validateSubtasks(value);
          if (subtaskErrors.length > 0) {
            errors.push(...subtaskErrors);
          } else {
            processedUpdates.subtasks = value;
          }
          break;
          
        default:
          processedUpdates[key] = value;
      }
    }

    if (errors.length > 0) {
      console.log('# Update Errors\n');
      errors.forEach(err => console.log(`- ${err}`));
      return;
    }

    if (Object.keys(processedUpdates).length === 0) {
      console.log('# No valid updates provided');
      return;
    }

    await engine.updateTask(taskId, processedUpdates);
    const after = await engine.getTaskById(taskId);

    console.log(`# Task ${taskId} Updated\n`);
    console.log('## Changes\n');
    
    for (const [key, newValue] of Object.entries(processedUpdates)) {
      const oldValue = before[key as keyof typeof before];
      console.log(`### ${key}`);
      console.log(`- **Before:** ${formatValue(oldValue)}`);
      console.log(`- **After:** ${formatValue(newValue)}\n`);
    }

    console.log('## Current State\n');
    console.log(`- **ID:** ${after!.id}`);
    console.log(`- **Title:** ${after!.title}`);
    console.log(`- **Status:** ${after!.status}`);
    if (after!.priority) console.log(`- **Priority:** ${after!.priority}`);
    if (after!.dependencies?.length) {
      console.log(`- **Dependencies:** ${after!.dependencies.join(', ')}`);
    }
    if (after!.subtasks?.length) {
      console.log(`- **Subtasks:** ${after!.subtasks.length} subtasks`);
    }

  } catch (error) {
    console.log(`# Error updating task: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

function validateSubtasks(subtasks: any): string[] {
  const errors: string[] = [];
  
  if (!Array.isArray(subtasks)) {
    errors.push('Subtasks must be an array');
    return errors;
  }

  const seenIds = new Set<string>();
  
  for (let i = 0; i < subtasks.length; i++) {
    const subtask = subtasks[i];
    const prefix = `Subtask ${i + 1}`;
    
    // Check required fields
    if (!subtask.id || typeof subtask.id !== 'string') {
      errors.push(`${prefix}: Missing or invalid 'id' field`);
    } else if (seenIds.has(subtask.id)) {
      errors.push(`${prefix}: Duplicate subtask ID '${subtask.id}'`);
    } else {
      seenIds.add(subtask.id);
    }
    
    if (!subtask.title || typeof subtask.title !== 'string') {
      errors.push(`${prefix}: Missing or invalid 'title' field`);
    }
    
    if (!subtask.description || typeof subtask.description !== 'string') {
      errors.push(`${prefix}: Missing or invalid 'description' field`);
    }
    
    if (!subtask.status || !VALID_STATUSES.includes(subtask.status)) {
      errors.push(`${prefix}: Invalid 'status' field. Must be one of: ${VALID_STATUSES.join(', ')}`);
    }
    
    // Check optional fields
    if (subtask.priority && !VALID_PRIORITIES.includes(subtask.priority)) {
      errors.push(`${prefix}: Invalid 'priority' field. Must be one of: ${VALID_PRIORITIES.join(', ')}`);
    }
    
    if (subtask.dependencies && !Array.isArray(subtask.dependencies)) {
      errors.push(`${prefix}: 'dependencies' field must be an array`);
    }
    
    // Recursively validate nested subtasks
    if (subtask.subtasks) {
      const nestedErrors = validateSubtasks(subtask.subtasks);
      errors.push(...nestedErrors.map(err => `${prefix} -> ${err}`));
    }
  }
  
  return errors;
}

function formatValue(value: any): string {
  if (value === undefined || value === null) return 'none';
  if (Array.isArray(value)) return value.length ? value.join(', ') : 'none';
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
}