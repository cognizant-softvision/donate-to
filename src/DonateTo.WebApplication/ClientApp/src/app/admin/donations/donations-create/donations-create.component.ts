import { Component, OnInit } from '@angular/core';
import { DonationsSandbox } from '../donations-sandbox';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  AddressModel,
  CategoryModel,
  ColumnItem,
  DonationRequestCategoryModel,
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
  addresses: AddressModel[] = [];
  categories: CategoryModel[] = [];
  selectedCategories: CategoryModel[] = [];
  donationRequest: DonationRequestModel;

  donationRequestFormGroup = new FormGroup({
    titleFormControl: new FormControl('', Validators.required),
    priorityFormControl: new FormControl('', Validators.required),
    organizationFormControl: new FormControl('', Validators.required),
    addressFormControl: new FormControl('', Validators.required),
    categoryFormControl: new FormControl(this.selectedCategories, Validators.required),
    observationFormControl: new FormControl(),
    finishDateFormControl: new FormControl(),
  });
  // validation form required categories wont work
  organizations: OrganizationModel[] = [];
  priorityTooltips = ['low', 'low-medium', 'normal', 'medium', 'high'];

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
    this.SandBoxSubscriptionInit();

    this.donationSandbox.LoadOrganizations();
    this.donationSandbox.LoadCategories();
  }

  SandBoxSubscriptionInit() {
    this.donationSandbox.organizations$.subscribe((organizations) => {
      this.organizations = organizations;
    });

    this.donationSandbox.categories$.subscribe((categories) => {
      this.categories = categories;
    });

    this.donationSandbox.addressesByOrganization$.subscribe((addresses) => {
      this.addresses = addresses;
    });
  }

  SetOrganization() {
    this.donationRequest.organizationId = this.donationRequest.organization.id;
    this.donationSandbox.LoadAddressesByOrganization(this.donationRequest.organization.id);
  }

  SetAddress() {
    this.donationRequest.addressId = this.donationRequest.address.id;
  }

  CreateDonationRequest() {
    this.MapCategoriesToDonationRequestCategories();
    console.log('submit');
  }

  IsCategorySelected(category: CategoryModel) {
    return this.selectedCategories.indexOf(category) === -1;
  }

  MapCategoriesToDonationRequestCategories() {
    this.selectedCategories.forEach((category) => {
      const donationRequestCategory = new DonationRequestCategoryModel();

      donationRequestCategory.category = category;
      donationRequestCategory.category.id = category.id;
      donationRequestCategory.donationRequest = this.donationRequest;
      donationRequestCategory.donationRequestId = this.donationRequest.id;

      this.donationRequest.donationRequestCategories.push(donationRequestCategory);
    });
  }
}
