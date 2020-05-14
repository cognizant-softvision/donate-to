import { BrowserModule } from '@angular/platform-browser';

// Angular core modules
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Routes
import { AppRoutingModule } from './app-routing.module';

// Modules
import { AppComponent } from './app.component';
import { AuthModule } from './shared/auth/auth.module';
import { ContainersModule } from './shared/containers';
import { NotificationsModule } from './shared/notifications/notifications.module';

import { HttpErrorInterceptor } from 'src/app/shared/async-services/http/http-error.interceptor';
import { StoreModule } from '@ngrx/store';
import * as fromSettings from './shared/store/settings';
import { ConfigService } from './app-config.service';
import { EffectsModule } from '@ngrx/effects';
import { OAuthModule } from 'angular-oauth2-oidc';

// Translate
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// AoT requires an exported function for factories. load translations from "/assets/i18n/[lang].json"
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '../../../i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    // Angular core dependencies
    BrowserModule,
    FormsModule,
    CommonModule,

    // Third party modules
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    OAuthModule.forRoot(),

    // NgRx Store modules
    StoreModule.forRoot({}),
    StoreModule.forFeature(fromSettings.settingsFeatureKey, fromSettings.reducer),
    EffectsModule.forRoot([]),

    // Application modules
    AuthModule,
    ContainersModule,
    NotificationsModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
    ConfigService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
