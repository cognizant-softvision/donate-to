import { BaseModel } from './baseModel';

export class StatusModel implements BaseModel {
  name: string;
  description: string;
  id: number;
  createdBy: string;
  createdDate: string;
  updateBy: string;
  updateDate: string;
}
