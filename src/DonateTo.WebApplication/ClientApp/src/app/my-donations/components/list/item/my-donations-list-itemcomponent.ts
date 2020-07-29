import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DonationModel } from 'src/app/shared/models/donation.model';
import { MyDonationSandbox } from 'src/app/my-donations/my-donation.sandbox';
import { Status } from 'src/app/shared/models';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-my-donations-list-item',
  templateUrl: './my-donations-list-item.component.html',
  styleUrls: ['./my-donations-list-item.component.scss'],
})
export class MyDonationsListItemComponent implements OnInit {
  @Input() item: DonationModel;
  @Input() loading = true;
  isPending = false;
  tplModal?: NzModalRef;
  constructor(public donationSandbox: MyDonationSandbox) {}

  donationItemsCount = 0;

  delete(item: DonationModel) {
    this.donationSandbox.deleteDonation(item);
  }
  ngOnInit(): void {
    this.isPending = this.item.statusId === Status.Pending;
    if (this.item && this.item.donationItems) {
      this.donationItemsCount = this.item.donationItems.length;
    }
  }
}
