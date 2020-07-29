import { BaseModel } from './base.model';
import { AddressModel } from './address.model';
import { ContactModel } from './contact.model';

export class LogModel extends BaseModel {
  name: string;
  description: string;
  contact: ContactModel;
  addresses: AddressModel[];
}
