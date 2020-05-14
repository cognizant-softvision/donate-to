import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzButtonModule, NzLayoutModule, NzMenuModule } from 'ng-zorro-antd';
import { NzSpaceModule } from 'ng-zorro-antd/space';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { DonatorLayoutComponent } from './donator-layout.component';
import { ComponentsModule } from 'src/app/shared/components';
import { DonatorLayoutRoutingModule } from './donator-layout-routing.module';
import { HomeModule } from 'src/app/home/home.module';
import { HttpLoaderFactory } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';

export const COMPONENTS = [DonatorLayoutComponent];
@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    NzLayoutModule,
    NzButtonModule,
    NzSpaceModule,
    NzMenuModule,
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
    HomeModule,
    DonatorLayoutRoutingModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class DonatorLayoutModule {}
