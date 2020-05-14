import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DonationRequestModel } from 'src/app/shared/models';

@Component({
  selector: 'app-donation-requests-list-item',
  templateUrl: './donation-requests-list-item.component.html',
  styleUrls: ['./donation-requests-list-item.component.css'],
})
export class DonationRequestsListItemComponent implements OnInit {
  @Output() showDetail = new EventEmitter<number>();
  @Input() item: any;
  @Input() loading = true;

  constructor() {}

  getCategories(donationRequest: DonationRequestModel) {
    return !!donationRequest.donationRequestCategories
      ? donationRequest.donationRequestCategories.map((drc) => drc.category.name)
      : [];
  }

  sendItem() {
    this.showDetail.emit(this.item.id);
  }

  ngOnInit(): void {}
}
