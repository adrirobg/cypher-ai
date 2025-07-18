import { GuideCommand } from './base/GuideCommand';

class ValidateCommand extends GuideCommand {
  protected guideName = 'validate';
  protected description = 'Validate task implementation with exhaustive checks';
}

export const validateCommand = new ValidateCommand().createCommand();