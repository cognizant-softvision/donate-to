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

    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('en');
  }
}
