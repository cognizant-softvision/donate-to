import { createFeatureSelector, createSelector, Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { AddressState } from './reducer';

export const addressFeatureKey = 'address';
// selectors
export const getEntityState = createFeatureSelector<AddressState>(addressFeatureKey);
export const getCountries = createSelector(getEntityState, (state: AddressState) => state.countries);
export const getStates = createSelector(getEntityState, (state: AddressState) => state.states);
export const getCities = createSelector(getEntityState, (state: AddressState) => state.cities);
export const getAddressLoading = createSelector(getEntityState, (state: AddressState) => state.loading);

@Injectable()
export class DonationSelectors {
  constructor(private store: Store<AddressState>) {}
  // selectors$
  addressState$ = this.store.select(getEntityState);
  countries$ = this.store.select(getCountries);
  states$ = this.store.select(getStates);
  cities$ = this.store.select(getCities);
  loading$ = this.store.select(getAddressLoading);
}
