import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzFormModule, NzInputModule, NzLayoutModule, NzMenuModule, NzTableModule } from 'ng-zorro-antd';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import { DonationsComponent } from './donations.component';
import { DonationsCreateComponent } from './donations-create/donations-create.component';
import { DonationsEditComponent } from './donations-edit/donations-edit.component';
import { DonationsRoutingModule } from './donations-routing.module';

@NgModule({
  imports: [
    NzLayoutModule,
    NzMenuModule,
    NzFormModule,
    NzButtonModule,
    NzInputModule,
    NzDividerModule,
    NzTableModule,
    CommonModule,
    DonationsRoutingModule,
    TranslateModule.forChild({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      extend: true,
    }),
  ],
  declarations: [DonationsComponent, DonationsCreateComponent, DonationsEditComponent],
})
export class DonationsModule {}
