import { BaseModel } from './base.model';

export class AvailabilityModel extends BaseModel {
  dayOfWeek: number;
  startTime: Date;
  endTime: Date;
}
