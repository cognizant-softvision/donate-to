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
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
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
        .catch(() => doLoginFailed())
    )
  );

  @Effect()
  loadUserProfile$: Observable<{}> = this.actions$.pipe(
    ofType(loadUserProfile),
    switchMap(() =>
      this.authService
        .loadUserProfile()
        .then(() => {
          const claims = this.authService.getIdentityClaims();
          return userProfileLoaded({
            name: claims ? claims['name'] : '',
            email: claims ? claims['name'] : '',
            accessToken: this.authService.getAccessToken(),
          });
        })
        .catch(() => loadUserProfileFailed())
    )
  );

  constructor(private actions$: Actions, private authService: OAuthService) {}
}
