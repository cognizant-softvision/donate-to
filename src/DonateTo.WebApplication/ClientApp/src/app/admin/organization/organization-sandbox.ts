import { Injectable, OnDestroy } from '@angular/core';
import { Sandbox } from 'src/app/shared/sandbox/base.sandbox';
import { Store } from '@ngrx/store';
import * as store from 'src/app/shared/store';
import { Subscription } from 'rxjs';
import { OrganizationFilter } from 'src/app/shared/models/filters/organization-filter';
import { OrganizationModel } from 'src/app/shared/models';

@Injectable()
export class OrganizationSandbox extends Sandbox implements OnDestroy {
  private subscriptions: Subscription[] = [];
  countries$ = this.appState$.select(store.fromAddress.getCountries);
  states$ = this.appState$.select(store.fromAddress.getStates);
  cities$ = this.appState$.select(store.fromAddress.getCities);
  organization$ = this.appState$.select(store.fromOrganization.getOrganization);
  organizations$ = this.appState$.select(store.fromOrganization.getAllOrganizations);
  failAction$ = this.appState$.select(store.fromOrganization.getFailedStatus);
  loadAction$ = this.appState$.select(store.fromOrganization.getLoadingStatus);
  organizationsPagedFiltered$ = this.appState$.select(store.fromOrganization.getOrganizationsFilteredPaged);

  constructor(protected appState$: Store<store.State>) {
    super(appState$);
    this.registerEvents();
  }

  ngOnDestroy(): void {
    this.unregisterEvents();
  }

  /**
   * Loads countries from the server
   */
  public loadCountries(): void {
    this.appState$.dispatch(store.fromAddress.loadCountries());
  }

  /**
   * Loads states by country from the server
   */
  public loadStatesByCountry(countryId: number): void {
    this.appState$.dispatch(store.fromAddress.loadStates({ countryId }));
  }

  /**
   * Loads cities by state from the server
   */
  public loadCitiesByState(stateId: number): void {
    this.appState$.dispatch(store.fromAddress.loadCities({ stateId }));
  }

  loadOrganizations(): void {
    this.appState$.dispatch(store.fromOrganization.loadOrganizations());
  }

  public loadOrganizationsFilteredPaged(organizationFilter: OrganizationFilter): void {
    this.appState$.dispatch(store.fromOrganization.loadOrganizationsPagedFiltered({ organizationFilter }));
  }

  /**
   * Load organization by Id from the server
   */
  public loadOrganization(organizationId: number): void {
    this.appState$.dispatch(store.fromOrganization.loadOrganization({ organizationId }));
  }

  updateOrganization(organization: OrganizationModel): void {
    this.appState$.dispatch(store.fromOrganization.addOrganization({ organization }));
  }

  /**
   * Adds donationRequests to the server
   */
  // public createOrganization(organization: DonationRequestModel): void {
  //   this.appState$.dispatch(store.fromDonationRequest.addDonationRequest({ donationRequest }));
  // }

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
