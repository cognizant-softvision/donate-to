import * as store from 'src/app/shared/store';
import { Subscription } from 'rxjs';
import { Injectable, OnDestroy } from '@angular/core';
import { Sandbox } from 'src/app/shared/sandbox/base.sandbox';
import { Store } from '@ngrx/store';
import { OrganizationFilter } from 'src/app/shared/models/filters/organization-filter';

@Injectable()
export class OrganizationSandbox extends Sandbox implements OnDestroy {
  private subscriptions: Subscription[] = [];

  organizations$ = this.appState$.select(store.fromOrganization.getAllOrganizations);
  failAction$ = this.appState$.select(store.fromOrganization.getFailedStatus);
  loadAction$ = this.appState$.select(store.fromOrganization.getLoadingStatus);
  organizationsPagedFiltered$ = this.appState$.select(store.fromOrganization.getOrganizationsFilteredPaged);

  constructor(protected appState$: Store<store.State>) {
    super(appState$);
  }

  ngOnDestroy(): void {
    this.unregisterEvents();
  }

  loadOrganizations(): void {
    this.appState$.dispatch(store.fromOrganization.loadOrganizations());
  }

  private unregisterEvents() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  public loadOrganizationsFilteredPaged(organizationFilter: OrganizationFilter): void {
    this.appState$.dispatch(store.fromOrganization.loadOrganizationsPagedFiltered({ organizationFilter }));
  }
}
