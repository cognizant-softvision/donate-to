import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { loadOrganizations, loadOrganizationsFailed, loadOrganizationsSuccess } from './actions';

import { Injectable } from '@angular/core';
import { OrganizationService } from '../../async-services/http/organization.service';

@Injectable()
export class OrganizationEffects {
  @Effect()
  loadOrganizations$: Observable<{}> = this.actions$.pipe(
    ofType(loadOrganizations),
    switchMap(() =>
      this.organizationService.get().pipe(
        map((organizations) => loadOrganizationsSuccess({ organizations })),
        catchError(() => of(loadOrganizationsFailed()))
      )
    )
  );

  constructor(private actions$: Actions, private organizationService: OrganizationService) {}
}
