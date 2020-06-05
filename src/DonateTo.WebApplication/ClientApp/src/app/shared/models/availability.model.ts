import { BaseModel } from './base.model';
import { Time } from '@angular/common';

export class AvailabilityModel extends BaseModel {
  dayOfWeek: number;
  startTime: Time;
  endTime: Time;
}
