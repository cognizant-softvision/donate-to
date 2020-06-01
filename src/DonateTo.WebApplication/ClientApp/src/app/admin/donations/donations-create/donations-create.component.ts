import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import { Component, OnInit } from '@angular/core';
import { DonationsSandbox } from '../donations-sandbox';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzI18nService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import {
  AddressModel,
  CategoryModel,
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
  addresses: AddressModel[] = [];
  categories: CategoryModel[] = [];
  donationRequest: DonationRequestModel;
  listOfColumns: ColumnItem[] = [
    { name: 'Admin.Donation.Table.ItemColumn' },
    { name: 'Admin.Donation.Table.QuantityColumn' },
    { name: 'Admin.Donation.Table.ObservationColumn' },
    { name: 'Admin.Donation.Table.CategoryColumn' },
    { name: 'Admin.Action' },
  ];
  organizations: OrganizationModel[] = [];
  selectedCategories: CategoryModel[] = [];
  selectedItemCategories: CategoryModel[] = [];

  donationRequestFormGroup = new FormGroup({
    titleFormControl: new FormControl('', Validators.required),
    priorityFormControl: new FormControl('', Validators.required),
    organizationFormControl: new FormControl('', Validators.required),
    addressFormControl: new FormControl('', Validators.required),
    categoryFormControl: new FormControl(this.selectedCategories, Validators.required),
    observationFormControl: new FormControl(),
    itemsFormControl: new FormControl(),
    finishDateFormControl: new FormControl('Date', Validators.required),
  });

  donationRequestItemFormGroup = new FormGroup({
    nameFormControl: new FormControl('', Validators.required),
    itemCategoryFormControl: new FormControl(this.selectedItemCategories, Validators.required),
    observationFormControl: new FormControl(),
    quantityFormControl: new FormControl('', Validators.required),
  });

  constructor(public donationSandbox: DonationsSandbox, protected i18n: NzI18nService, private router: Router) {
    this.donationRequest = new DonationRequestModel();
    this.donationRequest.statusId = 2;
    this.donationRequest.donationRequestItems = [];
  }

  ngOnInit(): void {
    this.SandBoxSubscriptionInit();

    this.donationRequestFormGroup.controls.itemsFormControl.setValue(this.donationRequest.donationRequestItems);
    this.donationRequestFormGroup.controls.itemsFormControl.setValidators(Validators.required);

    this.donationSandbox.loadOrganizations();
    this.donationSandbox.loadCategories();
  }

  GetCategoryName(categoryId) {
    return this.categories.find((w) => w.id === categoryId).name;
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

    this.donationSandbox.userId$.subscribe((id) => {
      this.donationRequest.userId = id;
    });
  }

  SetOrganization() {
    if (this.donationRequest.organizationId >= 0) {
      this.donationSandbox.loadAddressesByOrganization(this.donationRequest.organizationId);
    }
  }

  IsCategorySelected(category: CategoryModel) {
    return this.selectedCategories.indexOf(category) === -1;
  }

  ValidateFormGroup(formGroup: FormGroup) {
    for (const i in formGroup.controls) {
      if (formGroup.controls.hasOwnProperty(i)) {
        formGroup.controls[i].markAsDirty();
        formGroup.controls[i].updateValueAndValidity();
      }
    }
  }

  IsItemCategorySelected(category: CategoryModel) {
    return this.selectedItemCategories.indexOf(category) === -1;
  }

  AddDonationRequestItem() {
    this.ValidateFormGroup(this.donationRequestItemFormGroup);
    if (this.donationRequestItemFormGroup.valid) {
      const donationRequestItem = new DonationRequestItemModel();
      donationRequestItem.name = this.donationRequestItemFormGroup.controls.nameFormControl.value;
      donationRequestItem.observation = this.donationRequestItemFormGroup.controls.observationFormControl.value;
      donationRequestItem.finishQuantity = this.donationRequestItemFormGroup.controls.quantityFormControl.value;
      donationRequestItem.donationRequestItemCategories = this.donationSandbox.mapCategoriesToDonationRequestItemCategories(
        this.selectedItemCategories
      );

      this.donationRequest.donationRequestItems = [...this.donationRequest.donationRequestItems, donationRequestItem];
    }
  }

  RemoveDonationRequestItem(donationRequestItemTarget: DonationRequestItemModel) {
    this.donationRequest.donationRequestItems = this.donationRequest.donationRequestItems.filter(
      (item) => item !== donationRequestItemTarget
    );
  }

  CreateDonationRequest() {
    this.ValidateFormGroup(this.donationRequestFormGroup);
    if (this.donationRequestFormGroup.valid) {
      this.donationRequest.donationRequestCategories = this.donationSandbox.mapCategoriesToDonationRequestCategories(
        this.selectedCategories
      );
      this.donationSandbox.createDonationRequest(this.donationRequest);

      this.router.navigate(['admin/donations']);
    }
  }
}
