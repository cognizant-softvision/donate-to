import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from '../../../../home/home.component';
import { DonatorLayoutComponent } from './donator-layout.component';
import { DonationComponent } from 'src/app/donation/donation.component';

const routes: Routes = [
  {
    path: '',
    component: DonatorLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'donation/:donationRequestId', component: DonationComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DonatorLayoutRoutingModule {}
