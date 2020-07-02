import { Injectable, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Sandbox } from '../shared/sandbox/base.sandbox';
import * as store from '../shared/store';
import { DonationModel } from '../shared/models/donation.model';

@Injectable()
export class DonationSandbox extends Sandbox {
  donationRequestLoading$ = this.appState$.select(store.fromDonation.getDonationLoading);
  donationRequest$ = this.appState$.select(store.fromDonation.getDonationRequest);
  donations$ = this.appState$.select(store.fromDonation.getDonations);
  donation$ = this.appState$.select(store.fromDonation.getDonation);
  donationsLoading$ = this.appState$.select(store.fromDonation.getDonationLoading);
  countries$ = this.appState$.select(store.fromAddress.getCountries);
  states$ = this.appState$.select(store.fromAddress.getStates);
  cities$ = this.appState$.select(store.fromAddress.getCities);
  newDonationLoading$ = this.appState$.select(store.fromDonation.getNewDonationLoading);

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
  public loadDonation(donationId: number): void {
    this.appState$.dispatch(store.fromDonation.loadDonationById({ donationId }));
  }

  /**
   * Adds donations to the server
   */
  public addDonation(donation: DonationModel): void {
    this.appState$.dispatch(store.fromDonation.addDonation({ donation }));
  }

  /**
   * Updates donations on the server
   */
  public updateDonation(donation: DonationModel): void {
    this.appState$.dispatch(store.fromDonation.updateDonation({ donation }));
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
