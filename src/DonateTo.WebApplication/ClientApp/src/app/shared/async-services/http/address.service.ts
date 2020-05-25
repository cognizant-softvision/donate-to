import { BaseHttpClientService } from './base-http-client.service';
import { ConfigService } from 'src/app/app-config.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddressModel } from '../../models';
import { SearchHttpClientService } from './search-http-client.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddressService extends BaseHttpClientService<AddressModel> {
  constructor(httpClient: HttpClient, configService: ConfigService) {
    const baseUrl = configService.get('baseUrl');
    super(httpClient, baseUrl, 'api/v1/address');
  }

  getAddressesByOrganizationId(organizationId: number): Observable<AddressModel[]> {
    return this.httpClient.get<AddressModel[]>(
      `${this.url}/${this.endpoint}/GetByOrganizationId?organizationId=${organizationId.toString()}`
    );
  }
}
