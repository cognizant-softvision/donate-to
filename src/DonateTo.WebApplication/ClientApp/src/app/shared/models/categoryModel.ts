import { BaseModel } from './baseModel';

export class CategoryModel implements BaseModel {
  name: string;
  description: string;
  // donationRequestCategories	[...]
  // donationRequestItemCategories	[...]
  id: number;
  createdBy: string;
  createdDate: string;
  updateBy: string;
  updateDate: string;
}
