import { BaseModel } from './base.model';

export class AddressModel extends BaseModel {
  street: string;
  state: string;
  floor: string;
  cityId: number;
  stateId: number;
  countryId: number;
  postalCode: string;
  country: string;
  appartment: string;
  additionalInformation: string;
  responsableInformation: string;
  responsableIdentityNumber: string;
  isDefault: boolean;
}
