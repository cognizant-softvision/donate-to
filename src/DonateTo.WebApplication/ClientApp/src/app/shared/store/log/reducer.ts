import * as logActions from './actions';
import { Action, createReducer, on } from '@ngrx/store';
import { LogModel } from '../../models/log.model';
import { PageModel } from '../../models/page.model';

export interface LogState {
  loading: boolean;
  failed: boolean;
  pagedItems: PageModel<LogModel>;
  logs: LogModel[];
}

const INITIAL_STATE: LogState = {
  loading: false,
  failed: false,
  pagedItems: new PageModel<LogModel>(),
  logs: [],
};

const logReducer = createReducer(
  INITIAL_STATE,
  on(logActions.loadLogsPagedFiltered, (state) => ({
    ...state,
    loading: true,
    failed: false,
  })),
  on(logActions.loadLogsPagedFilteredSuccess, (state, { pagedLogs }) => ({
    ...state,
    loading: false,
    failed: false,
    pagedItems: pagedLogs,
  })),
  on(logActions.loadLogsPagedFilteredFailed, (state) => ({
    ...state,
    loading: false,
    failed: true,
    pagedItems: new PageModel<LogModel>(),
  })),
  on(logActions.loadLogs, (state, action) => ({
    ...state,
    loading: true,
    failed: false,
  })),
  on(logActions.loadLogsSuccess, (state, { logs }) => ({
    ...state,
    loading: false,
    failed: false,
    logs,
  })),
  on(logActions.loadLogsFailed, (state) => ({
    ...state,
    loading: false,
    failed: true,
  }))
);

export function reducer(state: LogState, action: Action) {
  return logReducer(state, action);
}
