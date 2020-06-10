import { ColumnItem, DonationRequestModel } from '../../shared/models';
import { Component, OnInit } from '@angular/core';

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
    { name: 'Admin.Donation.Table.Itemcolumn' },
    { name: 'Admin.Donation.Table.Finishcolumn' },
    { name: 'Admin.Donation.Table.Observationcolumn' },
    { name: 'Admin.Action' },
  ];

  ngOnInit(): void {
    this.donationSandBox.loadDonationRequests();
  }

  deleteDonationRequest(donationRequest: DonationRequestModel) {
    this.donationSandBox.deleteDonationRequest(donationRequest);
  }
}
