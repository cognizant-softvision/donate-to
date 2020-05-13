import { DonationRequestsListItemComponent } from './components/donation-request/list/item/donation-requests-list-item.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './home.component';
import { DonationRequestsListComponent } from './components/donation-request/list/donation-requests-list.component';
import { CommonModule } from '@angular/common';
import { DonationRequestDetailComponent } from './components/donation-request/detail/donation-request-detail.component';
import {
  NZ_ICONS,
  NzButtonModule,
  NzCardModule,
  NzDividerModule,
  NzGridModule,
  NzIconModule,
  NzInputModule,
  NzListModule,
  NzModalModule,
  NzPaginationModule,
  NzRateModule,
  NzTagModule,
} from 'ng-zorro-antd';
import { HeartFill, SearchOutline } from '@ant-design/icons-angular/icons';
import { HomeSandbox } from './home.sandbox';
import { DonationRequestModule } from './donation-request.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    NzInputModule,
    NzModalModule,
    NzCardModule,
    NzListModule,
    NzIconModule,
    NzRateModule,
    NzTagModule,
    NzGridModule,
    NzDividerModule,
    NzPaginationModule,
    NzButtonModule,
    DonationRequestModule,
    TranslateModule,
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    HomeComponent,
    DonationRequestsListComponent,
    DonationRequestsListItemComponent,
    DonationRequestDetailComponent,
  ],
  providers: [
    HomeSandbox,
    {
      provide: NZ_ICONS,
      useValue: [HeartFill, SearchOutline],
    },
  ],
})
export class HomeModule {}
