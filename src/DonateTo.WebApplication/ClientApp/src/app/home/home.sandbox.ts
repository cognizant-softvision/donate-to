import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Sandbox } from '../shared/sandbox/base.sandbox';
import * as store from '../shared/store';
import { TranslateService } from '@ngx-translate/core';
import { AuthSandbox } from '../shared/auth/auth.sandbox';

@Injectable()
export class HomeSandbox extends Sandbox {
  private subscriptions: Subscription[] = [];

  constructor(
    protected appState$: Store<store.State>,
    public translateService: TranslateService,
    private authSandbox: AuthSandbox
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
    this.appState$.dispatch(store.fromAuth.doLogout());
  }

  /**
   * Change the language
   */
  switchLanguage(language: string) {
    this.translateService.use(language);
  }

  /**
   * Unsubscribes from events
   */
  public unregisterEvents() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
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
  }
}
