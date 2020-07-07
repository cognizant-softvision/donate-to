import * as store from 'src/app/shared/store';
import { Subscription } from 'rxjs';
import { Injectable, OnDestroy } from '@angular/core';
import { Sandbox } from 'src/app/shared/sandbox/base.sandbox';
import { Store } from '@ngrx/store';
import { CategorySerializer } from 'src/app/shared/utility/serializers/category-serializer';
import { DonationRequestItemCategoryModel, DonationRequestModel } from 'src/app/shared/models';

@Injectable()
export class DonationsSandbox extends Sandbox implements OnDestroy {
  private categorySerializer: CategorySerializer = new CategorySerializer();
  private subscriptions: Subscription[] = [];

  donationRequests$ = this.appState$.select(store.fromDonationRequest.getAllDonationRequests);
  organizations$ = this.appState$.select(store.fromOrganization.getAllOrganizations);
  status$ = this.appState$.select(store.fromStatus.getAllStatus);
  categories$ = this.appState$.select(store.fromCategory.getAllCategories);
  units$ = this.appState$.select(store.fromUnit.getAllUnits);
  addressesByOrganization$ = this.appState$.select(store.fromAddress.getAddressesByOrganizationId);
  donationRequest$ = this.appState$.select(store.fromDonationRequest.getDonationRequest);
  failAction$ = this.appState$.select(store.fromDonationRequest.getFailedStatus);
  loadAction$ = this.appState$.select(store.fromDonationRequest.getLoadingStatus);
  questions$ = this.appState$.select(store.fromQuestion.getAllQuestions);

  constructor(protected appState$: Store<store.State>) {
    super(appState$);
  }

  ngOnDestroy(): void {
    this.unregisterEvents();
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
   * Loads Categories from the server
   */
  public loadUnits(): void {
    this.appState$.dispatch(store.fromUnit.loadUnits());
  }

  /**
   * Loads Addresses of an Organization from the server
   */
  public loadAddressesByOrganization(organizationId: number) {
    this.appState$.dispatch(store.fromAddress.loadAddressesByOrganizationId({ organizationId }));
  }

  private unregisterEvents() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  /**
   * Loads Questions from the server
   */
  public loadQuestions(): void {
    this.appState$.dispatch(store.fromQuestion.loadQuestions());
  }
}
