import { BaseHttpClientService } from './base-http-client.service';
import { ConfigService } from 'src/app/app-config.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrganizationModel, PageModel } from '../../models';
import { Observable } from 'rxjs/internal/Observable';
import { OrganizationFilter } from '../../models/filters/organization-filter';

@Injectable({
  providedIn: 'root',
})
export class OrganizationService extends BaseHttpClientService<OrganizationModel> {
  constructor(httpClient: HttpClient, configService: ConfigService) {
    const baseUrl = configService.get('baseUrl');
    super(httpClient, baseUrl, 'api/v1/organization');
  }

  getPagedFiltered(organizationFilter: OrganizationFilter): Observable<PageModel<OrganizationModel>> {
    const queryString = {
      pageNumber: organizationFilter?.pageNumber.toString() ?? '',
      pageSize: organizationFilter?.pageSize.toString() ?? '',
      contactName: organizationFilter?.contactName ?? '',
      name: organizationFilter?.name ?? '',
      description: organizationFilter?.description ?? '',
      orderBy: organizationFilter?.orderBy ?? '',
      orderDirection: organizationFilter?.orderDirection ?? '',
    };
    return this.httpClient.get<PageModel<OrganizationModel>>(`${this.url}/${this.endpoint}/pagedFiltered`, {
      params: queryString,
    });
  }

  getOrganizations() {
    return this.get();
  }

  createOrganization(item: OrganizationModel) {
    return this.create(item);
  }

  updateOrganization(item: OrganizationModel) {
    return this.update(item);
  }

  getByUser(userId: number): Observable<OrganizationModel[]> {
    return this.httpClient.get<OrganizationModel[]>(`${this.url}/${this.endpoint}/GetByUser?userId=${userId}`);
  }
}
