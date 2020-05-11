import { AuthConfigService } from 'src/app/shared/auth/auth.config';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Sandbox } from '../sandbox/base.sandbox';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as store from '../store';

@Injectable()
export class AuthSandbox extends Sandbox {
  private subscriptions: Subscription[] = [];

  constructor(
    protected appState$: Store<store.State>,
    private authService: OAuthService,
    private authConfigService: AuthConfigService
  ) {
    super(appState$);
  }

  /**
   *
   */
  public setupAuth(): void {
    this.authConfigService.getConfig().then((authConfig) => {
      this.authService.configure(authConfig);
      this.appState$.dispatch(store.fromAuth.tryLogin());
    });

    this.authService.events.subscribe((event) => {
      console.log(event);
      switch (event.type) {
        case 'token_received':
          this.appState$.dispatch(store.fromAuth.loadUserProfile());
          break;
        case 'token_refreshed':
          this.appState$.dispatch(store.fromAuth.loadUserProfile());
          break;
      }
    });
  }

  /**
   *
   */
  public login(): void {
    this.appState$.dispatch(store.fromAuth.doLogin());
  }
}
