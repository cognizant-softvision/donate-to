import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavMenuComponent } from './nav-menu/nav-menu.component';


import { NzButtonModule, NzLayoutModule, NzMenuModule } from 'ng-zorro-antd';
import { NzSpaceModule } from 'ng-zorro-antd/space';

import { TranslateModule } from '@ngx-translate/core';
import { NavMenuSandBox } from './nav-menu/nav-menu.sandbox';

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
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
  providers: [NavMenuSandBox]
})
export class ComponentsModule {}
