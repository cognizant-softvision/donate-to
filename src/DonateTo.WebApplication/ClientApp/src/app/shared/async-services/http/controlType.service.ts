import { BaseHttpClientService } from './base-http-client.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../../../app-config.service';
import { ControlTypeModel } from '../../models/control-type.model';

@Injectable({
  providedIn: 'root',
})
export class ControlTypeService extends BaseHttpClientService<ControlTypeModel> {
  constructor(httpClient: HttpClient, configService: ConfigService) {
    const baseUrl = configService.get('baseUrl');
    super(httpClient, baseUrl, 'api/v1/controlType');
  }

  getControlTypes() {
    return this.get();
  }
}
