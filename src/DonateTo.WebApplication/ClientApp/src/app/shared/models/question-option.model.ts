import { BaseModel } from './base.model';

export class QuestionOptionModel extends BaseModel {
  key: string;
  value: string;
  questionId: number;
}
