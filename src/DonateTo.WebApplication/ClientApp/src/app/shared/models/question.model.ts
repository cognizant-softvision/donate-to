import { BaseModel } from './base.model';
import { QuestionOption } from './question-option.modal';
import { ControlTypeModel } from './control-type.model';

export class QuestionModel extends BaseModel {
  key: string;
  label: string;
  order: number;
  placeholder: string;
  weight: number;
  defaultValue: string;
  controlType: ControlTypeModel;
  options: QuestionOption[];
}
