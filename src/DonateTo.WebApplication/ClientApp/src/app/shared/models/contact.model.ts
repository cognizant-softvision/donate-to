import { BaseModel } from './base.model';

export class ContactModel extends BaseModel {
  firstName: string;
  lastName: string;
  email: string;
  identityNumber: string;
  phoneNumber: string;
  position: string;
  fullName: string;
}
