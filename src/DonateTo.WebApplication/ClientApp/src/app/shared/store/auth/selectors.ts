import { createFeatureSelector, createSelector, Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { AuthState } from './reducer';

// selectors
const getAuthState = createFeatureSelector<AuthState>('authCache');

const getUserData = createSelector(getAuthState, (state: AuthState) => {
  // state.email, state.name;
});

const getAccessToken = createSelector(getAuthState, (state: AuthState) => {
  // state.access_token;
});

@Injectable()
export class AuthSelectors {
  constructor(private store: Store<AuthState>) {}
  // selectors$
  userData$ = this.store.select(getUserData);
  accessToken$ = this.store.select(getAccessToken);
}
