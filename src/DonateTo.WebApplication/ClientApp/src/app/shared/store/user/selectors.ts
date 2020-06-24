import { createFeatureSelector, createSelector, Store } from '@ngrx/store';
import { UserState } from './reducer';
import { Injectable } from '@angular/core';
import { userOrganizationLinkFailed } from './actions';

// selectors
export const getUserState = createFeatureSelector<UserState>('user');

export const linkUserOrganization = createSelector(getUserState, (state: UserState) => state.items);
export const getUsersLinkedToOrganizations = createSelector(getUserState, (state: UserState) => state.items);

@Injectable()
export class OrganizationSelectors {
  constructor(private store: Store<UserState>) {}
  // selectors$
  userOrganizationLink$ = this.store.select(linkUserOrganization);
  usersLinkedToOrganization$ = this.store.select(getUsersLinkedToOrganizations);
}
