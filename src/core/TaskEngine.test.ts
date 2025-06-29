import { TaskEngine, Task } from './TaskEngine';
import * as fs from 'fs-extra';
import * as path from 'path';

describe('TaskEngine', () => {
  const testTasksFilePath = path.resolve(__dirname, '..', '.cypher/test_tasks.json');
  const originalTasks = [
    {
      id: '1',
      title: 'Task 1',
      description: 'Description 1',
      status: 'pending',
      subtasks: [
        { id: '1.1', title: 'Subtask 1.1', description: 'Subdescription 1.1', status: 'pending' },
      ],
    },
    { id: '2', title: 'Task 2', description: 'Description 2', status: 'in-progress' },
  ];

  let taskEngine: TaskEngine;

  beforeEach(async () => {
    await fs.ensureDir(path.dirname(testTasksFilePath));
    await fs.writeFile(testTasksFilePath, JSON.stringify(originalTasks, null, 2));
    taskEngine = new TaskEngine(testTasksFilePath);
  });

  afterEach(async () => {
    await fs.remove(testTasksFilePath);
  });

  it('should read all tasks correctly', async () => {
    const tasks = await taskEngine.readTasks();
    expect(tasks).toEqual(originalTasks);
  });

  it('should return an empty array if tasks file does not exist', async () => {
    await fs.remove(testTasksFilePath);
    const tasks = await taskEngine.readTasks();
    expect(tasks).toEqual([]);
  });

  it('should get a task by its ID', async () => {
    const task = await taskEngine.getTaskById('1');
    expect(task).toEqual(originalTasks[0]);
  });

  it('should get a subtask by its ID', async () => {
    const subtask = await taskEngine.getTaskById('1.1');
    expect(subtask).toEqual(originalTasks[0].subtasks![0]);
  });

  it('should return null if task ID is not found', async () => {
    const task = await taskEngine.getTaskById('999');
    expect(task).toBeNull();
  });

  it('should write tasks correctly', async () => {
    const newTasks: Task[] = [{ id: '3', title: 'Task 3', description: 'Description 3', status: 'done' }];
    await taskEngine.writeTasks(newTasks);
    const tasks = await taskEngine.readTasks();
    expect(tasks).toEqual(newTasks);
  });

  it('should update an existing task', async () => {
    await taskEngine.updateTask('2', { status: 'done' });
    const updatedTask = await taskEngine.getTaskById('2');
    expect(updatedTask?.status).toBe('done');
  });

  it('should update an existing subtask', async () => {
    await taskEngine.updateTask('1.1', { status: 'done' });
    const updatedSubtask = await taskEngine.getTaskById('1.1');
    expect(updatedSubtask?.status).toBe('done');
  });

  it('should throw an error if task to update is not found', async () => {
    await expect(taskEngine.updateTask('999', { status: 'done' })).rejects.toThrow(
      'Task with ID 999 not found.'
    );
  });
});
