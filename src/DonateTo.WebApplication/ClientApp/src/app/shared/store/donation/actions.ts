import { createAction, props } from '@ngrx/store';
import { DonationRequestModel } from '../../models';

export const loadDonationRequest = createAction('[Donation Request] Loads item from server', props<{ id: number }>());
export const loadDonationRequestSuccess = createAction(
  '[Donation Request] Load success',
  props<{ donationRequest: DonationRequestModel }>()
);
export const loadDonationRequestFailed = createAction('[Donation Request] Load failed');
