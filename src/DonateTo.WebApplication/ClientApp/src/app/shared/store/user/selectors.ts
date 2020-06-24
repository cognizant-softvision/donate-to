import { createFeatureSelector, createSelector, Store } from '@ngrx/store';
import { UserState } from './reducer';
import { Injectable } from '@angular/core';

// selectors
export const getUserState = createFeatureSelector<UserState>('user');

export const getUsersLinkedToOrganizations = createSelector(getUserState, (state: UserState) => state.items);

@Injectable()
export class OrganizationSelectors {
  constructor(private store: Store<UserState>) {}
  // selectors$
  usersLinkedToOrganization$ = this.store.select(getUsersLinkedToOrganizations);
}
