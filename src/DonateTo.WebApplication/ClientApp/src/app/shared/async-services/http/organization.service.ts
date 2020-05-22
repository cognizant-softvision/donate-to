import { BaseHttpClientService } from './base-http-client.service';
import { ConfigService } from 'src/app/app-config.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrganizationModel } from '../../models';
import { SearchHttpClientService } from './search-http-client.service';

@Injectable({
  providedIn: 'root',
})
export class OrganizationService extends BaseHttpClientService<OrganizationModel> {
  searchService: SearchHttpClientService;
  constructor(httpClient: HttpClient, configService: ConfigService) {
    const baseUrl = configService.get('baseUrl');
    super(httpClient, baseUrl, 'api/v1/organization');
    this.searchService = new SearchHttpClientService(httpClient, baseUrl, 'api/v1/search');
  }

  getOrganization() {
    return this.get();
  }
}
