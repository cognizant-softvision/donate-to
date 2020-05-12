import { createAction, props } from '@ngrx/store';

export const doLogin = createAction('[Auth] Do Login');
export const doLoginSuccess = createAction('[Auth] Do Login Success');
export const doLoginFailed = createAction('[Auth] Do Login Failed');
export const tryLogin = createAction('[Auth] Try Login');
export const tryLoginFailed = createAction('[Auth] Try Login Failed');
export const loadUserProfile = createAction('[Auth] Load User Profile');
export const userProfileLoaded = createAction(
  '[Auth] User Profile Loaded',
  props<{
    name: string;
    email: string;
    accessToken: string;
  }>()
);
export const loadUserProfileFailed = createAction('[Auth] Load User Profile Failed');
export const doLogout = createAction('[Auth] Do Logout');
export const doLogoutSuccess = createAction('[Auth] Do Logout Success');
export const validateAccessToken = createAction('[Auth] Validate Access Token');
export const validateAccessTokenSuccess = createAction('[Auth] Validate Access Token Success');
export const validateAccessTokenFailed = createAction('[Auth] Validate Access Token Failed');
