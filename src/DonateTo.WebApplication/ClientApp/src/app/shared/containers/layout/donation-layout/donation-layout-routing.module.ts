import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DonationLayoutComponent } from './donation-layout.component';
import { DonationComponent } from 'src/app/donation/donation.component';

const routes: Routes = [
  {
    path: '',
    component: DonationLayoutComponent,
    children: [{ path: ':donationRequestId', component: DonationComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DonationLayoutRoutingModule {}
