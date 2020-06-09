import { BaseModel } from './base.model';
import { DonationRequestItemModel } from './donation-request-item.model';

export class DonationItemModel extends BaseModel {
  item: DonationRequestItemModel;
  quantityToDonate: number;
}
