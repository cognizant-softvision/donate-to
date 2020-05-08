import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthEffects } from '../shared/store/auth';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { fromAuth } from '../shared/store';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EffectsModule.forFeature([AuthEffects]),
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.reducer),
  ],
  providers: [AuthEffects],
})
export class AuthModule {}
