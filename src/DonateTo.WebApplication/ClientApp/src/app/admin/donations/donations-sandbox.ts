import * as store from 'src/app/shared/store';

import { Injectable } from '@angular/core';
import { Sandbox } from 'src/app/shared/sandbox/base.sandbox';
import { Store } from '@ngrx/store';

@Injectable()
export class DonationsSandbox extends Sandbox {
  donationRequests$ = this.appState$.select(store.fromDonationRequest.getAllDonationRequests);
  organizations$ = this.appState$.select(store.fromOrganization.getAllOrganizations);
  categories$ = this.appState$.select(store.fromCategory.getAllCategories);
  addressesByOrganization$ = this.appState$.select(store.fromAddress.getAddressesByOrganizationId);

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

  /**
   * Loads Categories from the server
   */
  public LoadCategories(): void {
    this.appState$.dispatch(store.fromCategory.loadCategories());
  }

  /**
   * Loads Addresses of an Organization from the server
   */
  public LoadAddressesByOrganization(organizationId: number) {
    this.appState$.dispatch(store.fromAddress.loadAddressesByOrganizationId({ organizationId }));
  }
}
