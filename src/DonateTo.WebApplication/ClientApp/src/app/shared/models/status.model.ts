import { BaseModel } from './base.model';

export class StatusModel extends BaseModel {
  name: string;
  description: string;
}

export enum Status {
  Draft = 1,
  Pending,
  Completed,
  Rejected,
}
