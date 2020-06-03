import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DonationsSandbox } from '../donations-sandbox';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzI18nService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  AddressModel,
  CategoryModel,
  ColumnItem,
  DonationRequestItemModel,
  DonationRequestModel,
  OrganizationModel,
} from 'src/app/shared/models';

@Component({
  selector: 'app-donations-form',
  templateUrl: './donations-form.component.html',
  styleUrls: ['./donations-form.component.css'],
})
export class DonationsFormComponent implements OnInit, OnDestroy {
  addresses: AddressModel[] = [];
  categories: CategoryModel[] = [];
  organizations: OrganizationModel[] = [];
  selectedItemCategories: CategoryModel[] = [];
  selectedCategories: CategoryModel[] = [];

  private subscriptions: Subscription[] = [];
  @Input() donationRequest: DonationRequestModel;
  listOfColumns: ColumnItem[] = [
    { name: 'Admin.Donation.Table.ItemColumn' },
    { name: 'Admin.Donation.Table.QuantityColumn' },
    { name: 'Admin.Donation.Table.ObservationColumn' },
    { name: 'Admin.Donation.Table.CategoryColumn' },
    { name: 'Admin.Action' },
  ];

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

  constructor(public donationSandbox: DonationsSandbox, protected i18n: NzI18nService, private router: Router) {}

  ngOnInit(): void {
    if (!this.donationRequest) {
      // this.donationRequest = new DonationRequestModel();
      // this.donationRequest.statusId = 2;
      // this.donationRequest.donationRequestItems = [];
    } else {
      // debugger;
    }

    this.sandBoxSubscriptionInit();

    this.donationRequestFormGroup.controls.itemsFormControl.setValue(this.donationRequest.donationRequestItems);
    this.donationRequestFormGroup.controls.itemsFormControl.setValidators(Validators.required);

    this.donationSandbox.loadOrganizations();
    this.donationSandbox.loadCategories();
  }

  ngOnDestroy(): void {
    this.unregisterEvents();
  }

  getCategoryName(categoryId) {
    return this.categories.find((w) => w.id === categoryId).name;
  }

  private sandBoxSubscriptionInit() {
    this.subscriptions.push(
      this.donationSandbox.organizations$.subscribe((organizations) => {
        this.organizations = organizations;
      })
    );

    this.subscriptions.push(
      this.donationSandbox.categories$.subscribe((categories) => {
        this.categories = categories;
      })
    );

    this.subscriptions.push(
      this.donationSandbox.addressesByOrganization$.subscribe((addresses) => {
        this.addresses = addresses;
      })
    );

    this.subscriptions.push(
      this.donationSandbox.userId$.subscribe((id) => {
        this.donationRequest.userId = id;
      })
    );
  }

  setOrganization() {
    if (this.donationRequest.organizationId >= 0) {
      this.donationSandbox.loadAddressesByOrganization(this.donationRequest.organizationId);
    }
  }

  isCategorySelected(category: CategoryModel) {
    return this.selectedCategories.indexOf(category) === -1;
  }

  validateFormGroup(formGroup: FormGroup) {
    for (const i in formGroup.controls) {
      if (formGroup.controls.hasOwnProperty(i)) {
        formGroup.controls[i].markAsDirty();
        formGroup.controls[i].updateValueAndValidity();
      }
    }
  }

  isItemCategorySelected(category: CategoryModel) {
    return this.selectedItemCategories.indexOf(category) === -1;
  }

  addDonationRequestItem() {
    this.validateFormGroup(this.donationRequestItemFormGroup);
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

  removeDonationRequestItem(donationRequestItemTarget: DonationRequestItemModel) {
    this.donationRequest.donationRequestItems = this.donationRequest.donationRequestItems.filter(
      (item) => item !== donationRequestItemTarget
    );
  }

  validateDonationRequest() {
    this.validateFormGroup(this.donationRequestFormGroup);
    if (this.donationRequestFormGroup.valid) {
      console.log('form is valid');
    }
    console.log('form is valid');
  }

  private unregisterEvents() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
