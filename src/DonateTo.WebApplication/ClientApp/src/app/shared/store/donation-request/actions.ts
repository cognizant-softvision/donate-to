import { createAction, props } from '@ngrx/store';
import { DonationRequestModel, PageModel } from '../../models';
import { DonationRequestFilter } from '../../models/filters/donation-request-filter';

export const addDonationRequest = createAction(
  '[Donation Request] Add',
  props<{ donationRequest: DonationRequestModel }>()
);
export const addDonationRequestSuccess = createAction(
  '[Donation Request] Add success',
  props<{ donationRequest: DonationRequestModel }>()
);
export const addDonationRequestFailed = createAction('[Donation Request] Add failed');

export const updateDonationRequest = createAction(
  '[Donation Request] Update',
  props<{ donationRequest: DonationRequestModel }>()
);
export const updateDonationRequestSuccess = createAction(
  '[Donation Request] Update success',
  props<{ donationRequest: DonationRequestModel }>()
);
export const updateDonationRequestFailed = createAction('[Donation Request] Update failed');

export const loadDonationRequest = createAction(
  '[Donation Request] Load donationRequest from server',
  props<{ donationRequestId: number }>()
);
export const loadDonationRequestSuccess = createAction(
  '[Donation Request] Load donationRequest success',
  props<{ donationRequest: DonationRequestModel }>()
);
export const loadDonationRequestFailed = createAction('[Donation Request] Load donationRequest failed');

export const removeDonationRequest = createAction(
  '[Donation Request] Remove',
  props<{ donationRequest: DonationRequestModel }>()
);
export const removeDonationRequestSuccess = createAction(
  '[Donation Request] Remove success',
  props<{ donationRequest: DonationRequestModel }>()
);
export const removeDonationRequestFailed = createAction('[Donation Request] Remove failed');

export const loadDonationRequests = createAction('[Donation Request] Load items from server');
export const loadDonationRequestsSuccess = createAction(
  '[Donation Request] Load items success',
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

export const validateDonateionRequestForm = createAction('[Donation Request] validates the Donation Request Form');

export const loadDonationRequestsPagedFiltered = createAction(
  '[DonationRequest] Load items from server paged and filtered',
  props<{ donationRequestFilter: DonationRequestFilter }>()
);

export const loadDonationRequestsPagedFilteredSuccess = createAction(
  '[DonationRequest] Load success',
  props<{ pagedDonationRequests: PageModel<DonationRequestModel> }>()
);

export const loadDonationRequestsPagedFilteredFailed = createAction('[DonationRequest] Load failed');
