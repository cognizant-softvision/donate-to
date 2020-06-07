import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private activeRoute: ActivatedRoute, private router: Router, public donationSandbox: DonationsSandbox) {
    this.activeRoute.params.subscribe((param) => {
      this.id = parseInt(param['Id'], 10);
    });
  }

  ngOnInit(): void {
    this.donationSandbox.donationRequest$.subscribe((donationRequest) => {
      this.donationRequest = donationRequest;
    });

    this.donationSandbox.loadDonationRequest(this.id);
  }

  updateDonationRequest(data: any) {
    this.donationSandbox.updateDonationRequest(data);
    this.goBack();
  }

  goBack() {
    this.router.navigateByUrl('/admin/donations');
  }
}
