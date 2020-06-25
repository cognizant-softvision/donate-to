import { BaseHttpClientService } from './base-http-client.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../../models';
import { ConfigService } from 'src/app/app-config.service';
import { Observable } from 'rxjs';

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
}
