import { BaseModel } from './base.model';

export class QuestionOption extends BaseModel {
  label: string;
  value: string;
  weight: number;
}
