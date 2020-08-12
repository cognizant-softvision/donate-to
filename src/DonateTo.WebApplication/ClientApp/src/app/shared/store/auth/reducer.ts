import * as authActions from './actions';
import { Action, createReducer, on } from '@ngrx/store';
import { OrganizationModel } from '../../models';

export class AuthState {
  isAuthenticated: boolean;
  access_token: string;
  isLoginProcessed: boolean;
  isRoleProcessed: boolean;
  userId: number;
  nameUser: string;
  organizations: OrganizationModel[];
  roles: string[];
}

const INITIAL_STATE: AuthState = {
  isAuthenticated: false,
  access_token: undefined,
  isLoginProcessed: false,
  isRoleProcessed: false,
  userId: undefined,
  nameUser: undefined,
  organizations: undefined,
  roles: [],
};

const authReducer = createReducer(
  INITIAL_STATE,
  on(authActions.loadUserProfile, (state, action) => ({
    ...state,
    isRoleProcessed: false,
  })),
  on(authActions.userProfileLoaded, (state, action) => ({
    ...state,
    isAuthenticated: true,
    access_token: action.accessToken,
    userId: action.userId,
    nameUser: action.nameUser,
    roles: action.roles,
    organizations: action.organizations,
    isLoginProcessed: true,
    isRoleProcessed: true,
  })),
  on(authActions.loadUserProfileFailed, (state, action) => ({
    ...state,
    isRoleProcessed: true,
  })),
  on(authActions.doLoginFailed, (state) => ({
    ...state,
    isAuthenticated: false,
    access_token: undefined,
    isLoginProcessed: true,
  })),
  on(authActions.loadUserProfileFailed, (state) => ({
    ...state,
    access_token: undefined,
    userId: undefined,
    nameUser: undefined,
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
