import { ActionTypes, AddSampleFailed, LoadSamples, LoadSamplesFailed, LoadSamplesSuccess } from './actions';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { SampleService } from '../../async-services/http/sample-service.service';

@Injectable()
export class SampleEffects {
  @Effect()
  loadSamples$: Observable<{}> = this.actions$.pipe(
    ofType(ActionTypes.LOAD_SAMPLES),
    map((action: LoadSamples) => action.payload),
    switchMap(() =>
      this.sampleService.getSample().pipe(
        map((samples) => new LoadSamplesSuccess(samples)),
        catchError(() => of(new LoadSamplesFailed()))
      )
    )
  );

  @Effect()
  addSample$: Observable<{}> = this.actions$.pipe(
    ofType(ActionTypes.ADD_SAMPLE),
    switchMap((data: any) =>
      this.sampleService.createSample(data.payload).pipe(
        map((samples) => {
          return { type: ActionTypes.ADD_SAMPLE_SUCCESS, payload: samples };
        }),
        catchError(() => of(new AddSampleFailed(data.payload)))
      )
    )
  );

  constructor(private actions$: Actions, private sampleService: SampleService) {}
}
