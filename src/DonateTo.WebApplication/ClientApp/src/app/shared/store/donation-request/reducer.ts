import * as donationRequestActions from './actions';
import { Action, createReducer, on } from '@ngrx/store';
import { DonationRequestModel, PageModel } from '../../models';

export interface DonationRequestState {
  loading: boolean;
  failed: boolean;
  items: DonationRequestModel[];
  pagedItems: PageModel<DonationRequestModel>;
}

const INITIAL_STATE: DonationRequestState = {
  loading: false,
  failed: false,
  items: [],
  pagedItems: new PageModel<DonationRequestModel>(),
};

const donationRequestReducer = createReducer(
  INITIAL_STATE,
  on(donationRequestActions.loadDonationRequests, (state, action) => ({
    ...state,
    loading: true,
    failed: false,
  })),
  on(donationRequestActions.loadDonationRequestsPaged, (state, action) => ({
    ...state,
    loading: true,
    failed: false,
  })),
  on(donationRequestActions.loadDonationRequestsSearchPaged, (state, action) => ({
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
  on(donationRequestActions.addDonationRequestSuccess, (state, { donationRequest }) => ({
    ...state,
    loading: false,
    failed: false,
    items: [...state.items, donationRequest],
  })),
  on(donationRequestActions.addDonationRequest, (state) => ({
    ...state,
    failed: false,
    loading: true,
  })),
  on(donationRequestActions.addDonationRequestFailed, (state) => ({
    ...state,
    loading: false,
    failed: true,
  })),
  on(donationRequestActions.removeDonationRequest, (state) => ({
    ...state,
    failed: false,
    loading: true,
  })),
  on(donationRequestActions.removeDonationRequestSuccess, (state, { donationRequest }) => ({
    ...state,
    loading: false,
    failed: false,
    items: [...state.items, state.items.filter((item) => item !== donationRequest)],
  })),
  on(donationRequestActions.removeDonationRequestFailed, (state) => ({
    ...state,
    loading: false,
    failed: true,
  }))
);

export function reducer(state: DonationRequestState, action: Action) {
  return donationRequestReducer(state, action);
}
