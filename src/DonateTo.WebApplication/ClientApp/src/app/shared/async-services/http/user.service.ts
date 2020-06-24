import { BaseHttpClientService } from './base-http-client.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrganizationModel, UserModel } from '../../models';
import { ConfigService } from 'src/app/app-config.service';
import { Observable } from 'rxjs';
import { UserOrganization } from '../../models/user-organization.model';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseHttpClientService<UserModel> {
  constructor(httpClient: HttpClient, configService: ConfigService) {
    const baseUrl = configService.get('baseUrl');
    super(httpClient, baseUrl, 'api/v1/organization');
  }

  // Handle request to the
  /*
  userOrganizationLink(user: UserModel, organizations: OrganizationModel[]): Observable<UserModel> {
    const userOrganization: UserOrganization = {
      user,
      organizations
    };

    return this.create(userOrganization);

  }*/
}
