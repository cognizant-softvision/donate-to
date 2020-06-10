import { createFeatureSelector, createSelector, Store } from '@ngrx/store';
import { StatusState } from './reducer';
import { Injectable } from '@angular/core';

// selectors
export const getStatusState = createFeatureSelector<StatusState>('status');

export const getAllStatus = createSelector(getStatusState, (state: StatusState) => state.items);

export const getStatusLoading = createSelector(getStatusState, (state: StatusState) => state.loading);

@Injectable()
export class StatusSelectors {
  constructor(private store: Store<StatusState>) {}
  // selectors$
  status$ = this.store.select(getAllStatus);
  statusState$ = this.store.select(getStatusState);
  loading$ = this.store.select(getStatusLoading);
}
