import { ActionTypes } from './actions';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable()
export class AuthEffects {
  @Effect()
  doLogin$: Observable<{}> = this.actions$.pipe(
    ofType(ActionTypes.DO_LOGIN),
    switchMap(() => this.authService.loadDiscoveryDocumentAndLogin())
  );

  @Effect()
  doLogout$: Observable<{}> = this.actions$.pipe(
    ofType(ActionTypes.DO_LOGOUT),
    switchMap(() => this.authService.revokeTokenAndLogout())
  );

  @Effect()
  tryLogin$: Observable<{}> = this.actions$.pipe(
    ofType(ActionTypes.TRY_LOGIN),
    switchMap(() =>
      this.authService.loadDiscoveryDocument().then(
        // This method just tries to parse the token(s) within the url when
        // the auth-server redirects the user back to the web-app
        // It doesn't send the user the the login page
        () => this.authService.tryLogin({})
      )
    )
  );

  constructor(private actions$: Actions, private authService: OAuthService) {}
}
