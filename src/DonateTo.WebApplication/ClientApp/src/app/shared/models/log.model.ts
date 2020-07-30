import { BaseModel } from './base.model';
import { AddressModel } from './address.model';
import { ContactModel } from './contact.model';

export class LogModel extends BaseModel {
  message: string;
  level: number;
  exception: string;
  logEvent: string;
  timeStamp: Date;
}
