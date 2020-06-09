import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { DonationRequestEffects } from '../shared/store/donation/effects';
import * as fromDonationRequest from '../shared/store/donation';
import * as fromAddress from '../shared/store/address';
import { StoreModule } from '@ngrx/store';
import { AddressEffects } from '../shared/store/address';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EffectsModule.forFeature([DonationRequestEffects, AddressEffects]),
    StoreModule.forFeature(fromDonationRequest.donationRequestFeatureKey, fromDonationRequest.reducer),
    StoreModule.forFeature(fromAddress.addressFeatureKey, fromAddress.reducer),
  ],
  providers: [DonationRequestEffects],
})
export class DonationRequestModule {}
