import { BaseModel } from './base.model';

export class LogModel extends BaseModel {
  message: string;
  level: number;
  exception: string;
  logEvent: string;
  timeStamp: Date;
}
