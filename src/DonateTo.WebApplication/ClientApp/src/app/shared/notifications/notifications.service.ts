import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({ providedIn: 'root' })
export class NotificationsService {
  constructor(private notification: NzNotificationService) {}

  /**
   * Display a notification message
   * @param type String. Type of message can be: success, info, warning or error
   * @param title String. Title of the notification
   * @param message String. Content of the notification
   */
  createNotification(type: string, title: string, message: string): void {
    this.notification.create(type, title, message);
  }
}
