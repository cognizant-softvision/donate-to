import { DonationRequestModel } from '../shared/models';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Sandbox } from '../shared/sandbox/base.sandbox';
import * as store from '../shared/store';
import { TranslateService } from '@ngx-translate/core';
import { AuthSandbox } from '../shared/auth/auth.sandbox';

@Injectable()
export class HomeSandbox extends Sandbox {
  donationRequests$ = this.appState$.select(store.fromDonationRequest.getAllDonationRequests);
  donationRequestsLoading$ = this.appState$.select(store.fromDonationRequest.getDonationRequestsLoading);
  donationRequestsPaged$ = this.appState$.select(store.fromDonationRequest.getAllDonationRequestsPaged);
  donationRequestsSearchPaged$ = this.appState$.select(store.fromDonationRequest.getAllDonationRequestsSearchPaged);

  private subscriptions: Subscription[] = [];

  constructor(protected appState$: Store<store.State>, public authSandbox: AuthSandbox) {
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

  /**
   * Subscribes to events
   */
  private registerEvents(): void {}
}
