import { Component, OnInit } from '@angular/core';
import { AddSample, LoadSamples } from '../shared/store/sample';
import { SampleModel } from '../shared/models/sampleModel';
import { select, Store } from '@ngrx/store';
import { DoLoginAction, DoLogoutAction } from '../shared/store/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  constructor(private sampleStore: Store<{}>, private authStore: Store<{}>) {
    sampleStore.pipe(select((state: any) => state.sample)).subscribe((data) => (this.samples = data.items));
    authStore.pipe(select((state: any) => state.auth)).subscribe((data) => {
      this.userName = data.name;
      this.authenticated = data.authenticated;
    });
  }

  samples: SampleModel[] = [];

  newSample: string;

  userName: string;

  authenticated: boolean;

  ngOnInit(): void {
    this.sampleStore.dispatch(new LoadSamples());
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
}
