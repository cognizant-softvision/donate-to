import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as store from 'src/app/shared/store';
import { Sandbox } from 'src/app/shared/sandbox/base.sandbox';
import { OrganizationModel, UserModel } from 'src/app/shared/models';

@Injectable()
export class UserSandbox extends Sandbox {
  usersLinkedToOrganization$ = this.appState$.select(store.fromUser.getUsersLinkedToOrganizations);
  userOrganizationLink$ = this.appState$.select(store.fromUser.linkUserOrganization);

  private subscriptions: Subscription[] = [];

  constructor(protected appState$: Store<store.State>) {
    super(appState$);
    this.registerEvents();
  }

  /**
   * Link user to organization
   */
  public userOrganizationLink(user: UserModel, organizations: OrganizationModel[]): void {
    this.appState$.dispatch(store.fromUser.userOrganizationLink({ user, organizations }));
  }

  /**
   * Loads users linked to an organizations from the server
   */
  public loadUserLinkedToOrganization(organizationId: number): void {
    // this.appState$.dispatch(store.fromUser.getUsersLinkedToOrganizations({ organizationId }));
  }

  /**
   * Subscribes to events
   */
  private registerEvents(): void {}
}
