import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavMenuComponent } from './nav-menu/nav-menu.component';

import { NzButtonModule, NzLayoutModule, NzMenuModule, NzRadioModule } from 'ng-zorro-antd';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

import { TranslateModule } from '@ngx-translate/core';
import { NavMenuSandBox } from './nav-menu/nav-menu.sandbox';
import { RouterModule } from '@angular/router';

export const COMPONENTS = [NavMenuComponent];
@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    NzLayoutModule,
    NzButtonModule,
    NzSpaceModule,
    NzMenuModule,
    TranslateModule,
    RouterModule,
    NzRadioModule,
    NzDropDownModule,
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
  providers: [NavMenuSandBox],
})
export class ComponentsModule {}
