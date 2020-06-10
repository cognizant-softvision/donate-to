import { BaseModel } from './base.model';
import { AddressModel } from './address.model';
import { StatusModel } from './status.model';
import { AvailabilityModel } from './availability.model';
import { DonationRequestModel } from './donation-request.model';
import { DonationItemModel } from './donation-item.model';

export class DonationModel extends BaseModel {
  observation?: string;
  donationRequestId: number;
  donationRequest?: DonationRequestModel;
  addressId: number;
  address?: AddressModel;
  statusId: number;
  status?: StatusModel;
  pickUpDate?: Date;
  donationItems?: DonationItemModel[];
  availabilities?: AvailabilityModel[];
}
