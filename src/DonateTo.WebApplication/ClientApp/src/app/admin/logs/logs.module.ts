import es from '@angular/common/locales/es';
import { CommonModule, registerLocaleData } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule } from '@angular/forms';
import { fromLog } from '../../shared/store';
import { HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../../app.module';
import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { LogsComponent } from './logs.component';
import { LogEffects } from '../../shared/store/log/effects';
import { LogsRoutingModule } from './logs-routing.module';
import { LogsSandbox } from './logs-sandbox';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
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
import { MinusCircleOutline, PlusOutline } from '@ant-design/icons-angular/icons';
import { LogsDetailModalComponent } from './logs-detail-modal/logs-detail-modal.component';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';

// FIX this should be moved to an upper level.
registerLocaleData(es);

const ICONS = [MinusCircleOutline, PlusOutline];

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
    NzDropDownModule,
    NzButtonModule,
    NzSelectModule,
    NzInputModule,
    NzDividerModule,
    NzTableModule,
    NzDescriptionsModule,
    EffectsModule.forFeature([LogEffects]),
    StoreModule.forFeature(fromLog.logFeatureKey, fromLog.reducer),
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    LogsRoutingModule,
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
  declarations: [LogsComponent, LogsDetailModalComponent],
  providers: [LogsSandbox],
})
export class LogModule {}
