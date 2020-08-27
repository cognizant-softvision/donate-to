import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as store from '../../shared/store';
import { OrganizationFilter } from '../../shared/models/filters/organization-filter';
import { OrganizationModel } from '../../shared/models';
import { Sandbox } from '../../shared/sandbox/base.sandbox';

@Injectable()
export class OrganizationSandbox extends Sandbox {
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

  public addOrganization(organization: OrganizationModel): void {
    this.appState$.dispatch(store.fromOrganization.addOrganization({ newOrganization: organization }));
  }

  public updateOrganization(organization: OrganizationModel): void {
    this.appState$.dispatch(store.fromOrganization.updateOrganization({ updatedOrganization: organization }));
  }

  /**
   * Load organization by Id from the server
   */
  public loadOrganization(organizationId: number): void {
    this.appState$.dispatch(store.fromOrganization.loadOrganization({ organizationId }));
  }

  /**
   * Soft deletes an organization
   */
  public deleteOrganization(organization: OrganizationModel): void {
    this.appState$.dispatch(store.fromOrganization.deleteOrganization({ organization }));
  }
}
