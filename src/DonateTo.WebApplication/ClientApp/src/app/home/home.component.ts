import { Component, OnInit } from '@angular/core';
import { HomeSandbox } from './home.sandbox';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { ConfigService } from '../app-config.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  param = { value: 'world' };
  requests: any[];
  modalVisible = false;
  item: any = null;
  searchValue: string = null;

  currentPage = 1;
  pageSize = 6;
  totalItems = 0;

  constructor(public homeSandbox: HomeSandbox, protected router: Router, protected configService: ConfigService) {
    this.pageSize = this.configService.get('pageSize') || this.pageSize;
  }

  subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.homeSandbox.donationRequestsPaged$.subscribe((paged) => {
      this.refreshPagedItems(paged);
    });
    this.homeSandbox.donationRequestsSearchPaged$.subscribe((paged) => {
      this.refreshPagedItems(paged);
    });

    this.pageChange({ pageNumber: 1 });
  }

  refreshPagedItems(pagedItems) {
    this.requests = pagedItems.results;
    this.totalItems = pagedItems.rowCount;
  }

  onPageChange(pageNumber) {
    this.pageChange({ pageNumber });
  }

  pageChange({ pageSize = this.pageSize, pageNumber }) {
    this.pageSize = pageSize;
    this.currentPage = pageNumber;

    if (!this.searchValue) {
      this.homeSandbox.loadDonationRequestsPaged(pageSize, pageNumber);
    } else {
      this.homeSandbox.loadDonationRequestsSearchPaged(pageSize, pageNumber, this.searchValue);
    }
  }

  onSearch() {
    this.pageChange({ pageNumber: 1 });
  }

  showModal(item) {
    this.item = item;
    this.modalVisible = true;
  }

  hideModal() {
    this.item = null;
    this.modalVisible = false;
  }

  goToDonate() {
    this.homeSandbox.login();
  }
}
