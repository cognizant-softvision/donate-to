import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as store from 'src/app/shared/store';
import { Sandbox } from 'src/app/shared/sandbox/base.sandbox';
import { UserModel } from 'src/app/shared/models';

@Injectable()
export class UserSandbox extends Sandbox implements OnDestroy {
  private subscriptions: Subscription[] = [];
  users$ = this.appState$.select(store.fromUser.getAllUsers);
  user$ = this.appState$.select(store.fromUser.getUser);
  failAction$ = this.appState$.select(store.fromUser.getFailedStatus);
  loadAction$ = this.appState$.select(store.fromUser.getLoadingStatus);

  constructor(protected appState$: Store<store.State>) {
    super(appState$);
  }

  ngOnDestroy(): void {
    this.unregisterEvents();
  }

  /**
   * Link user to organization
   */
  public userOrganizationLink(userId: number, organizations: number[]): void {
    this.appState$.dispatch(store.fromUser.userOrganizationLink({ userId, organizations }));
  }

  /**
   * Loads users linked to an organizations from the server
   */
  public loadUserLinkedToOrganization(organizationId: number): void {
    // this.appState$.dispatch(store.fromUser.getUsersLinkedToOrganizations({ organizationId }));
  }

  public loadUsers(): void {
    this.appState$.dispatch(store.fromUser.loadUsers());
  }

  /**
   * Update user in the server
   */
  public updateUser(user: UserModel): void {
    this.appState$.dispatch(store.fromUser.updateUser({ user }));
  }

  private unregisterEvents() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  public loadUser(userId: number): void {
    this.appState$.dispatch(store.fromUser.loadUser({ userId }));
  }
}
