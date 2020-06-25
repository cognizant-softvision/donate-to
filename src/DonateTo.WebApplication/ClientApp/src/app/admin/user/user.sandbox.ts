import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as store from 'src/app/shared/store';
import { Sandbox } from 'src/app/shared/sandbox/base.sandbox';

@Injectable()
export class UserSandbox extends Sandbox {
  users$ = this.appState$.select(store.fromUser.getAllUsers);
  organizations$ = this.appState$.select(store.fromOrganization.getAllOrganizations);

  private subscriptions: Subscription[] = [];

  constructor(protected appState$: Store<store.State>) {
    super(appState$);
    this.registerEvents();
  }

  /**
   * Link user to organization
   */
  public userOrganizationLink(userId: number, organizations: number[]): void {
    this.appState$.dispatch(store.fromUser.userOrganizationLink({ userId, organizations }));
  }

  public loadUsers(): void {
    this.appState$.dispatch(store.fromUser.loadUsers());
  }

  /**
   * Loads organizations from the server
   */
  public loadOrganizations(): void {
    this.appState$.dispatch(store.fromOrganization.loadOrganizations());
  }

  /**
   * Subscribes to events
   */
  private registerEvents(): void {}
}
