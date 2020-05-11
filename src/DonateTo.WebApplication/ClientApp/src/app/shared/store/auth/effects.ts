import {
  doLogin,
  doLoginFailed,
  doLoginSuccess,
  doLogout,
  doLogoutSuccess,
  loadUserProfile,
  tryLogin,
  userProfileLoaded,
} from './actions';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, switchMap } from 'rxjs/operators';
import { from, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable()
export class AuthEffects {
  @Effect()
  doLogin$: Observable<{}> = this.actions$.pipe(
    ofType(doLogin),
    switchMap(() => this.authService.loadDiscoveryDocumentAndLogin())
  );

  @Effect()
  doLogout$: Observable<{}> = this.actions$.pipe(
    ofType(doLogout),
    switchMap(() => this.authService.revokeTokenAndLogout().then(() => doLogoutSuccess()))
  );

  @Effect()
  tryLogin$: Observable<{}> = this.actions$.pipe(
    ofType(tryLogin),
    switchMap(() => {
      if (this.authService.hasValidAccessToken) {
        return of(loadUserProfile());
      } else {
        return of(doLogin());
      }
    }),
    catchError(() => of(doLoginFailed()))
  );

  @Effect()
  loadUserProfile$: Observable<{}> = this.actions$.pipe(
    ofType(loadUserProfile),
    switchMap(() =>
      from(
        this.authService.loadUserProfile().then(() => {
          const claims = this.authService.getIdentityClaims();
          return userProfileLoaded({
            name: claims ? claims['name'] : '',
            email: claims ? claims['name'] : '',
            accessToken: this.authService.getAccessToken(),
          });
        })
      )
    )
  );

  constructor(private actions$: Actions, private authService: OAuthService) {}
}
