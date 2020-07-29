import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { DonationsSandbox } from '../donations-sandbox';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzI18nService } from 'ng-zorro-antd';
import { Subscription } from 'rxjs';
import { CategoryModel, ColumnItem, DonationRequestItemModel, DonationRequestModel } from 'src/app/shared/models';
import { compareDate } from 'src/app/shared/utility/dates/compare-dates';
import { AuthSandbox } from '../../../shared/auth/auth.sandbox';

@Component({
  selector: 'app-donations-form',
  templateUrl: './donations-form.component.html',
  styleUrls: ['./donations-form.component.scss'],
})
export class DonationsFormComponent implements OnInit, OnDestroy {
  @Input() donationRequest: DonationRequestModel;
  @Output() validationResult = new EventEmitter<DonationRequestModel>();

  private subscriptions: Subscription[] = [];
  disabledDates: (current: Date) => boolean;
  addressId: number;
  categories: CategoryModel[] = [];
  donationRequestItems: DonationRequestItemModel[] = [];
  finishDate: Date;
  observations: string;
  organizationId: number;
  priority: number;
  statusId = 2;
  selectedItemCategories: CategoryModel[] = [];
  title: string;
  ownerId: number;
  isEdit = false;

  listOfColumns: ColumnItem[] = [
    { name: 'Admin.Donation.Table.Itemcolumn' },
    { name: 'Admin.Donation.Table.Quantitycolumn' },
    { name: 'Admin.Donation.Table.Observationcolumn' },
    { name: 'Admin.Donation.Table.Categorycolumn' },
    { name: 'Admin.Action' },
  ];

  donationRequestFormGroup = new FormGroup({
    titleFormControl: new FormControl('', Validators.required),
    statusFormControl: new FormControl(''),
    organizationFormControl: new FormControl('', Validators.required),
    addressFormControl: new FormControl('', Validators.required),
    observationsFormControl: new FormControl(),
    itemsFormControl: new FormControl(),
    finishDateFormControl: new FormControl('Date'),
  });

  donationRequestItemFormGroup = new FormGroup({
    nameFormControl: new FormControl('', Validators.required),
    itemCategoryFormControl: new FormControl(this.selectedItemCategories, Validators.required),
    observationFormControl: new FormControl(),
    quantityFormControl: new FormControl('', Validators.required),
    unitFormControl: new FormControl('', Validators.required),
  });

  constructor(
    public donationSandbox: DonationsSandbox,
    private authSandbox: AuthSandbox,
    protected i18n: NzI18nService
  ) {}

  ngOnInit(): void {
    if (this.donationRequest) {
      this.isEdit = true;
      this.ownerId = this.donationRequest.ownerId;
      this.title = this.donationRequest.title;
      this.observations = this.donationRequest.observation;
      this.priority = this.donationRequest.priority;
      this.statusId = this.donationRequest.statusId;
      this.finishDate = this.donationRequest.finishDate;
      this.organizationId = this.donationRequest.organizationId;
      this.addressId = this.donationRequest.addressId;
      this.donationRequestItems = this.donationRequest.donationRequestItems;
    } else {
      this.donationRequest = new DonationRequestModel();
      this.authSandbox.userId$.subscribe((uid) => {
        this.ownerId = uid;
      });
    }

    this.sandBoxSubscriptionInit();

    this.disabledDates = (current: Date): boolean => {
      return compareDate(current, new Date()) < 0;
    };

    this.donationSandbox.loadOrganizationsByUser(this.ownerId);
    this.donationSandbox.loadCategories();
    this.donationSandbox.loadUnits();
    this.donationSandbox.loadStatus();

    this.donationRequestFormGroup.controls.itemsFormControl.setValue(this.donationRequestItems);
    this.donationRequestFormGroup.controls.itemsFormControl.setValidators(Validators.required);
  }

  ngOnDestroy(): void {
    this.unregisterEvents();
  }

  private sandBoxSubscriptionInit() {
    this.subscriptions.push(
      this.donationSandbox.categories$.subscribe((categories) => {
        this.categories = categories;
      })
    );
  }

  setOrganization() {
    if (this.organizationId >= 0) {
      this.donationSandbox.loadAddressesByOrganization(this.organizationId);
    }
  }

  getCategoryName(categoryId) {
    if (this.categories && this.categories.length > 0) {
      return this.categories.find((c) => c.id === categoryId).name;
    }
  }

  isItemCategorySelected(category: CategoryModel) {
    return this.selectedItemCategories.indexOf(category) === -1;
  }

  removeDonationRequestItem(donationRequestItemTarget: DonationRequestItemModel) {
    this.donationRequestItems = this.donationRequestItems.filter((item) => item !== donationRequestItemTarget);
  }

  validateForm() {
    this.validateFormGroup(this.donationRequestFormGroup);
    if (this.donationRequestFormGroup.valid) {
      this.buildDonationRequest();
      this.validationResult.emit(this.donationRequest);
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
      donationRequestItem.unitId = this.donationRequestItemFormGroup.controls.unitFormControl.value;
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
    donationRequestForm.organizationId = this.organizationId;
    donationRequestForm.addressId = this.addressId;
    donationRequestForm.priority = this.priority;
    donationRequestForm.finishDate = this.finishDate;
    donationRequestForm.donationRequestItems = this.donationRequestItems;
    donationRequestForm.statusId = this.statusId;
    donationRequestForm.ownerId = this.ownerId;

    if (this.donationRequest.id) {
      donationRequestForm.id = this.donationRequest.id;
      donationRequestForm.createdBy = this.donationRequest.createdBy;
      donationRequestForm.createdDate = this.donationRequest.createdDate;
    }
    this.donationRequest = donationRequestForm;
  }

  private unregisterEvents() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
