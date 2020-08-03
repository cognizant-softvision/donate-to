import { DonationRequestModel } from '../../shared/models';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { compareDate } from '../../shared/utility/dates/compare-dates';

import { DonationsSandbox } from './donations-sandbox';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DonationRequestFilter } from '../../shared/models/filters/donation-request-filter';
import { NzTableQueryParams } from 'ng-zorro-antd';

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
  titleVisible = false;
  createdDateVisible = false;
  finishDateVisible = false;
  observationVisible = false;
  donationRequestFilter = new DonationRequestFilter();
  failedStatus = false;
  successStatus = false;
  createdRange: Date[] = [];
  finishRange: Date[] = [];

  constructor(private donationSandbox: DonationsSandbox, protected router: Router) {}

  ngOnInit(): void {
    this.donationRequestFilter = {
      ...this.donationRequestFilter,
      pageSize: this.pageSize,
      pageNumber: this.pageIndex,
      createdDateBegin: null,
      createdDateEnd: null,
      finishDateBegin: null,
      finishDateEnd: null,
    };

    this.subscriptions.push(
      this.donationSandbox.donationRequestsPagedFiltered$.subscribe((res) => {
        this.total = res.rowCount;
        this.donationRequestsList = res.results;
      })
    );
  }

  ngOnDestroy(): void {
    this.unregisterEvents();
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find((item) => item.value !== null);

    this.donationRequestFilter = {
      ...this.donationRequestFilter,
      pageSize,
      pageNumber: pageIndex,
      orderBy: (currentSort && currentSort.key) || '',
      orderDirection: (currentSort && currentSort.value) || '',
      title: (filter && filter.find((f) => f.key === 'title')?.value) || '',
      observation: (filter && filter.find((f) => f.key === 'observation')?.value) || '',
      createdDateBegin: (filter && filter.find((f) => f.key === 'createdDateBegin')?.value) || null,
      createdDateEnd: (filter && filter.find((f) => f.key === 'createdDateEnd')?.value) || null,
      finishDateBegin: (filter && filter.find((f) => f.key === 'finishDateBegin')?.value) || null,
      finishDateEnd: (filter && filter.find((f) => f.key === 'finishDateEnd')?.value) || null,
    };

    this.donationSandbox.loadDonationRequestsFilteredPaged(this.donationRequestFilter);
  }

  deleteDonationRequest(donationRequest: DonationRequestModel) {
    this.donationSandbox.deleteDonationRequest(donationRequest);
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
    };

    this.donationSandbox.loadDonationRequestsFilteredPaged(this.donationRequestFilter);
  }

  resetTitleSearch(): void {
    this.titleVisible = false;
    this.searchTitleValue = '';
    this.donationRequestFilter = { ...this.donationRequestFilter, title: this.searchTitleValue };
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
