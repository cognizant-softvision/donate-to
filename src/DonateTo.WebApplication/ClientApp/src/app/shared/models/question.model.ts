import { BaseModel } from './base.model';
import { QuestionOption } from './question-option.modal';
import { ControlTypeModel } from './control-type.model';

export class QuestionModel extends BaseModel {
  key: string;
  label: string;
  order: number;
  controlType: ControlTypeModel;
  placeholder: string;
  defaultValue: string;
  controlTypeId: number;
  weight: number;
  options: QuestionOption[];
}
