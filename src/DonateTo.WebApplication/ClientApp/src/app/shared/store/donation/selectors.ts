import { createFeatureSelector, createSelector, Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { DonationRequestState } from './reducer';

export const donationRequestFeatureKey = 'donation';
// selectors
export const getEntityState = createFeatureSelector<DonationRequestState>(donationRequestFeatureKey);
export const getDonationRequest = createSelector(getEntityState, (state: DonationRequestState) => state.item);
export const getDonation = createSelector(getEntityState, (state: DonationRequestState) => state.currentDonation);
export const getDonations = createSelector(getEntityState, (state: DonationRequestState) => state.donations);
export const getDonationLoading = createSelector(getEntityState, (state: DonationRequestState) => state.loading);
export const getNewDonationLoading = createSelector(
  getEntityState,
  (state: DonationRequestState) => state.newDonationLoading
);

@Injectable()
export class DonationSelectors {
  constructor(private store: Store<DonationRequestState>) {}
  // selectors$
  donationRequestState$ = this.store.select(getEntityState);
  donationRequest$ = this.store.select(getDonationRequest);
  donations$ = this.store.select(getDonations);
  loading$ = this.store.select(getDonationLoading);
  newDonationloading$ = this.store.select(getNewDonationLoading);
  donation$ = this.store.select(getDonation);
}
