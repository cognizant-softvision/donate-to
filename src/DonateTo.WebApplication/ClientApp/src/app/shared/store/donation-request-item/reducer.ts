import * as donationRequestActions from './actions';
import { Action, createReducer, on } from '@ngrx/store';

export interface DonationRequestItemState {
  loading: boolean;
  failed: boolean;
}

const INITIAL_STATE: DonationRequestItemState = {
  loading: false,
  failed: false,
};

const donationRequestItemReducer = createReducer(
  INITIAL_STATE,
  on(donationRequestActions.removeDonationRequestItem, (state) => ({
    ...state,
    loading: true,
    failed: false,
  })),
  on(donationRequestActions.removeDonationRequestItemSuccess, (state) => ({
    ...state,
    loading: false,
    failed: false,
  })),
  on(donationRequestActions.removeDonationRequestItemFailed, (state) => ({
    ...state,
    loading: false,
    failed: true,
  }))
);

export function reducer(state: DonationRequestItemState, action: Action) {
  return donationRequestItemReducer(state, action);
}
