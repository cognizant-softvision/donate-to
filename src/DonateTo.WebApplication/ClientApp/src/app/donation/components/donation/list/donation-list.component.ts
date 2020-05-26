import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DonationRequestItemModel, DonationRequestModel } from 'src/app/shared/models';
import { DonationSandbox } from 'src/app/donation/donation.sandbox';
import { NotificationsService } from 'src/app/shared/notifications/notifications.service';

@Component({
  selector: 'app-donation-list',
  templateUrl: './donation-list.component.html',
  styleUrls: ['./donation-list.component.css'],
})
export class DonationListComponent implements OnInit {
  constructor(public donationSandbox: DonationSandbox, private notifiactionsService: NotificationsService) {}

  donationRequest: DonationRequestModel = new DonationRequestModel();

  @Output() showDonationConfirmModal = new EventEmitter();

  editCache: Array<{ edit: boolean; id: number; item: DonationRequestItemModel; quantityToDonate: number }> = [];

  updateEditCache(): void {
    this.donationRequest.donationRequestItems?.forEach((item) => {
      this.editCache.push({
        edit: false,
        id: item.id,
        item,
        quantityToDonate: 0,
      });
    });
  }

  ngOnInit(): void {
    this.donationSandbox.donationRequest$.subscribe((donationRequest) => {
      this.donationRequest = donationRequest;
      this.updateEditCache();
    });
  }

  startEdit(id: number): void {
    const donationItem = this.editCache.find((item) => item.id === id);
    donationItem.edit = true;
  }

  cancelEdit(id: number): void {
    const donationItem = this.editCache.find((item) => item.id === id);
    donationItem.quantityToDonate = 0;
    donationItem.edit = false;
  }

  saveEdit(id: number): void {
    const donationItem = this.editCache.find((item) => item.id === id);
    donationItem.edit = false;
  }

  isSomethingToDonate(): boolean {
    return this.editCache.some((item) => item.quantityToDonate > 0);
  }

  donationConfirm(): void {
    this.isSomethingToDonate() ? this.showDonationConfirmModal.emit(true) : this.alertMessage();
  }

  alertMessage(): void {
    this.notifiactionsService.createNotification('warning', 'Warning', 'There are no items to donate');
  }
}
