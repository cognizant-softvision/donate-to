import { createFeatureSelector, createSelector, Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { AuthState } from './reducer';

// selectors
export const getAuthState = createFeatureSelector<AuthState>('auth');
export const getUserName = createSelector(getAuthState, (state: AuthState) => state.name);
export const getUserEmail = createSelector(getAuthState, (state: AuthState) => state.email);
export const getAccessToken = createSelector(getAuthState, (state: AuthState) => state.access_token);
export const isAuthenticated = createSelector(getAuthState, (state: AuthState) => state.isAuthenticated);

@Injectable()
export class AuthSelectors {
  constructor(private store: Store<AuthState>) {}
  // selectors$
  userName$ = this.store.select(getUserName);
  userEmail$ = this.store.select(getUserEmail);
  accessToken$ = this.store.select(getAccessToken);
  isAuthenticated = this.store.select(isAuthenticated);
}
