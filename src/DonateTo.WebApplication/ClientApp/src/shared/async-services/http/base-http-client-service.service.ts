import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Base } from 'src/shared/models/base';

@Injectable({
    providedIn: 'root'
})

export class BaseHttpClientService<T extends Base> {
    constructor(
      private httpClient: HttpClient,
      private url: string,
      private endpoint: string
    ) { }

    httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

  get(): Observable<T[]> {
    return this.httpClient
      .get<T[]>(`${this.url}/${this.endpoint}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getById(id: number): Observable<T> {
    return this.httpClient
      .get<T>(`${this.url}/${this.endpoint}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  create(item: T): Observable<T> {
    return this.httpClient
    .post<T>(`${this.url}/${this.endpoint}`, JSON.stringify(item), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  update(item: T): Observable<T> {
    return this.httpClient.put<T>(`${this.url}/${this.endpoint}/${item.id}`, JSON.stringify(item), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  delete(item: T) {
    return this.httpClient.delete<T>(`${this.url}/${this.endpoint}/${item.id}`, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse){
    let errorMessage = '';

    if(error.error instanceof ErrorEvent) {
      // error client
      errorMessage = error.error.message;
    } else {
      // error server
      errorMessage = `Error code: ${error.status}, ` + `message: ${error.message}`;
    }

    return throwError(errorMessage);
  }
}
