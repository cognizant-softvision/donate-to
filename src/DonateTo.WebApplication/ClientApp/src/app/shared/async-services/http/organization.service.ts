import { BaseHttpClientService } from './base-http-client.service';
import { ConfigService } from 'src/app/app-config.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrganizationModel } from '../../models';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class OrganizationService extends BaseHttpClientService<OrganizationModel> {
  constructor(httpClient: HttpClient, configService: ConfigService) {
    const baseUrl = configService.get('baseUrl');
    super(httpClient, baseUrl, 'api/v1/organization');
  }

  getOrganizations() {
    return this.get();
  }

  getByUser(userId: number): Observable<OrganizationModel[]> {
    return this.httpClient.get<OrganizationModel[]>(`${this.url}/${this.endpoint}/GetByUser?userId=${userId}`);
  }
}
