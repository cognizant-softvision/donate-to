import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OrganizationService } from '../../async-services/http/organization.service';
import {
  addOrganization,
  addOrganizationsFailed,
  addOrganizationsSuccess,
  loadOrganizations,
  loadOrganizationsByUser,
  loadOrganizationsFailed,
  loadOrganizationsPagedFiltered,
  loadOrganizationsPagedFilteredFailed,
  loadOrganizationsPagedFilteredSuccess,
  loadOrganizationsSuccess,
  updateOrganization,
  updateOrganizationsFailed,
  updateOrganizationsSuccess,
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
        map((organization) => addOrganizationsSuccess({ organization })),
        catchError(() => of(addOrganizationsFailed()))
      )
    )
  );

  @Effect()
  updateOrganization$: Observable<{}> = this.actions$.pipe(
    ofType(updateOrganization),
    switchMap(({ updatedOrganization }) =>
      this.organizationService.updateOrganization(updatedOrganization).pipe(
        map((organization) => updateOrganizationsSuccess({ organization })),
        catchError(() => of(updateOrganizationsFailed()))
      )
    )
  );

  constructor(private actions$: Actions, private organizationService: OrganizationService) {}
}
