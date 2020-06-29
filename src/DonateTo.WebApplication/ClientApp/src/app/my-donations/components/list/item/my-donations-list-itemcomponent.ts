import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DonationModel } from 'src/app/shared/models/donation.model';
import { MyDonationSandbox } from 'src/app/my-donations/my-donation.sandbox';
import { Status } from 'src/app/shared/models';

@Component({
  selector: 'app-my-donations-list-item',
  templateUrl: './my-donations-list-item.component.html',
  styleUrls: ['./my-donations-list-item.component.css'],
})
export class MyDonationsListItemComponent implements OnInit {
  @Input() item: DonationModel;
  @Input() loading = true;
  isPending = false;

  constructor(public donationSandbox: MyDonationSandbox) {}

  delete(item: DonationModel) {
    this.donationSandbox.deleteDonation(item);
  }
  ngOnInit(): void {
    this.isPending = this.item.statusId === Status.Pending;
  }
}
