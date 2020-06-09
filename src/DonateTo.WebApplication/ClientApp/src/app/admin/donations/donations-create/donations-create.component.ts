import { Component, OnDestroy, OnInit } from '@angular/core';
import { DonationsSandbox } from '../donations-sandbox';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzI18nService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryModel, ColumnItem, DonationRequestItemModel, DonationRequestModel } from 'src/app/shared/models';

@Component({
  selector: 'app-donations-create',
  templateUrl: './donations-create.component.html',
  styleUrls: ['./donations-create.component.css'],
})
export class DonationsCreateComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  private isSubmited = false;
  isErrorModalActive = false;
  categories: CategoryModel[] = [];
  donationRequest: DonationRequestModel;
  listOfColumns: ColumnItem[] = [
    { name: 'Admin.Donation.Table.Itemcolumn' },
    { name: 'Admin.Donation.Table.Quantitycolumn' },
    { name: 'Admin.Donation.Table.Observationcolumn' },
    { name: 'Admin.Donation.Table.Categorycolumn' },
    { name: 'Admin.Action' },
  ];
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
      this.donationSandbox.userId$.subscribe((id) => {
        this.donationRequest.userId = id;
      })
    );

    this.subscriptions.push(
      this.donationSandbox.categories$.subscribe((categories) => {
        this.categories = categories;
      })
    );

    this.subscriptions.push(
      this.donationSandbox.loadAction$.subscribe((_) => {
        if (this.donationSandbox.failAction && this.isSubmited) {
          this.switchErrorModal();
          this.isSubmited = false;
        }
        if (this.isSubmited) {
          this.router.navigateByUrl('/admin/donations');
        }
      })
    );
  }

  switchErrorModal() {
    this.isErrorModalActive = !this.isErrorModalActive;
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

  createDonationRequest() {
    this.validateFormGroup(this.donationRequestFormGroup);
    if (this.donationRequestFormGroup.valid) {
      this.donationRequest.donationRequestCategories = this.donationSandbox.mapCategoriesToDonationRequestCategories(
        this.selectedCategories
      );
      this.isSubmited = true;
      this.donationSandbox.createDonationRequest(this.donationRequest);
    }
  }

  private unregisterEvents() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
