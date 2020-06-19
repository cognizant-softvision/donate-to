import { createFeatureSelector, createSelector, Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { AuthState } from './reducer';

// selectors
export const getAuthState = createFeatureSelector<AuthState>('auth');
export const getAccessToken = createSelector(getAuthState, (state: AuthState) => state.access_token);
export const isAuthenticated = createSelector(getAuthState, (state: AuthState) => state.isAuthenticated);
export const isLoginProcessed = createSelector(getAuthState, (state: AuthState) => state.isLoginProcessed);

@Injectable()
export class AuthSelectors {
  constructor(private store: Store<AuthState>) {}
  // selectors$
  accessToken$ = this.store.select(getAccessToken);
  isAuthenticated$ = this.store.select(isAuthenticated);
  isLoginProcessed$ = this.store.select(isLoginProcessed);
}
