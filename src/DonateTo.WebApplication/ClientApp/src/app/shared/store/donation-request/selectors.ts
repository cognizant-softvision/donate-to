import { createFeatureSelector, createSelector, Store } from '@ngrx/store';
import { DonationRequestState } from './reducer';
import { Injectable } from '@angular/core';

export const donationRequestFeatureKey = 'donation-request';
// selectors
export const getEntityState = createFeatureSelector<DonationRequestState>(donationRequestFeatureKey);

export const getAllDonationRequests = createSelector(getEntityState, (state: DonationRequestState) => state.items);

export const getDonationRequestsLoading = createSelector(
  getEntityState,
  (state: DonationRequestState) => state.loading
);

export const getLoadedDonationRequests = createSelector(getEntityState, (state: DonationRequestState) => state.items);

export const getAllDonationRequestsPaged = createSelector(
  getEntityState,
  (state: DonationRequestState) => state.pagedItems
);

export const getAllDonationRequestsSearchPaged = createSelector(
  getEntityState,
  (state: DonationRequestState) => state.pagedItems
);

@Injectable()
export class DonationRequestSelectors {
  constructor(private store: Store<DonationRequestState>) {}
  // selectors$
  donationRequests$ = this.store.select(getAllDonationRequests);
  donationRequestsPaged$ = this.store.select(getAllDonationRequestsPaged);
  donationRequestsSearchPaged$ = this.store.select(getAllDonationRequestsSearchPaged);
  donationRequestState$ = this.store.select(getEntityState);
  loading$ = this.store.select(getDonationRequestsLoading);
  loadedDonationRequests$ = this.store.select(getLoadedDonationRequests);
}
