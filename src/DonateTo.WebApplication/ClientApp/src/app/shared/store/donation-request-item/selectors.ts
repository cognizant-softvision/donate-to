import { DonationRequestItemState } from './reducer';
import { Injectable } from '@angular/core';
import { createFeatureSelector, Store } from '@ngrx/store';

export const donationRequestItemFeatureKey = 'donation-request-item';

export const getEntityState = createFeatureSelector<DonationRequestItemState>(donationRequestItemFeatureKey);

@Injectable()
export class DonationRequestSelectors {
  constructor(private store: Store<DonationRequestItemState>) {}
}
