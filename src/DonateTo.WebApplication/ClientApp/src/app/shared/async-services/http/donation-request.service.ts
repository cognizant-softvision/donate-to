import { BaseHttpClientService } from './base-http-client.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DonationRequestModel, PageModel } from '../../models';
import { SearchHttpClientService } from './search-http-client.service';
import { ConfigService } from '../../../app-config.service';
import { Observable } from 'rxjs';
import { DonationRequestFilter } from '../../models/filters/donation-request-filter';

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

  update(donationRequestModel: DonationRequestModel): Observable<DonationRequestModel> {
    // return this.update(donationRequestModel.id, donationRequestModel);
    return this.httpClient.put<DonationRequestModel>(
      `${this.url}/${this.endpoint}/${donationRequestModel.id}`,
      donationRequestModel,
      this.httpOptions
    );
  }

  getPagedFiltered(donationRequestFilter: DonationRequestFilter): Observable<PageModel<DonationRequestModel>> {
    const queryString = {
      pageNumber: donationRequestFilter?.pageNumber.toString() ?? '',
      pageSize: donationRequestFilter?.pageSize.toString() ?? '',
      title: donationRequestFilter?.title ?? '',
      createdDateBegin: donationRequestFilter?.createdDateBegin?.toDateString() ?? '',
      createdDateEnd: donationRequestFilter?.createdDateEnd?.toDateString() ?? '',
      finishDateBegin: donationRequestFilter?.finishDateBegin?.toDateString() ?? '',
      finishDateEnd: donationRequestFilter?.finishDateEnd?.toDateString() ?? '',
      observation: donationRequestFilter?.observation ?? '',
      orderBy: donationRequestFilter?.orderBy ?? '',
      orderDirection: donationRequestFilter?.orderDirection ?? '',
    };
    return this.httpClient.get<PageModel<DonationRequestModel>>(`${this.url}/${this.endpoint}/pagedFiltered`, {
      params: queryString,
    });
  }
}
