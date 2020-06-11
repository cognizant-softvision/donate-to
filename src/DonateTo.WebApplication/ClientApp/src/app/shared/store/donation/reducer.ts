import * as donationRequestActions from './actions';
import { Action, createReducer, on } from '@ngrx/store';
import { DonationRequestModel } from '../../models';

export interface DonationRequestState {
  loading: boolean;
  failed: boolean;
  item: DonationRequestModel;
  newDonationLoading: boolean;
}

const INITIAL_STATE: DonationRequestState = {
  loading: true,
  failed: false,
  item: new DonationRequestModel(),
  newDonationLoading: false,
};

const donationRequestReducer = createReducer(
  INITIAL_STATE,
  on(donationRequestActions.loadDonationRequest, (state) => ({
    ...state,
    loading: true,
    failed: false,
    item: new DonationRequestModel(),
  })),
  on(donationRequestActions.loadDonationRequestSuccess, (state, { donationRequest }) => ({
    ...state,
    loading: false,
    failed: false,
    item: donationRequest,
  })),
  on(donationRequestActions.loadDonationRequestFailed, (state) => ({
    ...state,
    loading: false,
    failed: true,
  })),
  on(donationRequestActions.addDonation, (state) => ({
    ...state,
    loading: true,
    failed: false,
    newDonationLoading: true,
  })),
  on(donationRequestActions.addDonationSuccess, (state, { newDonation }) => ({
    ...state,
    loading: false,
    failed: false,
    newDonationLoading: false,
  })),
  on(donationRequestActions.addDonationFailed, (state) => ({
    ...state,
    loading: false,
    failed: true,
  }))
);

export function reducer(state: DonationRequestState, action: Action) {
  return donationRequestReducer(state, action);
}
