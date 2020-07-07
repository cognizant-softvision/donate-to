import { BaseModel } from './base.model';
import { OrganizationModel } from './organization.model';
import { AddressModel } from './address.model';
import { StatusModel } from './status.model';
import { DonationRequestItemModel } from './donation-request-item.model';
import { DonationRequestCategoryModel } from './donation-request-category.model';
import { UserModel } from './user.model';

export class DonationRequestModel extends BaseModel {
  title: string;
  observation: string;
  priority: number;
  organizationId: number;
  organization: OrganizationModel;
  addressId: number;
  address: AddressModel;
  statusId: number;
  status: StatusModel;
  ownerId: number;
  owner: UserModel;
  donationRequestItems: DonationRequestItemModel[];
  finishDate: Date;
  donationRequestCategories: DonationRequestCategoryModel[];
}
