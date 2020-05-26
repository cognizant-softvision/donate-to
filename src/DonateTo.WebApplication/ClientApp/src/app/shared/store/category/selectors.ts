import { createFeatureSelector, createSelector, Store } from '@ngrx/store';
import { CategoryState } from './reducer';
import { Injectable } from '@angular/core';

// selectors
export const getCategoryState = createFeatureSelector<CategoryState>('category');

export const getAllCategories = createSelector(getCategoryState, (state: CategoryState) => state.items);

export const getCategoriesLoading = createSelector(getCategoryState, (state: CategoryState) => state.loading);

@Injectable()
export class CategorySelectors {
  constructor(private store: Store<CategoryState>) {}
  // selectors$
  categories$ = this.store.select(getAllCategories);
  categoryState$ = this.store.select(getCategoryState);
  loading$ = this.store.select(getCategoriesLoading);
}
