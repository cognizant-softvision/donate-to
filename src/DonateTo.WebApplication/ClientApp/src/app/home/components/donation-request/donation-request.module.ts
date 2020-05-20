import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { DonationRequestEffects } from '../../../shared/store/donation-request/effects';
import * as fromDonationRequest from 'src/app/shared/store/donation-request';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EffectsModule.forFeature([DonationRequestEffects]),
    StoreModule.forFeature(fromDonationRequest.donationRequestFeatureKey, fromDonationRequest.reducer),
  ],
  providers: [DonationRequestEffects],
})
export class DonationRequestModule {}
