import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddressModel } from 'src/app/shared/models';
import { Subscription } from 'rxjs';
import { DonationSandbox } from 'src/app/donation/donation.sandbox';

@Component({
  selector: 'app-donation-step-address',
  templateUrl: './donation-step-address.component.html',
  styleUrls: ['./donation-step-address.component.css'],
})
export class DonationStepAddressComponent implements OnInit, OnDestroy {
  addressStepForm: FormGroup;

  @Output() isFormValid = new EventEmitter<boolean>();
  @Input() addressModel: AddressModel;

  subscriptions: Subscription[] = [];

  validateForm(): void {
    for (const key in this.addressStepForm.controls) {
      if (this.addressStepForm.controls.hasOwnProperty(key)) {
        this.addressStepForm.controls[key].markAsDirty();
        this.addressStepForm.controls[key].updateValueAndValidity();
      }
    }
  }

  isValidForm(): boolean {
    return this.addressStepForm.valid;
  }

  setStates(): void {
    if (!this.addressStepForm.value.countryId) {
      this.addressStepForm.value.cityId = null;
      this.addressStepForm.value.stateId = null;
    } else {
      this.donationSandbox.loadStatesByCountry(this.addressStepForm.value.countryId);
    }
  }

  setCities(): void {
    if (!this.addressStepForm.value.stateId) {
      this.addressStepForm.value.cityId = null;
    } else {
      this.donationSandbox.loadCitiesByState(this.addressStepForm.value.stateId);
    }
  }

  constructor(private fb: FormBuilder, public donationSandbox: DonationSandbox) {}

  getAddressFormModel(): AddressModel {
    const addressModel: AddressModel = new AddressModel();
    addressModel.street = this.addressStepForm.value.street;
    addressModel.postalCode = this.addressStepForm.value.postalCode;
    addressModel.floor = this.addressStepForm.value.floor;
    addressModel.appartment = this.addressStepForm.value.appartment;
    addressModel.additionalInformation = this.addressStepForm.value.additionalInformation;
    addressModel.cityId = this.addressStepForm.value.cityId;
    addressModel.stateId = this.addressStepForm.value.stateId;
    addressModel.countryId = this.addressStepForm.value.countryId;

    return addressModel;
  }

  ngOnInit(): void {
    this.addressStepForm = this.fb.group({
      street: [this.addressModel?.street, [Validators.required]],
      postalCode: [this.addressModel?.postalCode, [Validators.required]],
      floor: [this.addressModel?.floor],
      appartment: [this.addressModel?.appartment],
      additionalInformation: [this.addressModel?.additionalInformation],
      countryId: [this.addressModel?.countryId, [Validators.required]],
      stateId: [this.addressModel?.stateId, [Validators.required]],
      cityId: [this.addressModel?.cityId],
    });

    this.registerEvents();
    this.donationSandbox.loadCountries();
  }

  ngOnDestroy(): void {
    this.unregisterEvents();
  }

  /**
   * Unsubscribes from events
   */
  unregisterEvents() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  /**
   * Subscribes to events
   */
  registerEvents(): void {
    this.subscriptions.push(
      this.addressStepForm.valueChanges.subscribe(() => this.isFormValid.emit(this.isValidForm()))
    );
  }
}
