import { BaseHttpClientService } from './base-http-client.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DonationRequestModel, PageModel } from '../../models';
import { SearchHttpClientService } from './search-http-client.service';
import { ConfigService } from 'src/app/app-config.service';
import { Observable } from 'rxjs';

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

  getDonationRequests(): Observable<DonationRequestModel[]> {
    return this.get();
  }

  getDonationRequest(id: number): Observable<DonationRequestModel> {
    return this.getById(id);
  }

  getDonationRequestsSearchPaged(
    pageNumber: number,
    pageSize: number,
    query: string
  ): Observable<PageModel<DonationRequestModel>> {
    return this.searchService.getSearch(pageNumber, pageSize, query);
  }

  getDonationRequestsPaged(pageNumber: number, pageSize: number): Observable<PageModel<DonationRequestModel>> {
    return this.getPaged(pageNumber, pageSize);
  }

  createDonationRequest(donationRequestModel: DonationRequestModel): Observable<DonationRequestModel> {
    return this.create(donationRequestModel);
  }
}
