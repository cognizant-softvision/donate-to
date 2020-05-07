import { Component } from '@angular/core';
import { TranslateService } from 'ng2-translate';
import { AppSandbox } from './app.sandbox';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [AppSandbox],
})
export class AppComponent {
  title = 'app';

  param = { value: 'donate' };

  constructor(translate: TranslateService, public appSandbox: AppSandbox) {
    this.appSandbox.setupLanguage();
  }
}
