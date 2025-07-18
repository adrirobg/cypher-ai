import { GuideCommand } from './base/GuideCommand';

class ContextCommand extends GuideCommand {
  protected guideName = 'context';
  protected description = 'Build comprehensive context for task execution';
}

export const contextCommand = new ContextCommand().createCommand();