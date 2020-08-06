import { createFeatureSelector, createSelector, Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { AuthState } from './reducer';

// selectors
export const getAuthState = createFeatureSelector<AuthState>('auth');
export const getAccessToken = createSelector(getAuthState, (state: AuthState) => state.access_token);
export const isAuthenticated = createSelector(getAuthState, (state: AuthState) => state.isAuthenticated);
export const isLoginProcessed = createSelector(getAuthState, (state: AuthState) => state.isLoginProcessed);
export const getUserId = createSelector(getAuthState, (state: AuthState) => state.userId);
export const getUserName = createSelector(getAuthState, (state: AuthState) => state.nameUser);
export const getUserRoles = createSelector(getAuthState, (state: AuthState) => state.roles);
export const getOrganizations = createSelector(getAuthState, (state: AuthState) => state.organizations);

@Injectable()
export class AuthSelectors {
  constructor(private store: Store<AuthState>) {}
  // selectors$
  accessToken$ = this.store.select(getAccessToken);
  isAuthenticated$ = this.store.select(isAuthenticated);
  isLoginProcessed$ = this.store.select(isLoginProcessed);
  userId$ = this.store.select(getUserId);
  userName$ = this.store.select(getUserName);
  userRoles$ = this.store.select(getUserRoles);
  organizations$ = this.store.select(getOrganizations);
}
