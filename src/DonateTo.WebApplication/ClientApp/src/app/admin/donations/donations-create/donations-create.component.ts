import { Component, OnInit } from '@angular/core';
import { DonationsSandbox } from '../donations-sandbox';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  AddressModel,
  ColumnItem,
  DonationRequestItemModel,
  DonationRequestModel,
  OrganizationModel,
} from 'src/app/shared/models';

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
    addressFormControl: new FormControl('', Validators.required),
    observationFormControl: new FormControl(),
  });
  donationRequest: DonationRequestModel;
  donationCategories = ['Category1', 'Category2', 'Category3'];

  priorityTooltips = ['low', 'low-medium', 'normal', 'medium', 'high'];
  addresses: AddressModel[] = [];
  organizations: OrganizationModel[] = [];

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

  constructor(public donationSandbox: DonationsSandbox) {
    this.donationRequest = new DonationRequestModel();
  }

  ngOnInit(): void {
    this.donationSandbox.organizations$.subscribe((organizations) => {
      this.organizations = organizations;
    });

    this.donationSandbox.addressesByOrganization$.subscribe((addresses) => {
      this.addresses = addresses;
    });

    this.donationSandbox.LoadOrganizations();
  }

  SetOrganization() {
    this.donationRequest.organizationId = this.donationRequest.organization.id;
    this.donationSandbox.LoadAddressesByOrganization(this.donationRequest.organization.id);
  }

  SetAddress() {
    this.donationRequest.addressId = this.donationRequest.address.id;
  }

  CreateDonationRequest() {
    console.log('submit');
  }
}
