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
import { HttpErrorInterceptor } from './shared/async-services/http/http-error.interceptor';

// Third party libraries
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

//Stores
import { SampleReducer } from './shared/store/sample/reducer';
import { SampleEffects } from './shared/store/sample/effects';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent
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
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
    ]),
    AuthModule,
    StoreModule.forRoot({ sample: SampleReducer }),
    EffectsModule.forRoot([SampleEffects])
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
