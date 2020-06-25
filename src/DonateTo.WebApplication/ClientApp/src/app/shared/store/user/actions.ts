import { createAction, props } from '@ngrx/store';
import { PageModel, UserModel } from '../../models';

export const userOrganizationLink = createAction(
  '[User] Link user to organization',
  props<{ userId: number; organizations: number[] }>()
);
export const userOrganizationLinkSuccess = createAction('[User] Link user to organization success');
export const userOrganizationLinkFailed = createAction('[User] Link user to organization failed');

export const loadUsers = createAction('[Users] Load users from server');
export const loadUsersSuccess = createAction('[Users] Load users success', props<{ users: UserModel[] }>());
export const loadUsersFailed = createAction('[Users] Load failed');

export const loadUsersPaged = createAction(
  '[Users] Load paged users from server',
  props<{ pageSize: number; pageNumber: number }>()
);
export const loadUsersPagedSuccess = createAction(
  '[User] Load paged success',
  props<{ users: PageModel<UserModel> }>()
);
export const loadUsersPagedFailed = createAction('[User] Load paged failed');

export const loadUser = createAction('[User] Load user from server', props<{ userId: number }>());
export const loadUserSuccess = createAction('[User] Load user success', props<{ user: UserModel }>());
export const loadUserFailed = createAction('[User] Load user failed');

export const updateUser = createAction('[User] Update', props<{ user: UserModel }>());
export const updateUserSuccess = createAction('[User] Update success', props<{ user: UserModel }>());
export const updateUserFailed = createAction('[User] Update failed');

/*
export const userOrganizationUnlink = createAction('[User] Unlink user to organization');
export const userOrganizationUnlinkSuccess = createAction(
  '[User] Unlink user to organization success',
  props<{ user: number; organizations: number[] }>()
);
export const userOrganizationUnlinkFailed = createAction('[User] Unlink user to organization failed');

export const userOrganizationRetrieve = createAction('[User] Retrieve user organization');
export const userOrganizationRetrieveSuccess = createAction(
  '[User] Retrieve user organization success',
  props<{ users: number[] }>()
);
export const userOrganizationRetrieveFailed = createAction('[User] Retrieve user organization failed');
*/
