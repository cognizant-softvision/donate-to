import { NgModule } from '@angular/core';
import { DonationComponent } from './donation.component';
import { CommonModule, registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { RouterModule } from '@angular/router';

import {
  NzButtonModule,
  NzCardModule,
  NzDatePickerModule,
  NzDividerModule,
  NzEmptyModule,
  NzFormModule,
  NzGridModule,
  NzIconModule,
  NzInputModule,
  NzInputNumberModule,
  NzListModule,
  NzModalModule,
  NzPaginationModule,
  NzPopconfirmModule,
  NzRateModule,
  NzSelectModule,
  NzSkeletonModule,
  NzStepsModule,
  NzTableModule,
  NzTagModule,
  NzTimePickerModule,
} from 'ng-zorro-antd';
import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  HeartFill,
  HeartOutline,
  HomeOutline,
  SearchOutline,
  UserOutline,
} from '@ant-design/icons-angular/icons';
import { DonationSandbox } from './donation.sandbox';
import { DonationRequestModule } from './donation-request.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DonationListComponent } from './components/donation/list/donation-list.component';
import { DonationConfirmComponent } from './components/donation-confirm/donation-confirm.component';
import { DonationStepAddressComponent } from './components/donation-confirm/donation-step-address/donation-step-address.component';
import { DonationStepResponsableComponent } from './components/donation-confirm/donation-step-responsable/donation-step-responsable.component';
import { DonationStepFinishComponent } from './components/donation-confirm/donation-step-finish/donation-step-finish.component';

// FIX this should be moved to an upper level.
registerLocaleData(es);

const icons = [
  HeartFill,
  SearchOutline,
  UserOutline,
  HeartOutline,
  HomeOutline,
  CloseCircleTwoTone,
  CheckCircleTwoTone,
];
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
    NzStepsModule,
    NzSelectModule,
    NzPopconfirmModule,
    DonationRequestModule,
    NzTimePickerModule,
    NzDatePickerModule,
    NzTableModule,
    NzInputNumberModule,
    TranslateModule,
    NzFormModule,
    NzEmptyModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  declarations: [
    DonationComponent,
    DonationListComponent,
    DonationConfirmComponent,
    DonationStepAddressComponent,
    DonationStepResponsableComponent,
    DonationStepFinishComponent,
  ],
  providers: [DonationSandbox],
})
export class DonationModule {}
