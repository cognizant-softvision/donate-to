import { BaseModel } from 'src/app/shared/models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PageModel } from '../../models';

export class BaseHttpClientService<T extends BaseModel> {
  constructor(protected httpClient: HttpClient, protected url: string, protected endpoint: string) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  /**
   * Makes a HTTP GET request.
   *
   * @returns Observable List of T
   */
  get(): Observable<T[]> {
    return this.httpClient.get<T[]>(`${this.url}/${this.endpoint}`);
  }

  /**
   * Makes a HTTP GET request for a page of items.
   *
   * @returns Observable PagedModel of T
   */
  getPaged(pageNumber: number, pageSize: number): Observable<PageModel<T>> {
    const queryString = { pageNumber: pageNumber.toString(), pageSize: pageSize.toString() };
    return this.httpClient.get<PageModel<T>>(`${this.url}/${this.endpoint}/paged`, { params: queryString });
  }

  /**
   * Makes a HTTP GET request.
   *
   * @param id - Input number
   * @returns Observable of T
   */
  getById(id: number): Observable<T> {
    return this.httpClient.get<T>(`${this.url}/${this.endpoint}/${id}`);
  }

  /**
   * Makes a HTTP POST request.
   *
   * @param item - Input T
   * @returns Observable of T
   */
  create(item: T): Observable<T> {
    return this.httpClient.post<T>(`${this.url}/${this.endpoint}`, JSON.stringify(item), this.httpOptions);
  }

  /**
   * Makes a HTTP PUT request.
   *
   * @param item - Input T
   * @returns Observable of T
   */
  update(item: T): Observable<T> {
    return this.httpClient.put<T>(`${this.url}/${this.endpoint}/${item.id}`, JSON.stringify(item), this.httpOptions);
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

  /**
   * Converts a number type filter property (if it is a valid number) into a string.
   * Usage example: intFilterToString(filter?.numProperty)
   * @param num Number to convert.
   */
  protected intFilterToString(num: number): string {
    return num == null ? '' : num.toString();
  }
}
