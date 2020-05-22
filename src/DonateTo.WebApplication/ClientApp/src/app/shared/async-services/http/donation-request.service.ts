import { BaseHttpClientService } from './base-http-client.service';
import { ConfigService } from 'src/app/app-config.service';
import { DonationRequestModel } from '../../models';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchHttpClientService } from './search-http-client.service';

@Injectable({
  providedIn: 'root',
})
export class DonationRequestService extends BaseHttpClientService<DonationRequestModel> {
  searchService: SearchHttpClientService;
  constructor(httpClient: HttpClient, configService: ConfigService) {
    const baseUrl = configService.get('baseUrl');
    super(httpClient, baseUrl, 'api/v1/donationrequest');
    this.searchService = new SearchHttpClientService(httpClient, baseUrl, 'api/v1/search');
  }

  getDonationRequests() {
    return this.get();
  }

  getDonationRequestsSearchPaged(pageNumber: number, pageSize: number, query: string) {
    return this.searchService.getSearch(pageNumber, pageSize, query);
  }

  getDonationRequestsPaged(pageNumber: number, pageSize: number) {
    return this.getPaged(pageNumber, pageSize);
  }

  createDonationRequest(donationRequestModel: DonationRequestModel) {
    return this.create(donationRequestModel);
  }
}
