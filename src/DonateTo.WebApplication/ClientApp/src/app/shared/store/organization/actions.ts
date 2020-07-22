import { createAction, props } from '@ngrx/store';
import { OrganizationModel, PageModel } from '../../models';
import { OrganizationFilter } from '../../models/filters/organization-filter';

export const loadOrganizations = createAction('[Organization] Load items from server');
export const loadOrganizationsSuccess = createAction(
  '[Organization] Load success',
  props<{ organizations: OrganizationModel[] }>()
);
export const loadOrganizationsFailed = createAction('[Organization] Load failed');

export const loadOrganizationsPagedFiltered = createAction(
  '[Organizations] Load items from server paged and filtered',
  props<{ organizationFilter: OrganizationFilter }>()
);
export const loadOrganizationsPagedFilteredSuccess = createAction(
  '[Organizations] Load success',
  props<{ pagedOrganizations: PageModel<OrganizationModel> }>()
);
export const loadOrganizationsPagedFilteredFailed = createAction('[Organizations] Load failed');

export const loadOrganizationsByUser = createAction(
  '[Organization] Load items from server by user',
  props<{ userId: number }>()
);

export const addOrganization = createAction(
  '[Organization] Add item to server',
  props<{ newOrganization: OrganizationModel }>()
);
export const addOrganizationsSuccess = createAction(
  '[Organization] Add success',
  props<{ organization: OrganizationModel }>()
);
export const addOrganizationsFailed = createAction('[Organization] Add failed');

export const updateOrganization = createAction(
  '[Organization] Update item to server',
  props<{ updatedOrganization: OrganizationModel }>()
);
export const updateOrganizationsSuccess = createAction(
  '[Organization] Update success',
  props<{ organization: OrganizationModel }>()
);
export const updateOrganizationsFailed = createAction('[Organization] Update failed');
