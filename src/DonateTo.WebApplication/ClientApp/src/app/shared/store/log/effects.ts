import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LogService } from '../../async-services/http/log.service';
import {
  loadLogs,
  loadLogsByUser,
  loadLogsFailed,
  loadLogsPagedFiltered,
  loadLogsPagedFilteredFailed,
  loadLogsPagedFilteredSuccess,
  loadLogsSuccess,
} from './actions';

@Injectable()
export class LogEffects {
  @Effect()
  loadLogPagedFiltered$: Observable<{}> = this.actions$.pipe(
    ofType(loadLogsPagedFiltered),
    switchMap(({ logFilter }) =>
      this.logService.getPagedFiltered(logFilter).pipe(
        map((pagedLogs) => loadLogsPagedFilteredSuccess({ pagedLogs })),
        catchError(() => of(loadLogsPagedFilteredFailed()))
      )
    )
  );

  @Effect()
  loadLogs$: Observable<{}> = this.actions$.pipe(
    ofType(loadLogs),
    switchMap(() =>
      this.logService.getLogs().pipe(
        map((logs) => loadLogsSuccess({ logs })),
        catchError(() => of(loadLogsFailed()))
      )
    )
  );

  constructor(private actions$: Actions, private logService: LogService) {}
}
