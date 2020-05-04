import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NavMenuComponent } from './nav-menu/nav-menu.component';

export const COMPONENTS = [NavMenuComponent];

@NgModule({
  imports: [FormsModule, CommonModule],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class ComponentsModule {}
