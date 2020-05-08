import {
  addSample,
  addSampleFailed,
  addSampleSuccess,
  loadSamples,
  loadSamplesFailed,
  loadSamplesSuccess,
} from './actions';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { SampleService } from '../../async-services/http/sample-service.service';

@Injectable()
export class SampleEffects {
  @Effect()
  loadSamples$: Observable<{}> = this.actions$.pipe(
    ofType(loadSamples),
    switchMap(() =>
      this.sampleService.getSample().pipe(
        map((samples) => loadSamplesSuccess({ samples })),
        catchError(() => of(loadSamplesFailed()))
      )
    )
  );

  @Effect()
  addSample$: Observable<{}> = this.actions$.pipe(
    ofType(addSample),
    switchMap((data: any) =>
      this.sampleService.createSample(data.payload).pipe(
        map((sample) => addSampleSuccess({ sample })),
        catchError(() => of(addSampleFailed()))
      )
    )
  );

  constructor(private actions$: Actions, private sampleService: SampleService) {}
}
