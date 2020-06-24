import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as store from 'src/app/shared/store';
import { Sandbox } from 'src/app/shared/sandbox/base.sandbox';

@Injectable()
export class UserSandbox extends Sandbox {
  usersLinkedToOrganization$ = this.appState$.select(store.fromUser.getUsersLinkedToOrganizations);

  private subscriptions: Subscription[] = [];

  constructor(protected appState$: Store<store.State>) {
    super(appState$);
    this.registerEvents();
  }

  /**
   * Loads donationRequest from the server
   */
  public loadDonationRequest(id: number): void {
    this.appState$.dispatch(store.fromDonation.loadDonationRequest({ id }));
  }

  /**
   * Loads donationRequest from the server
   */
  public addDonation(donation: DonationModel): void {
    this.appState$.dispatch(store.fromDonation.addDonation({ donation }));
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
