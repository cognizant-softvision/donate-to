import { createFeatureSelector, createSelector, Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { OrganizationState } from './reducer';

export const organizationFeatureKey = 'organization';
// selectors
export const getEntityState = createFeatureSelector<OrganizationState>(organizationFeatureKey);

export const getAllOrganizations = createSelector(getEntityState, (state: OrganizationState) => state.items);

export const getOrganizationLoading = createSelector(getEntityState, (state: OrganizationState) => state.loading);

@Injectable()
export class OrganizationSelectors {
  constructor(private store: Store<OrganizationState>) {}
  // selectors$
  organizations$ = this.store.select(getAllOrganizations);

  loading$ = this.store.select(getOrganizationLoading);
}
