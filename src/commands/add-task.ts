import { TaskEngine, Task } from '../core/TaskEngine';

interface AddTaskOptions {
  id: string;
  title: string;
  description: string;
  priority?: 'low' | 'medium' | 'high';
  dependencies?: string[];
}

export async function addTask(options: AddTaskOptions): Promise<void> {
  const taskEngine = new TaskEngine();

  // Validate required fields
  if (!options.id.trim()) {
    throw new Error('Task ID is required and cannot be empty.');
  }

  if (!options.title.trim()) {
    throw new Error('Task title is required and cannot be empty.');
  }

  if (!options.description.trim()) {
    throw new Error('Task description is required and cannot be empty.');
  }

  // Validate ID format (should be numeric or hierarchical like 1, 2.1, 3.2.5)
  const idPattern = /^\d+(\.\d+)*$/;
  if (!idPattern.test(options.id)) {
    throw new Error('Task ID must be numeric (e.g., "1", "2.1", "3.2.5").');
  }

  // Validate priority if provided
  if (options.priority && !['low', 'medium', 'high'].includes(options.priority)) {
    throw new Error('Priority must be one of: low, medium, high.');
  }

  // Validate dependencies if provided
  if (options.dependencies) {
    for (const dep of options.dependencies) {
      if (!idPattern.test(dep)) {
        throw new Error(`Invalid dependency ID format: ${dep}. Must be numeric (e.g., "1", "2.1").`);
      }
    }
  }

  // Create task object
  const task: Omit<Task, 'status'> = {
    id: options.id,
    title: options.title,
    description: options.description,
    ...(options.priority && { priority: options.priority }),
    ...(options.dependencies && options.dependencies.length > 0 && { dependencies: options.dependencies })
  };

  try {
    await taskEngine.addTask(task);
    console.log(`✅ Task ${options.id} added successfully.`);
    console.log(`   Title: ${options.title}`);
    console.log(`   Status: pending`);
    if (options.priority) {
      console.log(`   Priority: ${options.priority}`);
    }
    if (options.dependencies && options.dependencies.length > 0) {
      console.log(`   Dependencies: ${options.dependencies.join(', ')}`);
    }
  } catch (error: any) {
    throw new Error(`Failed to add task: ${error.message}`);
  }
}