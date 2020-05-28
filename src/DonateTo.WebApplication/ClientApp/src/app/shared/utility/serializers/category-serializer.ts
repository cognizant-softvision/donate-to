import {
  CategoryModel,
  DonationRequestCategoryModel,
  DonationRequestItemCategoryModel,
  DonationRequestItemModel,
  DonationRequestModel,
} from '../../models';

export class CategorySerializer {
  public ToDonationRequestCategories(
    donationRequest: DonationRequestModel,
    categories: CategoryModel[]
  ): DonationRequestCategoryModel[] {
    const donationRequestCategories: DonationRequestCategoryModel[] = [];

    categories.forEach((category) => {
      const donationRequestCategory = new DonationRequestCategoryModel();

      donationRequestCategory.category = category;
      donationRequestCategory.categoryId = category.id;
      donationRequestCategory.donationRequest = donationRequest;
      donationRequestCategory.donationRequestId = donationRequest.id;

      donationRequestCategories.push(donationRequestCategory);
    });

    return donationRequestCategories;
  }

  public ToDonationRequestItemCategories(
    donationItemRequest: DonationRequestItemModel,
    categories: CategoryModel[]
  ): DonationRequestItemCategoryModel[] {
    const donationRequestItemCategories: DonationRequestItemCategoryModel[] = [];

    categories.forEach((category) => {
      const donationRequestItemCategory = new DonationRequestItemCategoryModel();

      donationRequestItemCategory.category = category;
      donationRequestItemCategory.categoryId = category.id;
      donationRequestItemCategory.donationRequest = donationItemRequest;
      donationRequestItemCategory.donationRequestItemId = donationItemRequest.id;

      donationRequestItemCategories.push(donationRequestItemCategory);
    });

    return donationRequestItemCategories;
  }
}
