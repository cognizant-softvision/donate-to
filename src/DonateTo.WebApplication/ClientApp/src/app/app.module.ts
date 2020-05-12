import { BrowserModule } from '@angular/platform-browser';

// Angular core modules
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Routes
import { AppRoutingModule } from './app-routing.module';

// Modules
import { AppComponent } from './app.component';
import { AuthModule } from './shared/auth/auth.module';
import { HomeModule } from './home/home.module';
import { NotificationsModule } from './shared/notifications/notifications.module';

import { HttpErrorInterceptor } from 'src/app/shared/async-services/http/http-error.interceptor';
import { StoreModule } from '@ngrx/store';
import * as fromSettings from './shared/store/settings';
import { ConfigService } from './app-config.service';
import { EffectsModule } from '@ngrx/effects';
import { OAuthModule } from 'angular-oauth2-oidc';

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
    OAuthModule.forRoot(),

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
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
