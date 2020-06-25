import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzI18nService } from 'ng-zorro-antd';
import { Subscription } from 'rxjs';
import { CategoryModel, ColumnItem, UserModel } from 'src/app/shared/models';
import { compareDate } from 'src/app/shared/utility/dates/compare-dates';
import { UserSandbox } from '../user.sandbox';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit, OnDestroy {
  @Input() user: UserModel;
  @Output() validationResult = new EventEmitter<UserModel>();

  private subscriptions: Subscription[] = [];
  disabledDates: (current: Date) => boolean;
  addressId: number;
  finishDate: Date;
  observations: string;
  organizationId: number;
  priority: number;
  statusId = 2;
  selectedItemCategories: CategoryModel[] = [];
  title: string;

  listOfColumns: ColumnItem[] = [
    { name: 'Admin.Donation.Table.Itemcolumn' },
    { name: 'Admin.Donation.Table.Quantitycolumn' },
    { name: 'Admin.Donation.Table.Observationcolumn' },
    { name: 'Admin.Donation.Table.Categorycolumn' },
    { name: 'Admin.Action' },
  ];

  userFormGroup = new FormGroup({
    firNameFormControl: new FormControl('', Validators.required),
    lastNameFormControl: new FormControl('', Validators.required),
    emailFormControl: new FormControl(''),
    organizationFormControl: new FormControl('', Validators.required),
    phoneFormControl: new FormControl('', Validators.required),
  });

  userItemFormGroup = new FormGroup({
    nameFormControl: new FormControl('', Validators.required),
    itemCategoryFormControl: new FormControl(this.selectedItemCategories, Validators.required),
    observationFormControl: new FormControl(),
    quantityFormControl: new FormControl('', Validators.required),
    unitFormControl: new FormControl('', Validators.required),
  });

  constructor(public userSandbox: UserSandbox, protected i18n: NzI18nService) {}

  ngOnInit(): void {
    if (this.user) {
      this.title = this.user.firstName;
    } else {
      this.user = new UserModel();
    }

    this.sandBoxSubscriptionInit();

    this.disabledDates = (current: Date): boolean => {
      return compareDate(current, new Date()) < 0;
    };
  }

  ngOnDestroy(): void {
    this.unregisterEvents();
  }
  /*
    this.donationSandbox.loadOrganizations();
    this.donationSandbox.loadCategories();
    this.donationSandbox.loadUnits();
    this.donationSandbox.loadStatus();

    this.donationRequestFormGroup.controls.itemsFormControl.setValue(this.donationRequestItems);
    this.donationRequestFormGroup.controls.itemsFormControl.setValidators(Validators.required);
  }
*/

  private sandBoxSubscriptionInit() {
    /*this.subscriptions.push(
      this.userSandbox.categories$.subscribe((categories) => {
        this.categories = categories;
      })
    );*/
  }
  /*

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
*/
  validateForm() {
    this.validateFormGroup(this.userFormGroup);
    if (this.userFormGroup.valid) {
      // this.buildDonationRequest();
      // this.validationResult.emit(this.user);
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
  /*
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

    if (this.donationRequest.id) {
      donationRequestForm.id = this.donationRequest.id;
      donationRequestForm.createdBy = this.donationRequest.createdBy;
      donationRequestForm.createdDate = this.donationRequest.createdDate;
    }
    this.donationRequest = donationRequestForm;
  }
*/
  private unregisterEvents() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
