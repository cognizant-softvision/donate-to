import * as organizationActions from './actions';
import { Action, createReducer, on } from '@ngrx/store';
import { OrganizationModel, PageModel } from '../../models';

export interface OrganizationState {
  loading: boolean;
  failed: boolean;
  pagedItems: PageModel<OrganizationModel>;
  organizations: OrganizationModel[];
}

const INITIAL_STATE: OrganizationState = {
  loading: false,
  failed: false,
  pagedItems: new PageModel<OrganizationModel>(),
  organizations: [],
};

const organizationReducer = createReducer(
  INITIAL_STATE,
  on(organizationActions.loadOrganizationsPagedFiltered, (state) => ({
    ...state,
    loading: true,
    failed: false,
  })),
  on(organizationActions.loadOrganizationsPagedFilteredSuccess, (state, { pagedOrganizations }) => ({
    ...state,
    loading: false,
    failed: false,
    pagedItems: pagedOrganizations,
  })),
  on(organizationActions.loadOrganizationsPagedFilteredFailed, (state) => ({
    ...state,
    loading: false,
    failed: true,
    pagedItems: new PageModel<OrganizationModel>(),
  })),
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
    organizations,
  })),
  on(organizationActions.loadOrganizationsFailed, (state) => ({
    ...state,
    loading: false,
    failed: true,
  }))
);

export function reducer(state: OrganizationState, action: Action) {
  return organizationReducer(state, action);
}
