import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { SampleEffects } from '../shared/store/sample/effects';
import { SampleReducer } from '../shared/store/sample/reducer';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [],
  imports: [CommonModule, StoreModule.forFeature('sample', SampleReducer), EffectsModule.forFeature([SampleEffects])],
  providers: [SampleEffects],
})
export class SampleModule {}
