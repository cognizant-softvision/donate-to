import { BaseHttpClientService } from './base-http-client.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DonationRequestItemModel } from '../../models';
import { ConfigService } from '../../../app-config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DonationRequestItemService extends BaseHttpClientService<DonationRequestItemModel> {
  constructor(httpClient: HttpClient, configService: ConfigService) {
    const baseUrl = configService.get('baseUrl');
    super(httpClient, baseUrl, 'api/v1/donationrequestitem');
  }

  deleteDonationRequestItem(donationRequestItem: DonationRequestItemModel): Observable<DonationRequestItemModel> {
    return this.httpClient.delete<DonationRequestItemModel>(
      `${this.url}/${this.endpoint}/${donationRequestItem.id}`,
      this.httpOptions
    );
  }
}
