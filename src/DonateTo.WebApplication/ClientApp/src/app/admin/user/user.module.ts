import * as fromUser from 'src/app/shared/store/user';
import es from '@angular/common/locales/es';
import { CommonModule, registerLocaleData } from '@angular/common';
import { UserSandbox } from './user.sandbox';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from 'src/app/app.module';
import { IconDefinition } from '@ant-design/icons-angular';
import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { UserEffects } from 'src/app/shared/store/user';
import { PlusOutline } from '@ant-design/icons-angular/icons';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
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
  NzSpinModule,
  NzTableModule,
  NzTagModule,
} from 'ng-zorro-antd';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { PopupModalComponent } from './components/popup-modal/popup-modal.component';
import { OrganizationSandbox } from '../organization/organization-sandbox';
import { AuthSandbox } from '../../shared/auth/auth.sandbox';

// FIX this should be moved to an upper level.
registerLocaleData(es);

const ICONS: IconDefinition[] = [PlusOutline];

@NgModule({
  imports: [
    NzIconModule.forChild(ICONS),
    NzLayoutModule,
    NzEmptyModule,
    NzMenuModule,
    NzModalModule,
    NzRateModule,
    NzModalModule,
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
    NzSpinModule,
    NzDropDownModule,
    EffectsModule.forFeature([UserEffects]),
    StoreModule.forFeature(fromUser.userFeatureKey, fromUser.reducer),
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    UserRoutingModule,
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
  declarations: [UserComponent, PopupModalComponent],
  providers: [UserSandbox, OrganizationSandbox, AuthSandbox],
})
export class UserModule {}
