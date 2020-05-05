import { Component, OnInit } from '@angular/core';
import { AddSample, LoadSamples } from '../shared/store/sample';
import { SampleModel } from '../shared/models/sampleModel';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  constructor(private store: Store<{ items: SampleModel[]; cart: [] }>) {
    store.pipe(select((state: any) => state.sample)).subscribe((data) => (this.samples = data.items));
  }

  samples: SampleModel[] = [];

  newSample: string;

  ngOnInit(): void {
    this.store.dispatch(new LoadSamples());
  }

  createSample(): void {
    const sample = new SampleModel();
    sample.id = 1;
    sample.name = this.newSample;
    this.store.dispatch(new AddSample(sample));
  }
}
