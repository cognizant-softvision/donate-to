import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/en';
import { es_ES, NZ_I18N } from 'ng-zorro-antd';
registerLocaleData(es);

import { NotificationsService } from './notifications.service';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    BrowserAnimationsModule,
  ],
  declarations: [],
  bootstrap: [],
  providers: [NotificationsService, { provide: NZ_I18N, useValue: es_ES }],
})
export class NotificationsModule {}
