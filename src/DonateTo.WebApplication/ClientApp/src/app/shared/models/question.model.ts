import { BaseModel } from './base.model';

export class Question extends BaseModel {
  key: string;
  label: string;
  required: boolean;
  order: number;
  controlType: string;
  type: string;
  options: Array<{ key: string; value: string }>;
}
