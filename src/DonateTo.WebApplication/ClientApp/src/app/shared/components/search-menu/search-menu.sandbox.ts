import { getAllUsersPaged } from './../../store/user/selectors';

import { Injectable } from '@angular/core';
import { Sandbox } from '../../sandbox/base.sandbox';
import { Store } from '@ngrx/store';
import * as store from '../../../shared/store';

@Injectable()
export class SearchMenuSandBox extends Sandbox {
  donationRequests$ = this.appState$.select(store.fromDonationRequest.getAllDonationRequests);
  donationRequestsLoading$ = this.appState$.select(store.fromDonationRequest.getLoadingStatus);
  donationRequestsPaged$ = this.appState$.select(store.fromDonationRequest.getAllDonationRequestsPaged);
  donationRequestsSearchPaged$ = this.appState$.select(store.fromDonationRequest.getAllDonationRequestsSearchPaged);
  organizationsPaged$ = this.appState$.select(store.fromOrganization.getAllOrganizationsPaged);
  organizationsSearchPaged$ = this.appState$.select(store.fromOrganization.getAllOrganizationsSearchPaged);
  usersPaged$ = this.appState$.select(store.fromUser.getAllUsersPaged);
  usersSearchPaged$ = this.appState$.select(store.fromUser.getAllUsersSearchPaged);
  constructor(protected appState$: Store<store.State>) {
    super(appState$);
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
   * Loads organizations paged from the server
   */
  public loadOrganizationsPaged(pageSize: number, pageNumber: number): void {
    this.appState$.dispatch(store.fromOrganization.loadOrganizationsPaged({ pageSize, pageNumber }));
  }

  /**
   * Searches and Loads organizations paged from the server
   */
  public loadOrganizationsSearchPaged(pageSize: number, pageNumber: number, query: string): void {
    this.appState$.dispatch(store.fromOrganization.loadOrganizationsSearchPaged({ pageSize, pageNumber, query }));
  }

  /**
   * Loads users paged from the server
   */
  public loadUsersPaged(pageSize: number, pageNumber: number): void {
    this.appState$.dispatch(store.fromUser.loadUsersPaged({ pageSize, pageNumber }));
  }

  /**
   * Searches and Loads users paged from the server
   */
  public loadUsersSearchPaged(pageSize: number, pageNumber: number, query: string): void {
    this.appState$.dispatch(store.fromUser.loadUsersSearchPaged({ pageSize, pageNumber, query }));
  }
}
