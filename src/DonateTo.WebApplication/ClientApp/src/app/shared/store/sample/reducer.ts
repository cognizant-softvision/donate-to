import * as sampleActions from './actions';
import { Action, createReducer, on } from '@ngrx/store';
import { SampleModel } from '../../models';

export interface SampleState {
  loading: boolean;
  failed: boolean;
  items: SampleModel[];
}

const INITIAL_STATE: SampleState = {
  loading: false,
  failed: false,
  items: [],
};

const sampleReducer = createReducer(
  INITIAL_STATE,
  on(sampleActions.loadSamples, (state, action) => ({
    ...state,
    loading: true,
    failed: false,
  })),
  on(sampleActions.loadSamplesSuccess, (state, { samples }) => ({
    ...state,
    loading: false,
    failed: false,
    items: samples,
  })),
  on(sampleActions.loadSamplesFailed, (state) => ({
    ...state,
    loading: false,
    failed: true,
    items: [],
  })),
  on(sampleActions.addSampleSuccess, (state, { sample }) => ({
    ...state,
    loading: false,
    failed: false,
    items: [...state.items, sample],
  })),
  on(sampleActions.addSampleFailed, (state) => ({
    ...state,
    loading: false,
    failed: true,
  }))
);

export function reducer(state: SampleState, action: Action) {
  return sampleReducer(state, action);
}
