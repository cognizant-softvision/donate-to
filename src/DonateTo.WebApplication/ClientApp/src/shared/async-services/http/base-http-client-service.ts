import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { retry, catchError, map } from 'rxjs/operators';
import { Base } from 'src/shared/models/base';
import { environment } from '../../../environments/environment';
import { Serializer } from 'src/shared/models/serializer';

@Injectable({
    providedIn: 'root'
})

export class BaseHttpClientService<T extends Base> {
    constructor(
      private httpClient: HttpClient,
      private url: string,
      private endpoint: string,
      private serializer: Serializer
    ) { }

    httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

  get(): Observable<T[]> {
    return this.httpClient
      .get<T[]>(`${this.url}/${this.endpoint}`);
  }

  getById(id: number): Observable<T> {
    return this.httpClient
      .get<T>(`${this.url}/${this.endpoint}/${id}`);
  }

  create(item: T): Observable<T> {
    return this.httpClient
    .post<T>(`${this.url}/${this.endpoint}`, JSON.stringify(item), this.httpOptions)
    .pipe(
      map(data => this.serializer.fromJson(data) as T)
      );
  }

  update(item: T): Observable<T> {
    return this.httpClient.put<T>(`${this.url}/${this.endpoint}/${item.id}`, JSON.stringify(item), this.httpOptions)
    .pipe(
      map(data => this.serializer.fromJson(data) as T)
      );
  }

  delete(item: T) {
    return this.httpClient.delete<T>(`${this.url}/${this.endpoint}/${item.id}`, this.httpOptions);
  }

}
