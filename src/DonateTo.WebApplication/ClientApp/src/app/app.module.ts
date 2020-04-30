import { BrowserModule } from '@angular/platform-browser';

// Angular core modules
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// Routes
import { AppRoutingModule } from './app-routing.module';

// Modules
import { AuthModule } from './auth/auth.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { DonationComponent } from './shared/components/donation/donation.component';
import { DonationListComponent } from './shared/components/donation-list/donation-list.component';
import { ErrorService } from 'src/shared/async-services/error.service';

// Third party libraries
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpErrorInterceptor } from 'src/shared/async-services/http/http-error.interceptor';
import { DonationReducer } from './shared/store/donation/reducer';
import { DonationEffects } from './shared/store/donation/effects';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    DonationComponent,
    DonationListComponent
  ],
  imports: [
    AppRoutingModule,
    // Angular core dependencies
    BrowserModule,
    FormsModule,
    CommonModule,

    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    // ErrorService,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
    ]),
    EffectsModule.forRoot([]),
    AuthModule
    StoreModule.forRoot({ donation: DonationReducer }),
    EffectsModule.forRoot([DonationEffects])
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
