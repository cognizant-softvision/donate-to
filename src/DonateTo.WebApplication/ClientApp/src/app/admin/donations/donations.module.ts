import { QuestionEffects } from './../../shared/store/question/effects';
import * as fromAddress from 'src/app/shared/store/address';
import * as fromCategory from 'src/app/shared/store/category';
import * as fromOrganization from 'src/app/shared/store/organization';
import es from '@angular/common/locales/es';
import { AddressEffects } from 'src/app/shared/store/address';
import { CategoryEffects } from 'src/app/shared/store/category';
import { CommonModule, registerLocaleData } from '@angular/common';
import { DonationsComponent } from './donations.component';
import { DonationsCreateComponent } from './donations-create/donations-create.component';
import { DonationPriorityComponent } from './donations-priority/donations-priority.component';
import { DonationsEditComponent } from './donations-edit/donations-edit.component';
import { DonationsFormComponent } from './donations-form/donations-form.component';
import { DonationsRoutingModule } from './donations-routing.module';
import { DonationsSandbox } from './donations-sandbox';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule } from '@angular/forms';
import { fromQuestion, fromStatus, fromUnit } from 'src/app/shared/store';
import { HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from 'src/app/app.module';
import { IconDefinition } from '@ant-design/icons-angular';
import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { OrganizationEffects } from 'src/app/shared/store/organization';
import { ReactiveFormsModule } from '@angular/forms';
import { StatusEffects } from 'src/app/shared/store/status';
import { StoreModule } from '@ngrx/store';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { UnitEffects } from 'src/app/shared/store/unit';
import {
  NzDatePickerModule,
  NzDropDownModule,
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
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { DeleteOutline, EditOutline, PlusOutline } from '@ant-design/icons-angular/icons';
import { DonationsDetailComponent } from './donations-detail/donations-detail.component';
import { DataUpdatedService } from 'src/app/shared/async-services/data-updated.service';
import { QuestionsSandbox } from '../questions/questions-sandbox';

// FIX this should be moved to an upper level.
registerLocaleData(es);

const ICONS: IconDefinition[] = [PlusOutline, EditOutline, DeleteOutline];

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
    NzDropDownModule,
    NzTableModule,
    NzToolTipModule,

    EffectsModule.forFeature([
      OrganizationEffects,
      AddressEffects,
      UnitEffects,
      CategoryEffects,
      StatusEffects,
      QuestionEffects,
    ]),
    StoreModule.forFeature(fromOrganization.organizationFeatureKey, fromOrganization.reducer),
    StoreModule.forFeature(fromStatus.statusFeatureKey, fromStatus.reducer),
    StoreModule.forFeature(fromAddress.addressFeatureKey, fromAddress.reducer),
    StoreModule.forFeature(fromCategory.categoryFeatureKey, fromCategory.reducer),
    StoreModule.forFeature(fromUnit.unitFeatureKey, fromUnit.reducer),
    StoreModule.forFeature(fromQuestion.questionFeatureKey, fromQuestion.reducer),
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
  declarations: [
    DonationsComponent,
    DonationsCreateComponent,
    DonationsEditComponent,
    DonationsFormComponent,
    DonationPriorityComponent,
    DonationsDetailComponent,
  ],
  providers: [DonationsSandbox, DataUpdatedService, QuestionsSandbox],
})
export class DonationsModule {}
