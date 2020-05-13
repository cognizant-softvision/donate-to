import { AuthConfigService } from 'src/app/shared/auth/auth.config';
import { Injectable } from '@angular/core';
import { OAuthEvent, OAuthService } from 'angular-oauth2-oidc';
import { Sandbox } from '../sandbox/base.sandbox';
import { Store } from '@ngrx/store';
import * as store from '../store';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class AuthSandbox extends Sandbox {
  constructor(
    protected appState$: Store<store.State>,
    private authService: OAuthService,
    private authConfigService: AuthConfigService
  ) {
    super(appState$);
  }

  /**
   * Sets up Auth configuration
   * Subscribes to service token event changes
   */
  public setupAuth(): void {
    const authConfig = this.authConfigService.getConfig();
    this.authService.configure(authConfig);
    this.appState$.dispatch(store.fromAuth.tryLogin());

    this.authService.events.subscribe(this.handleAuthEvents.bind(this));
  }

  /**
   * Dispatches a login action to redirect to the login page
   */
  public login(): void {
    this.appState$.dispatch(store.fromAuth.doLogin());
  }

  /**
   * Dispatches a load user profile action when
   * an token event of type received or refreshed
   * is raised
   */
  public handleAuthEvents(event: OAuthEvent): void {
    switch (event.type) {
      case 'token_received':
        this.appState$.dispatch(store.fromAuth.loadUserProfile());
        break;
      case 'token_refreshed':
        this.appState$.dispatch(store.fromAuth.loadUserProfile());
        break;
    }
  }
}
