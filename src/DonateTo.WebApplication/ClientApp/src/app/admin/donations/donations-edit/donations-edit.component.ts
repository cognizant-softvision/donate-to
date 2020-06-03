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
  id: number;
  constructor(private route: ActivatedRoute, public donationSandbox: DonationsSandbox) {}

  ngOnInit(): void {
    // this.route.params.subscribe((param) => {
    // this.id = parseInt(param['Id']);
    // });
    // this.donationSandbox.loadedDonationRequests$.subscribe((donationsRequests) => {
    // if (donationsRequests.length != 0) {
    // this.donationRequest = donationsRequests.find((dr) => dr.id === this.id);
    // }
    // });
  }

  updateDonationRequest() {
    console.log(this.donationRequest);
  }
}
