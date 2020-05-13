import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { ComponentsModule } from '../components';
import { LayoutContainerComponent } from './layout/layout.container';
import { LayoutSandbox } from './layout/layout.sandbox';
import { NzLayoutModule, NzMenuModule } from 'ng-zorro-antd';
import { NavMenuSandBox } from '../components/nav-menu/nav-menu.sandbox';

import { TranslateModule } from '@ngx-translate/core';

export const CONTAINERS = [LayoutContainerComponent];

@NgModule({
  imports: [CommonModule, ComponentsModule, FormsModule, NzLayoutModule, NzMenuModule, TranslateModule],
  declarations: CONTAINERS,
  exports: CONTAINERS,
  providers: [LayoutSandbox, NavMenuSandBox],
})
export class ContainersModule {}
