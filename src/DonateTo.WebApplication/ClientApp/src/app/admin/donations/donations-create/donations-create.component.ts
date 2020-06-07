import { Component } from '@angular/core';
import { DonationsSandbox } from '../donations-sandbox';
import { Router } from '@angular/router';

@Component({
  selector: 'app-donations-create',
  templateUrl: './donations-create.component.html',
  styleUrls: ['./donations-create.component.css'],
})
export class DonationsCreateComponent {
  constructor(public donationSandbox: DonationsSandbox, private router: Router) {}
  createDonationRequest(data: any) {
    this.donationSandbox.createDonationRequest(data);
    this.goBack();
  }

  goBack() {
    this.router.navigateByUrl('/admin/donations');
  }
}
