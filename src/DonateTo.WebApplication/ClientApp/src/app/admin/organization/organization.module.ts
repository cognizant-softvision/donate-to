import es from '@angular/common/locales/es';
import { CommonModule, registerLocaleData } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule } from '@angular/forms';
import { fromOrganization } from '../../shared/store';
import { HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../../app.module';
import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { OrganizationComponent } from './organization.component';
import { OrganizationEffects } from '../../shared/store/organization/effects';
import { OrganizationRoutingModule } from './organization-routing.module';
import { OrganizationSandbox } from './organization-sandbox';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import {
  NzDropDownModule,
  NzEmptyModule,
  NzFormModule,
  NzInputModule,
  NzLayoutModule,
  NzMenuModule,
  NzModalModule,
  NzPopconfirmModule,
  NzRadioModule,
  NzSelectModule,
  NzTableModule,
  NzTagModule,
} from 'ng-zorro-antd';

// FIX this should be moved to an upper level.
registerLocaleData(es);

@NgModule({
  imports: [
    NzLayoutModule,
    NzMenuModule,
    NzModalModule,
    NzPopconfirmModule,
    NzEmptyModule,
    NzFormModule,
    NzTableModule,
    NzTagModule,
    NzRadioModule,
    NzDropDownModule,
    NzButtonModule,
    NzSelectModule,
    NzInputModule,
    NzDividerModule,
    EffectsModule.forFeature([OrganizationEffects]),
    StoreModule.forFeature(fromOrganization.organizationFeatureKey, fromOrganization.reducer),
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    OrganizationRoutingModule,
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
  declarations: [OrganizationComponent],
  providers: [OrganizationSandbox],
})
export class OrganizationModule {}
