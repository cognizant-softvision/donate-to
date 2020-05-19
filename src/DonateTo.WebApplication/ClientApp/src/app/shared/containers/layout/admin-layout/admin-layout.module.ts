import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconDefinition } from '@ant-design/icons-angular';

import { HeartOutline, ProfileOutline, TeamOutline } from '@ant-design/icons-angular/icons';

import { NzIconModule, NzLayoutModule, NzMenuModule } from 'ng-zorro-antd';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTableModule } from 'ng-zorro-antd/table';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from 'src/app/shared/components';
import { AdminLayoutComponent } from './admin-layout.component';
import { AdminLayoutRoutingModule } from './admin-layout-routing.module';
import { DonationComponent } from '../../../../admin/donation/donation.component';
import { UserComponent } from '../../../../admin/user/user.component';
import { OrganizationComponent } from '../../../../admin/organization/organization.component';
import { HttpLoaderFactory } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';

const ICONS: IconDefinition[] = [HeartOutline, TeamOutline, ProfileOutline];

@NgModule({
  imports: [
    NzIconModule.forChild(ICONS),
    NzLayoutModule,
    NzMenuModule,
    NzButtonModule,
    NzDividerModule,
    NzTableModule,
    AdminLayoutRoutingModule,
    CommonModule,
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
  ],
  declarations: [AdminLayoutComponent, DonationComponent, UserComponent, OrganizationComponent],
})
export class AdminLayoutModule {}
