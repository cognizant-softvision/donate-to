import * as categoryActions from './actions';
import { Action, createReducer, on } from '@ngrx/store';
import { CategoryModel } from '../../models';

export interface CategoryState {
  loading: boolean;
  failed: boolean;
  items: CategoryModel[];
}

const INITIAL_STATE: CategoryState = {
  loading: false,
  failed: false,
  items: [],
};

const categoryReducer = createReducer(
  INITIAL_STATE,
  on(categoryActions.loadCategories, (state, action) => ({
    ...state,
    loading: true,
    failed: false,
  })),
  on(categoryActions.loadCategoriesSuccess, (state, { categories }) => ({
    ...state,
    loading: false,
    failed: false,
    items: categories,
  })),
  on(categoryActions.loadCategoriesFailed, (state) => ({
    ...state,
    loading: false,
    failed: true,
    items: [],
  }))
);

export function reducer(state: CategoryState, action: Action) {
  return categoryReducer(state, action);
}
