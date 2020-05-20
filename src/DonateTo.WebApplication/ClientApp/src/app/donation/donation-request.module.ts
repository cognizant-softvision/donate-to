import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { DonationRequestEffects } from '../shared/store/donation/effects';
import * as fromDonationRequest from '../shared/store/donation';
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
