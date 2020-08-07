import { Component, OnDestroy } from '@angular/core';
import { NavMenuSandBox } from './nav-menu.sandbox';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.less'],
})
export class NavMenuComponent implements OnDestroy {
  subscriptions: Subscription[] = [];
  isAuthenticated = false;
  isOrganization = false;
  language = 'en';

  constructor(private navMenuSandbox: NavMenuSandBox) {
    this.registerEvents();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  switchLanguage() {
    this.navMenuSandbox.switchLanguage(this.language);
  }

  login() {
    this.navMenuSandbox.login();
  }

  register() {
    this.navMenuSandbox.register();
  }

  logout() {
    this.navMenuSandbox.logout();
  }

  private registerEvents() {
    this.subscriptions.push(
      this.navMenuSandbox.isAuthenticated$.subscribe((isAuthenticated) => {
        this.isAuthenticated = isAuthenticated;
      })
    );
    this.subscriptions.push(
      this.navMenuSandbox.isOrganization$.subscribe((isOrganization) => {
        this.isOrganization = isOrganization;
      })
    );
  }
}
