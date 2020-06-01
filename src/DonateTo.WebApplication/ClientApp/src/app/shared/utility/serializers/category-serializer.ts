import { CategoryModel, DonationRequestCategoryModel, DonationRequestItemCategoryModel } from '../../models';

export class CategorySerializer {
  public ToDonationRequestCategories(categories: CategoryModel[]): DonationRequestCategoryModel[] {
    const donationRequestCategories: DonationRequestCategoryModel[] = [];

    categories.forEach((category) => {
      const donationRequestCategory = new DonationRequestCategoryModel();

      donationRequestCategory.categoryId = category.id;

      donationRequestCategories.push(donationRequestCategory);
    });

    return donationRequestCategories;
  }

  public ToDonationRequestItemCategories(categories: CategoryModel[]): DonationRequestItemCategoryModel[] {
    const donationRequestItemCategories: DonationRequestItemCategoryModel[] = [];

    categories.forEach((category) => {
      const donationRequestItemCategory = new DonationRequestItemCategoryModel();

      donationRequestItemCategory.categoryId = category.id;

      donationRequestItemCategories.push(donationRequestItemCategory);
    });

    return donationRequestItemCategories;
  }
}
