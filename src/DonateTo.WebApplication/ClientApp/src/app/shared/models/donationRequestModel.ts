import { BaseModel } from './baseModel';
import { OrganizationModel } from './organizationModel';
import { AddressModel } from './addressModel';
import { UserModel } from './userModel';
import { StatusModel } from './statusModel';
import { DonationRequestItemModel } from './donationRequestItemModel';
import { DonationRequestCategoryModel } from './donationRequestCategoryModel';

export class DonationRequestModel implements BaseModel {
  id: number;
  name: string;
  title: string;
  nullable: true;
  observation: string;
  priority: number;
  organizationId: number;
  organization: OrganizationModel;
  addressId: number;
  address: AddressModel;
  statusId: number;
  status: StatusModel;
  userId: number;
  user: UserModel;
  donationRequestItems: DonationRequestItemModel[];
  finishDate: Date;
  donationRequestCategories: DonationRequestCategoryModel[];
  createdBy: string;
  createdDate: Date;
  updateBy: string;
  updateDate: Date;
}
