import { Component, OnInit } from '@angular/core';
import { SampleModel } from '../shared/models/sampleModel';
import { HomeSandbox } from './home.sandbox';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  param = { value: 'world' };

  constructor(public homeSandbox: HomeSandbox, public translate: TranslateService) {}

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

  switchLanguage(language: string) {
    this.translate.use(language);
  }
}
