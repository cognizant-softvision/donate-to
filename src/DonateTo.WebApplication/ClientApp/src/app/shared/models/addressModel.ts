import { BaseModel } from './baseModel';

export class AddressModel implements BaseModel {
  street: string;
  state: string;
  postalCode: string;
  country: string;
  appartment: string;
  email: string;
  additionalInformation: string;
  responsableInformation: string;
  responsableIdentityNumber: string;
  isDefault: boolean;
  id: number;
  createdBy: string;
  createdDate: string;
  updateBy: string;
  updateDate: string;
}
