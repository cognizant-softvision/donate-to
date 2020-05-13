import { BaseModel } from './baseModel';
import { DonationRequestItemCategoryModel } from './donationRequestItemCategoryModel';

export class DonationRequestItemModel implements BaseModel {
  name: string;
  observation: string;
  currentQuantity: number;
  finishQuantity: number;
  donationRequestItemCategories: DonationRequestItemCategoryModel[];
  id: number;
  createdBy: string;
  createdDate: string;
  updateBy: string;
  updateDate: string;
}
