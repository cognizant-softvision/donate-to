import * as store from 'src/app/shared/store';

import { Injectable } from '@angular/core';
import { Sandbox } from 'src/app/shared/sandbox/base.sandbox';
import { Store } from '@ngrx/store';

@Injectable()
export class DonationsSandbox extends Sandbox {
  donationRequests$ = this.appState$.select(store.fromDonationRequest.getAllDonationRequests);
  organizations$ = this.appState$.select(store.fromOrganization.getAllOrganizations);

  constructor(protected appState$: Store<store.State>) {
    super(appState$);
  }
  /**
   * Loads donationRequests from the server
   */
  public loadDonationRequests(): void {
    this.appState$.dispatch(store.fromDonationRequest.loadDonationRequests());
  }

  /**
   * Loads organizations from the server
   */
  public LoadOrganizations(): void {
    this.appState$.dispatch(store.fromOrganization.loadOrganizations());
  }
}
