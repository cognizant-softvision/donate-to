import * as donationRequestActions from './actions';
import { Action, createReducer, on } from '@ngrx/store';
import { DonationRequestModel, PageModel } from '../../models';

export interface DonationRequestState {
  loading: boolean;
  failed: boolean;
  donationRequest: DonationRequestModel;
  items: DonationRequestModel[];
  pagedItems: PageModel<DonationRequestModel>;
}

const INITIAL_STATE: DonationRequestState = {
  loading: false,
  failed: false,
  donationRequest: undefined,
  items: [],
  pagedItems: new PageModel<DonationRequestModel>(),
};

const donationRequestReducer = createReducer(
  INITIAL_STATE,
  on(donationRequestActions.loadDonationRequest, (state) => ({
    ...state,
    loading: true,
    failed: false,
  })),
  on(donationRequestActions.loadDonationRequests, (state) => ({
    ...state,
    loading: true,
    failed: false,
  })),
  on(donationRequestActions.loadDonationRequestsPaged, (state) => ({
    ...state,
    loading: true,
    failed: false,
  })),
  on(donationRequestActions.loadDonationRequestsSearchPaged, (state) => ({
    ...state,
    loading: true,
    failed: false,
  })),
  on(donationRequestActions.loadDonationRequestsSuccess, (state, { donationRequests }) => ({
    ...state,
    loading: false,
    failed: false,
    items: donationRequests,
  })),
  on(donationRequestActions.loadDonationRequestsPagedSuccess, (state, { donationRequests }) => ({
    ...state,
    loading: false,
    failed: false,
    pagedItems: donationRequests,
  })),
  on(donationRequestActions.loadDonationRequestsSearchPagedSuccess, (state, { donationRequests }) => ({
    ...state,
    loading: false,
    failed: false,
    pagedItems: donationRequests,
  })),
  on(donationRequestActions.loadDonationRequestsFailed, (state) => ({
    ...state,
    loading: false,
    failed: true,
    items: [],
  })),
  on(donationRequestActions.loadDonationRequestsPagedFailed, (state) => ({
    ...state,
    loading: false,
    failed: true,
    pagedItems: null,
  })),
  on(donationRequestActions.loadDonationRequestsSearchPagedFailed, (state) => ({
    ...state,
    loading: false,
    failed: true,
    pagedItems: null,
  })),
  on(donationRequestActions.addDonationRequest, (state) => ({
    ...state,
    loading: true,
    failed: false,
  })),
  on(donationRequestActions.addDonationRequestSuccess, (state, { donationRequest }) => ({
    ...state,
    loading: false,
    failed: false,
    items: [...state.items, donationRequest],
    donationRequest,
  })),
  on(donationRequestActions.addDonationRequestFailed, (state) => ({
    ...state,
    loading: false,
    failed: true,
  })),
  on(donationRequestActions.loadDonationRequestSuccess, (state, { donationRequest }) => ({
    ...state,
    loading: false,
    failed: false,
    donationRequest,
  })),
  on(donationRequestActions.loadDonationRequestFailed, (state) => ({
    ...state,
    loading: false,
    failed: true,
    donationRequest: new DonationRequestModel(),
  })),
  on(donationRequestActions.removeDonationRequest, (state) => ({
    ...state,
    loading: true,
    failed: false,
  })),
  on(donationRequestActions.removeDonationRequestSuccess, (state) => ({
    ...state,
    loading: false,
    failed: false,
  })),
  on(donationRequestActions.removeDonationRequestFailed, (state) => ({
    ...state,
    loading: false,
    failed: true,
  })),
  on(donationRequestActions.updateDonationRequest, (state) => ({
    ...state,
    loading: true,
    failed: false,
  })),
  on(donationRequestActions.updateDonationRequestSuccess, (state) => ({
    ...state,
    loading: false,
    failed: false,
  })),
  on(donationRequestActions.updateDonationRequestFailed, (state) => ({
    ...state,
    loading: false,
    failed: true,
  })),
  on(donationRequestActions.loadDonationRequestsPagedFiltered, (state) => ({
    ...state,
    loading: true,
    failed: false,
  })),
  on(donationRequestActions.loadDonationRequestsPagedFilteredSuccess, (state, { pagedDonationRequests }) => ({
    ...state,
    loading: false,
    failed: false,
    pagedItems: pagedDonationRequests,
  })),
  on(donationRequestActions.loadDonationRequestsPagedFilteredFailed, (state) => ({
    ...state,
    loading: false,
    failed: true,
    pagedItems: new PageModel<DonationRequestModel>(),
  }))
);

export function reducer(state: DonationRequestState, action: Action) {
  return donationRequestReducer(state, action);
}
