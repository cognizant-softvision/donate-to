import { QuestionEffects } from '../../shared/store/question/effects';
import { HttpLoaderFactory } from '../../app.module';
import { QuestionsCreateComponent } from './question-create/questions-create.component';
import es from '@angular/common/locales/es';
import { CommonModule, registerLocaleData } from '@angular/common';
import { QuestionsComponent } from './questions.component';
import { QuestionsRoutingModule } from './questions-routing.module';
import { QuestionsSandbox } from './questions-sandbox';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { IconDefinition } from '@ant-design/icons-angular';
import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
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
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { fromQuestion } from '../../shared/store';
import { MinusCircleOutline, PlusOutline } from '@ant-design/icons-angular/icons';

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
    NzCheckboxModule,
    EffectsModule.forFeature([QuestionEffects]),
    StoreModule.forFeature(fromQuestion.questionFeatureKey, fromQuestion.reducer),
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
  declarations: [QuestionsComponent, QuestionsCreateComponent],
  providers: [QuestionsSandbox],
})
export class QuestionsModule {}
