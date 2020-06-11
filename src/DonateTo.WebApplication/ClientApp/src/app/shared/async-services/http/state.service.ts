import { BaseHttpClientService } from './base-http-client.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/app-config.service';
import { StateModel } from '../../models/state.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StateService extends BaseHttpClientService<StateModel> {
  constructor(httpClient: HttpClient, configService: ConfigService) {
    const baseUrl = configService.get('baseUrl');
    super(httpClient, baseUrl, 'api/v1/state');
  }

  getByCountry(countryId: number): Observable<StateModel[]> {
    return this.httpClient.get<StateModel[]>(`${this.url}/${this.endpoint}/ByCountry?countryId=${countryId}`);
  }
}
