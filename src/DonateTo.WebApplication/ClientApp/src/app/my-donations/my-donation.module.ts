import { NgModule } from '@angular/core';
import { MyDonationSandbox } from './my-donation.sandbox';
import { CommonModule, registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import {
  NzButtonModule,
  NzCardModule,
  NzDividerModule,
  NzFormModule,
  NzGridModule,
  NzIconModule,
  NzInputModule,
  NzListModule,
  NzModalModule,
  NzPaginationModule,
  NzPopconfirmModule,
  NzSelectModule,
  NzSkeletonModule,
  NzStepsModule,
  NzTableModule,
  NzTagModule,
} from 'ng-zorro-antd';
import { HeartFill, HeartOutline, HomeOutline, SearchOutline, UserOutline } from '@ant-design/icons-angular/icons';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MyDonationsListComponent } from './components/list/my-donations-list.component';
import { MyDonationsListItemComponent } from './components/list/item/my-donations-list-itemcomponent';
import { MyDonationsComponent } from './my-donation.component';
import { RouterModule } from '@angular/router';

// FIX this should be moved to an upper level.
registerLocaleData(es);

const icons = [HeartFill, SearchOutline, UserOutline, HeartOutline, HomeOutline];
@NgModule({
  imports: [
    NzInputModule,
    NzModalModule,
    NzCardModule,
    NzListModule,
    NzIconModule.forChild(icons),
    NzTagModule,
    NzGridModule,
    NzDividerModule,
    NzPaginationModule,
    NzSkeletonModule,
    NzButtonModule,
    NzStepsModule,
    NzSelectModule,
    NzPopconfirmModule,
    NzTableModule,
    TranslateModule,
    NzFormModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  declarations: [MyDonationsComponent, MyDonationsListComponent, MyDonationsListItemComponent],
  providers: [MyDonationSandbox],
})
export class MyDonationsModule {}
