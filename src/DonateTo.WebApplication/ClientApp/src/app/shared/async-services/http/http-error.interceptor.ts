import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/internal/operators';
import { NotificationsService } from '../../notifications/notifications.service';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private notificationsService: NotificationsService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((error) => {
        let errorMessage = '';
        if (error.status === 422) {
          error.title = 'Can not delete Organization';
          errorMessage = `The Organization can not have donations requests in progress`;
        } else if (error instanceof ErrorEvent) {
          errorMessage = `Client-side error: ${error.error.message}`;
        } else {
          errorMessage = `Server-side error: ${error.status} ${error.message}`;
        }

        this.notificationsService.createNotification('error', error.title, errorMessage);
        console.log(errorMessage);
        return throwError(errorMessage);
      })
    );
  }
}
