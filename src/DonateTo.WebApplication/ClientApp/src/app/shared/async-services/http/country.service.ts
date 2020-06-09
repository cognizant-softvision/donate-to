import { BaseHttpClientService } from './base-http-client.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/app-config.service';
import { CountryModel } from '../../models/country.model';

@Injectable({
  providedIn: 'root',
})
export class CountryService extends BaseHttpClientService<CountryModel> {
  constructor(httpClient: HttpClient, configService: ConfigService) {
    const baseUrl = configService.get('baseUrl');
    super(httpClient, baseUrl, 'api/v1/country');
  }
}
