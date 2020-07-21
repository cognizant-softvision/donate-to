import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserService } from '../../async-services/http/user.service';
import {
  loadUser,
  loadUserFailed,
  loadUsers,
  loadUsersFailed,
  loadUsersPagedFiltered,
  loadUsersPagedFilteredFailed,
  loadUsersPagedFilteredSuccess,
  loadUsersSuccess,
  loadUserSuccess,
  updateUser,
  updateUserFailed,
  updateUserSuccess,
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

  @Effect()
  loadUser$: Observable<{}> = this.actions$.pipe(
    ofType(loadUser),
    switchMap((data: any) =>
      this.userService.getUser(data.userId).pipe(
        map((user) => loadUserSuccess({ user })),
        catchError(() => of(loadUserFailed()))
      )
    )
  );

  @Effect()
  updateUser$: Observable<{}> = this.actions$.pipe(
    ofType(updateUser),
    switchMap((data: any) =>
      this.userService.update(data.user).pipe(
        map((user) => updateUserSuccess({ user })),
        catchError(() => of(updateUserFailed()))
      )
    )
  );

  @Effect()
  loadUsersPagedFiltered$: Observable<{}> = this.actions$.pipe(
    ofType(loadUsersPagedFiltered),
    switchMap(({ filter }) =>
      this.userService.getPagedFiltered(filter).pipe(
        map((pagedUsers) => loadUsersPagedFilteredSuccess({ pagedUsers })),
        catchError(() => of(loadUsersPagedFilteredFailed()))
      )
    )
  );

  constructor(private actions$: Actions, private userService: UserService) {}
}
