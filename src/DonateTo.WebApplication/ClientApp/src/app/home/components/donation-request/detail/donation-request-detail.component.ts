import { Component, Input, OnInit } from '@angular/core';
import { DonationRequestModel } from 'src/app/shared/models';
import { Observable } from 'rxjs';
import { HomeSandbox } from 'src/app/home/home.sandbox';
import { ConfigService } from 'src/app/app-config.service';

@Component({
  selector: 'app-donation-request-detail',
  templateUrl: './donation-request-detail.component.html',
  styleUrls: ['./donation-request-detail.component.scss'],
})
export class DonationRequestDetailComponent implements OnInit {
  @Input() item = null;
  items = [];
  pagedItems = [];
  totalItems = 0;
  loading = false;
  currentPage = 1;
  pageSize = 6;

  constructor(protected configService: ConfigService) {
    this.pageSize = this.configService.get('pageSize') || this.pageSize;
  }

  getItems(donationRequest: DonationRequestModel) {
    if (!!donationRequest) {
      this.items = donationRequest.donationRequestItems;
      this.totalItems = donationRequest.donationRequestItems.length;
      this.onPageChange(1);
    }
  }

  onPageChange(page) {
    this.currentPage = page;
    this.pagedItems = this.items.slice((page - 1) * this.pageSize, page * this.pageSize);
  }

  ngOnInit(): void {
    this.loading = true;
    this.getItems(this.item);
    this.loading = false;
  }
}
