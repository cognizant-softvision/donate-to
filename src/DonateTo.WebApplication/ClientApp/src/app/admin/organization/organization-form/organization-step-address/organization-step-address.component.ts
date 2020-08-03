import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AddressModel, CityModel, ColumnItem, ContactModel, CountryModel, StateModel } from 'src/app/shared/models';
import { Subscription } from 'rxjs';
import { OrganizationSandbox } from '../../organization-sandbox';
import { NzModalRef } from 'ng-zorro-antd';
import { OrganizationStepContactComponent } from '../organization-step-contact/organization-step-contact.component';

@Component({
  selector: 'app-organization-step-address',
  templateUrl: './organization-step-address.component.html',
  styleUrls: ['./organization-step-address.component.css'],
})
export class OrganizationStepAddressComponent implements OnInit, OnDestroy {
  addressStepForm: FormGroup;
  addresses: AddressModel[] = [];

  @Output() isFormValid = new EventEmitter();
  addressModel: AddressModel;
  @Output() outputFromChild: EventEmitter<any> = new EventEmitter<any>();
  @Input() isEditOrganization: boolean;

  @ViewChild(OrganizationStepContactComponent)
  private organizationStepContactComponent: OrganizationStepContactComponent;

  subscriptions: Subscription[] = [];
  countries: CountryModel[] = [];
  states: StateModel[] = [];
  cities: CityModel[] = [];

  contactModel: ContactModel = new ContactModel();
  item: AddressModel;
  tplModal?: NzModalRef;

  listOfColumns: ColumnItem[] = [
    { name: 'RequestDonation.DonationSteps.AddressStep.Street' },
    { name: 'RequestDonation.DonationSteps.AddressStep.PostalCode' },
    { name: 'RequestDonation.DonationSteps.AddressStep.Floor' },
    { name: 'RequestDonation.DonationSteps.AddressStep.Appartment' },
    { name: 'RequestDonation.DonationSteps.AddressStep.Country' },
    { name: 'RequestDonation.DonationSteps.AddressStep.State' },
    { name: 'RequestDonation.DonationSteps.AddressStep.City' },
    { name: 'RequestDonation.DonationSteps.AddressStep.AdditionalInformation' },
    { name: 'Admin.Action' },
  ];

  addressItemFormGroup = new FormGroup({
    itemsFormControl: new FormControl(),
  });

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

    this.organizationSandbox.organization$.subscribe((organization) => {
      if (organization) {
        this.addresses = [...organization.addresses];
      }
    });
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
    return this.addressStepForm.valid && this.organizationStepContactComponent.isValidForm();
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
    addressModel.contact = this.getContact();

    addressModel.countryId = this.addressStepForm.value.countryId;
    addressModel.country = this.getCountry(addressModel.countryId);

    addressModel.stateId = this.addressStepForm.value.stateId;
    addressModel.state = this.getState(addressModel.stateId);

    addressModel.cityId = this.addressStepForm.value.cityId;
    addressModel.city = this.getCity(addressModel.cityId);
    return addressModel;
  }

  getContact(): ContactModel {
    const contact: ContactModel = new ContactModel();

    contact.firstName = this.contactModel.firstName;
    contact.lastName = this.contactModel.lastName;
    contact.email = this.contactModel.email;
    contact.identityNumber = this.contactModel.identityNumber;
    contact.phoneNumber = this.contactModel.phoneNumber;
    contact.position = this.contactModel.position;

    return contact;
  }

  isContactStepReady(event) {
    if (event) {
      this.contactModel = event.contactFormModel;
    }
  }

  addAddress() {
    if (this.isValidForm()) {
      let newAddress = new AddressModel();
      newAddress = this.getAddressFormModel();
      this.addresses = [...this.addresses, newAddress];

      this.addressStepForm.reset();
      this.organizationStepContactComponent.responsableStepForm.reset();
    } else {
      this.organizationStepContactComponent.validateForm();
      this.validateForm();
    }
  }

  removeAddress(item: AddressModel) {
    this.addresses = this.addresses.filter((a) => a !== item);
  }

  editAddress(item: AddressModel) {
    this.isEditAddress = true;

    this.addressId = item.id;
    this.street = item.street;
    this.postalCode = item.postalCode;
    this.floor = item.floor;
    this.appartment = item.appartment;
    this.country = item.countryId;
    this.state = item.stateId;
    this.city = item.cityId;
    this.additionalInformation = item.additionalInformation;

    this.organizationStepContactComponent.firstName = item.contact.firstName;
    this.organizationStepContactComponent.lastName = item.contact.lastName;
    this.organizationStepContactComponent.identityNumber = item.contact.identityNumber;
    this.organizationStepContactComponent.email = item.contact.email;
    this.organizationStepContactComponent.phoneNumber = item.contact.phoneNumber;
    this.organizationStepContactComponent.position = item.contact.position;

    this.item = item;

    this.organizationSandbox.loadStatesByCountry(item.countryId);
    this.organizationSandbox.loadCitiesByState(item.stateId);
  }

  cancelEdit() {
    this.isEditAddress = false;
    this.addressStepForm.reset();
    this.organizationStepContactComponent.responsableStepForm.reset();
  }

  confirmEdit() {
    this.addAddress();
    this.removeAddress(this.item);
    this.isEditAddress = false;
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
