import { DonationRequestModel } from '../../shared/models';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DonationsSandbox } from './donations-sandbox';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DonationRequestFilter } from '../../shared/models/filters/donation-request-filter';
import { NzTableQueryParams } from 'ng-zorro-antd';
import { DataUpdatedService } from 'src/app/shared/async-services/data-updated.service';

@Component({
  selector: 'app-donations-admin',
  templateUrl: './donations.component.html',
  styleUrls: ['./donations.component.less'],
})
export class DonationsComponent implements OnDestroy, OnInit {
  private subscriptions: Subscription[] = [];
  donationRequestsList: DonationRequestModel[] = [];
  donationRequest: DonationRequestModel;
  total = 0;
  pageSize = 10;
  pageIndex = 1;
  searchTitleValue = '';
  searchCreatedDateBeginValue: Date;
  searchCreatedDateEndValue: Date;
  searchFinishDateBeginValue: Date;
  searchFinishDateEndValue: Date;
  searchObservationValue = '';
  searchOrganizationValue = '';
  titleVisible = false;
  createdDateVisible = false;
  finishDateVisible = false;
  observationVisible = false;
  placedDonationsVisible = false;
  organizationVisible = false;
  donationRequestFilter = new DonationRequestFilter();
  failedStatus = false;
  successStatus = false;
  createdRange: Date[] = [];
  finishRange: Date[] = [];
  dataSaved = false;
  isDeleteProcess = false;

  constructor(
    public donationSandbox: DonationsSandbox,
    protected router: Router,
    private dataUpdated: DataUpdatedService
  ) {}

  ngOnInit(): void {
    this.donationRequestFilter = {
      ...this.donationRequestFilter,
      pageSize: this.pageSize,
      pageNumber: this.pageIndex,
      createdDateBegin: null,
      createdDateEnd: null,
      finishDateBegin: null,
      finishDateEnd: null,
      organizationName: null,
    };

    this.subscriptions.push(
      this.donationSandbox.donationRequestsPagedFiltered$.subscribe((res) => {
        this.total = res.rowCount;
        this.donationRequestsList = res.results;
      })
    );

    this.dataUpdated.currentStatus.subscribe((dataSaved) => (this.dataSaved = dataSaved));
    if (this.dataSaved) {
      this.dataUpdated.changeMessage(false);
      window.location.reload();
    }

    this.subscriptions.push(
      this.donationSandbox.loadAction$.subscribe((isLoading) => {
        if (!isLoading && this.isDeleteProcess) {
          this.isDeleteProcess = false;
          this.donationSandbox.loadDonationRequestsFilteredPaged(this.donationRequestFilter);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.unregisterEvents();
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex, sort } = params;
    const currentSort = sort.find((item) => item.value !== null);

    this.donationRequestFilter = {
      ...this.donationRequestFilter,
      pageSize,
      pageNumber: pageIndex,
      orderBy: (currentSort && currentSort.key) || '',
      orderDirection: (currentSort && currentSort.value) || '',
    };

    this.donationSandbox.loadDonationRequestsFilteredPaged(this.donationRequestFilter);
  }

  deleteDonationRequest(donationRequest: DonationRequestModel) {
    this.donationSandbox.deleteDonationRequest(donationRequest);
    this.isDeleteProcess = true;
  }

  reset(): void {
    this.searchTitleValue = '';
    this.searchCreatedDateBeginValue = null;
    this.searchCreatedDateEndValue = null;
    this.searchFinishDateBeginValue = null;
    this.searchFinishDateEndValue = null;
    this.searchObservationValue = '';
    this.donationRequestFilter = {
      ...this.donationRequestFilter,
      title: this.searchTitleValue,
      createdDateBegin: this.searchCreatedDateBeginValue,
      createdDateEnd: this.searchCreatedDateEndValue,
      finishDateBegin: this.searchFinishDateBeginValue,
      finishDateEnd: this.searchFinishDateEndValue,
      observation: this.searchObservationValue,
      organizationName: this.searchOrganizationValue,
    };

    this.donationSandbox.loadDonationRequestsFilteredPaged(this.donationRequestFilter);
  }

  resetTitleSearch(): void {
    this.titleVisible = false;
    this.searchTitleValue = '';
    this.donationRequestFilter = { ...this.donationRequestFilter, title: this.searchTitleValue };
    this.donationSandbox.loadDonationRequestsFilteredPaged(this.donationRequestFilter);
  }

  resetOrganizationSearch(): void {
    this.organizationVisible = false;
    this.searchOrganizationValue = '';
    this.donationRequestFilter = { ...this.donationRequestFilter, title: this.searchOrganizationValue };
    this.donationSandbox.loadDonationRequestsFilteredPaged(this.donationRequestFilter);
  }

  resetCreatedDateSearch(): void {
    this.createdDateVisible = false;
    this.searchCreatedDateBeginValue = null;
    this.searchCreatedDateEndValue = null;
    this.donationRequestFilter = {
      ...this.donationRequestFilter,
      createdDateBegin: this.searchCreatedDateBeginValue,
      createdDateEnd: this.searchCreatedDateEndValue,
    };
    this.donationSandbox.loadDonationRequestsFilteredPaged(this.donationRequestFilter);
  }

  resetFinishDateSearch(): void {
    this.finishDateVisible = false;
    this.searchFinishDateBeginValue = null;
    this.searchFinishDateEndValue = null;
    this.donationRequestFilter = {
      ...this.donationRequestFilter,
      finishDateBegin: this.searchFinishDateBeginValue,
      finishDateEnd: this.searchFinishDateEndValue,
    };
    this.donationSandbox.loadDonationRequestsFilteredPaged(this.donationRequestFilter);
  }

  resetObservationSearch(): void {
    this.observationVisible = false;
    this.searchObservationValue = '';
    this.donationRequestFilter = { ...this.donationRequestFilter, observation: this.searchObservationValue };
    this.donationSandbox.loadDonationRequestsFilteredPaged(this.donationRequestFilter);
  }

  searchTitle(): void {
    this.titleVisible = false;
    this.donationRequestFilter = { ...this.donationRequestFilter, title: this.searchTitleValue };
    this.donationSandbox.loadDonationRequestsFilteredPaged(this.donationRequestFilter);
  }

  searchOrganization(): void {
    this.organizationVisible = false;
    this.donationRequestFilter = { ...this.donationRequestFilter, organizationName: this.searchOrganizationValue };
    this.donationSandbox.loadDonationRequestsFilteredPaged(this.donationRequestFilter);
  }

  searchCreatedDate(): void {
    this.createdDateVisible = false;
    this.donationRequestFilter = {
      ...this.donationRequestFilter,
      createdDateBegin: this.searchCreatedDateBeginValue,
      createdDateEnd: this.searchCreatedDateEndValue,
    };
    this.donationSandbox.loadDonationRequestsFilteredPaged(this.donationRequestFilter);
  }

  searchFinishDate(): void {
    this.finishDateVisible = false;
    this.donationRequestFilter = {
      ...this.donationRequestFilter,
      finishDateBegin: this.searchFinishDateBeginValue,
      finishDateEnd: this.searchFinishDateEndValue,
    };
    this.donationSandbox.loadDonationRequestsFilteredPaged(this.donationRequestFilter);
  }

  searchObservation(): void {
    this.observationVisible = false;
    this.donationRequestFilter = { ...this.donationRequestFilter, observation: this.searchObservationValue };
    this.donationSandbox.loadDonationRequestsFilteredPaged(this.donationRequestFilter);
  }

  private unregisterEvents() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
