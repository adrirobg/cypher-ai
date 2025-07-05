import { Task } from './TaskEngine';

/**
 * TaskQueries: Centralized query functions for task operations
 * Eliminates duplication across commands while maintaining simplicity
 */
export class TaskQueries {
  /**
   * Find a task by ID in a task tree
   */
  static findById(tasks: Task[], id: string): Task | null {
    for (const task of tasks) {
      if (task.id === id) return task;
      if (task.subtasks) {
        const found = this.findById(task.subtasks, id);
        if (found) return found;
      }
    }
    return null;
  }

  /**
   * Get the parent task of a given task ID
   */
  static getParent(tasks: Task[], taskId: string): Task | null {
    for (const task of tasks) {
      if (task.subtasks) {
        for (const subtask of task.subtasks) {
          if (subtask.id === taskId) return task;
          if (subtask.subtasks) {
            const found = this.getParent(subtask.subtasks, taskId);
            if (found) return found;
          }
        }
      }
    }
    return null;
  }

  /**
   * Get sibling tasks (tasks at the same level with the same parent)
   */
  static getSiblings(tasks: Task[], taskId: string): Task[] {
    const parent = this.getParent(tasks, taskId);
    if (parent && parent.subtasks) {
      return parent.subtasks.filter(t => t.id !== taskId);
    }
    // For root tasks, siblings are other root tasks
    return tasks.filter(t => t.id !== taskId);
  }

  /**
   * Flatten a task tree into a single array
   */
  static flatten(tasks: Task[]): Task[] {
    const result: Task[] = [];
    
    const processTask = (task: Task) => {
      result.push(task);
      if (task.subtasks) {
        task.subtasks.forEach(processTask);
      }
    };
    
    tasks.forEach(processTask);
    return result;
  }

  /**
   * Traverse tasks with a visitor function
   * Useful for filtering, transforming, or collecting data
   */
  static traverseWithVisitor<T>(
    tasks: Task[], 
    visitor: (task: Task, depth: number, parent?: Task) => T | undefined
  ): T[] {
    const results: T[] = [];
    
    const traverse = (taskList: Task[], depth: number, parent?: Task) => {
      for (const task of taskList) {
        const result = visitor(task, depth, parent);
        if (result !== undefined) {
          results.push(result);
        }
        if (task.subtasks) {
          traverse(task.subtasks, depth + 1, task);
        }
      }
    };
    
    traverse(tasks, 0);
    return results;
  }

  /**
   * Filter tasks based on criteria
   */
  static filter(tasks: Task[], predicate: (task: Task) => boolean): Task[] {
    const filtered: Task[] = [];
    
    const processTask = (task: Task) => {
      if (predicate(task)) {
        filtered.push(task);
      }
      if (task.subtasks) {
        task.subtasks.forEach(processTask);
      }
    };
    
    tasks.forEach(processTask);
    return filtered;
  }

  /**
   * Find tasks that depend on a given task ID
   */
  static findDependents(tasks: Task[], taskId: string): Task[] {
    return this.filter(tasks, task => 
      task.dependencies?.includes(taskId) || false
    );
  }

  /**
   * Check if a task is blocked by unfinished dependencies
   */
  static isBlocked(task: Task, allTasks: Task[]): boolean {
    if (!task.dependencies?.length) return false;
    
    return task.dependencies.some(depId => {
      const dep = this.findById(allTasks, depId);
      return dep && dep.status !== 'done';
    });
  }

  /**
   * Count tasks by status in a task tree
   */
  static countByStatus(tasks: Task[]): Record<string, number> {
    const counts: Record<string, number> = {
      pending: 0,
      'in-progress': 0,
      done: 0
    };
    
    const countTask = (task: Task) => {
      counts[task.status] = (counts[task.status] || 0) + 1;
      if (task.subtasks) {
        task.subtasks.forEach(countTask);
      }
    };
    
    tasks.forEach(countTask);
    return counts;
  }

  /**
   * Get all unique task IDs (useful for validation)
   */
  static getAllIds(tasks: Task[]): string[] {
    return this.traverseWithVisitor(tasks, (task) => task.id);
  }

  /**
   * Find duplicate IDs in the task tree
   */
  static findDuplicateIds(tasks: Task[]): string[] {
    const ids = this.getAllIds(tasks);
    const seen = new Set<string>();
    const duplicates = new Set<string>();
    
    for (const id of ids) {
      if (seen.has(id)) {
        duplicates.add(id);
      }
      seen.add(id);
    }
    
    return Array.from(duplicates);
  }
}