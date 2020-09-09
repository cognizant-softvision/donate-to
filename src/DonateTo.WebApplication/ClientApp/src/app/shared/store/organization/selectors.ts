import { createFeatureSelector, createSelector, Store } from '@ngrx/store';
import { OrganizationState } from './reducer';
import { Injectable } from '@angular/core';

// selectors
export const getOrganizationState = createFeatureSelector<OrganizationState>('organization');

export const getErrorMessage = createSelector(getOrganizationState, (state: OrganizationState) => state.errorMessage);

export const getAllOrganizations = createSelector(
  getOrganizationState,
  (state: OrganizationState) => state.organizations
);

export const getOrganizationsByUser = createSelector(
  getOrganizationState,
  (state: OrganizationState) => state.organizations
);

export const getOrganizationsFilteredPaged = createSelector(
  getOrganizationState,
  (state: OrganizationState) => state.pagedItems
);

export const getFailedStatus = createSelector(getOrganizationState, (state: OrganizationState) => state.failed);

export const getLoadingStatus = createSelector(getOrganizationState, (state: OrganizationState) => state.loading);

export const getOrganizationsLoading = createSelector(
  getOrganizationState,
  (state: OrganizationState) => state.loading
);

export const getOrganization = createSelector(getOrganizationState, (state: OrganizationState) => state.organization);

@Injectable()
export class OrganizationSelectors {
  constructor(private store: Store<OrganizationState>) {}
  // selectors$
  organizationsFilteredPaged$ = this.store.select(getOrganizationsFilteredPaged);
  organizations$ = this.store.select(getAllOrganizations);
  organizationsByUser$ = this.store.select(getOrganizationsByUser);
  organizationState$ = this.store.select(getOrganizationState);
  loading$ = this.store.select(getOrganizationsLoading);
  loadOrganization$ = this.store.select(getOrganization);
}
