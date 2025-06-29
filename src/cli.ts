#!/usr/bin/env node

import { Command } from 'commander';
import { readFileSync } from 'fs';
import { join } from 'path';
import { decode } from './commands/decode';
import { transmit } from './commands/transmit';
import { update } from './commands/update';
import { validate } from './commands/validate';
import { next } from './commands/next';
import { research } from './commands/research';

const packageJson = JSON.parse(
  readFileSync(join(__dirname, '../package.json'), 'utf-8')
);

const program = new Command();

program
  .name('cypher')
  .description(packageJson.description)
  .version(packageJson.version);

program
  .command('decode [task-id]')
  .description('Display task details or list all tasks')
  .action(async (taskId?: string) => {
    try {
      await decode(taskId);
    } catch (error) {
      console.error('Error executing decode command:', error);
      process.exit(1);
    }
  });

program
  .command('transmit <task-id>')
  .description('Generate pre-flight context for a task')
  .action(async (taskId: string) => {
    try {
      await transmit(taskId);
    } catch (error) {
      console.error('Error executing transmit command:', error);
      process.exit(1);
    }
  });

program
  .command('update <task-id> [updates...]')
  .description('Update task properties (e.g., status=done priority=high)')
  .action(async (taskId: string, updates: string[]) => {
    try {
      // Parse key=value pairs into an object
      const updateObject: Record<string, string> = {};
      
      for (const update of updates) {
        const [key, value] = update.split('=');
        if (key && value) {
          updateObject[key] = value;
        } else {
          console.error(`Invalid update format: ${update}. Use key=value format.`);
          process.exit(1);
        }
      }
      
      await update(taskId, updateObject);
    } catch (error) {
      console.error('Error executing update command:', error);
      process.exit(1);
    }
  });

program
  .command('next')
  .description('Get next pending task')
  .action(async () => {
    try {
      await next();
    } catch (error) {
      console.error('Error executing next command:', error);
      process.exit(1);
    }
  });

program
  .command('validate')
  .description('Validate tasks.json structure')
  .option('-f, --fix', 'Automatically fix fixable issues')
  .action(async (options) => {
    try {
      await validate({ fix: options.fix });
    } catch (error) {
      console.error('Error executing validate command:', error);
      process.exit(1);
    }
  });

program
  .command('research <query>')
  .description('Research a topic with multiple AI perspectives')
  .option('-p, --perspectives <perspectives>', 'Comma-separated list of perspectives (default: architecture,security,performance)')
  .option('-t, --task <taskId>', 'Research in context of a specific task')
  .action(async (query: string, options) => {
    try {
      const perspectives = options.perspectives 
        ? options.perspectives.split(',').map((p: string) => p.trim())
        : undefined;
      
      await research(query, {
        perspectives,
        task: options.task
      });
    } catch (error) {
      console.error('Error executing research command:', error);
      process.exit(1);
    }
  });

program.parse();

export { program };