import { AuthConfigService } from 'src/app/shared/auth/auth.config';
import { Injectable } from '@angular/core';
import { OAuthEvent, OAuthService } from 'angular-oauth2-oidc';
import { Sandbox } from '../sandbox/base.sandbox';
import { Store } from '@ngrx/store';
import * as store from '../store';
import { Subscription } from 'rxjs';

@Injectable()
export class AuthSandbox extends Sandbox {
  private subscriptions: Subscription[] = [];

  constructor(
    protected appState$: Store<store.State>,
    private authService: OAuthService,
    private authConfigService: AuthConfigService
  ) {
    super(appState$);
    this.registerEvents();
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

  /**
   * Validates the access token from the Identity Server
   * is expired or invalid
   */
  public isAccessTokenValid(): boolean {
    this.appState$.dispatch(store.fromAuth.validateAccessToken());

    return this.isAuthenticated && this.accessToken !== undefined;
  }

  /**
   * Subscribes to events
   */
  private registerEvents(): void {
    // Subscribes to auth properties
    this.subscriptions.push(
      this.isAuthenticated$.subscribe((isAuthenticated: boolean) => (this.isAuthenticated = isAuthenticated))
    );

    this.subscriptions.push(this.accessToken$.subscribe((accessToken: string) => (this.accessToken = accessToken)));
  }
}
