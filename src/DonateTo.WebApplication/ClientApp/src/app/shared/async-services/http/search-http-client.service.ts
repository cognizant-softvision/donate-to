import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DonationRequestModel, PageModel } from '../../models';

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
    return this.httpClient.get<PageModel<DonationRequestModel>>(
      `${this.url}/${this.endpoint}/${query}/${pageNumber}/${pageSize}`
    );
  }
}
