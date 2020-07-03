import * as organizationActions from './actions';
import { Action, createReducer, on } from '@ngrx/store';
import { OrganizationModel } from '../../models';

export interface OrganizationState {
  loading: boolean;
  failed: boolean;
  items: OrganizationModel[];
}

const INITIAL_STATE: OrganizationState = {
  loading: false,
  failed: false,
  items: [],
};

const organizationReducer = createReducer(
  INITIAL_STATE,
  on(organizationActions.loadOrganizations, (state, action) => ({
    ...state,
    loading: true,
    failed: false,
  })),
  on(organizationActions.loadOrganizationsByUser, (state, action) => ({
    ...state,
    loading: true,
    failed: false,
  })),
  on(organizationActions.loadOrganizationsSuccess, (state, { organizations }) => ({
    ...state,
    loading: false,
    failed: false,
    items: organizations,
  })),
  on(organizationActions.loadOrganizationsFailed, (state) => ({
    ...state,
    loading: false,
    failed: true,
    items: [],
  }))
);

export function reducer(state: OrganizationState, action: Action) {
  return organizationReducer(state, action);
}
