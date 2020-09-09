import { BaseModel } from './base.model';
import { AddressModel } from './address.model';
import { ContactModel } from './contact.model';
import { UserOrganizationModel } from './user-organization.model';

export class OrganizationModel extends BaseModel {
  name: string;
  description: string;
  contact: ContactModel;
  addresses: AddressModel[];
  userOrganizations: UserOrganizationModel[];
}
