import { NgModule } from '@angular/core';
import { IconDefinition } from '@ant-design/icons-angular';
import {
  NzButtonModule,
  NzDatePickerModule,
  NzDividerModule,
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
  NzSpinModule,
  NzTableModule,
  NzTagModule,
} from 'ng-zorro-antd';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OrganizationCreateComponent } from './organization-create/organization-create.component';
import { OrganizationSandbox } from './organization-sandbox';
import { OrganizationComponent } from './organization.component';
import { OrganizationEditComponent } from './organization-edit/organization-edit.component';
import { OrganizationFormComponent } from './organization-form/organization-form.component';
import { OrganizationRoutingModule } from './organization-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { OrganizationEffects } from 'src/app/shared/store/organization';
import { AddressEffects } from 'src/app/shared/store/address';
import { fromAddress, fromOrganization } from 'src/app/shared/store';
import { DataUpdatedService } from 'src/app/shared/async-services/data-updated.service';
import {
  ArrowLeftOutline,
  DeleteOutline,
  EditOutline,
  HomeOutline,
  InfoCircleOutline,
  PlusOutline,
  SmileOutline,
  UserOutline,
} from '@ant-design/icons-angular/icons';
import { OrganizationStepGeneralInformationComponent } from './organization-form/organization-step-general-information/organization-step-general-information.component';
import { OrganizationStepContactComponent } from './organization-form/organization-step-contact/organization-step-contact.component';
import { OrganizationStepAddressComponent } from './organization-form/organization-step-address/organization-step-address.component';
import { OrganizationDetailComponent } from './organization-detail/organization-detail.component';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { AddressListComponent } from './organization-form/organization-step-address/address-list/address-list.component';
import { StepBranchAddressComponent } from './organization-form/organization-step-address/branch-modal/step-branch-address/step-branch-address.component';
import { BranchModalComponent } from './organization-form/organization-step-address/branch-modal/branch-modal.component';

const ICONS: IconDefinition[] = [
  ArrowLeftOutline,
  HomeOutline,
  InfoCircleOutline,
  UserOutline,
  SmileOutline,
  DeleteOutline,
  EditOutline,
  PlusOutline,
];

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
    NzSpinModule,
    NzButtonModule,
    NzSelectModule,
    NzInputModule,
    NzDividerModule,
    NzStepsModule,
    NzDatePickerModule,
    NzDropDownModule,
    NzPageHeaderModule,
    NzDescriptionsModule,
    NzToolTipModule,
    NzTabsModule,

    FormsModule,
    CommonModule,
    ReactiveFormsModule,

    TranslateModule.forChild({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      extend: true,
    }),
    OrganizationRoutingModule,

    EffectsModule.forFeature([OrganizationEffects, AddressEffects]),
    StoreModule.forFeature(fromOrganization.organizationFeatureKey, fromOrganization.reducer),
    StoreModule.forFeature(fromAddress.addressFeatureKey, fromAddress.reducer),
  ],
  declarations: [
    OrganizationComponent,
    OrganizationCreateComponent,
    OrganizationEditComponent,
    OrganizationFormComponent,
    OrganizationStepGeneralInformationComponent,
    OrganizationStepContactComponent,
    OrganizationStepAddressComponent,
    OrganizationDetailComponent,
    AddressListComponent,
    StepBranchAddressComponent,
    BranchModalComponent,
  ],
  providers: [OrganizationSandbox, DataUpdatedService],
})
export class OrganizationModule {}
