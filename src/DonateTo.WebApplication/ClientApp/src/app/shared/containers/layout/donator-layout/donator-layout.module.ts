import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzButtonModule, NzLayoutModule, NzMenuModule } from 'ng-zorro-antd';
import { NzSpaceModule } from 'ng-zorro-antd/space';

import { TranslateModule } from '@ngx-translate/core';
import { DonatorLayoutComponent } from './donator-layout.component';
import { ComponentsModule } from 'src/app/shared/components';
import { DonatorLayoutRoutingModule } from './donator-layout-routing.module';
import { HomeModule } from 'src/app/home/home.module';

export const COMPONENTS = [DonatorLayoutComponent];
@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    NzLayoutModule,
    NzButtonModule,
    NzSpaceModule,
    NzMenuModule,
    TranslateModule,
    ComponentsModule,
    HomeModule,
    DonatorLayoutRoutingModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class DonatorLayoutModule {}
