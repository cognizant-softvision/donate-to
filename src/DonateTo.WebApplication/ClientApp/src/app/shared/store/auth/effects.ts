import { ActionTypes, DoLoginFailAction, DoLoginSuccessAction, DoLogoutActionSuccess } from './actions';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators';
import { from, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable()
export class AuthEffects {
  @Effect()
  doLogin$: Observable<{}> = this.actions$.pipe(
    ofType(ActionTypes.DO_LOGIN),
    switchMap(() => this.authService.loadDiscoveryDocumentAndLogin().then(() => new DoLoginSuccessAction()))
  );

  @Effect()
  doLogout$: Observable<{}> = this.actions$.pipe(
    ofType(ActionTypes.DO_LOGOUT),
    switchMap(() => this.authService.revokeTokenAndLogout().then(() => new DoLogoutActionSuccess()))
  );

  @Effect()
  tryLogin$: Observable<{}> = this.actions$.pipe(
    ofType(ActionTypes.TRY_LOGIN),
    switchMap(() =>
      this.authService.loadDiscoveryDocument().then(
        // This method just tries to parse the token(s) within the url when
        // the auth-server redirects the user back to the web-app
        // It doesn't send the user the the login page
        () =>
          this.authService
            .tryLogin()
            .then(() => new DoLoginSuccessAction())
            .catch(() => of(new DoLoginFailAction()))
      )
    )
  );

  @Effect()
  userProfileLoaded$: Observable<{}> = this.actions$.pipe(
    ofType(ActionTypes.LOAD_USER_PROFILE),
    switchMap(() =>
      from(
        this.authService.loadUserProfile().then(() => {
          const claims = this.authService.getIdentityClaims();
          return {
            type: ActionTypes.USER_PROFILE_LOADED,
            name: claims ? claims['name'] : '',
            email: claims ? claims['name'] : '',
            access_token: this.authService.getAccessToken(),
          };
        })
      )
    )
  );

  constructor(private actions$: Actions, private authService: OAuthService) {}
}
