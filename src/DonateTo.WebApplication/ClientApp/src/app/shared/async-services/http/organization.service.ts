import { BaseHttpClientService } from './base-http-client.service';
import { ConfigService } from 'src/app/app-config.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddressModel, OrganizationModel, PageModel } from '../../models';
import { Observable } from 'rxjs/internal/Observable';
import { OrganizationFilter } from '../../models/filters/organization-filter';
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

  getOrganization(id: number): Observable<OrganizationModel> {
    return this.getById(id);
  }

  getOrganizationsPaged(pageNumber: number, pageSize: number): Observable<PageModel<OrganizationModel>> {
    return this.getPaged(pageNumber, pageSize);
  }

  getOrganizationsSearchPaged(
    pageNumber: number,
    pageSize: number,
    query: string
  ): Observable<PageModel<OrganizationModel>> {
    return this.searchService.getSearchOrganization(pageNumber, pageSize, query);
  }

  deleteOrganization(organization: OrganizationModel): Observable<OrganizationModel> {
    return this.httpClient.delete<OrganizationModel>(
      `${this.url}/${this.endpoint}/${organization.id}`,
      this.httpOptions
    );
  }
}
