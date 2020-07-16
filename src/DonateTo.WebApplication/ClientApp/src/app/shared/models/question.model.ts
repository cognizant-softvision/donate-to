import { BaseModel } from './base.model';
import { QuestionOption } from './question-option.modal';
import { ControlTypeModel } from './control-type.model';

export class QuestionModel extends BaseModel {
  key: string;
  label: string;
  required: boolean;
  order: number;
  controlType: ControlTypeModel;
  type: string;
  options: QuestionOption[];
}
