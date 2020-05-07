import { Action } from '@ngrx/store';

export enum ActionTypes {
  DO_LOGIN = '[Auth] Do Login',
  TRY_LOGIN = '[Auth] Try Login',
  DO_LOGIN_SUCCESS = '[Auth] Do Login Success',
  DO_LOGIN_FAIL = '[Auth] Do Login Fail',

  DO_LOGOUT = '[Auth] Do Logout',
}

/**
 * Login Actions
 */
export class DoLoginAction implements Action {
  type = ActionTypes.DO_LOGIN;
}

export class TryLoginAction implements Action {
  type = ActionTypes.TRY_LOGIN;
}

export class DoLoginSuccessAction implements Action {
  type = ActionTypes.DO_LOGIN_SUCCESS;

  constructor(public name: string, public username: string, public accessToken: string) {}
}

export class DoLoginFailAction implements Action {
  type = ActionTypes.DO_LOGIN_FAIL;
}

/**
 * Logout Actions
 */
export class DoLogoutAction implements Action {
  type = ActionTypes.DO_LOGOUT;
}

export type Actions = DoLoginAction | DoLoginSuccessAction | DoLoginFailAction | DoLogoutAction;
