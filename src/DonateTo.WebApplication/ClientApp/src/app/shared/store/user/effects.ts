import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserService } from '../../async-services/http/user.service';
import { userOrganizationLink, userOrganizationLinkFailed, userOrganizationLinkSuccess } from './actions';

@Injectable()
export class UserEffects {
  @Effect()
  userOrganizationLink$: Observable<{}> = this.actions$.pipe(
    ofType(userOrganizationLink),
    switchMap(({ userId, organizations }) =>
      this.userService.userOrganizationLink(userId, organizations).pipe(
        map(() => userOrganizationLinkSuccess()),
        catchError(() => of(userOrganizationLinkFailed()))
      )
    )
  );

  constructor(private actions$: Actions, private userService: UserService) {}
}
