import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DonationLayoutComponent } from './donation-layout.component';
import { DonationComponent } from 'src/app/donation/donation.component';

const routes: Routes = [
  {
    path: 'donation',
    component: DonationLayoutComponent,
    children: [{ path: 'donation/:donationRequestId', component: DonationComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DonatorLayoutRoutingModule {}
