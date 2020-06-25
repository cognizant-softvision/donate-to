import { createFeatureSelector, createSelector, Store } from '@ngrx/store';
import { UserState } from './reducer';
import { Injectable } from '@angular/core';

// selectors
export const getUserState = createFeatureSelector<UserState>('user');

export const getAllUsers = createSelector(getUserState, (state: UserState) => state.items);
export const getAllUsersPaged = createSelector(getUserState, (state: UserState) => state.pagedItems);

@Injectable()
export class OrganizationSelectors {
  constructor(private store: Store<UserState>) {}

  users$ = this.store.select(getAllUsers);
  usersPaged$ = this.store.select(getAllUsersPaged);
}
