import * as config from 'config/development.json';
import { BaseHttpClientService } from './base-http-client.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SampleModel } from '../../models/sampleModel';

@Injectable({
  providedIn: 'root',
})
export class SampleService extends BaseHttpClientService<SampleModel> {
  constructor(httpClient: HttpClient) {
    super(httpClient, config.api.baseUrl, 'api/v1/sample');
  }

  getSample() {
    return this.get();
  }

  createSample(sample: SampleModel) {
    return this.create(sample);
  }
}
