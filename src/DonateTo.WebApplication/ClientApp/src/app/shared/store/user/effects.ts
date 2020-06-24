import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserService } from '../../async-services/http/user.service';
import {
  loadUsers,
  loadUsersFailed,
  loadUsersSuccess,
  userOrganizationLink,
  userOrganizationLinkFailed,
  userOrganizationLinkSuccess,
} from './actions';

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

  @Effect()
  loadUsers$: Observable<{}> = this.actions$.pipe(
    ofType(loadUsers),
    switchMap(() =>
      this.userService.getUsers().pipe(
        map((users) => loadUsersSuccess({ users })),
        catchError(() => of(loadUsersFailed()))
      )
    )
  );

  constructor(private actions$: Actions, private userService: UserService) {}
}
