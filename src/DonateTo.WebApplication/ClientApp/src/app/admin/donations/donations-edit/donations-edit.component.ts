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
  constructor(private route: ActivatedRoute, public donationSandbox: DonationsSandbox) {
    this.route.params.subscribe((param) => {
      this.id = parseInt(param['Id'], 10);
    });
  }

  ngOnInit(): void {
    this.donationSandbox.donationRequest$.subscribe((donationRequest) => {
      this.donationRequest = donationRequest;
    });

    this.donationSandbox.loadDonationRequest(this.id);
  }

  updateDonationRequest() {}
  goBack() {}
}
