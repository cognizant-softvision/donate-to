import * as fromAddress from 'src/app/shared/store/address';
import * as fromCategory from 'src/app/shared/store/category';
import * as fromOrganization from 'src/app/shared/store/organization';
import es from '@angular/common/locales/es';
import { AddressEffects } from 'src/app/shared/store/address';
import { CategoryEffects } from 'src/app/shared/store/category';
import { CommonModule, registerLocaleData } from '@angular/common';
import { QuestionsComponent } from './questions.component';
import { QuestionsRoutingModule } from './questions-routing.module';
import { QuestionsSandbox } from './questions-sandbox';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule } from '@angular/forms';
import { fromStatus, fromUnit } from 'src/app/shared/store';
import { HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from 'src/app/app.module';
import { IconDefinition } from '@ant-design/icons-angular';
import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { OrganizationEffects } from 'src/app/shared/store/organization';
import { PlusOutline } from '@ant-design/icons-angular/icons';
import { ReactiveFormsModule } from '@angular/forms';
import { StatusEffects } from 'src/app/shared/store/status';
import { StoreModule } from '@ngrx/store';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { UnitEffects } from 'src/app/shared/store/unit';
import {
  NzDatePickerModule,
  NzEmptyModule,
  NzFormModule,
  NzIconModule,
  NzInputModule,
  NzLayoutModule,
  NzMenuModule,
  NzModalModule,
  NzPopconfirmModule,
  NzRadioModule,
  NzRateModule,
  NzSelectModule,
  NzTableModule,
  NzTagModule,
} from 'ng-zorro-antd';

// FIX this should be moved to an upper level.
registerLocaleData(es);

const ICONS: IconDefinition[] = [PlusOutline];

@NgModule({
  imports: [
    NzIconModule.forChild(ICONS),
    NzLayoutModule,
    NzMenuModule,
    NzModalModule,
    NzRateModule,
    NzPopconfirmModule,
    NzEmptyModule,
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
    EffectsModule.forFeature([OrganizationEffects, AddressEffects, UnitEffects, CategoryEffects, StatusEffects]),
    StoreModule.forFeature(fromOrganization.organizationFeatureKey, fromOrganization.reducer),
    StoreModule.forFeature(fromStatus.statusFeatureKey, fromStatus.reducer),
    StoreModule.forFeature(fromAddress.addressFeatureKey, fromAddress.reducer),
    StoreModule.forFeature(fromCategory.categoryFeatureKey, fromCategory.reducer),
    StoreModule.forFeature(fromUnit.unitFeatureKey, fromUnit.reducer),
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    QuestionsRoutingModule,
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
  declarations: [QuestionsComponent],
  providers: [QuestionsSandbox],
})
export class DonationsModule {}
