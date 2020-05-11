import { BrowserModule } from '@angular/platform-browser';

// Angular core modules
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Routes
import { AppRoutingModule } from './app-routing.module';

// Modules
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { NotificationsModule } from './shared/notifications/notifications.module';

import { HttpErrorInterceptor } from 'src/app/shared/async-services/http/http-error.interceptor';
import { StoreModule } from '@ngrx/store';
import * as fromSettings from './shared/store/settings';
import { ConfigService } from './app-config.service';
import { EffectsModule } from '@ngrx/effects';

// Translate
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function configServiceFactory(config: ConfigService) {
  return () => config.load();
}

// AoT requires an exported function for factories. load translations from "/assets/i18n/[lang].json"
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
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
    RouterModule.forRoot([]),
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),

    // NgRx Store modules
    StoreModule.forRoot({}),
    StoreModule.forFeature(fromSettings.settingsFeatureKey, fromSettings.reducer),
    EffectsModule.forRoot([]),

    // Application modules
    AuthModule,
    NotificationsModule,
    HomeModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: configServiceFactory,
      deps: [ConfigService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
