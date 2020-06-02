import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root',
})
export class HttpAuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = sessionStorage.getItem('id_token');
    let request = req;
    const authHeader: string = request.headers.get('Authorization');

    if (isNullOrUndefined(authHeader) || !authHeader.startsWith('Bearer ')) {
      if (token) {
        request = req.clone({
          setHeaders: {
            authorization: `Bearer ${token}`,
          },
        });
      }
    }

    return next.handle(request);
  }
}
