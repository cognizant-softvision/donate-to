import { createFeatureSelector, createSelector, Store } from '@ngrx/store';
import { LogState } from './reducer';
import { Injectable } from '@angular/core';

// selectors
export const getLogState = createFeatureSelector<LogState>('log');

export const getAllLogs = createSelector(getLogState, (state: LogState) => state.logs);

export const getLogsByUser = createSelector(getLogState, (state: LogState) => state.logs);

export const getLogsFilteredPaged = createSelector(getLogState, (state: LogState) => state.pagedItems);

export const getFailedStatus = createSelector(getLogState, (state: LogState) => state.failed);

export const getLoadingStatus = createSelector(getLogState, (state: LogState) => state.loading);

export const getLogsLoading = createSelector(getLogState, (state: LogState) => state.loading);

@Injectable()
export class LogSelectors {
  constructor(private store: Store<LogState>) {}
  // selectors$
  logsFilteredPaged$ = this.store.select(getLogsFilteredPaged);
  logs$ = this.store.select(getAllLogs);
  logsByUser$ = this.store.select(getLogsByUser);
  logState$ = this.store.select(getLogState);
  loading$ = this.store.select(getLogsLoading);
}
