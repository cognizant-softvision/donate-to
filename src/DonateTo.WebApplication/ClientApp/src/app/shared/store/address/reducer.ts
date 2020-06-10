import * as addressActions from './actions';
import { Action, createReducer, on } from '@ngrx/store';
import { AddressModel } from '../../models';

export interface AddressState {
  loading: boolean;
  failed: boolean;
  items: AddressModel[];
}

const INITIAL_STATE: AddressState = {
  loading: false,
  failed: false,
  items: [],
};

const addressReducer = createReducer(
  INITIAL_STATE,
  on(addressActions.loadAddressesByOrganizationId, (state, action) => ({
    ...state,
    loading: true,
    failed: false,
  })),
  on(addressActions.loadAddressesByOrganizationIdSuccess, (state, { addresses }) => ({
    ...state,
    loading: false,
    failed: false,
    items: addresses,
  })),
  on(addressActions.loadAddressesByOrganizationIdFailed, (state) => ({
    ...state,
    loading: false,
    failed: true,
    items: [],
  }))
);

export function reducer(state: AddressState, action: Action) {
  return addressReducer(state, action);
}
