import { BrowserModule } from '@angular/platform-browser';

// Angular core modules
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Routes
import { AppRoutingModule } from './app-routing.module';

// Modules
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { NotificationsModule } from './shared/notifications/notifications.module';

// Third party libraries
import { EffectsModule } from '@ngrx/effects';
import { HttpErrorInterceptor } from 'src/app/shared/async-services/http/http-error.interceptor';
import { SampleModule } from './home/sample.module';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from 'ng2-translate';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    AuthModule,
    NotificationsModule,
    HomeModule,
    // Angular core dependencies
    BrowserModule,
    FormsModule,
    CommonModule,

    // Third party modules
    TranslateModule.forRoot(),

    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    RouterModule.forRoot([]),
    StoreModule.forRoot([]),
    EffectsModule.forRoot([]),

    // NgRx Store modules
    SampleModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
