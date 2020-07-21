import { Injectable, OnDestroy } from '@angular/core';
import { Sandbox } from 'src/app/shared/sandbox/base.sandbox';
import { Store } from '@ngrx/store';
import * as store from 'src/app/shared/store';
import { Subscription } from 'rxjs';

@Injectable()
export class OrganizationSandbox extends Sandbox {
  private subscriptions: Subscription[] = [];
  countries$ = this.appState$.select(store.fromAddress.getCountries);
  states$ = this.appState$.select(store.fromAddress.getStates);
  cities$ = this.appState$.select(store.fromAddress.getCities);

  constructor(protected appState$: Store<store.State>) {
    super(appState$);
    this.registerEvents();
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
