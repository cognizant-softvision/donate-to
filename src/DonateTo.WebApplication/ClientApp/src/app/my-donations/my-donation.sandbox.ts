import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Sandbox } from '../shared/sandbox/base.sandbox';
import * as store from '../shared/store';
import { DonationModel } from '../shared/models/donation.model';

@Injectable()
export class MyDonationSandbox extends Sandbox {
  donations$ = this.appState$.select(store.fromDonation.getDonations);
  donationsLoading$ = this.appState$.select(store.fromDonation.getDonationLoading);

  constructor(protected appState$: Store<store.State>) {
    super(appState$);
  }

  /**
   * Loads donationRequest from the server
   */
  public getDonationsByUserPaged(pageNumber: number, pageSize: number, statusId: number): void {
    this.appState$.dispatch(store.fromDonation.loadDonationByUserPaged({ pageNumber, pageSize, statusId }));
  }

  /**
   * delete donations on the server
   */
  public deleteDonation(donation: DonationModel): void {
    this.appState$.dispatch(store.fromDonation.deleteDonation({ donation }));
  }
}
