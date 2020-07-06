import { AuthConfigService } from 'src/app/shared/auth/auth.config';
import { Injectable } from '@angular/core';
import { OAuthEvent, OAuthService } from 'angular-oauth2-oidc';
import { Sandbox } from '../sandbox/base.sandbox';
import { Store } from '@ngrx/store';
import * as store from '../store';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Roles } from '../enum/roles';

@Injectable()
export class AuthSandbox extends Sandbox {
  private subscriptions: Subscription[] = [];
  public isAdmin = new BehaviorSubject(false);

  constructor(
    protected appState$: Store<store.State>,
    private authService: OAuthService,
    private authConfigService: AuthConfigService
  ) {
    super(appState$);
    this.registerEvents();
  }

  /**
   * Subscribes to events
   */
  private registerEvents(): void {
    this.subscriptions.push(
      this.userRoles$.subscribe((userRoles: string[]) =>
        this.isAdmin.next(
          userRoles.includes(Roles.Admin) ||
            userRoles.includes(Roles.Superadmin) ||
            userRoles.includes(Roles.Organization)
        )
      )
    );
  }

  /**
   * Sets up Auth configuration
   * Subscribes to service token event changes
   */
  public setupAuth(): void {
    const authConfig = this.authConfigService.getConfig();
    this.authService.configure(authConfig);
    this.authService.setupAutomaticSilentRefresh();
    this.appState$.dispatch(store.fromAuth.tryLogin());

    this.authService.events.subscribe(this.handleAuthEvents.bind(this));
  }

  /**
   * Dispatches a login action to redirect to the login page
   */
  public login(): void {
    this.authService.initCodeFlow();
  }

  public register(): void {
    document.location.href = this.authService.issuer + '/Account/Register?returnUrl=' + this.authService.redirectUri;
  }

  /**
   * Dispatches a logout action to redirect to identity provider logout page
   */
  public logout(): void {
    this.authService.logOut();
  }

  /**
   * Checks if the token in the session store is valid and updates the ngrx store
   */
  public validateToken(): boolean {
    if (this.authService.hasValidAccessToken()) {
      this.appState$.dispatch(store.fromAuth.validateTokenSucess());
      return true;
    }

    this.appState$.dispatch(store.fromAuth.validateTokenFailed());
    return false;
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
