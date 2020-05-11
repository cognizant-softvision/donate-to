import {
  doLogin,
  doLoginFailed,
  doLoginSuccess,
  doLogout,
  doLogoutSuccess,
  loadUserProfile,
  loadUserProfileFailed,
  tryLogin,
  tryLoginFailed,
  userProfileLoaded,
} from './actions';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, switchMap } from 'rxjs/operators';
import { from, Observable, of, pipe } from 'rxjs';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Action } from '@ngrx/store';

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

  // @Effect()
  // tryLogin$: Observable<{}> = this.actions$.pipe(
  //   ofType(tryLogin),
  //   switchMap(() =>
  //     this.authService
  //       .loadDiscoveryDocumentAndTryLogin()
  //       .then(
  //         // This method just tries to parse the token(s) within the url when
  //         // the auth-server redirects the user back to the web-app
  //         // It doesn't send the user the the login page
  //       () => doLoginSuccess()
  //         // this.authService
  //         //   .tryLogin()
  //         //   .then((value) => {
  //         //     console.log(value);
  //         //     return doLoginSuccess()
  //         //   })
  //         //   .catch(() => doLoginFailed())
  //       )
  //       .catch(() => doLoginFailed())
  //   )
  // );

  @Effect()
  tryLogin$ = this.actions$.pipe(
    ofType(tryLogin),
    switchMap(() =>
      this.authService
        .loadDiscoveryDocumentAndTryLogin()
        .then(() => {
          if (this.authService.hasValidAccessToken()) {
            return loadUserProfile();
          } else {
            return tryLoginFailed();
          }
        })
        .catch(() => of(doLoginFailed()))
    ),
    catchError(() => of(doLoginFailed()))
  );

  @Effect()
  loadUserProfile$: Observable<{}> = this.actions$.pipe(
    ofType(loadUserProfile),
    switchMap(() => {
      if (this.authService.hasValidAccessToken()) {
        console.log('Valid Access token');
        this.authService
          .loadUserProfile()
          .then(() => {
            console.log('loadUserProfile THEN');
            const claims = this.authService.getIdentityClaims();
            return of(
              userProfileLoaded({
                name: claims ? claims['name'] : '',
                email: claims ? claims['name'] : '',
                accessToken: this.authService.getAccessToken(),
              })
            );
          })
          .catch(() => of(loadUserProfileFailed()));
      } else {
        return of(doLoginFailed());
      }
    })
  );

  constructor(private actions$: Actions, private authService: OAuthService) {}
}
