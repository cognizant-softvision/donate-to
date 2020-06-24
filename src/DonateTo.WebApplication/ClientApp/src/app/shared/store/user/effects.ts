import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserService } from '../../async-services/http/user.service';
import { userOrganizationLink, userOrganizationLinkFailed } from './actions';

@Injectable()
export class OrganizationEffects {
  @Effect()
  userOrganizationLink$: Observable<{}> = this.actions$.pipe(
    ofType(userOrganizationLink),
    switchMap(() =>
      this.userService.linkUserToOrganization().pipe(
        map((users, organization) => userOrganizationLinkSuccess({ users, organization })),
        catchError(() => of(userOrganizationLinkFailed()))
      )
    )
  );

  constructor(private actions$: Actions, private userService: UserService) {}
}
