import { BaseModel } from './base.model';
import { DonationRequestItemCategoryModel } from './donation-request-item-category.model';

export class DonationRequestItemModel extends BaseModel {
  name: string;
  observation: string;
  currentQuantity: number;
  finishQuantity: number;
  unit: string;
  donationRequestItemCategories: DonationRequestItemCategoryModel[];
}
