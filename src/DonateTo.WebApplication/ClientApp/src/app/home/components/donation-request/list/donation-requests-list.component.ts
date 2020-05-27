import { DonationRequestModel } from './../../../../shared/models';
import { Subscription } from 'rxjs/internal/Subscription';
import { Component, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { HomeSandbox } from 'src/app/home/home.sandbox';
import { NzConfigService } from 'ng-zorro-antd';

@Component({
  selector: 'app-donation-requests-list',
  templateUrl: './donation-requests-list.component.html',
  styleUrls: ['./donation-requests-list.component.css'],
})
export class DonationRequestsListComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  mockData = new Array(3).fill({});
  donationRequests: DonationRequestModel[] = [];
  isLoading = true;

  gutter = [8, 8];
  headStyle = {
    textAlign: 'left',
  };

  @Input() totalItems = 0;
  @Input() currentPage = 1;
  @Input() pageSize = 6;

  @Output() showModal = new EventEmitter();
  @ViewChild('customTpl', { static: false }) customTpl?: TemplateRef<any>;

  constructor(public homeSandbox: HomeSandbox, private nzConfigService: NzConfigService) {}

  ngOnInit(): void {
    this.getDonationRequests({ pageNumber: 1 });
    this.registerEvents();
    this.nzConfigService.set('empty', { nzDefaultEmptyContent: this.customTpl });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  showDetail(id) {
    const item = this.donationRequests.find((i) => i.id === id);
    this.showModal.emit(item);
  }

  refreshPagedItems(pagedItems) {
    if (pagedItems) {
      this.totalItems = pagedItems.rowCount;
    }
  }

  getDonationRequests({ pageSize = this.pageSize, pageNumber }) {
    this.pageSize = pageSize;
    this.currentPage = pageNumber;
    this.homeSandbox.loadDonationRequestsPaged(pageSize, pageNumber);
  }

  registerEvents() {
    this.subscriptions.push(this.homeSandbox.donationRequestsPaged$.subscribe(this.refreshPagedItems.bind(this)));
    this.subscriptions.push(this.homeSandbox.donationRequestsSearchPaged$.subscribe(this.refreshPagedItems.bind(this)));
    this.subscriptions.push(
      this.homeSandbox.donationRequests$.subscribe((donationRequests) => (this.donationRequests = donationRequests))
    );
    this.subscriptions.push(
      this.homeSandbox.donationRequestsLoading$.subscribe((isLoading) => (this.isLoading = isLoading))
    );
  }
}
