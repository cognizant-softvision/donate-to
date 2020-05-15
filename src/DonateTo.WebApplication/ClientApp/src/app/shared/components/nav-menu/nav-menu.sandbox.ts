import { Injectable } from '@angular/core';
import { Sandbox } from '../../sandbox/base.sandbox';
import { Subscription } from 'rxjs/internal/Subscription';
import { Store } from '@ngrx/store';
import * as store from '../../../shared/store';
import { AuthSandbox } from '../../auth/auth.sandbox';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class NavMenuSandBox extends Sandbox {
  private subscriptions: Subscription[] = [];

  constructor(
    protected appState$: Store<store.State>,
    public authSandbox: AuthSandbox,
    public translateService: TranslateService
  ) {
    super(appState$);
    this.registerEvents();
  }

  /**
   * User logs in the application
   */
  public login(): void {
    this.authSandbox.login();
  }

  /**
   * User logs out the application
   */
  public logout(): void {
    this.authSandbox.logout();
  }

  /**
   * Change the language
   */
  switchLanguage(language: string) {
    this.translateService.use(language);
  }

  /**
   * Subscribes to events
   */
  private registerEvents(): void {
    // Subscribes to culture
    this.subscriptions.push(this.culture$.subscribe((culture: string) => (this.culture = culture)));
    // Subscribes to auth properties
    this.subscriptions.push(
      this.isAuthenticated$.subscribe((isAuthenticated: boolean) => (this.isAuthenticated = isAuthenticated))
    );
    this.subscriptions.push(this.userName$.subscribe((userName: string) => (this.userName = userName)));
    // If user is logged in, load donationRequests
  }
}
