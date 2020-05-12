import * as authActions from './actions';
import { Action, createReducer, on } from '@ngrx/store';

export class AuthState {
  isAuthenticated: boolean;
  name: string;
  email: string;
  access_token: string;
}

const INITIAL_STATE: AuthState = {
  isAuthenticated: false,
  name: undefined,
  email: undefined,
  access_token: undefined,
};

const authReducer = createReducer(
  INITIAL_STATE,
  on(authActions.userProfileLoaded, (state, action) => ({
    ...state,
    isAuthenticated: true,
    name: action.name,
    email: action.email,
    access_token: action.accessToken,
  })),
  on(authActions.doLoginFailed, (state) => ({
    ...state,
    isAuthenticated: false,
    name: undefined,
    email: undefined,
    access_token: undefined,
  })),
  on(authActions.loadUserProfileFailed, (state) => ({
    ...state,
    isAuthenticated: false,
    name: undefined,
    email: undefined,
    access_token: undefined,
  })),
  on(authActions.doLoginSuccess, (state) => ({
    ...state,
    isAuthenticated: true,
  })),
  on(authActions.doLogoutSuccess, (state) => ({
    ...state,
    isAuthenticated: false,
    name: undefined,
    email: undefined,
    access_token: undefined,
  })),
  on(authActions.tryLoginFailed, (state) => ({
    ...state,
    isAuthenticated: false,
  }))
);

export function reducer(state: AuthState, action: Action) {
  return authReducer(state, action);
}
