import { Component } from '@angular/core';
import { TranslateService } from 'ng2-translate';
import { OAuthService } from 'angular-oauth2-oidc';
import { AuthConfigService } from './auth/auth.config';
import { Store } from '@ngrx/store';
import { LoadUserProfileAction, TryLoginAction } from './shared/store/auth';

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
    authConfigService: AuthConfigService,
    private authStore: Store<{}>
  ) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('en');

    // oauthService configuration
    authConfigService.getConfig().then((authConfig) => {
      this.oauthService.configure(authConfig);
      this.authStore.dispatch(new TryLoginAction());
    });

    this.oauthService.events.subscribe((event) => {
      console.log(event);
      switch (event.type) {
        case 'token_received':
          this.authStore.dispatch(new LoadUserProfileAction());
          break;
      }
    });
  }
}
