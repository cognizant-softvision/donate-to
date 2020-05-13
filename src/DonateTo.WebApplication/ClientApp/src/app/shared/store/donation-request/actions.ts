import { createAction, props } from '@ngrx/store';
import { DonationRequestModel, PageModel } from '../../models';

export const addDonationRequest = createAction(
  '[Donation Request] Add Donation Request',
  props<{ donationRequest: DonationRequestModel }>()
);
export const addDonationRequestSuccess = createAction(
  '[Donation Request] Add success',
  props<{ donationRequest: DonationRequestModel }>()
);
export const addDonationRequestFailed = createAction('[Donation Request] Add failed');
export const loadDonationRequests = createAction('[Donation Request] Load items from server');
export const loadDonationRequestsSuccess = createAction(
  '[Donation Request] Load success',
  props<{ donationRequests: DonationRequestModel[] }>()
);
export const loadDonationRequestsFailed = createAction('[Donation Request] Load failed');
export const loadDonationRequestsPaged = createAction(
  '[Donation Request] Load paged items from server',
  props<{ pageSize: number; pageNumber: number }>()
);
export const loadDonationRequestsPagedSuccess = createAction(
  '[Donation Request] Load paged success',
  props<{ donationRequests: PageModel<DonationRequestModel> }>()
);
export const loadDonationRequestsPagedFailed = createAction('[Donation Request] Load paged failed');
export const loadDonationRequestsSearchPaged = createAction(
  '[Donation Request] Load paged search result items from server',
  props<{ pageSize: number; pageNumber: number; query: string }>()
);
export const loadDonationRequestsSearchPagedSuccess = createAction(
  '[Donation Request] Load paged search result success',
  props<{ donationRequests: PageModel<DonationRequestModel> }>()
);
export const loadDonationRequestsSearchPagedFailed = createAction('[Donation Request] Load paged search result failed');
