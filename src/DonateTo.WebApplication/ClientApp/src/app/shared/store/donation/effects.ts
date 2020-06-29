import {
  addDonation,
  addDonationFailed,
  addDonationSuccess,
  deleteDonation,
  deleteDonationFailed,
  deleteDonationSuccess,
  loadDonationById,
  loadDonationByIdFailed,
  loadDonationByIdSuccess,
  loadDonationByUserPaged,
  loadDonationByUserPagedFailed,
  loadDonationByUserPagedSuccess,
  loadDonationRequest,
  loadDonationRequestFailed,
  loadDonationRequestSuccess,
  updateDonation,
  updateDonationFailed,
  updateDonationSuccess,
} from './actions';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { DonationRequestService } from '../../async-services/http/donation-request.service';
import { DonationService } from '../../async-services/http/donation.service';

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

  @Effect()
  addDonation$: Observable<{}> = this.actions$.pipe(
    ofType(addDonation),
    switchMap(({ donation }) =>
      this.donationService.createDonation(donation).pipe(
        map((newDonation) => addDonationSuccess({ newDonation })),
        catchError(() => of(addDonationFailed()))
      )
    )
  );

  @Effect()
  updateDonation$: Observable<{}> = this.actions$.pipe(
    ofType(updateDonation),
    switchMap(({ donation }) =>
      this.donationService.update(donation).pipe(
        map((newDonation) => updateDonationSuccess({ newDonation })),
        catchError(() => of(updateDonationFailed()))
      )
    )
  );

  @Effect()
  loadDonationRequestsPaged$: Observable<{}> = this.actions$.pipe(
    ofType(loadDonationByUserPaged),
    switchMap(({ pageNumber, pageSize, userId }) =>
      this.donationService.loadDonationByUserPaged(pageNumber, pageSize, userId).pipe(
        map((donations) => loadDonationByUserPagedSuccess({ donations })),
        catchError(() => of(loadDonationByUserPagedFailed()))
      )
    )
  );

  @Effect()
  deleteDonationRequestsPaged$: Observable<{}> = this.actions$.pipe(
    ofType(deleteDonation),
    switchMap(({ donation }) =>
      this.donationService.delete(donation).pipe(
        map((donations) => deleteDonationSuccess({ donation })),
        catchError(() => of(deleteDonationFailed()))
      )
    )
  );

  @Effect()
  loadDonationById$: Observable<{}> = this.actions$.pipe(
    ofType(loadDonationById),
    switchMap(({ donationId }) =>
      this.donationService.getById(donationId).pipe(
        map((donation) => loadDonationByIdSuccess({ donation })),
        catchError(() => of(loadDonationByIdFailed()))
      )
    )
  );
  constructor(
    private actions$: Actions,
    private donationRequestService: DonationRequestService,
    private donationService: DonationService
  ) {}
}
