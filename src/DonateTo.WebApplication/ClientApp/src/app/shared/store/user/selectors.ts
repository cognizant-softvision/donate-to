import { createFeatureSelector, createSelector, Store } from '@ngrx/store';
import { UserState } from './reducer';
import { Injectable } from '@angular/core';
import { userOrganizationLinkFailed } from './actions';

// selectors
export const getUserState = createFeatureSelector<UserState>('user');

export const getAllUsers = createSelector(getUserState, (state: UserState) => state.items);

@Injectable()
export class OrganizationSelectors {
  constructor(private store: Store<UserState>) {}
  // selectors$
  users$ = this.store.select(getAllUsers);
}
