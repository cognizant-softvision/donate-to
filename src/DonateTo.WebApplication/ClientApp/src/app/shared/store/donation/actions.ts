import { createAction, props } from '@ngrx/store';
import { DonationRequestModel, PageModel } from '../../models';
import { DonationModel } from '../../models/donation.model';

export const loadDonationRequest = createAction('[Donation Request] Loads item from server', props<{ id: number }>());
export const loadDonationRequestSuccess = createAction(
  '[Donation Request] Load success',
  props<{ donationRequest: DonationRequestModel }>()
);
export const loadDonationRequestFailed = createAction('[Donation Request] Load failed');
export const addDonation = createAction('[Donation] Add Donation to server', props<{ donation: DonationModel }>());
export const updateDonation = createAction(
  '[Donation] Updated Donation on server',
  props<{ donation: DonationModel }>()
);
export const deleteDonation = createAction(
  '[Donation] Deleted Donation on server',
  props<{ donation: DonationModel }>()
);
export const addDonationSuccess = createAction(
  '[Donation] Add Donation success',
  props<{ newDonation: DonationModel }>()
);
export const updateDonationSuccess = createAction(
  '[Donation] Updated Donation success',
  props<{ newDonation: DonationModel }>()
);
export const deleteDonationSuccess = createAction(
  '[Donation] Deleted Donation success',
  props<{ donation: DonationModel }>()
);
export const loadDonationByIdSuccess = createAction(
  '[Donation] Load Donation by Id success',
  props<{ donation: DonationModel }>()
);
export const addDonationFailed = createAction('[Donation Request] Add Donation failed');
export const updateDonationFailed = createAction('[Donation Request] Update Donation failed');
export const deleteDonationFailed = createAction('[Donation Request] Deleted Donation failed');
export const loadDonationByIdFailed = createAction('[Donation Request] Load Donation by Id failed');
export const loadDonationByUserPagedFailed = createAction('[Donation Request] Load Donation by user failed');

export const loadDonationById = createAction(
  '[Donation Request] Load Donation by Id from server',
  props<{ donationId: number }>()
);
export const loadDonationByUserPaged = createAction(
  '[Donation Request] Load donations by user from server',
  props<{ pageNumber: number; pageSize: number; userId?: number; statusId?: number }>()
);
export const loadDonationByUserPagedSuccess = createAction(
  '[Donation Request] Load donations by user success',
  props<{ donations: PageModel<DonationModel> }>()
);
