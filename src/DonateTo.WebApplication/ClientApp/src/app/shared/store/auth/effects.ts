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
import { switchMap } from 'rxjs/operators';
import { from, Observable, pipe } from 'rxjs';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable()
export class AuthEffects {
  @Effect()
  doLogin$: Observable<{}> = this.actions$.pipe(
    ofType(doLogin),
    switchMap(() => this.authService.loadDiscoveryDocumentAndLogin().then(() => doLoginSuccess()))
  );

  @Effect()
  doLogout$: Observable<{}> = this.actions$.pipe(
    ofType(doLogout),
    switchMap(() => this.authService.revokeTokenAndLogout().then(() => doLogoutSuccess()))
  );

  @Effect()
  tryLogin$: Observable<{}> = this.actions$.pipe(
    ofType(tryLogin),
    switchMap(() =>
      this.authService
        .loadDiscoveryDocumentAndTryLogin()
        .then(
          // This method just tries to parse the token(s) within the url when
          // the auth-server redirects the user back to the web-app
          // It doesn't send the user the the login page
          (value) => {
            console.log(value);
            return doLoginSuccess();
          }
          // this.authService
          //   .tryLogin()
          //   .then((value) => {
          //     console.log(value);
          //     return doLoginSuccess()
          //   })
          //   .catch(() => doLoginFailed())
        )
        .catch(() => doLoginFailed())
    )
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
