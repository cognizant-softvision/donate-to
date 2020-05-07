import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthEffects, AuthReducer } from '../shared/store/auth';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  imports: [CommonModule, StoreModule.forFeature('auth', AuthReducer), EffectsModule.forFeature([AuthEffects])],
  declarations: [],
  providers: [AuthEffects],
})
export class AuthModule {}
