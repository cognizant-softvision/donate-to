import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzIconModule, NzLayoutModule, NzMenuModule } from 'ng-zorro-antd';

import { TranslateModule } from '@ngx-translate/core';
import { AdminLayoutComponent } from './admin-layout.component';
import { ComponentsModule } from 'src/app/shared/components';
import { AdminLayoutRoutingModule } from './admin-layout-rounting.module';
import { AdminModule } from 'src/app/admin/admin.module';

export const COMPONENTS = [AdminLayoutComponent];
@NgModule({
  imports: [
    AdminModule,
    AdminLayoutRoutingModule,
    CommonModule,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    TranslateModule,
    ComponentsModule,
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class AdminLayoutModule {}
