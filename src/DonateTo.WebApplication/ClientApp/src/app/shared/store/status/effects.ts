import { loadStatus, loadStatusFailed, loadStatusSuccess } from './actions';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { StatusService } from '../../async-services/http/status.service';

@Injectable()
export class StatusEffects {
  @Effect()
  loadStatus$: Observable<{}> = this.actions$.pipe(
    ofType(loadStatus),
    switchMap(() =>
      this.statusService.getStatus().pipe(
        map((status) => loadStatusSuccess({ status })),
        catchError(() => of(loadStatusFailed()))
      )
    )
  );

  constructor(private actions$: Actions, private statusService: StatusService) {}
}
