import { createFeatureSelector, createSelector, Store } from '@ngrx/store';
import { UserState } from './reducer';
import { Injectable } from '@angular/core';
import { userOrganizationLinkFailed } from './actions';

// selectors
export const getUserState = createFeatureSelector<UserState>('user');

export const getAllUsers = createSelector(getUserState, (state: UserState) => state.items);
export const getFailedStatus = createSelector(getUserState, (state: UserState) => state.failed);
export const getLoadingStatus = createSelector(getUserState, (state: UserState) => state.loading);
export const getUser = createSelector(getUserState, (state: UserState) => state.user);

@Injectable()
export class UserSelectors {
  constructor(private store: Store<UserState>) {}
  // selectors$
  users$ = this.store.select(getAllUsers);
  failed$ = this.store.select(getFailedStatus);
  loading$ = this.store.select(getLoadingStatus);
  user$ = this.store.select(getUser);
}
