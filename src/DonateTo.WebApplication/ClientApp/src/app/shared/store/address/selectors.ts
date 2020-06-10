import { createFeatureSelector, createSelector, Store } from '@ngrx/store';
import { AddressState } from './reducer';
import { Injectable } from '@angular/core';

// selectors
export const getAddressState = createFeatureSelector<AddressState>('address');

export const getAddressesByOrganizationId = createSelector(getAddressState, (state: AddressState) => state.items);

export const getAddressesLoading = createSelector(getAddressState, (state: AddressState) => state.loading);

@Injectable()
export class AddressSelectors {
  constructor(private store: Store<AddressState>) {}
  // selectors$
  addresses$ = this.store.select(getAddressesByOrganizationId);
  addressState$ = this.store.select(getAddressState);
  loading$ = this.store.select(getAddressesLoading);
}
