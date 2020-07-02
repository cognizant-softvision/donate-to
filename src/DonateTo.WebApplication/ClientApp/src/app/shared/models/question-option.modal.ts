import { BaseModel } from './base.model';

export class QuestionOption extends BaseModel {
  key: string;
  value: string;
  questionId: number;
}
