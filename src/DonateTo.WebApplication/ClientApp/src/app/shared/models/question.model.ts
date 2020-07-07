import { BaseModel } from './base.model';
import { QuestionOptionModel } from './question-option.model';

export class QuestionModel extends BaseModel {
  key: string;
  label: string;
  required: boolean;
  order: number;
  controlType: string;
  type: string;
  options: QuestionOptionModel[];
}
