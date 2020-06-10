import { createAction, props } from '@ngrx/store';
import { CategoryModel } from '../../models';

export const loadCategories = createAction('[Category] Load items from server');
export const loadCategoriesSuccess = createAction('[Category] Load success', props<{ categories: CategoryModel[] }>());
export const loadCategoriesFailed = createAction('[Category] Load failed');
