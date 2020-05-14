import { BaseModel } from './baseModel';
import { DonationRequestItemCategoryModel } from './donationRequestItemCategoryModel';

export class DonationRequestItemModel extends BaseModel {
  name: string;
  observation: string;
  currentQuantity: number;
  finishQuantity: number;
  donationRequestItemCategories: DonationRequestItemCategoryModel[];
}
