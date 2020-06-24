import { QuestionBase } from './question-base.model';

export class DropdownQuestion extends QuestionBase<string> {
  controlType = 'dropdown';
  options: Array<{ key: string; value: string }> = [];

  constructor(options: {} = {}) {
    super(options);
    this.options = options['options'] || [];
  }
}
