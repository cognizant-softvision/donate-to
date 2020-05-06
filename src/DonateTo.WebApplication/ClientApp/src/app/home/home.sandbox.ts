import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Sandbox } from '../shared/sandbox/base.sandbox';
import * as store from '../shared/store';

@Injectable()
export class HomeSandbox extends Sandbox {
  public culture$ = this.appState$.select(store.getSelectedCulture);
  public language$ = this.appState$.select(store.getSelectedLanguage);
  public availableLanguages$ = this.appState$.select(store.getAvailableLanguages);

  private subscriptions: Subscription[] = [];

  constructor(protected appState$: Store<store.State>) {
    super(appState$);
    this.registerEvents();
  }

  /**
   * Loads sample from the server
   */
  public createSample(): void {}

  /**
   * Loads samples from the server
   */
  public loadSamples(): void {}

  /**
   * Loads sample details from the server
   */
  public loadSampleDetails(id: number): void {}

  /**
   * Dispatches an action to select sample details
   */
  public selectSample(): void {}

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

    // If user is logged in, load samples
  }
}
