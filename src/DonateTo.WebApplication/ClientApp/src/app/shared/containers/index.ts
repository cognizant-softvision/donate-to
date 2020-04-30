import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsModule } from '../components';
import { LayoutContainer } from './layout/layout.container';

export const CONTAINERS = [
    LayoutContainer
];

@NgModule({
  imports: [
      CommonModule,
      ComponentsModule
  ],
  declarations: CONTAINERS,
  exports: CONTAINERS,
  providers: []
})
export class ContainersModule { }
