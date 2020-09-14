import * as organizationActions from './actions';
import { Action, createReducer, on } from '@ngrx/store';
import { OrganizationModel, PageModel } from '../../models';

export interface OrganizationState {
  loading: boolean;
  failed: boolean;
  pagedItems: PageModel<OrganizationModel>;
  organization: OrganizationModel;
  organizations: OrganizationModel[];
  errorMessage: string;
}

const INITIAL_STATE: OrganizationState = {
  loading: false,
  failed: false,
  pagedItems: new PageModel<OrganizationModel>(),
  organization: undefined,
  organizations: [],
  errorMessage: undefined,
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
  on(organizationActions.loadOrganizationsPaged, (state) => ({
    ...state,
    loading: true,
    failed: false,
  })),
  on(organizationActions.loadOrganizationsPagedSuccess, (state, { organizations }) => ({
    ...state,
    loading: false,
    failed: false,
    pagedItems: organizations,
  })),
  on(organizationActions.loadOrganizationsPagedFailed, (state) => ({
    ...state,
    loading: false,
    failed: true,
    pagedItems: null,
  })),
  on(organizationActions.loadOrganizationsSearchPaged, (state) => ({
    ...state,
    loading: true,
    failed: false,
  })),
  on(organizationActions.loadOrganizationsSearchPagedSuccess, (state, { organizations }) => ({
    ...state,
    loading: false,
    failed: false,
    pagedItems: organizations,
  })),
  on(organizationActions.loadOrganizationsSearchPagedFailed, (state) => ({
    ...state,
    loading: false,
    failed: true,
    pagedItems: null,
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
  on(organizationActions.addOrganization, (state, { newOrganization }) => ({
    ...state,
    loading: true,
    failed: false,
  })),
  on(organizationActions.addOrganizationSuccess, (state, { organization }) => ({
    ...state,
    loading: false,
    failed: false,
    organizations: [...state.organizations, organization],
  })),
  on(organizationActions.addOrganizationFailed, (state) => ({
    ...state,
    loading: false,
    failed: true,
  })),
  on(organizationActions.updateOrganization, (state, { updatedOrganization }) => ({
    ...state,
    loading: true,
    failed: false,
  })),
  on(organizationActions.updateOrganizationSuccess, (state, { organization }) => ({
    ...state,
    loading: false,
    failed: false,
  })),
  on(organizationActions.updateOrganizationFailed, (state) => ({
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
  })),
  on(organizationActions.deleteOrganization, (state) => ({
    ...state,
    loading: true,
    failed: false,
  })),
  on(organizationActions.deleteOrganizationSuccess, (state) => ({
    ...state,
    loading: false,
    failed: false,
  })),
  on(organizationActions.deleteOrganizationFailed, (state, { errorMessage }) => ({
    ...state,
    loading: false,
    failed: true,
    errorMessage,
  }))
);

export function reducer(state: OrganizationState, action: Action) {
  return organizationReducer(state, action);
}
