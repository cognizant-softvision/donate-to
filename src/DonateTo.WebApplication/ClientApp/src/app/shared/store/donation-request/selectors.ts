import { createFeatureSelector, createSelector, Store } from '@ngrx/store';
import { DonationRequestState } from './reducer';
import { Injectable } from '@angular/core';

export const donationRequestFeatureKey = 'donation-request';

// selectors
export const getEntityState = createFeatureSelector<DonationRequestState>(donationRequestFeatureKey);

export const getAllDonationRequests = createSelector(getEntityState, (state: DonationRequestState) => state.items);

export const getLoadingStatus = createSelector(getEntityState, (state: DonationRequestState) => state.loading);

export const getFailedStatus = createSelector(getEntityState, (state: DonationRequestState) => state.failed);

export const getAllDonationRequestsPaged = createSelector(
  getEntityState,
  (state: DonationRequestState) => state.pagedItems
);

export const getDonationRequest = createSelector(
  getEntityState,
  (state: DonationRequestState) => state.donationRequest
);

export const getAllDonationRequestsSearchPaged = createSelector(
  getEntityState,
  (state: DonationRequestState) => state.pagedItems
);

export const getDonationRequestsFilteredPaged = createSelector(
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
  loading$ = this.store.select(getLoadingStatus);
  failed$ = this.store.select(getFailedStatus);
  loadDonationRequest$ = this.store.select(getDonationRequest);
  donationRequestsFilteredPaged$ = this.store.select(getDonationRequestsFilteredPaged);
}
