import { createAction, props } from '@ngrx/store';
import { OrganizationModel } from '../../models';

export const loadOrganizations = createAction('[Organization] Load items from server');
export const loadOrganizationsSuccess = createAction(
  '[Organization] Load success',
  props<{ organizations: OrganizationModel[] }>()
);
export const loadOrganizationsFailed = createAction('[Organization] Load failed');
