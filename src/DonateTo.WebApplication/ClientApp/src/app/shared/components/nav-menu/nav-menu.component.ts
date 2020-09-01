import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavMenuSandBox } from './nav-menu.sandbox';
import { Subscription } from 'rxjs';
import { UserSandbox } from 'src/app/admin/user/user.sandbox';
import { UserModel } from '../../models';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.less'],
})
export class NavMenuComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  isAuthenticated = false;
  isOrganization = false;
  language = 'en';
  user = new UserModel();
  initials = '';

  constructor(private navMenuSandbox: NavMenuSandBox, public userSandbox: UserSandbox) {}

  ngOnInit(): void {
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
      this.userSandbox.user$.subscribe((user) => {
        if (user) {
          this.user = { ...user };
          this.initials = this.getInitials();
        }
      })
    );

    this.subscriptions.push(
      this.userSandbox.userId$.subscribe((userId) => {
        if (userId) {
          this.userSandbox.loadUser(userId);
        }
      })
    );

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

  getInitials(): string {
    if (this.user.fullName) {
      return this.user.fullName
        .split(' ')
        .map((n) => n[0])
        .join('');
    }

    return '';
  }
}
