import { DonationRequestModel } from './donation-request.model';
import { CategoryModel } from './category.model';

export class DonationRequestCategoryModel {
  donationRequestId: number;
  donationRequest: DonationRequestModel;
  categoryId: number;
  category: CategoryModel;
}
