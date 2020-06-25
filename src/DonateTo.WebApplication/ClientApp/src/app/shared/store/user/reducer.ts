import * as userActions from './actions';
import { Action, createReducer, on } from '@ngrx/store';
import { OrganizationModel, UserModel } from '../../models';

export interface UserState {
  loading: boolean;
  failed: boolean;
  items: UserModel[];
  user: UserModel;
}

const INITIAL_STATE: UserState = {
  loading: false,
  failed: false,
  items: [],
  user: undefined,
};

const userReducer = createReducer(
  INITIAL_STATE,
  on(userActions.userOrganizationLink, (state, action) => ({
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
  }))
  /*
  on(userActions.userOrganizationRetrieve, (state, action) => ({
    ...state,
    loading: true,
    failed: false,
  })),
  on(userActions.userOrganizationRetrieveSuccess, (state, { users }) => ({
    ...state,
    loading: false,
    failed: false,
    items: users,
  })),
  on(userActions.userOrganizationRetrieveFailed, (state, action) => ({
    ...state,
    loading: false,
    failed: true,
    items: [],
  })),
  on(userActions.userOrganizationUnlink, (state, action) => ({
    ...state,
    loading: true,
    failed: false,
  })),
  on(userActions.userOrganizationUnlinkSuccess, (state, { user }) => ({
    ...state,
    loading: false,
    failed: false,
  })),
  on(userActions.userOrganizationUnlinkFailed, (state, action) => ({
    ...state,
    loading: true,
    failed: true,
  }))
  */
);

export function reducer(state: UserState, action: Action) {
  return userReducer(state, action);
}
