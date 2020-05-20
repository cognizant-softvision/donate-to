import { createFeatureSelector, createSelector, Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { DonationRequestState } from './reducer';

export const donationRequestFeatureKey = 'donation';
// selectors
export const getEntityState = createFeatureSelector<DonationRequestState>(donationRequestFeatureKey);
export const getDonationRequest = createSelector(getEntityState, (state: DonationRequestState) => state.item);
export const getDonationLoading = createSelector(getEntityState, (state: DonationRequestState) => state.loading);

@Injectable()
export class DonationSelectors {
  constructor(private store: Store<DonationRequestState>) {}
  // selectors$
  donationRequestState$ = this.store.select(getEntityState);
  donationRequest$ = this.store.select(getDonationRequest);
  loading$ = this.store.select(getDonationLoading);
}
