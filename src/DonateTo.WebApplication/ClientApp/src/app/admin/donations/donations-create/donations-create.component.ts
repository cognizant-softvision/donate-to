import { ColumnItem, DonationRequestItemModel } from 'src/app/shared/models';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { DonationsSandbox } from '../donations-sandbox';

@Component({
  selector: 'app-donations-create',
  templateUrl: './donations-create.component.html',
  styleUrls: ['./donations-create.component.css'],
})
export class DonationsCreateComponent implements OnInit {
  donationRequestFormGroup = new FormGroup({
    titleFormControl: new FormControl('', Validators.required),
    priorityFormControl: new FormControl('', Validators.required),
    organizationFormControl: new FormControl('', Validators.required),
    observationFormControl: new FormControl(),
  });

  priorityTooltips = ['low', 'low-medium', 'normal', 'medium', 'high'];
  addresses: string[] = [];
  organizations: string[];
  donationCategories = ['Category1', 'Category2', 'Category3'];

  listOfColumns: ColumnItem[] = [
    { name: 'Item' },
    { name: 'Quantity' },
    { name: 'Observation' },
    { name: 'Admin.Action' },
  ];

  donationRequestItems: DonationRequestItemModel[] = [
    new DonationRequestItemModel(),
    new DonationRequestItemModel(),
    new DonationRequestItemModel(),
  ];

  constructor(public donationSandbox: DonationsSandbox) {}

  ngOnInit(): void {
    this.GetOrganizations();
  }

  GetOrganizations() {}

  GetAddresses(event) {
    console.log('address');
    this.addresses = [];
    this.addresses = ['Address1', 'Address2', 'Address3'];
  }

  CreateDonationRequest() {
    console.log('submit');
  }
}
