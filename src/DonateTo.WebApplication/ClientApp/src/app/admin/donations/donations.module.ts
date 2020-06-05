import * as fromAddress from 'src/app/shared/store/address';
import * as fromCategory from 'src/app/shared/store/category';
import * as fromOrganization from 'src/app/shared/store/organization';
import es from '@angular/common/locales/es';
import { AddressEffects } from 'src/app/shared/store/address';
import { CategoryEffects } from 'src/app/shared/store/category';
import { CommonModule, registerLocaleData } from '@angular/common';
import { DonationsComponent } from './donations.component';
import { DonationsCreateComponent } from './donations-create/donations-create.component';
import { DonationsEditComponent } from './donations-edit/donations-edit.component';
import { DonationsRoutingModule } from './donations-routing.module';
import { DonationsSandbox } from './donations-sandbox';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from 'src/app/app.module';
import { IconDefinition } from '@ant-design/icons-angular';
import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { OrganizationEffects } from 'src/app/shared/store/organization';
import { PlusOutline } from '@ant-design/icons-angular/icons';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import {
  NzDatePickerModule,
  NzFormModule,
  NzIconModule,
  NzInputModule,
  NzLayoutModule,
  NzMenuModule,
  NzPopconfirmModule,
  NzRadioModule,
  NzRateModule,
  NzSelectModule,
  NzTableModule,
  NzTagModule,
} from 'ng-zorro-antd';
import { DonationsFormComponent } from './donations-form/donations-form.component';
import { StatusEffects } from 'src/app/shared/store/status';
import { fromStatus } from 'src/app/shared/store';

// FIX this should be moved to an upper level.
registerLocaleData(es);

const ICONS: IconDefinition[] = [PlusOutline];

@NgModule({
  imports: [
    NzIconModule.forChild(ICONS),
    NzLayoutModule,
    NzMenuModule,
    NzRateModule,
    NzPopconfirmModule,
    NzFormModule,
    NzTableModule,
    NzTagModule,
    NzRadioModule,
    NzDatePickerModule,
    NzButtonModule,
    NzSelectModule,
    NzInputModule,
    NzDividerModule,
    NzTableModule,
    EffectsModule.forFeature([OrganizationEffects, AddressEffects, CategoryEffects, StatusEffects]),
    StoreModule.forFeature(fromOrganization.organizationFeatureKey, fromOrganization.reducer),
    StoreModule.forFeature(fromStatus.statusFeatureKey, fromStatus.reducer),
    StoreModule.forFeature(fromAddress.addressFeatureKey, fromAddress.reducer),
    StoreModule.forFeature(fromCategory.categoryFeatureKey, fromCategory.reducer),
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
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
  declarations: [DonationsComponent, DonationsCreateComponent, DonationsEditComponent, DonationsFormComponent],
  providers: [DonationsSandbox],
})
export class DonationsModule {}
