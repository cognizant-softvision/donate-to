import { AuthEffects } from '../store/auth';
import { AuthSandbox } from './auth.sandbox';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { fromAuth } from '../store';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { AuthGuard } from '../guards/auth.guard';
import { AuthSuperAdminGuard } from '../guards/auth-superadmin.guard';
import { AuthAdminGuard } from '../guards/auth-admin.guard';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EffectsModule.forFeature([AuthEffects]),
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.reducer),
  ],
  providers: [AuthSandbox, AuthEffects, AuthGuard, AuthAdminGuard, AuthSuperAdminGuard],
})
export class AuthModule {}
