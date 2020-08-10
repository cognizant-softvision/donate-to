import { BaseHttpClientService } from './base-http-client.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PageModel, UserModel } from '../../models';
import { ConfigService } from '../../../app-config.service';
import { Observable } from 'rxjs';
import { UserFilter } from '../../models/filters/user-filter';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseHttpClientService<UserModel> {
  constructor(httpClient: HttpClient, configService: ConfigService) {
    const baseUrl = configService.get('baseUrl');
    super(httpClient, baseUrl, 'api/v1/user');
  }

  userOrganizationLink(user: number, organizations: number[]): Observable<UserModel> {
    return this.httpClient.put<UserModel>(
      `${this.url}/${this.endpoint}?userId=${user}`,
      JSON.stringify(organizations),
      this.httpOptions
    );
  }

  getUsers(): Observable<UserModel[]> {
    return this.get();
  }

  getUser(id: number): Observable<UserModel> {
    return this.getById(id);
  }

  getPagedFiltered(userFilter: UserFilter): Observable<PageModel<UserModel>> {
    const queryString = {
      pageNumber: userFilter?.pageNumber.toString() ?? '',
      pageSize: userFilter?.pageSize.toString() ?? '',
      fullName: userFilter?.fullName ?? '',
      email: userFilter?.email ?? '',
      organization: userFilter?.organization ?? '',
      organizationId: userFilter?.organizationId.toString() ?? '',
      orderBy: userFilter?.orderBy ?? '',
      orderDirection: userFilter?.orderDirection ?? '',
    };
    return this.httpClient.get<PageModel<UserModel>>(`${this.url}/${this.endpoint}/pagedFiltered`, {
      params: queryString,
    });
  }
}
