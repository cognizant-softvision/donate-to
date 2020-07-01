import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DonationLayoutComponent } from './donation-layout.component';
import { DonationComponent } from 'src/app/donation/donation.component';
import { MyDonationsComponent } from 'src/app/my-donations/my-donation.component';

const routes: Routes = [
  {
    path: '',
    component: DonationLayoutComponent,
    children: [
      { path: 'detail/:donationId', component: DonationComponent },
      { path: 'my-donations', component: MyDonationsComponent },
      { path: ':donationRequestId', component: DonationComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DonationLayoutRoutingModule {}
