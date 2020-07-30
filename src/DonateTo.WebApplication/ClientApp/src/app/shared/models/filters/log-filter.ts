import { BaseFilter } from './base-filter';

export class LogFilter extends BaseFilter {
  message: string;
  level: number;
  exception: string;
  // logEvent: string;
  timeStampBegin: Date;
  timeStampEnd: Date;
}
