import { BaseModel } from './base.model';
import { DonationRequestItemCategoryModel } from './donation-request-item-category.model';
import { UnitModel } from './unit.model';

export class DonationRequestItemModel extends BaseModel {
  name: string;
  observation: string;
  currentQuantity: number;
  finishQuantity: number;
  unitId: number;
  unit: UnitModel;
  donationRequestItemCategories: DonationRequestItemCategoryModel[];
}
