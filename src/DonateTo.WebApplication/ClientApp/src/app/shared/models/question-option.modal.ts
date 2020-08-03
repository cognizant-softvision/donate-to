import { BaseModel } from './base.model';

export class QuestionOption extends BaseModel {
  label: string;
  value: string;
  weight: number;
  questionId: number;
  minimumRelative: number;
  maximumRelative: number;
}
