import * as userActions from './actions';
import { Action, createReducer, on } from '@ngrx/store';
import { OrganizationModel, UserModel } from '../../models';

export interface UserState {
  loading: boolean;
  failed: boolean;
  items: UserModel[];
}

const INITIAL_STATE: UserState = {
  loading: false,
  failed: false,
  items: [],
};

const userReducer = createReducer(
  INITIAL_STATE,
  on(userActions.userOrganizationLink, (state, action) => ({
    ...state,
    loading: true,
    failed: false,
  })),
  on(userActions.userOrganizationLinkSuccess, (state, { users, organization }) => ({
    ...state,
    loading: false,
    failed: false,
    items: users,
  })),
  on(userActions.userOrganizationLinkFailed, (state) => ({
    ...state,
    loading: false,
    failed: true,
    items: [],
  })),
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
);

export function reducer(state: UserState, action: Action) {
  return userReducer(state, action);
}
