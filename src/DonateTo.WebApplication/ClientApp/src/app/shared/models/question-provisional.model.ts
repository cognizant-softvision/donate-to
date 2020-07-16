import { BaseModel } from './base.model';
import { QuestionOption } from './question-option.modal';
import { ControlTypeModel } from './control-type.model';

export class Question extends BaseModel {
  key: string;
  label: string;
  required: boolean;
  order: number;
  type: string;
  options: QuestionOption[];
  controlType: ControlTypeModel;
}
