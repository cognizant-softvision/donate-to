import { CategoryModel, DonationRequestItemCategoryModel } from '../../models';

export class CategorySerializer {
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
