import * as store from '../../shared/store';
import { Injectable } from '@angular/core';
import { Sandbox } from '../../shared/sandbox/base.sandbox';
import { Store } from '@ngrx/store';
import { CategorySerializer } from '../../shared/utility/serializers/category-serializer';
import { DonationRequestItemCategoryModel, DonationRequestModel } from '../../shared/models';
import { DonationRequestFilter } from '../../shared/models/filters/donation-request-filter';
import { DonationFilter } from 'src/app/shared/models/filters/donation-filter';

@Injectable()
export class DonationsSandbox extends Sandbox {
  private categorySerializer: CategorySerializer = new CategorySerializer();
  donationRequests$ = this.appState$.select(store.fromDonationRequest.getAllDonationRequests);
  organizations$ = this.appState$.select(store.fromOrganization.getAllOrganizations);
  status$ = this.appState$.select(store.fromStatus.getAllStatus);
  categories$ = this.appState$.select(store.fromCategory.getAllCategories);
  units$ = this.appState$.select(store.fromUnit.getAllUnits);
  addressesByOrganization$ = this.appState$.select(store.fromAddress.getAddressesByOrganizationId);
  donationRequest$ = this.appState$.select(store.fromDonationRequest.getDonationRequest);
  failAction$ = this.appState$.select(store.fromDonationRequest.getFailedStatus);
  loadAction$ = this.appState$.select(store.fromDonationRequest.getLoadingStatus);
  donationRequestsPagedFiltered$ = this.appState$.select(store.fromDonationRequest.getDonationRequestsFilteredPaged);
  donationsPagedFiltered$ = this.appState$.select(store.fromDonation.getDonations);

  constructor(protected appState$: Store<store.State>) {
    super(appState$);
  }

  /**
   * Serialize CategoryModels to DonationRequestItemCategories
   */
  public mapCategoriesToDonationRequestItemCategories(categories): DonationRequestItemCategoryModel[] {
    return this.categorySerializer.ToDonationRequestItemCategories(categories);
  }

  /**
   * Loads donationRequests from the server
   */
  public loadDonationRequests(): void {
    this.appState$.dispatch(store.fromDonationRequest.loadDonationRequests());
  }

  /**
   * Load donationRequest by Id from the server
   */
  public loadDonationRequest(donationRequestId: number): void {
    this.appState$.dispatch(store.fromDonationRequest.loadDonationRequest({ donationRequestId }));
  }

  /**
   * Adds donationRequests to the server
   */
  public createDonationRequest(donationRequest: DonationRequestModel): void {
    this.appState$.dispatch(store.fromDonationRequest.addDonationRequest({ donationRequest }));
  }

  /**
   * Update donationRequests in the server
   */
  public updateDonationRequest(donationRequest: DonationRequestModel): void {
    this.appState$.dispatch(store.fromDonationRequest.updateDonationRequest({ donationRequest }));
  }

  /**
   * Loads Categories from the server
   */
  public loadStatus(): void {
    this.appState$.dispatch(store.fromStatus.loadStatus());
  }

  /**
   * Loads organizations from the server
   */
  public loadOrganizationsByUser(userId: number): void {
    this.appState$.dispatch(store.fromOrganization.loadOrganizationsByUser({ userId }));
  }

  /**
   * Deletes a Donation from the server
   */
  public deleteDonationRequest(donationRequest: DonationRequestModel) {
    // this.appState$.dispatch(store.fromDonationRequest.removeDonationRequest({ donationRequest }));
  }

  /**
   * Loads Categories from the server
   */
  public loadCategories(): void {
    this.appState$.dispatch(store.fromCategory.loadCategories());
  }

  /**
   * Loads Categories from the server
   */
  public loadUnits(): void {
    this.appState$.dispatch(store.fromUnit.loadUnits());
  }

  /**
   * Loads Donations Paged Filtered By DonationRequestId from the server
   */
  public loadPagedFilteredDonationByDonationRequestId(donationFilter: DonationFilter): void {
    this.appState$.dispatch(store.fromDonation.loadPagedFilteredDonationsByDonationRequestId({ donationFilter }));
  }

  /**
   * Loads Addresses of an Organization from the server
   */
  public loadAddressesByOrganization(organizationId: number) {
    this.appState$.dispatch(store.fromAddress.loadAddressesByOrganizationId({ organizationId }));
  }

  public loadDonationRequestsFilteredPaged(donationRequestFilter: DonationRequestFilter): void {
    this.appState$.dispatch(store.fromDonationRequest.loadDonationRequestsPagedFiltered({ donationRequestFilter }));
  }
}
