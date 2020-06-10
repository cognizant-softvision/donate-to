import { loadUnits, loadUnitsFailed, loadUnitsSuccess } from './actions';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { UnitService } from '../../async-services/http/unit.service';

@Injectable()
export class UnitEffects {
  @Effect()
  loadUnits$: Observable<{}> = this.actions$.pipe(
    ofType(loadUnits),
    switchMap(() =>
      this.unitService.getUnits().pipe(
        map((units) => loadUnitsSuccess({ units })),
        catchError(() => of(loadUnitsFailed()))
      )
    )
  );

  constructor(private actions$: Actions, private unitService: UnitService) {}
}
