import { Component, OnInit } from '@angular/core';
import { SampleModel } from '../shared/models/sampleModel';
import { HomeSandbox } from './home.sandbox';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  constructor(public homeSandbox: HomeSandbox) {}

  samples: SampleModel[] = [];
  subscriptions: Subscription[] = [];
  newSample: string;

  ngOnInit(): void {
    this.registerEvents();
  }

  createSample(): void {
    const sample = new SampleModel();
    sample.id = 1;
    sample.name = this.newSample;
    this.homeSandbox.createSample(sample);
  }

  registerEvents() {
    this.subscriptions.push(
      this.homeSandbox.culture$.subscribe((sample: any) => {
        if (sample) {
          this.samples = sample;
        }
      })
    );
  }
}
