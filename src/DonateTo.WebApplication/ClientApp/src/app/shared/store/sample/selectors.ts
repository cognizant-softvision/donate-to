import { createFeatureSelector, createSelector, Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { SampleState } from './reducer';

// selectors
const getEntityState = createFeatureSelector<SampleState>('entityCache');

const getAllSamples = createSelector(getEntityState, (state: SampleState) => state.items);

const getSamplesLoading = createSelector(getEntityState, (state: SampleState) => state.loading);

@Injectable()
export class SampleSelectors {
  constructor(private store: Store<SampleState>) {}
  // selectors$
  samples$ = this.store.select(getAllSamples);
  sampleState$ = this.store.select(getEntityState);
  loading$ = this.store.select(getSamplesLoading);
}
