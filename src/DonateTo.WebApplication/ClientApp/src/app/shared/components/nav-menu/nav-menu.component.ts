import { Component } from '@angular/core';
import { NavMenuSandBox } from './nav-menu.sandbox';
import { NzRadioModule } from 'ng-zorro-antd/radio';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],
})
export class NavMenuComponent {
  constructor(public navMenuSandbox: NavMenuSandBox) {}

  language = 'en';

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
}
