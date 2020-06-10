import * as authActions from './actions';
import { Action, createReducer, on } from '@ngrx/store';

export class AuthState {
  isAuthenticated: boolean;
  id: number;
  name: string;
  email: string;
  access_token: string;
  isLoginProcessed: boolean;
}

const INITIAL_STATE: AuthState = {
  isAuthenticated: false,
  id: undefined,
  name: undefined,
  email: undefined,
  access_token: undefined,
  isLoginProcessed: false,
};

const authReducer = createReducer(
  INITIAL_STATE,
  on(authActions.userProfileLoaded, (state, action) => ({
    ...state,
    isAuthenticated: true,
    id: action.id,
    name: action.name,
    email: action.email,
    access_token: action.accessToken,
    isLoginProcessed: true,
  })),
  on(authActions.doLoginFailed, (state) => ({
    ...state,
    isAuthenticated: false,
    id: undefined,
    name: undefined,
    email: undefined,
    access_token: undefined,
    isLoginProcessed: true,
  })),
  on(authActions.loadUserProfileFailed, (state) => ({
    ...state,
    id: undefined,
    name: undefined,
    email: undefined,
    access_token: undefined,
  })),
  on(authActions.tryLoginFailed, (state) => ({
    ...state,
    isAuthenticated: false,
    access_token: undefined,
    isLoginProcessed: true,
  })),
  on(authActions.validateTokenSucess, (state) => ({
    ...state,
    isAuthenticated: true,
    isLoginProcessed: true,
  })),
  on(authActions.validateTokenFailed, (state) => ({
    ...state,
    isAuthenticated: false,
    isLoginProcessed: false,
  }))
);

export function reducer(state: AuthState, action: Action) {
  return authReducer(state, action);
}
