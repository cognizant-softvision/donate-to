import { BaseHttpClientService } from './base-http-client.service';
import { ConfigService } from 'src/app/app-config.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StatusModel } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class StatusService extends BaseHttpClientService<StatusModel> {
  constructor(httpClient: HttpClient, configService: ConfigService) {
    const baseUrl = configService.get('baseUrl');
    super(httpClient, baseUrl, 'api/v1/status');
  }

  getStatus() {
    return this.get();
  }
}
