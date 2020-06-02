import { createAction, props } from '@ngrx/store';
import { DonationRequestModel } from '../../models';

export const loadDonationRequest = createAction('[Donation Request] Loads item from server', props<{ id: number }>());
export const loadDonationRequestSuccess = createAction(
  '[Donation Request] Load success',
  props<{ donationRequest: DonationRequestModel }>()
);
export const loadDonationRequestFailed = createAction('[Donation Request] Load failed');
export const addDonation = createAction('[Donation] Add Donation to server', props<{ id: number }>());
export const addDonationSuccess = createAction(
  '[Donation] Add Donation success',
  props<{ donationRequest: DonationRequestModel }>()
);
export const addDonationFailed = createAction('[Donation Request] Add Donation failed');
