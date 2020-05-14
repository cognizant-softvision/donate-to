import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { ComponentsModule } from '../components';

import { TranslateModule } from '@ngx-translate/core';
import { DonatorLayoutModule } from './layout/donator-layout/donator-layout.module';


@NgModule({
  imports: [CommonModule, ComponentsModule, FormsModule, TranslateModule, DonatorLayoutModule],
  exports: [DonatorLayoutModule]
})
export class ContainersModule {}
