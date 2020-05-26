import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { DonationSandbox } from './donation.sandbox';
import { DonationRequestModel } from '../shared/models';

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.css'],
})
export class DonationComponent implements OnInit {
  constructor(protected router: ActivatedRoute, public donationSandbox: DonationSandbox) {
    this.isLoading = true;
  }

  donationRequestId: number;

  isLoading: boolean;

  showDonationConfirm = false;

  donation: DonationRequestModel;

  subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.router.params.subscribe((params: Params) => {
      this.donationRequestId = params['donationRequestId'];
      this.donationSandbox.loadDonationRequest(params['donationRequestId']);
    });

    this.donationSandbox.donationRequest$.subscribe((donationRequest) => {
      this.donation = donationRequest;
    });

    this.donationSandbox.donationRequestLoading$.subscribe((state) => {
      this.isLoading = state;
    });
  }

  showDonationConfirmModal(state: boolean): void {
    this.showDonationConfirm = state;
  }
}
