import * as userActions from './actions';
import { Action, createReducer, on } from '@ngrx/store';
import { PageModel, UserModel } from '../../models';

export interface UserState {
  loading: boolean;
  failed: boolean;
  items: UserModel[];
  pagedItems: PageModel<UserModel>;
  user: UserModel;
}

const INITIAL_STATE: UserState = {
  loading: false,
  failed: false,
  items: [],
  user: undefined,
  pagedItems: new PageModel<UserModel>(),
};

const userReducer = createReducer(
  INITIAL_STATE,
  on(userActions.userOrganizationLink, (state) => ({
    ...state,
    loading: true,
    failed: false,
  })),
  on(userActions.userOrganizationLinkSuccess, (state) => ({
    ...state,
    loading: false,
    failed: false,
  })),
  on(userActions.userOrganizationLinkFailed, (state) => ({
    ...state,
    loading: false,
    failed: true,
    items: [],
  })),
  on(userActions.loadUsers, (state) => ({
    ...state,
    loading: true,
    failed: false,
  })),
  on(userActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    loading: true,
    failed: false,
    items: users,
  })),
  on(userActions.loadUser, (state) => ({
    ...state,
    loading: true,
    failed: false,
  })),
  on(userActions.loadUserSuccess, (state, { user }) => ({
    ...state,
    loading: false,
    failed: false,
    user,
  })),
  on(userActions.loadUserFailed, (state) => ({
    ...state,
    loading: false,
    failed: true,
    user: new UserModel(),
  })),
  on(userActions.updateUser, (state) => ({
    ...state,
    loading: true,
    failed: false,
  })),
  on(userActions.updateUser, (state) => ({
    ...state,
    loading: false,
    failed: false,
  })),
  on(userActions.updateUser, (state) => ({
    ...state,
    loading: false,
    failed: true,
  })),
  on(userActions.loadUsersPagedFiltered, (state) => ({
    ...state,
    loading: true,
    failed: false,
  })),
  on(userActions.loadUsersPagedFilteredSuccess, (state, { pagedUsers }) => ({
    ...state,
    loading: false,
    failed: false,
    pagedItems: pagedUsers,
  })),
  on(userActions.loadUsersPagedFilteredFailed, (state) => ({
    ...state,
    loading: false,
    failed: true,
    pagedItems: new PageModel<UserModel>(),
  }))
);

export function reducer(state: UserState, action: Action) {
  return userReducer(state, action);
}
