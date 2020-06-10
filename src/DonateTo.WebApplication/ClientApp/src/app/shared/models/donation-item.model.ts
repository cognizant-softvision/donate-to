import { BaseModel } from './base.model';
import { DonationRequestItemModel } from './donation-request-item.model';
import { DonationModel } from './donation.model';
import { UnitModel } from './unit.model';
import { StatusModel } from './status.model';

export class DonationItemModel extends BaseModel {
  quantity: number;
  donationId: number;
  donation: DonationModel;
  donationRequestItemId: number;
  donationRequestItem: DonationRequestItemModel;
  unitId: number;
  unit: UnitModel;
  statusId: number;
  status: StatusModel;
}
