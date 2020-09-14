import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OrganizationService } from '../../async-services/http/organization.service';
import {
  addOrganization,
  addOrganizationFailed,
  addOrganizationSuccess,
  deleteOrganization,
  deleteOrganizationFailed,
  deleteOrganizationSuccess,
  loadOrganization,
  loadOrganizationFailed,
  loadOrganizations,
  loadOrganizationsByUser,
  loadOrganizationsFailed,
  loadOrganizationsPaged,
  loadOrganizationsPagedFailed,
  loadOrganizationsPagedFiltered,
  loadOrganizationsPagedFilteredFailed,
  loadOrganizationsPagedFilteredSuccess,
  loadOrganizationsPagedSuccess,
  loadOrganizationsSearchPaged,
  loadOrganizationsSearchPagedFailed,
  loadOrganizationsSearchPagedSuccess,
  loadOrganizationsSuccess,
  loadOrganizationSuccess,
  updateOrganization,
  updateOrganizationFailed,
  updateOrganizationSuccess,
} from './actions';

@Injectable()
export class OrganizationEffects {
  @Effect()
  loadOrganziationPagedFiltered$: Observable<{}> = this.actions$.pipe(
    ofType(loadOrganizationsPagedFiltered),
    switchMap(({ organizationFilter }) =>
      this.organizationService.getPagedFiltered(organizationFilter).pipe(
        map((pagedOrganizations) => loadOrganizationsPagedFilteredSuccess({ pagedOrganizations })),
        catchError(() => of(loadOrganizationsPagedFilteredFailed()))
      )
    )
  );

  @Effect()
  loadOrganizationsPaged$: Observable<{}> = this.actions$.pipe(
    ofType(loadOrganizationsPaged),
    switchMap(({ pageNumber, pageSize }) =>
      this.organizationService.getOrganizationsPaged(pageNumber, pageSize).pipe(
        map((organizations) => loadOrganizationsPagedSuccess({ organizations })),
        catchError(() => of(loadOrganizationsPagedFailed()))
      )
    )
  );

  @Effect()
  loadOrganizationsSearchPaged$: Observable<{}> = this.actions$.pipe(
    ofType(loadOrganizationsSearchPaged),
    debounceTime(1000),
    distinctUntilChanged(),
    switchMap(({ pageNumber, pageSize, query }) =>
      this.organizationService.getOrganizationsSearchPaged(pageNumber, pageSize, query).pipe(
        map((organizations) => loadOrganizationsSearchPagedSuccess({ organizations })),
        catchError(() => of(loadOrganizationsSearchPagedFailed()))
      )
    )
  );

  @Effect()
  loadOrganization$: Observable<{}> = this.actions$.pipe(
    ofType(loadOrganization),
    switchMap((data: any) =>
      this.organizationService.getOrganization(data.organizationId).pipe(
        map((organization) => loadOrganizationSuccess({ organization })),
        catchError(() => of(loadOrganizationFailed()))
      )
    )
  );

  @Effect()
  loadOrganizations$: Observable<{}> = this.actions$.pipe(
    ofType(loadOrganizations),
    switchMap(() =>
      this.organizationService.getOrganizations().pipe(
        map((organizations) => loadOrganizationsSuccess({ organizations })),
        catchError(() => of(loadOrganizationsFailed()))
      )
    )
  );

  @Effect()
  loadOrganizationsByUser$: Observable<{}> = this.actions$.pipe(
    ofType(loadOrganizationsByUser),
    switchMap(({ userId }) =>
      this.organizationService.getByUser(userId).pipe(
        map((organizations) => loadOrganizationsSuccess({ organizations })),
        catchError(() => of(loadOrganizationsFailed()))
      )
    )
  );

  @Effect()
  addOrganization$: Observable<{}> = this.actions$.pipe(
    ofType(addOrganization),
    switchMap(({ newOrganization }) =>
      this.organizationService.createOrganization(newOrganization).pipe(
        map((organization) => addOrganizationSuccess({ organization })),
        catchError(() => of(addOrganizationFailed()))
      )
    )
  );

  @Effect()
  updateOrganization$: Observable<{}> = this.actions$.pipe(
    ofType(updateOrganization),
    switchMap(({ updatedOrganization }) =>
      this.organizationService.updateOrganization(updatedOrganization).pipe(
        map((organization) => updateOrganizationSuccess({ organization })),
        catchError(() => of(updateOrganizationFailed()))
      )
    )
  );

  @Effect()
  deleteOrganization$: Observable<{}> = this.actions$.pipe(
    ofType(deleteOrganization),
    switchMap((data: any) =>
      this.organizationService.deleteOrganization(data.organization).pipe(
        map((organization) => deleteOrganizationSuccess({ organization })),
        catchError((errorMessage) => of(deleteOrganizationFailed(errorMessage)))
      )
    )
  );

  constructor(private actions$: Actions, private organizationService: OrganizationService) {}
}
