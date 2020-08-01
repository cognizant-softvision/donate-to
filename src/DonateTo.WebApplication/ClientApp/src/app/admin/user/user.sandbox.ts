import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as store from '../../shared/store';
import { Sandbox } from '../../shared/sandbox/base.sandbox';
import { UserModel } from '../../shared/models';
import { UserFilter } from '../../shared/models/filters/user-filter';
import { AuthSandbox } from '../../shared/auth/auth.sandbox';

@Injectable()
export class UserSandbox extends Sandbox {
  users$ = this.appState$.select(store.fromUser.getAllUsers);
  organizations$ = this.appState$.select(store.fromOrganization.getAllOrganizations);
  user$ = this.appState$.select(store.fromUser.getUser);
  failAction$ = this.appState$.select(store.fromUser.getFailedStatus);
  loadAction$ = this.appState$.select(store.fromUser.getLoadingStatus);
  usersPagedFiltered$ = this.appState$.select(store.fromUser.getUsersFilteredPaged);
  organization$ = this.appState$.select(store.fromOrganization.getOrganization);
  isAdmin = false;

  constructor(protected appState$: Store<store.State>, private authSandbox: AuthSandbox) {
    super(appState$);
    this.subscriptions.push(this.authSandbox.isAdmin$.subscribe((isAdmin) => (this.isAdmin = isAdmin)));
  }

  /**
   * Link user to organization
   */
  public userOrganizationLink(userId: number, organizations: any[]): void {
    this.appState$.dispatch(store.fromUser.userOrganizationLink({ userId, organizations }));
  }

  /**
   * Loads users from the server
   */
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
   * Update user in the server
   */
  public updateUser(user: UserModel): void {
    this.appState$.dispatch(store.fromUser.updateUser({ user }));
  }

  /**
   * load user by id from the server
   */
  public loadUser(userId: number): void {
    this.appState$.dispatch(store.fromUser.loadUser({ userId }));
  }

  public loadUsersFilteredPaged(filter: UserFilter): void {
    this.appState$.dispatch(store.fromUser.loadUsersPagedFiltered({ filter }));
  }

  /**
   * load organization by id from the server
   */
  public loadOrganization(organizationId: number): void {
    this.appState$.dispatch(store.fromOrganization.loadOrganization({ organizationId }));
  }
}
