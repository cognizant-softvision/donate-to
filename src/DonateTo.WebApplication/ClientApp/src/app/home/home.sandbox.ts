import { DonationRequestModel } from '../shared/models';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Sandbox } from '../shared/sandbox/base.sandbox';
import * as store from '../shared/store';
import { AuthSandbox } from '../shared/auth/auth.sandbox';

@Injectable()
export class HomeSandbox extends Sandbox {
  donationRequests$ = this.appState$.select(store.fromDonationRequest.getAllDonationRequests);
  donationRequestsLoading$ = this.appState$.select(store.fromDonationRequest.getLoadingStatus);
  donationRequestsPaged$ = this.appState$.select(store.fromDonationRequest.getAllDonationRequestsPaged);
  donationRequestsSearchPaged$ = this.appState$.select(store.fromDonationRequest.getAllDonationRequestsSearchPaged);

  constructor(protected appState$: Store<store.State>, public authSandbox: AuthSandbox) {
    super(appState$);
  }

  /**
   * User logs in the application
   */
  public login(additionalState?: string, params?: {}): void {
    this.authSandbox.login(additionalState, params);
  }

  /**
   * Loads donationRequest from the server
   */
  public createDonationRequest(donationRequest: DonationRequestModel): void {
    this.appState$.dispatch(store.fromDonationRequest.addDonationRequest({ donationRequest }));
  }

  /**
   * Loads donationRequests from the server
   */
  public loadDonationRequests(): void {
    this.appState$.dispatch(store.fromDonationRequest.loadDonationRequests());
  }

  /**
   * Loads donationRequests paged from the server
   */
  public loadDonationRequestsPaged(pageSize: number, pageNumber: number): void {
    this.appState$.dispatch(store.fromDonationRequest.loadDonationRequestsPaged({ pageSize, pageNumber }));
  }

  /**
   * Searches and Loads donationRequests paged from the server
   */
  public loadDonationRequestsSearchPaged(pageSize: number, pageNumber: number, query: string): void {
    this.appState$.dispatch(store.fromDonationRequest.loadDonationRequestsSearchPaged({ pageSize, pageNumber, query }));
  }

  /**
   * Loads donationRequest details from the server
   */
  public loadDonationRequestDetails(id: number): void {}

  /**
   * Dispatches an action to select donationRequest details
   */
  public selectDonationRequest(): void {}

  /**
   * Unsubscribes from events
   */
  public unregisterEvents() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
