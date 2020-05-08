import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { SampleEffects } from '../shared/store/sample/effects';
import * as fromSample from '../shared/store/sample';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EffectsModule.forFeature([SampleEffects]),
    StoreModule.forFeature(fromSample.sampleFeatureKey, fromSample.reducer),
  ],
  providers: [SampleEffects],
})
export class SampleModule {}
