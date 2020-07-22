import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { DonationRequestService } from '../../async-services/http/donation-request.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  addDonationRequest,
  addDonationRequestFailed,
  addDonationRequestSuccess,
  loadDonationRequest,
  loadDonationRequestFailed,
  loadDonationRequests,
  loadDonationRequestsFailed,
  loadDonationRequestsPaged,
  loadDonationRequestsPagedFailed,
  loadDonationRequestsPagedFiltered,
  loadDonationRequestsPagedFilteredFailed,
  loadDonationRequestsPagedFilteredSuccess,
  loadDonationRequestsPagedSuccess,
  loadDonationRequestsSearchPaged,
  loadDonationRequestsSearchPagedFailed,
  loadDonationRequestsSearchPagedSuccess,
  loadDonationRequestsSuccess,
  loadDonationRequestSuccess,
  removeDonationRequest,
  removeDonationRequestFailed,
  removeDonationRequestSuccess,
  updateDonationRequest,
  updateDonationRequestFailed,
  updateDonationRequestSuccess,
} from './actions';

@Injectable()
export class DonationRequestEffects {
  @Effect()
  loadDonationRequests$: Observable<{}> = this.actions$.pipe(
    ofType(loadDonationRequests),
    switchMap(() =>
      this.donationRequestService.getDonationRequests().pipe(
        map((donationRequests) => loadDonationRequestsSuccess({ donationRequests })),
        catchError(() => of(loadDonationRequestsFailed()))
      )
    )
  );

  @Effect()
  loadDonationRequestsPaged$: Observable<{}> = this.actions$.pipe(
    ofType(loadDonationRequestsPaged),
    switchMap(({ pageNumber, pageSize }) =>
      this.donationRequestService.getDonationRequestsPaged(pageNumber, pageSize).pipe(
        map((donationRequests) => loadDonationRequestsPagedSuccess({ donationRequests })),
        catchError(() => of(loadDonationRequestsPagedFailed()))
      )
    )
  );

  @Effect()
  loadDonationRequestsSearchPaged$: Observable<{}> = this.actions$.pipe(
    ofType(loadDonationRequestsSearchPaged),
    debounceTime(1000),
    distinctUntilChanged(),
    switchMap(({ pageNumber, pageSize, query }) =>
      this.donationRequestService.getDonationRequestsSearchPaged(pageNumber, pageSize, query).pipe(
        map((donationRequests) => loadDonationRequestsSearchPagedSuccess({ donationRequests })),
        catchError(() => of(loadDonationRequestsSearchPagedFailed()))
      )
    )
  );

  @Effect()
  addDonationRequest$: Observable<{}> = this.actions$.pipe(
    ofType(addDonationRequest),
    switchMap((data: any) =>
      this.donationRequestService.createDonationRequest(data.donationRequest).pipe(
        map((donationRequest) => addDonationRequestSuccess({ donationRequest })),
        catchError(() => of(addDonationRequestFailed()))
      )
    )
  );

  @Effect()
  updateDonationRequest$: Observable<{}> = this.actions$.pipe(
    ofType(updateDonationRequest),
    switchMap((data: any) =>
      this.donationRequestService.update(data.donationRequest).pipe(
        map((donationRequest) => updateDonationRequestSuccess({ donationRequest })),
        catchError(() => of(updateDonationRequestFailed()))
      )
    )
  );

  @Effect()
  loadDonationRequest$: Observable<{}> = this.actions$.pipe(
    ofType(loadDonationRequest),
    switchMap((data: any) =>
      this.donationRequestService.getDonationRequest(data.donationRequestId).pipe(
        map((donationRequest) => loadDonationRequestSuccess({ donationRequest })),
        catchError(() => of(loadDonationRequestFailed()))
      )
    )
  );

  @Effect()
  removeDonationRequest$: Observable<{}> = this.actions$.pipe(
    ofType(removeDonationRequest),
    switchMap((data: any) =>
      this.donationRequestService.delete(data.donationRequest).pipe(
        map((donationRequest) => removeDonationRequestSuccess({ donationRequest })),
        catchError(() => of(removeDonationRequestFailed()))
      )
    )
  );

  @Effect()
  loadDonationRequestsPagedFiltered$: Observable<{}> = this.actions$.pipe(
    ofType(loadDonationRequestsPagedFiltered),
    switchMap(({ donationRequestFilter }) =>
      this.donationRequestService.getPagedFiltered(donationRequestFilter).pipe(
        map((pagedDonationRequests) => loadDonationRequestsPagedFilteredSuccess({ pagedDonationRequests })),
        catchError(() => of(loadDonationRequestsPagedFilteredFailed()))
      )
    )
  );

  constructor(private actions$: Actions, private donationRequestService: DonationRequestService) {}
}
