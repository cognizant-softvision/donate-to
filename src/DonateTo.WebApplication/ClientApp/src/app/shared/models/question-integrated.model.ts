import { QuestionBase } from './question-base.model';

export class IntegratedQuestion extends QuestionBase<string> {
  options: Array<{ key: string; value: string }> = [];

  constructor(options: {} = {}) {
    super(options);
    this.options = options['options'] || [];
  }
}
