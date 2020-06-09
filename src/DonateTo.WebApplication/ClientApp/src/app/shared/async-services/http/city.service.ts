import { BaseHttpClientService } from './base-http-client.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/app-config.service';
import { CityModel } from '../../models/city.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CityService extends BaseHttpClientService<CityModel> {
  constructor(httpClient: HttpClient, configService: ConfigService, h1: HttpClient) {
    const baseUrl = configService.get('baseUrl');
    super(httpClient, baseUrl, 'api/v1/city');
  }

  getByState(stateId: number): Observable<CityModel[]> {
    return this.httpClient.get<CityModel[]>(`${this.url}/${this.endpoint}/ByState/?stateId=${stateId}`);
  }
}
