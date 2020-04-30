import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { ActionTypes } from './actions';
import { SampleService } from 'src/shared/async-services/http/sample-service.service';

@Injectable()
export class DonationEffects {
  @Effect()
  loadDonations$ = this.actions$.pipe(
    tap(() => console.log("Loading from server")),
    ofType(ActionTypes.LOAD_ITEMS),
    mergeMap(() =>
      this.sampleService.getSample().pipe(
        map(donations => {
          console.log(donations);
          return { type: ActionTypes.LOAD_SUCCESS, payload: donations };
        }),
        catchError((error) => {console.log(error); return EMPTY;})
      )
    )
  );

  constructor(
    private actions$: Actions,
    private sampleService: SampleService
  ) {}
}
