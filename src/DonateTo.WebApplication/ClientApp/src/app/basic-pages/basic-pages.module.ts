import { NgModule } from '@angular/core';
import { IconDefinition } from '@ant-design/icons-angular';

import { FrownOutline } from '@ant-design/icons-angular/icons';

import { NzButtonModule, NzIconModule, NzLayoutModule } from 'ng-zorro-antd';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import { NotFoundComponent } from './not-found/not-found.component';
import { BasicPagesRoutingModule } from './basic-pages-routing.module';

const ICONS: IconDefinition[] = [FrownOutline];

@NgModule({
  imports: [
    NzIconModule.forChild(ICONS),
    NzLayoutModule,
    NzButtonModule,
    BasicPagesRoutingModule,
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
  declarations: [NotFoundComponent],
})
export class BasicPagesModule {}
