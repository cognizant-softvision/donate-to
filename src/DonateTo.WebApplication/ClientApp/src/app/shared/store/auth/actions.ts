import { Action } from '@ngrx/store';

export enum ActionTypes {
  DO_LOGIN = '[Auth] Do Login',
  TRY_LOGIN = '[Auth] Try Login',
  DO_LOGIN_SUCCESS = '[Auth] Do Login Success',
  DO_LOGIN_FAIL = '[Auth] Do Login Fail',

  USER_PROFILE_LOADED = '[Auth] User Profile Loaded',
  LOAD_USER_PROFILE = '[Auth] Load User Profile',

  DO_LOGOUT = '[Auth] Do Logout',
  DO_LOGOUT_SUCCESS = '[Auth] Do Logout Success',
}

/**
 * Login Actions
 */
export class DoLoginAction implements Action {
  type = ActionTypes.DO_LOGIN;

  constructor(public name: any = null, public email: any = null, public accessToken: any = null) {}
}

export class TryLoginAction implements Action {
  type = ActionTypes.TRY_LOGIN;

  constructor(public name: any = null, public email: any = null, public accessToken: any = null) {}
}

export class DoLoginSuccessAction implements Action {
  type = ActionTypes.DO_LOGIN_SUCCESS;

  constructor(public name: any = null, public email: any = null, public accessToken: any = null) {}
}

export class DoLoginFailAction implements Action {
  type = ActionTypes.DO_LOGIN_FAIL;

  constructor(public name: any = null, public email: any = null, public accessToken: any = null) {}
}

/**
 * User Actions
 */
export class LoadUserProfileAction implements Action {
  type = ActionTypes.LOAD_USER_PROFILE;

  constructor(public name: any = null, public email: any = null, public accessToken: any = null) {}
}

export class UserProfileLoadedAction implements Action {
  type = ActionTypes.USER_PROFILE_LOADED;

  constructor(public name: string, public email: string, public accessToken: string) {}
}

/**
 * Logout Actions
 */
export class DoLogoutAction implements Action {
  type = ActionTypes.DO_LOGOUT;

  constructor(public name: any = null, public email: any = null, public accessToken: any = null) {}
}

export class DoLogoutActionSuccess implements Action {
  type = ActionTypes.DO_LOGOUT_SUCCESS;

  constructor(public name: any = null, public email: any = null, public accessToken: any = null) {}
}

export type ActionsUnion =
  | DoLoginAction
  | TryLoginAction
  | DoLoginSuccessAction
  | DoLoginFailAction
  | LoadUserProfileAction
  | UserProfileLoadedAction
  | DoLogoutAction
  | DoLogoutActionSuccess;
