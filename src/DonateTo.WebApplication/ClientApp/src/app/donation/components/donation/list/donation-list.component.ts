import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { DonationRequestItemModel, DonationRequestModel } from 'src/app/shared/models';
import { DonationSandbox } from 'src/app/donation/donation.sandbox';
import { NotificationsService } from 'src/app/shared/notifications/notifications.service';
import { Subscription } from 'rxjs';
import { DonationModel } from 'src/app/shared/models/donation.model';
import { DonationItemModel } from 'src/app/shared/models/donation-item.model';

@Component({
  selector: 'app-donation-list',
  templateUrl: './donation-list.component.html',
  styleUrls: ['./donation-list.component.css'],
})
export class DonationListComponent implements OnInit, OnDestroy {
  constructor(public donationSandbox: DonationSandbox, private notifiactionsService: NotificationsService) {}

  @Input() donationRequest: DonationRequestModel;

  @Output() showDonationConfirmModal = new EventEmitter();
  @Input() donation: DonationModel = new DonationModel();
  @Input() isEdit: boolean;

  subscriptions: Subscription[] = [];

  editCache: Array<{ edit: boolean; id: number; item: DonationRequestItemModel; quantityToDonate: number }> = [];

  updateEditCache(): void {
    this.donationRequest.donationRequestItems?.forEach((item) => {
      let quantityToDonate = 0;
      if (this.isEdit) {
        const existingDonationItem = this.donation.donationItems.find((di) => di.donationRequestItemId === item.id);
        quantityToDonate = !!existingDonationItem ? existingDonationItem.quantity : 0;
      }
      this.editCache.push({
        edit: false,
        id: item.id,
        item,
        quantityToDonate,
      });
    });
  }

  ngOnInit(): void {
    this.registerEvents();
    if (this.isEdit) {
      this.updateEditCache();
    }
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
      this.donationSandbox.donationRequest$.subscribe((donationRequest) => {
        if (!this.isEdit) {
          this.donationRequest = donationRequest;
          if (donationRequest) {
            this.updateEditCache();
          }
        }
      })
    );
  }

  startEdit(id: number): void {
    const donationItemCache = this.editCache.find((item) => item.id === id);
    donationItemCache.edit = true;
  }

  cancelEdit(id: number): void {
    const donationItem = this.editCache.find((item) => item.id === id);
    if (!this.isEdit) {
      donationItem.quantityToDonate = 0;
    }
    donationItem.edit = false;
  }

  saveEdit(id: number): void {
    const donationItemCache = this.editCache.find((item) => item.id === id);
    donationItemCache.edit = false;
  }

  isSomethingToDonate(): boolean {
    return this.editCache.some((item) => item.quantityToDonate > 0);
  }

  donationConfirm(): void {
    if (this.isSomethingToDonate()) {
      this.showDonationConfirmModal.emit(true);
    } else {
      this.alertMessage();
    }
  }

  alertMessage(): void {
    this.notifiactionsService.createNotification('warning', 'Warning', 'There are no items to donate');
  }

  donate() {
    if (this.isSomethingToDonate()) {
      const donation = new DonationModel();

      Object.entries(this.donation).forEach((kv) => {
        if (['string', 'number', 'Date'].includes(typeof kv[1])) {
          donation[kv[0]] = kv[1];
        }
      });

      donation.donationItems = this.donation.donationItems.map((item) => {
        const donationItem: DonationItemModel = new DonationItemModel();
        Object.assign(donationItem, item);
        return donationItem;
      });

      donation.donationItems.forEach((item) => {
        item.quantity = this.editCache.find((x) => item.donationRequestItemId === x.id).quantityToDonate;
      });

      this.donationSandbox.updateDonation(donation);
    }
  }
}
