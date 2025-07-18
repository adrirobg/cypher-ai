import { GuideCommand } from './base/GuideCommand';

class LearnCommand extends GuideCommand {
  protected guideName = 'learn';
  protected description = 'Capture and evolve knowledge from task dialogues';
}

export const learnCommand = new LearnCommand().createCommand();