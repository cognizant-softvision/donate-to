import { createAction, props } from '@ngrx/store';
import { AddressModel, OrganizationModel, PageModel } from '../../models';
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

export const loadOrganizationsPaged = createAction(
  '[Organization] Load paged items from server',
  props<{ pageSize: number; pageNumber: number }>()
);
export const loadOrganizationsPagedSuccess = createAction(
  '[Organization] Load paged success',
  props<{ organizations: PageModel<OrganizationModel> }>()
);
export const loadOrganizationsPagedFailed = createAction('[Organization] Load paged failed');

export const loadOrganizationsSearchPaged = createAction(
  '[Organization] Load paged search result items from server',
  props<{ pageSize: number; pageNumber: number; query: string }>()
);
export const loadOrganizationsSearchPagedSuccess = createAction(
  '[Organization] Load paged search result success',
  props<{ organizations: PageModel<OrganizationModel> }>()
);
export const loadOrganizationsSearchPagedFailed = createAction('[Organization] Load paged search result failed');

export const loadOrganizationsByUser = createAction(
  '[Organization] Load items from server by user',
  props<{ userId: number }>()
);

export const addOrganization = createAction(
  '[Organization] Add item to server',
  props<{ newOrganization: OrganizationModel }>()
);
export const addOrganizationSuccess = createAction(
  '[Organization] Add success',
  props<{ organization: OrganizationModel }>()
);
export const addOrganizationFailed = createAction('[Organization] Add failed');

export const updateOrganization = createAction(
  '[Organization] Update item to server',
  props<{ updatedOrganization: OrganizationModel }>()
);
export const updateOrganizationSuccess = createAction(
  '[Organization] Update success',
  props<{ organization: OrganizationModel }>()
);
export const updateOrganizationFailed = createAction('[Organization] Update failed');

export const loadOrganization = createAction(
  '[Organization] Load organization from server',
  props<{ organizationId: number }>()
);
export const loadOrganizationSuccess = createAction(
  '[Organization] Load organization success',
  props<{ organization: OrganizationModel }>()
);
export const loadOrganizationFailed = createAction('[Organization] Load organization failed');

export const deleteOrganization = createAction('[Organization] Delete', props<{ organization: OrganizationModel }>());
export const deleteOrganizationSuccess = createAction(
  '[Organization] Delete success',
  props<{ organization: OrganizationModel }>()
);
export const deleteOrganizationFailed = createAction('[Address] Delete failed', props<{ errorMessage: string }>());
