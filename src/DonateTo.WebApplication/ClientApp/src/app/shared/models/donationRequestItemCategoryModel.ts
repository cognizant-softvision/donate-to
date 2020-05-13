import { CategoryModel } from './categoryModel';
import { DonationRequestItemModel } from './donationRequestItemModel';

export class DonationRequestItemCategoryModel {
  donationRequestItemId: number;
  donationRequest: DonationRequestItemModel;
  categoryId: number;
  category: CategoryModel;
}
