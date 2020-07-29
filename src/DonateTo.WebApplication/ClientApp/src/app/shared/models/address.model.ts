import { BaseModel } from './base.model';
import { ContactModel } from './contact.model';
import { CountryModel } from './country.model';
import { StateModel } from './state.model';
import { CityModel } from './city.model';
import { OrganizationModel } from './organization.model';

export class AddressModel extends BaseModel {
  street: string;
  postalCode: string;
  floor: string;
  appartment: string;
  additionalInformation: string;
  isDefault: boolean;
  countryId: number;
  country: CountryModel;
  stateId: number;
  state: StateModel;
  cityId: number;
  city: CityModel;
  contactId: number;
  contact: ContactModel;
  organizationId: number;
  organization: OrganizationModel;
}
