import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as config from 'config/development.json';
import { BaseModel } from '../../models/baseModel';
import { BaseHttpClientService } from './base-http-client.service';

@Injectable({
  providedIn: 'root',
})
export class SampleService extends BaseHttpClientService<BaseModel> {
  constructor(httpClient: HttpClient) {
    super(httpClient, config.api.baseUrl, 'api/v1/sample', undefined);
  }
}
