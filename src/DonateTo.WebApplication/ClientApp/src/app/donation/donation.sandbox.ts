import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Sandbox } from '../shared/sandbox/base.sandbox';
import * as store from '../shared/store';

@Injectable()
export class DonationSandbox extends Sandbox {
  donationRequestLoading$ = this.appState$.select(store.fromDonation.getDonationLoading);
  donationRequest$ = this.appState$.select(store.fromDonation.getDonationRequest);

  private subscriptions: Subscription[] = [];

  constructor(protected appState$: Store<store.State>) {
    super(appState$);
    this.registerEvents();
  }

  /**
   * Loads donationRequest from the server
   */
  public loadDonationRequest(id: number): void {
    this.appState$.dispatch(store.fromDonation.loadDonationRequest({ id }));
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
  private registerEvents(): void {}
}
