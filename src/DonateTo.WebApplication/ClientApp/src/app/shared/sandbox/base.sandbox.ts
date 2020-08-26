import { Store } from '@ngrx/store';
import * as store from '../store';
import { OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Roles } from '../enum/roles';

export abstract class Sandbox implements OnDestroy {
  protected subscriptions: Subscription[] = [];
  public language$ = this.appState$.select(store.fromSettings.getSelectedLanguage);
  public culture$ = this.appState$.select(store.fromSettings.getSelectedCulture);
  public language = this.language$.subscribe((value) => (this.language = value));
  public culture: string;

  public accessToken$ = this.appState$.select(store.fromAuth.getAccessToken);
  public isAuthenticated$ = this.appState$.select(store.fromAuth.isAuthenticated);
  public isLoginProcessed$ = this.appState$.select(store.fromAuth.isLoginProcessed);
  public isRoleProcessed$ = this.appState$.select(store.fromAuth.isRoleProcessed);
  public userId$ = this.appState$.select(store.fromAuth.getUserId);
  public userName$ = this.appState$.select(store.fromAuth.getUserName);
  public userRoles$ = this.appState$.select(store.fromAuth.getUserRoles);
  public userOrganizations$ = this.appState$.select(store.fromAuth.getOrganizations);

  public isSuperAdmin$ = new BehaviorSubject<boolean>(false);
  public isAdmin$ = new BehaviorSubject<boolean>(false);
  public isOrganization$ = new BehaviorSubject<boolean>(false);

  constructor(protected appState$: Store<store.State>) {
    this.registerEvents();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  SetLanguage() {}

  protected registerEvents() {
    this.subscriptions.push(
      this.userRoles$.subscribe((userRoles: string[]) => {
        if (userRoles) {
          this.isSuperAdmin$.next(userRoles.length !== 0 && userRoles.includes(Roles.Superadmin));
          this.isAdmin$.next(
            userRoles.length !== 0 && (userRoles.includes(Roles.Superadmin) || userRoles.includes(Roles.Admin))
          );
          this.isOrganization$.next(
            userRoles.length !== 0 &&
              (userRoles.includes(Roles.Superadmin) ||
                userRoles.includes(Roles.Admin) ||
                userRoles.includes(Roles.Organization))
          );
        }
      })
    );
  }
}
