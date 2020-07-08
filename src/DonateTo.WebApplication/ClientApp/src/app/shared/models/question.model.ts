import { BaseModel } from './base.model';
export class QuestionModel extends BaseModel {
  label: string;
  order: number;
  controlType: string;
  placeholder: string;
  weight: number;
  defaultValue: string;
}
