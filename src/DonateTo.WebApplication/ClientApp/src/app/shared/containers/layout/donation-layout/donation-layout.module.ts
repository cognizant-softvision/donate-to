import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  NzButtonModule,
  NzIconModule,
  NzLayoutModule,
  NzMenuModule,
  NzModalService,
  NzTableModule,
} from 'ng-zorro-antd';
import { NzSpaceModule } from 'ng-zorro-antd/space';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { DonationLayoutComponent } from './donation-layout.component';
import { ComponentsModule } from 'src/app/shared/components';
import { HttpLoaderFactory } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import { DonationLayoutRoutingModule } from './donation-layout-routing.module';
import { DonationSandbox } from 'src/app/donation/donation.sandbox';
import { IconDefinition } from '@ant-design/icons-angular';
import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  HeartFill,
  HeartOutline,
  HomeOutline,
  ProfileOutline,
  SearchOutline,
  TeamOutline,
  UserOutline,
} from '@ant-design/icons-angular/icons';
import { MyDonationSandbox } from 'src/app/my-donations/my-donation.sandbox';

const ICONS: IconDefinition[] = [
  HeartOutline,
  HeartFill,
  TeamOutline,
  ProfileOutline,
  HomeOutline,
  SearchOutline,
  UserOutline,
  CloseCircleTwoTone,
  CheckCircleTwoTone,
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    NzLayoutModule,
    NzButtonModule,
    NzSpaceModule,
    NzMenuModule,
    NzTableModule,
    TranslateModule.forChild({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      extend: true,
    }),
    ComponentsModule,
    ReactiveFormsModule,
    DonationLayoutRoutingModule,
    NzIconModule.forChild(ICONS),
  ],
  declarations: [DonationLayoutComponent],
  providers: [DonationSandbox, MyDonationSandbox, NzModalService],
})
export class DonationLayoutModule {}
