import { Component, ViewChild } from '@angular/core';
import { DonationsSandbox } from '../donations-sandbox';
import { Router } from '@angular/router';
import { DonationsFormComponent } from '../donations-form/donations-form.component';

@Component({
  selector: 'app-donations-create',
  templateUrl: './donations-create.component.html',
  styleUrls: ['./donations-create.component.css'],
})
export class DonationsCreateComponent {
  @ViewChild(DonationsFormComponent)
  private donationsFormComponent: DonationsFormComponent;

  constructor(public donationSandbox: DonationsSandbox, private router: Router) {}

  validateDonationRequestForm() {
    this.donationsFormComponent.validateForm();
  }

  createDonationRequest(data: any) {
    this.donationSandbox.createDonationRequest(data);
    this.goBack();
  }

  goBack() {
    this.router.navigateByUrl('/admin/donations');
  }
}
