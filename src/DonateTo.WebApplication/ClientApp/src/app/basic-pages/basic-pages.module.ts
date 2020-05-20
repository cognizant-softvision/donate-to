import { NgModule } from '@angular/core';
import { IconDefinition } from '@ant-design/icons-angular';

import { FrownOutline } from '@ant-design/icons-angular/icons';

import { NzButtonModule, NzIconModule, NzLayoutModule } from 'ng-zorro-antd';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { NotFoundComponent } from './not-found/not-found.component';
import { BasicPagesRoutingModule } from './basic-pages-routing.module';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

const ICONS: IconDefinition[] = [FrownOutline];

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '../../../i18n/', '.json');
}

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
