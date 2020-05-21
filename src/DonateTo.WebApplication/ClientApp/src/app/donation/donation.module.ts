import { NgModule } from '@angular/core';
import { DonationComponent } from './donation.component';
import { CommonModule } from '@angular/common';
import {
  NzButtonModule,
  NzCardModule,
  NzDividerModule,
  NzGridModule,
  NzIconModule,
  NzInputModule,
  NzInputNumberModule,
  NzListModule,
  NzModalModule,
  NzPaginationModule,
  NzPopconfirmModule,
  NzRateModule,
  NzSkeletonModule,
  NzTableModule,
  NzTagModule,
} from 'ng-zorro-antd';
import { HeartFill, SearchOutline } from '@ant-design/icons-angular/icons';
import { DonationSandbox } from './donation.sandbox';
import { DonationRequestModule } from './donation-request.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DonationListComponent } from './components/donation/list/donation-list.component';

const icons = [HeartFill, SearchOutline];
@NgModule({
  imports: [
    NzInputModule,
    NzModalModule,
    NzCardModule,
    NzListModule,
    NzIconModule.forChild(icons),
    NzRateModule,
    NzTagModule,
    NzGridModule,
    NzDividerModule,
    NzPaginationModule,
    NzSkeletonModule,
    NzButtonModule,
    NzPopconfirmModule,
    DonationRequestModule,
    NzTableModule,
    NzInputNumberModule,
    TranslateModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [DonationComponent, DonationListComponent],
  providers: [DonationSandbox],
})
export class DonationModule {}
