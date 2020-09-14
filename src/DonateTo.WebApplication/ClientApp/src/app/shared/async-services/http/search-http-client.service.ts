import { OrganizationModel } from './../../models/organization.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DonationRequestModel, PageModel, UserModel } from '../../models';

export class SearchHttpClientService {
  constructor(private httpClient: HttpClient, private url: string, private endpoint: string) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  /**
   * Makes a HTTP GET request for a page of items based on query string.
   *
   * @returns Observable PagedModel of T
   */
  getSearch(pageNumber: number, pageSize: number, query: string): Observable<PageModel<DonationRequestModel>> {
    const queryString = { pageNumber: pageNumber.toString(), pageSize: pageSize.toString(), query };
    return this.httpClient.get<PageModel<DonationRequestModel>>(`${this.url}/${this.endpoint}/searchDonation`, {
      params: queryString,
    });
  }

  getSearchOrganization(pageNumber: number, pageSize: number, query: string): Observable<PageModel<OrganizationModel>> {
    const queryString = { pageNumber: pageNumber.toString(), pageSize: pageSize.toString(), query };
    return this.httpClient.get<PageModel<OrganizationModel>>(`${this.url}/${this.endpoint}/searchOrganization`, {
      params: queryString,
    });
  }

  getSearchUser(pageNumber: number, pageSize: number, query: string): Observable<PageModel<UserModel>> {
    const queryString = { pageNumber: pageNumber.toString(), pageSize: pageSize.toString(), query };
    return this.httpClient.get<PageModel<UserModel>>(`${this.url}/${this.endpoint}/searchUser`, {
      params: queryString,
    });
  }
}
