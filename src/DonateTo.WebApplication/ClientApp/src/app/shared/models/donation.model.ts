import { BaseModel } from './base.model';
import { AddressModel } from './address.model';
import { StatusModel } from './status.model';
import { AvailabilityModel } from './availability.model';
import { DonationRequestModel } from './donation-request.model';
import { DonationItemModel } from './donation-item.model';
import { UserModel } from './user.model';

export class DonationModel extends BaseModel {
  donationId?: number;
  observation?: string;
  donationRequestId: number;
  donationRequest?: DonationRequestModel;
  addressId: number;
  address?: AddressModel;
  statusId: number;
  status?: StatusModel;
  pickUpDate?: Date;
  ownerId: number;
  owner: UserModel;
  donationItems?: DonationItemModel[];
  availabilities?: AvailabilityModel[];
}
