import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { DonationSandbox } from './donation.sandbox';
import { DonationRequestModel } from '../shared/models';

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.css'],
})
export class DonationComponent implements OnInit, OnDestroy {
  constructor(protected router: ActivatedRoute, public donationSandbox: DonationSandbox) {}

  donationRequestId: number;

  showDonationConfirm = false;

  subscriptions: Subscription[] = [];

  donation: DonationRequestModel;

  ngOnInit(): void {
    this.registerEvents();
  }

  ngOnDestroy(): void {
    this.unregisterEvents();
  }

  /**
   * Unsubscribes from events
   */
  unregisterEvents() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  /**
   * Subscribes to events
   */
  registerEvents(): void {
    this.subscriptions.push(
      this.router.params.subscribe((params: Params) => {
        this.donationRequestId = params['donationRequestId'];
        this.donationSandbox.loadDonationRequest(params['donationRequestId']);
      })
    );

    this.subscriptions.push(
      this.donationSandbox.donationRequest$.subscribe((donationRequest) => {
        this.donation = donationRequest;
      })
    );
  }

  showDonationConfirmModal(state: boolean): void {
    this.showDonationConfirm = state;
  }
}
