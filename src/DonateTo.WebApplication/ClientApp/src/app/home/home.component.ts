import { Component, OnInit } from '@angular/core';
import { AddSample, LoadSamples } from '../shared/store/sample';
import { SampleModel } from '../shared/models/sampleModel';
import { select, Store } from '@ngrx/store';
import { OAuthService } from 'angular-oauth2-oidc';
import { DoLoginAction, DoLoginSuccessAction, DoLogoutAction, TryLoginAction } from '../shared/store/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  constructor(
    private sampleStore: Store<{ items: SampleModel[]; cart: [] }>,
    private authStore: Store<{ items: SampleModel[]; cart: [] }>,
    private oauthService: OAuthService
  ) {
    sampleStore.pipe(select((state: any) => state.sample)).subscribe((data) => (this.samples = data.items));
    authStore.pipe(select((state: any) => state.auth)).subscribe((data) => (this.userName = data.name));
  }

  samples: SampleModel[] = [];

  newSample: string;

  userName: string;

  ngOnInit(): void {
    this.sampleStore.dispatch(new LoadSamples());
    this.authStore.dispatch(new TryLoginAction());
  }

  createSample(): void {
    const sample = new SampleModel();
    sample.id = 1;
    sample.name = this.newSample;
    this.sampleStore.dispatch(new AddSample(sample));
  }

  login() {
    this.authStore.dispatch(new DoLoginAction());
  }

  logout() {
    this.authStore.dispatch(new DoLogoutAction());
  }

  // get userName(): string {
  //   const claims = this.oauthService.getIdentityClaims();
  //   console.log(claims);
  //   if (!claims) return null;
  //   return claims['name'];
  // }

  // get userName(): string {
  //   const claims = this.oauthService.getIdentityClaims();
  //   if (!claims) return null;
  //   return claims['given_name'];
  // }

  // get idToken(): string {
  //   return this.oauthService.getIdToken();
  // }

  // get accessToken(): string {
  //   return this.oauthService.getAccessToken();
  // }
}
