import { BaseModel } from './base.model';
import { QuestionOption } from './question-option.modal';

export class QuestionModel extends BaseModel {
  label: string;
  order: number;
  controlType: string;
  placeholder: string;
  weight: number;
  defaultValue: string;
  options: QuestionOption[];
}
