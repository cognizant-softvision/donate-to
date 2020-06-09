import * as store from 'src/app/shared/store';

import { Injectable } from '@angular/core';
import { Sandbox } from 'src/app/shared/sandbox/base.sandbox';
import { Store } from '@ngrx/store';
import { CategorySerializer } from 'src/app/shared/utility/serializers/category-serializer';
import {
  DonationRequestCategoryModel,
  DonationRequestItemCategoryModel,
  DonationRequestModel,
} from 'src/app/shared/models';

@Injectable()
export class DonationsSandbox extends Sandbox {
  private categorySerializer: CategorySerializer = new CategorySerializer();
  donationRequests$ = this.appState$.select(store.fromDonationRequest.getAllDonationRequests);
  organizations$ = this.appState$.select(store.fromOrganization.getAllOrganizations);
  categories$ = this.appState$.select(store.fromCategory.getAllCategories);
  addressesByOrganization$ = this.appState$.select(store.fromAddress.getAddressesByOrganizationId);

  failAction$ = this.appState$.select(store.fromDonationRequest.getFailStatus);
  loadAction$ = this.appState$.select(store.fromDonationRequest.getDonationRequestsLoading);

  public failAction: boolean;

  constructor(protected appState$: Store<store.State>) {
    super(appState$);

    this.failAction$.subscribe((status) => {
      this.failAction = status;
    });
  }

  /**
   * Serialize CategoryModels to DonationRequestCategories
   */
  public mapCategoriesToDonationRequestCategories(categories): DonationRequestCategoryModel[] {
    return this.categorySerializer.ToDonationRequestCategories(categories);
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
   * Loads donationRequests from the server
   */
  public createDonationRequest(donationRequest: DonationRequestModel): void {
    this.appState$.dispatch(store.fromDonationRequest.addDonationRequest({ donationRequest }));
  }

  /**
   * Loads organizations from the server
   */
  public loadOrganizations(): void {
    this.appState$.dispatch(store.fromOrganization.loadOrganizations());
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
   * Loads Addresses of an Organization from the server
   */
  public loadAddressesByOrganization(organizationId: number) {
    this.appState$.dispatch(store.fromAddress.loadAddressesByOrganizationId({ organizationId }));
  }
}
