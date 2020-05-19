import { Component, ViewEncapsulation } from '@angular/core';
import { AppSandbox } from './app.sandbox';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [AppSandbox],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'app';

  param = { value: 'donate' };

  constructor(public appSandbox: AppSandbox) {
    this.appSandbox.setupLanguage();
    this.appSandbox.setupAuth();
  }
}
