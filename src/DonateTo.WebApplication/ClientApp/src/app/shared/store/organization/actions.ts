import { createAction, props } from '@ngrx/store';

import { OrganizationModel } from '../../models';

export const loadOrganizations = createAction('[Organizations] Load items from server');
export const loadOrganizationsSuccess = createAction(
  '[Organizations] Load success',
  props<{ organizations: OrganizationModel[] }>()
);
export const loadOrganizationsFailed = createAction('[Organizations] Load failed');
