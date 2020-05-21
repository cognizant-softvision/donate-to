import { loadDonationRequest, loadDonationRequestFailed, loadDonationRequestSuccess } from './actions';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { DonationRequestService } from '../../async-services/http/donation-request.service';

@Injectable()
export class DonationRequestEffects {
  @Effect()
  loadDonationRequest$: Observable<{}> = this.actions$.pipe(
    ofType(loadDonationRequest),
    switchMap(({ id }) =>
      this.donationRequestService.getDonationRequest(id).pipe(
        map((donationRequest) => loadDonationRequestSuccess({ donationRequest })),
        catchError(() => of(loadDonationRequestFailed()))
      )
    )
  );

  constructor(private actions$: Actions, private donationRequestService: DonationRequestService) {}
}