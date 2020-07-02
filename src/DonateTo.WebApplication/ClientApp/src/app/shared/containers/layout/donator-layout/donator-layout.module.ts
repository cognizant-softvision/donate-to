import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzButtonModule, NzLayoutModule, NzMenuModule, NzTableModule } from 'ng-zorro-antd';
import { NzSpaceModule } from 'ng-zorro-antd/space';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { DonatorLayoutComponent } from './donator-layout.component';
import { ComponentsModule } from 'src/app/shared/components';
import { DonatorLayoutRoutingModule } from './donator-layout-routing.module';
import { HomeModule } from 'src/app/home/home.module';
import { HttpLoaderFactory } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import { DonationModule } from 'src/app/donation/donation.module';
import { MyDonationsModule } from 'src/app/my-donations/my-donation.module';

export const COMPONENTS = [DonatorLayoutComponent];
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
    HomeModule,
    DonationModule,
    MyDonationsModule,
    DonatorLayoutRoutingModule,
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class DonatorLayoutModule {}
