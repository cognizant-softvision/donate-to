import { BaseModel } from './baseModel';
import { DonationRequestModel } from './donationRequestModel';
import { CategoryModel } from './categoryModel';

export class DonationRequestCategoryModel {
  donationRequestId: number;
  donationRequest: DonationRequestModel;
  categoryId: number;
  category: CategoryModel;
}
