import { BaseModel } from './base.model';
import { QuestionOption } from './question-option.modal';

export class QuestionModel extends BaseModel {
  key: string;
  label: string;
  required: boolean;
  order: number;
  controlType: string;
  type: string;
  options: QuestionOption[];
}
