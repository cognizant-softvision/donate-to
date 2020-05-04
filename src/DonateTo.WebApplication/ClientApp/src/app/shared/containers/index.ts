import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ComponentsModule } from '../components';
import { LayoutContainerComponent } from './layout/layout.container';

export const CONTAINERS = [LayoutContainerComponent];

@NgModule({
  imports: [CommonModule, ComponentsModule],
  declarations: CONTAINERS,
  exports: CONTAINERS,
  providers: [],
})
export class ContainersModule {}
