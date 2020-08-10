import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrganizationSandbox } from 'src/app/admin/organization/organization-sandbox';
import { AddressModel, CityModel, CountryModel, StateModel } from 'src/app/shared/models';
import { Subscription } from 'rxjs';
import { OrganizationStepContactComponent } from '../../../organization-step-contact/organization-step-contact.component';

@Component({
  selector: 'app-step-branch-address',
  templateUrl: './step-branch-address.component.html',
  styleUrls: ['./step-branch-address.component.css'],
})
export class StepBranchAddressComponent implements OnInit, OnDestroy {
  @ViewChild(OrganizationStepContactComponent)
  private organizationStepContactComponent: OrganizationStepContactComponent;

  @Output() isFormValid = new EventEmitter();

  addressStepForm: FormGroup;
  @Input() addressModel: AddressModel;

  subscriptions: Subscription[] = [];
  countries: CountryModel[] = [];
  states: StateModel[] = [];
  cities: CityModel[] = [];

  street = '';
  postalCode = '';
  floor = '';
  appartment = '';
  country = 0;
  state = 0;
  city = 0;
  additionalInformation = '';
  addressId = 0;

  isEditAddress = false;

  constructor(private fb: FormBuilder, public organizationSandbox: OrganizationSandbox) {}

  ngOnInit(): void {
    this.addressStepForm = this.fb.group({
      street: [this.addressModel?.street, [Validators.required]],
      postalCode: [this.addressModel?.postalCode, [Validators.required]],
      floor: [this.addressModel?.floor],
      appartment: [this.addressModel?.appartment],
      additionalInformation: [this.addressModel?.additionalInformation],
      countryId: [this.addressModel?.countryId, [Validators.required, Validators.min(1)]],
      stateId: [this.addressModel?.stateId, [Validators.required, Validators.min(1)]],
      cityId: [this.addressModel?.cityId, [Validators.required, Validators.min(1)]],
    });

    this.registerEvents();
    this.organizationSandbox.loadCountries();
    this.street = this.addressModel?.street;
    this.postalCode = this.addressModel?.postalCode;
    this.appartment = this.addressModel?.appartment;
    this.additionalInformation = this.addressModel?.additionalInformation;
    this.country = this.addressModel?.countryId;
    this.state = this.addressModel?.stateId;
    this.city = this.addressModel?.cityId;
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
      this.addressStepForm.valueChanges.subscribe(() =>
        this.isFormValid.emit({ value: this.isValidForm(), addressFormModel: this.getAddressFormModel() })
      )
    );

    this.subscriptions.push(this.organizationSandbox.countries$.subscribe((countries) => (this.countries = countries)));

    this.subscriptions.push(this.organizationSandbox.states$.subscribe((states) => (this.states = states)));

    this.subscriptions.push(this.organizationSandbox.cities$.subscribe((cities) => (this.cities = cities)));
  }

  validateForm(): void {
    for (const key in this.addressStepForm.controls) {
      if (this.addressStepForm.controls.hasOwnProperty(key)) {
        this.addressStepForm.controls[key].markAsDirty();
        this.addressStepForm.controls[key].updateValueAndValidity();
      }
    }

    this.organizationStepContactComponent.validateForm();
  }

  isValidForm(): boolean {
    return this.addressStepForm.valid;
  }

  setStates(): void {
    if (!this.addressStepForm.value.countryId) {
      this.addressStepForm.value.cityId = null;
      this.addressStepForm.value.stateId = null;
    } else {
      this.organizationSandbox.loadStatesByCountry(this.addressStepForm.value.countryId);
    }
  }

  setCities(): void {
    if (!this.addressStepForm.value.stateId) {
      this.addressStepForm.value.cityId = null;
    } else {
      this.organizationSandbox.loadCitiesByState(this.addressStepForm.value.stateId);
    }
  }

  getAddressFormModel(): AddressModel {
    const addressModel: AddressModel = new AddressModel();

    addressModel.id = this.addressId;
    addressModel.street = this.addressStepForm.value.street;
    addressModel.postalCode = this.addressStepForm.value.postalCode;
    addressModel.floor = this.addressStepForm.value.floor;
    addressModel.appartment = this.addressStepForm.value.appartment;
    addressModel.additionalInformation = this.addressStepForm.value.additionalInformation;

    addressModel.countryId = this.addressStepForm.value.countryId;
    addressModel.country = this.getCountry(addressModel.countryId);

    addressModel.stateId = this.addressStepForm.value.stateId;
    addressModel.state = this.getState(addressModel.stateId);

    addressModel.cityId = this.addressStepForm.value.cityId;
    addressModel.city = this.getCity(addressModel.cityId);
    return addressModel;
  }

  getCountry(countryId: number): CountryModel {
    let country = new CountryModel();
    if (countryId) {
      return (country = {
        ...country,
        name: this.countries.find((c) => c.id === countryId)?.name,
      });
    }
  }

  getState(stateId: number): StateModel {
    let state = new StateModel();
    if (stateId) {
      return (state = {
        ...state,
        name: this.states.find((s) => s.id === stateId)?.name,
      });
    }
  }

  getCity(cityId: number): CityModel {
    let city = new CityModel();
    if (cityId) {
      return (city = {
        ...city,
        name: this.cities.find((c) => c.id === cityId)?.name,
      });
    }
  }
}
