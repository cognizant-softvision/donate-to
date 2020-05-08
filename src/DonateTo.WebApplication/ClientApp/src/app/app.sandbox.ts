import { Injectable } from '@angular/core';
import { Sandbox } from './shared/sandbox/base.sandbox';
import { Store } from '@ngrx/store';
import * as store from './shared/store';
import { ConfigService } from './app-config.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { AuthConfigService } from './auth/auth.config';

@Injectable()
export class AppSandbox extends Sandbox {
  constructor(
    protected appState$: Store<store.State>,
    private configService: ConfigService,
    private authService: OAuthService,
    private authConfigService: AuthConfigService
  ) {
    super(appState$);
  }

  /**
   * Sets up default language for the application. Uses browser default language.
   */
  public setupLanguage(): void {}

  /**
   * Returns global notification options
   */
  public getNotificationOptions(): any {
    return this.configService.get('notifications').options;
  }

  /**
   *
   */
  public setupAuth(): void {
    this.authConfigService.getConfig().then((authConfig) => {
      this.authService.configure(authConfig);
      this.appState$.dispatch(store.fromAuth.tryLogin());
      this.isAuthenticated$.subscribe((value) => {
        if (value) {
          this.appState$.dispatch(store.fromAuth.loadUserProfile());
        }
      });
    });

    this.authService.events.subscribe((event) => {
      console.log(event);
      switch (event.type) {
        case 'token_received':
        case 'token_refreshed':
          this.appState$.dispatch(store.fromAuth.loadUserProfile());
          break;
      }
    });
  }
}
