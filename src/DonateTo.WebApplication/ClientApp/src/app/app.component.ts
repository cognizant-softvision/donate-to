import { Component } from '@angular/core';
import { TranslateService } from 'ng2-translate';
import { OAuthService } from 'angular-oauth2-oidc';
import { authCodeFlowConfig, AuthConfigService } from './auth/auth.config';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'app';

  param = { value: 'donate' };

  constructor(
    translate: TranslateService,
    private oauthService: OAuthService,
    private authConfigService: AuthConfigService
  ) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('en');

    // oauthService configuration
    this.oauthService.configure(authCodeFlowConfig);

    // Automatically load user profile
    this.oauthService.events
      .pipe(filter((e) => e.type === 'token_received'))
      .subscribe((_) => this.oauthService.loadUserProfile());

    this.oauthService.events.subscribe((event) => {
      console.log('app');
      console.log(event);
    });
  }
}
