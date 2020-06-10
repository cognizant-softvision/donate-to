import { BaseHttpClientService } from './base-http-client.service';
import { ConfigService } from 'src/app/app-config.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UnitModel } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class UnitService extends BaseHttpClientService<UnitModel> {
  constructor(httpClient: HttpClient, configService: ConfigService) {
    const baseUrl = configService.get('baseUrl');
    super(httpClient, baseUrl, 'api/v1/unit');
  }

  getUnits() {
    return this.get();
  }
}
