import * as fs from 'fs-extra';
import * as path from 'path';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'done' | 'blocked' | 'cancelled';
  priority?: 'low' | 'medium' | 'high';
  dependencies?: string[];
  subtasks?: Task[];
  context?: string;
  outputs?: string[];
}

export class TaskEngine {
  private tasksFilePath: string;

  constructor(tasksFilePath: string = path.resolve(process.cwd(), '.cypher/tasks.json')) {
    this.tasksFilePath = tasksFilePath;
  }

  public async readTasks(): Promise<Task[]> {
    try {
      const data = await fs.readFile(this.tasksFilePath, 'utf8');
      return JSON.parse(data) as Task[];
    } catch (error: any) {
      if (error.code === 'ENOENT') {
        console.warn(`Tasks file not found at ${this.tasksFilePath}. Returning empty array.`);
        return [];
      }
      throw new Error(`Failed to read tasks: ${error.message}`);
    }
  }

  public async getTaskById(id: string): Promise<Task | null> {
    const tasks = await this.readTasks();
    const findTask = (currentTasks: Task[]): Task | null => {
      for (const task of currentTasks) {
        if (task.id === id) {
          return task;
        }
        if (task.subtasks) {
          const found = findTask(task.subtasks);
          if (found) {
            return found;
          }
        }
      }
      return null;
    };
    return findTask(tasks);
  }

  public async writeTasks(tasks: Task[]): Promise<void> {
    try {
      await fs.writeFile(this.tasksFilePath, JSON.stringify(tasks, null, 2), 'utf8');
    } catch (error: any) {
      throw new Error(`Failed to write tasks: ${error.message}`);
    }
  }

  public async updateTask(id: string, updates: Partial<Task>): Promise<void> {
    let tasks = await this.readTasks();
    let updated = false;

    const updateRecursive = (currentTasks: Task[]): Task[] => {
      return currentTasks.map(task => {
        if (task.id === id) {
          updated = true;
          return { ...task, ...updates };
        }
        if (task.subtasks) {
          return { ...task, subtasks: updateRecursive(task.subtasks) };
        }
        return task;
      });
    };

    tasks = updateRecursive(tasks);

    if (!updated) {
      throw new Error(`Task with ID ${id} not found.`);
    }

    await this.writeTasks(tasks);
  }
}
