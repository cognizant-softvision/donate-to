import { createFeatureSelector, createSelector, Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { DonationRequestState } from './reducer';

export const donationRequestFeatureKey = 'donation-request';
// selectors
export const getEntityState = createFeatureSelector<DonationRequestState>(donationRequestFeatureKey);

export const getAllDonationRequests = createSelector(getEntityState, (state: DonationRequestState) => state.items);

export const getDonationRequestsLoading = createSelector(
  getEntityState,
  (state: DonationRequestState) => state.loading
);

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
}
