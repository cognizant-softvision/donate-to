import { BaseModel } from './base.model';
import { ControlTypeModel } from './control-type.model';

export class QuestionModel extends BaseModel {
  key: string;
  label: string;
  order: number;
  controlType: ControlTypeModel;
  placeholder: string;
  weight: number;
  defaultValue: string;
}
