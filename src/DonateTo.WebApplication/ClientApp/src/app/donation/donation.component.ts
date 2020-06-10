import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { DonationSandbox } from './donation.sandbox';
import { DonationRequestModel } from '../shared/models';
import { DonationListComponent } from './components/donation/list/donation-list.component';
import { DonationItemModel } from '../shared/models/donation-item.model';
import { DonationConfirmComponent } from './components/donation-confirm/donation-confirm.component';

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.css'],
})
export class DonationComponent implements OnInit, OnDestroy {
  constructor(protected router: ActivatedRoute, public donationSandbox: DonationSandbox, protected route: Router) {}

  donationRequestId: number;

  showDonationConfirm = false;

  subscriptions: Subscription[] = [];

  donation: DonationRequestModel;

  @ViewChild(DonationListComponent)
  private donationListComponent: DonationListComponent;

  @ViewChild(DonationConfirmComponent)
  private donationConfirmComponent: DonationConfirmComponent;

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

    this.subscriptions.push(
      this.donationSandbox.newDonationLoading$.subscribe((value) => {
        if (!value && this.donationConfirmComponent?.isSubmited) {
          this.showDonationConfirm = false;
          this.route.navigate(['']);
        }
      })
    );
  }

  showDonationConfirmModal(state: boolean): void {
    this.donationConfirmComponent.donationItems = this.donationListComponent.editCache
      .filter((item) => item.quantityToDonate > 0)
      .map((item) => {
        const donationItem: DonationItemModel = new DonationItemModel();
        donationItem.donationRequestItemId = item.item.id;
        donationItem.donationRequestItem = JSON.parse(JSON.stringify(item.item));
        donationItem.unitId = item.item.unitId;
        donationItem.quantity = item.quantityToDonate;
        return donationItem;
      });
    this.showDonationConfirm = state;
  }
}
