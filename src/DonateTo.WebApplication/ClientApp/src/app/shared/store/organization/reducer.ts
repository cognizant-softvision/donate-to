import * as organizationActions from './actions';
import { Action, createReducer, on } from '@ngrx/store';
import { OrganizationModel, PageModel } from '../../models';

export interface OrganizationState {
  loading: boolean;
  failed: boolean;
  pagedItems: PageModel<OrganizationModel>;
  organization: OrganizationModel;
  organizations: OrganizationModel[];
}

const INITIAL_STATE: OrganizationState = {
  loading: false,
  failed: false,
  pagedItems: new PageModel<OrganizationModel>(),
  organization: undefined,
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
  })),
  on(organizationActions.addOrganization, (state) => ({
    ...state,
    loading: true,
    failed: false,
  })),
  on(organizationActions.addOrganizationSuccess, (state) => ({
    ...state,
    loading: false,
    failed: false,
  })),
  on(organizationActions.addOrganizationFailed, (state) => ({
    ...state,
    loading: false,
    failed: true,
  })),
  on(organizationActions.loadOrganization, (state) => ({
    ...state,
    loading: true,
    failed: false,
  })),
  on(organizationActions.loadOrganizationSuccess, (state, { organization }) => ({
    ...state,
    loading: false,
    failed: false,
    organization,
  })),
  on(organizationActions.loadOrganizationFailed, (state) => ({
    ...state,
    loading: false,
    failed: true,
    organization: new OrganizationModel(),
  }))
);

export function reducer(state: OrganizationState, action: Action) {
  return organizationReducer(state, action);
}
