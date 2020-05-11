import { Component } from '@angular/core';
import { AppSandbox } from './app.sandbox';
import { AuthSandbox } from './shared/auth/auth.sandbox';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [AppSandbox, AuthSandbox],
})
export class AppComponent {
  title = 'app';

  param = { value: 'donate' };

  constructor(public appSandbox: AppSandbox) {
    this.appSandbox.setupLanguage();
    this.appSandbox.setupAuth();
  }
}
