import { ActionTypes } from './actions';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { Injectable } from '@angular/core';
import { SampleService } from '../../async-services/http/sample-service.service';

@Injectable()
export class SampleEffects {
  @Effect()
  loadSamples$ = this.actions$.pipe(
    ofType(ActionTypes.LOAD_SAMPLES),
    mergeMap(() =>
      this.sampleService.getSample().pipe(
        map((samples) => {
          return { type: ActionTypes.LOAD_SAMPLES_SUCCESS, payload: samples };
        }),
        catchError(() => EMPTY)
      )
    )
  );

  @Effect()
  addSample$ = this.actions$.pipe(
    ofType(ActionTypes.ADD_SAMPLE),
    mergeMap((data: any) =>
      this.sampleService.createSample(data.payload).pipe(
        map((samples) => {
          return { type: ActionTypes.ADD_SAMPLE_SUCCESS, payload: samples };
        }),
        catchError(() => EMPTY)
      )
    )
  );

  constructor(private actions$: Actions, private sampleService: SampleService) {}
}
