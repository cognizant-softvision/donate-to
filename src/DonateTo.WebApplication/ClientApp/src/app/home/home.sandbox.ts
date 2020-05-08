import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Sandbox } from '../shared/sandbox/base.sandbox';
import * as store from '../shared/store';

@Injectable()
export class HomeSandbox extends Sandbox {
  private subscriptions: Subscription[] = [];

  constructor(protected appState$: Store<store.State>) {
    super(appState$);
    this.registerEvents();
  }

  /**
   * User logs in the application
   */
  public login(): void {
    this.appState$.dispatch(store.fromAuth.doLogin());
  }

  /**
   * User logs out the application
   */
  public logout(): void {
    this.appState$.dispatch(store.fromAuth.doLogout());
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

    this.subscriptions.push(
      this.isAuthenticated$.subscribe((isAuthenticated: boolean) => (this.isAuthenticated = isAuthenticated))
    );
    this.subscriptions.push(this.userName$.subscribe((userName: string) => (this.userName = userName)));
  }
}
