import { ColumnItem, DonationRequestModel } from '../../shared/models';
import { Component, OnInit } from '@angular/core';
import { compareDate } from 'src/app/shared/utility/dates/compare-dates';

import { DonationsSandbox } from './donations-sandbox';
import { Router } from '@angular/router';

@Component({
  selector: 'app-donations-admin',
  templateUrl: './donations.component.html',
  styleUrls: ['./donations.component.css'],
})
export class DonationsComponent implements OnInit {
  constructor(public donationSandBox: DonationsSandbox, protected router: Router) {}

  listOfColumns: ColumnItem[] = [
    {
      name: 'Admin.Donation.Table.Itemcolumn',
      sortFn: (a: DonationRequestModel, b: DonationRequestModel) => a.title.localeCompare(b.title),
    },
    {
      name: 'Admin.Donation.Table.CreatedColumn',
      sortFn: (a: DonationRequestModel, b: DonationRequestModel) => compareDate(a.createdDate, b.createdDate),
    },
    {
      name: 'Admin.Donation.Table.Finishcolumn',
      sortFn: (a: DonationRequestModel, b: DonationRequestModel) => compareDate(a.finishDate, b.finishDate),
    },
    {
      name: 'Admin.Donation.Table.Observationcolumn',
      sortFn: (a: DonationRequestModel, b: DonationRequestModel) => a.observation.localeCompare(b.observation),
    },
    { name: 'Admin.Action' },
  ];

  ngOnInit(): void {
    this.donationSandBox.loadDonationRequests();
  }

  deleteDonationRequest(donationRequest: DonationRequestModel) {
    this.donationSandBox.deleteDonationRequest(donationRequest);
  }

  resetSortAndFilters(): void {
    this.listOfColumns.forEach((item) => {
      item.sortOrder = null;
    });
  }
}
