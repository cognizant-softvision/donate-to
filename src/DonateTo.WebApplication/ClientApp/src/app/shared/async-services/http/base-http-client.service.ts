import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { retry, catchError, map } from 'rxjs/operators';
import { BaseModel } from 'src/app/shared/models/baseModel';
import { Serializer } from 'src/app/shared/models/serializer';

@Injectable({
    providedIn: 'root'
})

export class BaseHttpClientService<T extends BaseModel> {
    constructor(
      private httpClient: HttpClient,
      private url: string,
      private endpoint: string,
      private serializer: Serializer
    ) { }

    httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

  /**
   * Makes a HTTP GET request.
   *
   * @returns Observable List of T
   */
  get(): Observable<T[]> {
    return this.httpClient
      .get<T[]>(`${this.url}/${this.endpoint}`);
  }

  /**
   * Makes a HTTP GET request.
   *
   * @param id - Input number
   * @returns Observable of T
   */
  getById(id: number): Observable<T> {
    return this.httpClient
      .get<T>(`${this.url}/${this.endpoint}/${id}`);
  }

  /**
   * Makes a HTTP POST request.
   *
   * @param item - Input T
   * @returns Observable of T
   */
  create(item: T): Observable<T> {
    return this.httpClient
    .post<T>(`${this.url}/${this.endpoint}`, JSON.stringify(item), this.httpOptions)
    .pipe(
      map(data => this.serializer.fromJson(data) as T)
      );
  }

  /**
   * Makes a HTTP PUT request.
   *
   * @param item - Input T
   * @returns Observable of T
   */
  update(item: T): Observable<T> {
    return this.httpClient.put<T>(`${this.url}/${this.endpoint}/${item.id}`, JSON.stringify(item), this.httpOptions)
    .pipe(
      map(data => this.serializer.fromJson(data) as T)
      );
  }

  /**
   * Makes a HTTP DELETE request.
   *
   * @param item - Input T
   * @returns void
   */
  delete(item: T) {
    return this.httpClient.delete<T>(`${this.url}/${this.endpoint}/${item.id}`, this.httpOptions);
  }

}
