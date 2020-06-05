import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DonationsSandbox } from '../donations-sandbox';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzI18nService } from 'ng-zorro-antd';
import { Subscription } from 'rxjs';
import {
  AddressModel,
  CategoryModel,
  ColumnItem,
  DonationRequestCategoryModel,
  DonationRequestItemModel,
  DonationRequestModel,
  OrganizationModel,
  StatusModel,
} from 'src/app/shared/models';

@Component({
  selector: 'app-donations-form',
  templateUrl: './donations-form.component.html',
  styleUrls: ['./donations-form.component.css'],
})
export class DonationsFormComponent implements OnInit, OnDestroy {
  @Input() donationRequest: DonationRequestModel;
  private subscriptions: Subscription[] = [];

  addressId: number;
  addresses: AddressModel[] = [];
  categories: CategoryModel[] = [];
  donationRequestItems: DonationRequestItemModel[] = [];
  finishDate: Date;
  observations: string;
  organizations: OrganizationModel[] = [];
  organizationId: number;
  priority: number;
  statusId: number;
  defaultStatus: 2;
  status: StatusModel[] = [];
  selectedCategories: CategoryModel[] = [];
  selectedItemCategories: CategoryModel[] = [];
  title: string;
  userId: number;

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
    statusFormControl: new FormControl('', Validators.required),
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

  constructor(public donationSandbox: DonationsSandbox, protected i18n: NzI18nService) {
    this.sandBoxSubscriptionInit();

    this.donationSandbox.loadOrganizations();
    this.donationSandbox.loadCategories();
    this.donationSandbox.loadStatus();
  }

  ngOnInit(): void {
    if (this.donationRequest) {
      this.title = this.donationRequest.title;
      this.observations = this.donationRequest.observation;
      this.priority = this.donationRequest.priority;
      this.statusId = this.donationRequest.statusId;
      this.finishDate = this.donationRequest.finishDate;
      this.organizationId = this.donationRequest.organizationId;
      this.addressId = this.donationRequest.addressId;
      this.donationRequestItems = this.donationRequest.donationRequestItems;
    } else {
      this.statusId = this.defaultStatus;
    }

    this.donationRequestFormGroup.controls.itemsFormControl.setValue(this.donationRequestItems);
    this.donationRequestFormGroup.controls.itemsFormControl.setValidators(Validators.required);
  }

  ngOnDestroy(): void {
    this.unregisterEvents();
  }

  private sandBoxSubscriptionInit() {
    this.subscriptions.push(
      this.donationSandbox.organizations$.subscribe((organizations) => {
        this.organizations = organizations;
      })
    );

    this.subscriptions.push(
      this.donationSandbox.status$.subscribe((status) => {
        this.status = status;
      })
    );

    this.subscriptions.push(
      this.donationSandbox.categories$.subscribe((categories) => {
        this.categories = categories;
        if (this.donationRequest) {
          this.selectedCategories = this.categories.filter((sc) =>
            this.donationRequest.donationRequestCategories.some((dr) => sc.id === dr.categoryId)
          );
        }
      })
    );

    this.subscriptions.push(
      this.donationSandbox.addressesByOrganization$.subscribe((addresses) => {
        this.addresses = addresses;
      })
    );

    this.subscriptions.push(
      this.donationSandbox.userId$.subscribe((id) => {
        this.userId = id;
      })
    );
  }

  setOrganization() {
    if (this.organizationId >= 0) {
      this.donationSandbox.loadAddressesByOrganization(this.organizationId);
    }
  }

  isCategorySelected(category: CategoryModel) {
    return this.selectedCategories.indexOf(category) === -1;
  }

  getCategoryName(categoryId) {
    if (this.categories) {
      return this.categories.find((c) => c.id === categoryId).name;
    }
  }

  isItemCategorySelected(category: CategoryModel) {
    return this.selectedItemCategories.indexOf(category) === -1;
  }

  removeDonationRequestItem(donationRequestItemTarget: DonationRequestItemModel) {
    this.donationRequestItems = this.donationRequestItems.filter((item) => item !== donationRequestItemTarget);
  }

  private validateDonationRequest() {
    this.validateFormGroup(this.donationRequestFormGroup);
    if (this.donationRequestFormGroup.valid) {
      this.buildDonationRequest();
    }
  }

  private validateFormGroup(formGroup: FormGroup) {
    for (const i in formGroup.controls) {
      if (formGroup.controls.hasOwnProperty(i)) {
        formGroup.controls[i].markAsDirty();
        formGroup.controls[i].updateValueAndValidity();
      }
    }
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

      this.donationRequestItems = [...this.donationRequestItems, donationRequestItem];
    }
  }

  buildDonationRequest() {
    const donationRequestForm = new DonationRequestModel();

    donationRequestForm.title = this.title;
    donationRequestForm.observation = this.observations;
    donationRequestForm.priority = this.priority;
    donationRequestForm.priority = this.priority;
    donationRequestForm.finishDate = this.finishDate;
    donationRequestForm.userId = this.userId;
    donationRequestForm.donationRequestItems = this.donationRequestItems;
    donationRequestForm.statusId = this.statusId;

    if (this.donationRequest.id) {
      donationRequestForm.id = this.donationRequest.id;
      donationRequestForm.createdBy = this.donationRequest.createdBy;
      donationRequestForm.createdDate = this.donationRequest.createdDate;
      donationRequestForm.donationRequestCategories = this.updateDonationRequestCategories();
    } else {
      donationRequestForm.donationRequestCategories = this.donationSandbox.mapCategoriesToDonationRequestCategories(
        this.selectedCategories
      );
    }

    this.donationRequest = donationRequestForm;
  }

  updateDonationRequestCategories(): DonationRequestCategoryModel[] {
    let updatedCategories: DonationRequestCategoryModel[];

    updatedCategories = this.donationRequest.donationRequestCategories.filter((drc) =>
      this.selectedCategories.some((sc) => drc.categoryId !== sc.id)
    );
    updatedCategories.push(
      ...this.donationSandbox.mapCategoriesToDonationRequestCategories(
        this.selectedCategories.filter((sc) => !updatedCategories.some((uc) => uc.categoryId === sc.id))
      )
    );

    return updatedCategories;
  }

  private unregisterEvents() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
