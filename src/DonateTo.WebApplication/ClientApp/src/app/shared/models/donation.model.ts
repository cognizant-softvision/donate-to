import { BaseModel } from './base.model';
import { OrganizationModel } from './organization.model';
import { AddressModel } from './address.model';
import { StatusModel } from './status.model';
import { DonationRequestItemModel } from './donation-request-item.model';
import { AvailabilityModel } from './availability.model';
import { DonationRequestModel } from './donation-request.model';

export class DonationModel extends BaseModel {
  observation?: string;
  organizationId?: number;
  organization?: OrganizationModel;
  donationRequestId: number;
  donationRequest?: DonationRequestModel;
  addressId: number;
  address?: AddressModel;
  statusId: number;
  status?: StatusModel;
  pickUpDate?: Date;
  donationItems?: DonationRequestItemModel[];
  availability?: AvailabilityModel[];
}
