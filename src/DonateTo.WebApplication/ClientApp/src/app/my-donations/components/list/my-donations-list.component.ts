import { Subscription } from 'rxjs/internal/Subscription';
import { Component, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { NzConfigService } from 'ng-zorro-antd';
import { DonationModel } from 'src/app/shared/models/donation.model';
import { MyDonationSandbox } from '../../my-donation.sandbox';
import { Status } from 'src/app/shared/models';

@Component({
  selector: 'app-my-donation-list',
  templateUrl: './my-donations-list.component.html',
  styleUrls: ['./my-donations-list.component.css'],
})
export class MyDonationsListComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  mockData = new Array(3).fill(new DonationModel());
  donations: DonationModel[] = [];
  isLoading = true;

  statusId: number = Status.Pending;
  statusList: Array<{ value: number; label: string }> = [];
  gutter = [8, 8];
  headStyle = {
    textAlign: 'left',
  };

  @Input() totalItems = 0;
  @Input() currentPage = 1;
  @Input() pageSize = 6;

  @Output() showModal = new EventEmitter();
  @ViewChild('customTpl', { static: false }) customTpl?: TemplateRef<any>;

  constructor(public donationSandbox: MyDonationSandbox, private nzConfigService: NzConfigService) {}

  ngOnInit(): void {
    this.donationSandbox.getDonationsByUserPaged(1, 6, this.statusId);
    this.registerEvents();
    this.nzConfigService.set('empty', { nzDefaultEmptyContent: this.customTpl });
    this.populateStatusList();
  }

  populateStatusList() {
    for (const status in Status) {
      if (Status.hasOwnProperty(status)) {
        const statusId = Number.parseInt(status, 10);
        if (!Number.isNaN(statusId)) {
          const statusItem = { value: statusId, label: Status[statusId] };
          this.statusList = [...(this.statusList || []), statusItem];
        }
      }
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  refreshPagedItems(pagedItems) {
    if (pagedItems) {
      this.totalItems = pagedItems.rowCount;
      this.donations = pagedItems.results as DonationModel[];
    }
  }

  onSelectedStatus(event) {
    this.getDonations();
  }

  getDonations({ pageSize = this.pageSize, pageNumber = this.currentPage } = {}) {
    this.pageSize = pageSize;
    this.currentPage = pageNumber;
    this.donationSandbox.getDonationsByUserPaged(pageNumber, pageSize, this.statusId);
  }

  registerEvents() {
    this.subscriptions.push(this.donationSandbox.donations$.subscribe(this.refreshPagedItems.bind(this)));
    this.subscriptions.push(
      this.donationSandbox.donationsLoading$.subscribe((isLoading) => (this.isLoading = isLoading))
    );
  }
}
