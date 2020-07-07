import { createFeatureSelector, createSelector, Store } from '@ngrx/store';
import { OrganizationState } from './reducer';
import { Injectable } from '@angular/core';

// selectors
export const getOrganizationState = createFeatureSelector<OrganizationState>('organization');

export const getAllOrganizations = createSelector(getOrganizationState, (state: OrganizationState) => state.items);

export const getOrganizationsByUser = createSelector(getOrganizationState, (state: OrganizationState) => state.items);

export const getOrganizationsLoading = createSelector(
  getOrganizationState,
  (state: OrganizationState) => state.loading
);

@Injectable()
export class OrganizationSelectors {
  constructor(private store: Store<OrganizationState>) {}
  // selectors$
  organizations$ = this.store.select(getAllOrganizations);
  organizationsByUser$ = this.store.select(getOrganizationsByUser);
  organizationState$ = this.store.select(getOrganizationState);
  loading$ = this.store.select(getOrganizationsLoading);
}
