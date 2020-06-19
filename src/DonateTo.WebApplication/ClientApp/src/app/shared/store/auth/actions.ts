import { createAction, props } from '@ngrx/store';

export const doLoginFailed = createAction('[Auth] Do Login Failed');
export const tryLogin = createAction('[Auth] Try Login');
export const tryLoginFailed = createAction('[Auth] Try Login Failed');
export const loadUserProfile = createAction('[Auth] Load User Profile');
export const userProfileLoaded = createAction('[Auth] User Profile Loaded', props<{ accessToken: string }>());
export const loadUserProfileFailed = createAction('[Auth] Load User Profile Failed');
export const validateTokenSucess = createAction('[Auth] Validate Token Success');
export const validateTokenFailed = createAction('[Auth] Validate Token Failed');
