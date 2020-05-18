import { CategoryModel } from './category.model';
import { DonationRequestItemModel } from './donation-request-item.model';

export class DonationRequestItemCategoryModel {
  donationRequestItemId: number;
  donationRequest: DonationRequestItemModel;
  categoryId: number;
  category: CategoryModel;
}
