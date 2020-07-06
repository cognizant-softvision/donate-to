import {
  loadOrganizations,
  loadOrganizationsByUser,
  loadOrganizationsFailed,
  loadOrganizationsSuccess,
} from './actions';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { OrganizationService } from '../../async-services/http/organization.service';

@Injectable()
export class OrganizationEffects {
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

  constructor(private actions$: Actions, private organizationService: OrganizationService) {}
}
