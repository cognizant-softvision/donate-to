import { BaseHttpClientService } from './base-http-client.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/app-config.service';
import { Observable } from 'rxjs';
import { DonationModel } from '../../models/donation.model';
import { PageModel } from '../../models';
import { DonationFilter } from '../../models/filters/donation-filter';
import { AvailabilityModel } from '../../models/availability.model';

@Injectable({
  providedIn: 'root',
})
export class DonationService extends BaseHttpClientService<DonationModel> {
  constructor(httpClient: HttpClient, configService: ConfigService) {
    const baseUrl = configService.get('baseUrl');
    super(httpClient, baseUrl, 'api/v1/donation');
  }

  createDonation(donation: DonationModel): Observable<DonationModel> {
    return this.create(donation);
  }

  getPagedFilteredByDonationRequestId(donationFilter: DonationFilter): Observable<PageModel<DonationModel>> {
    const queryString = {
      pageNumber: donationFilter?.pageNumber.toString() ?? '',
      pageSize: donationFilter?.pageSize.toString() ?? '',
      itemName: donationFilter?.itemName ?? '',
      donationRequestId: donationFilter?.donationRequestId.toString() ?? '',
      orderBy: donationFilter?.orderBy ?? '',
      orderDirection: donationFilter?.orderDirection ?? '',
    };
    return this.httpClient.get<PageModel<DonationModel>>(`${this.url}/${this.endpoint}/pagedFiltered`, {
      params: queryString,
    });
  }

  loadDonationByUserPaged(
    pageNumber: number,
    pageSize: number,
    userId: number,
    statusId: number
  ): Observable<PageModel<DonationModel>> {
    const queryString = {
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
      statusId: statusId.toString(),
    };
    if (userId) {
      queryString['userId'] = userId.toString();
    }
    return this.httpClient.get<PageModel<DonationModel>>(`${this.url}/${this.endpoint}/pagedByUser`, {
      params: queryString,
    });
  }

  deleteAvailability(availability: AvailabilityModel): Observable<AvailabilityModel> {
    return this.httpClient.delete<AvailabilityModel>(
      `${this.url}/${this.endpoint}/deleteAvailability/?id=${availability.id}`,
      this.httpOptions
    );
  }
}
