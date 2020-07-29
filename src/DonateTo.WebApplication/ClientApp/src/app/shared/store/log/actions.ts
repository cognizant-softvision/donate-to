import { createAction, props } from '@ngrx/store';
import { LogModel } from '../../models/log.model';
import { PageModel } from '../../models/page.model';
import { LogFilter } from '../../models/filters/log-filter';

export const loadLogs = createAction('[Log] Load items from server');

export const loadLogsSuccess = createAction('[Log] Load success', props<{ logs: LogModel[] }>());
export const loadLogsFailed = createAction('[Log] Load failed');
export const loadLogsPagedFiltered = createAction(
  '[Logs] Load items from server paged and filtered',
  props<{ logFilter: LogFilter }>()
);
export const loadLogsPagedFilteredSuccess = createAction(
  '[Logs] Load success',
  props<{ pagedLogs: PageModel<LogModel> }>()
);
export const loadLogsPagedFilteredFailed = createAction('[Logs] Load failed');

export const loadLogsByUser = createAction('[Log] Load items from server by user', props<{ userId: number }>());
