import { Component } from '@angular/core';
import { NavMenuSandBox } from './nav-menu.sandbox';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css'],
})
export class NavMenuComponent {
  constructor(public navMenuSandbox: NavMenuSandBox) {}

  switchLanguage(language: string) {
    this.navMenuSandbox.switchLanguage(language);
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

  myProfile() {
    this.navMenuSandbox.myProfile();
  }
}
