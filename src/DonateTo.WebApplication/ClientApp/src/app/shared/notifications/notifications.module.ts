import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzNotificationModule } from 'ng-zorro-antd';

import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/en';
import { es_ES, NZ_I18N } from 'ng-zorro-antd';
registerLocaleData(es);

import { NotificationsService } from './notifications.service';

@NgModule({
  imports: [CommonModule, NzNotificationModule, BrowserAnimationsModule],
  declarations: [],
  bootstrap: [],
  providers: [NotificationsService, { provide: NZ_I18N, useValue: es_ES }],
})
export class NotificationsModule {}
