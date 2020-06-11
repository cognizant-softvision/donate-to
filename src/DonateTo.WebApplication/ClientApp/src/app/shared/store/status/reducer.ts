import * as statusActions from './actions';
import { Action, createReducer, on } from '@ngrx/store';
import { StatusModel } from '../../models';

export interface StatusState {
  loading: boolean;
  failed: boolean;
  items: StatusModel[];
}

const INITIAL_STATE: StatusState = {
  loading: false,
  failed: false,
  items: [],
};

const statusReducer = createReducer(
  INITIAL_STATE,
  on(statusActions.loadStatus, (state, action) => ({
    ...state,
    loading: true,
    failed: false,
  })),
  on(statusActions.loadStatusSuccess, (state, { status }) => ({
    ...state,
    loading: false,
    failed: false,
    items: status,
  })),
  on(statusActions.loadStatusFailed, (state) => ({
    ...state,
    loading: false,
    failed: true,
    items: [],
  }))
);

export function reducer(state: StatusState, action: Action) {
  return statusReducer(state, action);
}
