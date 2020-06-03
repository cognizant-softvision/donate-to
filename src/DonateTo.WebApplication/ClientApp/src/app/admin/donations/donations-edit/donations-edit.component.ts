import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DonationRequestModel } from 'src/app/shared/models';
import { DonationsSandbox } from '../donations-sandbox';

@Component({
  selector: 'app-donations-edit',
  templateUrl: './donations-edit.component.html',
  styleUrls: ['./donations-edit.component.css'],
})
export class DonationsEditComponent implements OnInit {
  donationRequest: DonationRequestModel;
  id: any;
  donationRequestInput: DonationRequestModel;

  constructor(private route: ActivatedRoute, public donationSandbox: DonationsSandbox) {}

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.id = param['Id'];
    });
  }

  updateDonationRequest() {
    // this.validateFormGroup(this.donationRequestFormGroup);
    console.log(this.donationRequest);
    // this.router.navigate(['admin/donations']);
  }
}
