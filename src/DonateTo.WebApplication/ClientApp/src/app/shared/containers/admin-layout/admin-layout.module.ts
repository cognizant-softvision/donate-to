import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconDefinition } from '@ant-design/icons-angular';

import { HeartOutline, ProfileOutline, TeamOutline } from '@ant-design/icons-angular/icons';

import { NzIconModule, NzLayoutModule, NzMenuModule } from 'ng-zorro-antd';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTableModule } from 'ng-zorro-antd/table';

import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from 'src/app/shared/components';
import { AdminLayoutRoutingModule } from './admin-layout-rounting.module';
import { AdminLayoutComponent } from './admin-layout.component';
import { DonationComponent } from '../../../admin/donation/donation.component';
import { UserComponent } from '../../../admin/user/user.component';
import { OrganizationComponent } from '../../../admin/organization/organization.component';

const ICONS: IconDefinition[] = [HeartOutline, TeamOutline, ProfileOutline];

@NgModule({
  imports: [
    NzIconModule.forChild(ICONS),
    AdminLayoutRoutingModule,
    CommonModule,
    NzLayoutModule,
    NzMenuModule,
    TranslateModule,
    ComponentsModule,
    NzButtonModule,
    NzDividerModule,
    NzTableModule,
  ],
  declarations: [AdminLayoutComponent, DonationComponent, UserComponent, OrganizationComponent],
})
export class AdminLayoutModule {}
