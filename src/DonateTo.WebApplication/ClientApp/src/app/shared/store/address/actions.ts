import { createAction, props } from '@ngrx/store';
import { AddressModel } from '../../models';

export const loadAddressesByOrganizationId = createAction(
  '[AddressesByOrganizationId] Load items from server',
  props<{ organizationId: number }>()
);

export const loadAddressesByOrganizationIdSuccess = createAction(
  '[AddressesByOrganizationId] Load success',
  props<{ addresses: AddressModel[] }>()
);
export const loadAddressesByOrganizationIdFailed = createAction('[AddressesByOrganizationId] Load failed');
