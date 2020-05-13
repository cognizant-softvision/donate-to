import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DonatorLayoutComponent } from './layout/donator/donator-layout.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';

// Routes
import { AppRoutingModule } from '../../app-routing.module';
import { RouterModule } from '@angular/router';

import { NzButtonModule, NzLayoutModule, NzMenuModule } from 'ng-zorro-antd';
import { NzSpaceModule } from 'ng-zorro-antd/space';

import { TranslateModule } from '@ngx-translate/core';

export const COMPONENTS = [NavMenuComponent, DonatorLayoutComponent];
@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    NzLayoutModule,
    NzButtonModule,
    NzSpaceModule,
    NzMenuModule,
    AppRoutingModule,
    RouterModule,
    TranslateModule,
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class ComponentsModule {}
