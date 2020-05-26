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
  NzStepsModule,
  NzTableModule,
  NzTagModule,
} from 'ng-zorro-antd';
import { HeartFill, HeartOutline, HomeOutline, SearchOutline, UserOutline } from '@ant-design/icons-angular/icons';
import { DonationSandbox } from './donation.sandbox';
import { DonationRequestModule } from './donation-request.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DonationListComponent } from './components/donation/list/donation-list.component';
import { DonationConfirmComponent } from './components/donation-confirm/donation-confirm.component';
import { DonationStepAddressComponent } from './components/donation-confirm/donation-step-address/donation-step-address.component';
import { DonationStepResponsableComponent } from './components/donation-confirm/donation-step-responsable/donation-step-responsable.component';
import { DonationStepFinishComponent } from './components/donation-confirm/donation-step-finish/donation-step-finish.component';

const icons = [HeartFill, SearchOutline, UserOutline, HeartOutline, HomeOutline];
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
    NzPopconfirmModule,
    DonationRequestModule,
    NzTableModule,
    NzInputNumberModule,
    TranslateModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
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
