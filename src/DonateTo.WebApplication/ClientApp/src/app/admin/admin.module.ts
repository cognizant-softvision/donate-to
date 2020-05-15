import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzLayoutModule, NzMenuModule } from 'ng-zorro-antd';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from 'src/app/shared/components';
import { AdminRoutingModule } from './admin-rounting.module';
import { AdminComponent } from './admin.component';
import { DonationComponent } from './donation/donation.component';
import { UserComponent } from './user/user.component';
import { OrganizationComponent } from './organization/organization.component';

@NgModule({
  imports: [AdminRoutingModule, CommonModule, NzLayoutModule, NzMenuModule, TranslateModule, ComponentsModule],
  declarations: [AdminComponent, DonationComponent, UserComponent, OrganizationComponent],
})
export class AdminModule {}
