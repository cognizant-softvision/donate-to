import { Component } from '@angular/core';
import { DonationsSandbox } from '../donations-sandbox';
import { DonationRequestModel } from 'src/app/shared/models';

@Component({
  selector: 'app-donations-create',
  templateUrl: './donations-create.component.html',
  styleUrls: ['./donations-create.component.css'],
})
export class DonationsCreateComponent {
  donationRequest: DonationRequestModel;

  constructor(public donationSandbox: DonationsSandbox) {}

  createDonationRequest() {
    // this.validateFormGroup(this.donationRequestFormGroup);
    console.log(this.donationRequest);
    // this.router.navigate(['admin/donations']);
  }
}
