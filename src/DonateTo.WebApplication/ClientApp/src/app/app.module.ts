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
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { HomeComponent } from './home/home.component';

// Third party libraries
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { HttpErrorInterceptor } from 'src/app/shared/async-services/http/http-error.interceptor';
import { SampleReducer } from './shared/store/sample/reducer';
import { SampleEffects } from './shared/store/sample/effects';

@NgModule({
  declarations: [AppComponent, HomeComponent, CounterComponent, FetchDataComponent],
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
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
