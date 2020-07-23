import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import {
  AddressModel,
  CityModel,
  ContactModel,
  CountryModel,
  OrganizationModel,
  StateModel,
} from 'src/app/shared/models';
import { OrganizationSandbox } from '../organization-sandbox';
import { OrganizationStepGeneralInformationComponent } from './organization-step-general-information/organization-step-general-information.component';
import { OrganizationStepContactComponent } from './organization-step-contact/organization-step-contact.component';
import { OrganizationStepAddressComponent } from './organization-step-address/organization-step-address.component';

@Component({
  selector: 'app-organization-form',
  templateUrl: './organization-form.component.html',
  styleUrls: ['./organization-form.component.css'],
})
export class OrganizationFormComponent implements OnInit, OnDestroy {
  @ViewChild(OrganizationStepGeneralInformationComponent)
  private organizationStepGeneralInformationComponent: OrganizationStepGeneralInformationComponent;

  @ViewChild(OrganizationStepContactComponent)
  private organizationStepContactComponent: OrganizationStepContactComponent;

  @ViewChild(OrganizationStepAddressComponent)
  private organizationStepAddressComponent: OrganizationStepAddressComponent;

  @Input() organization: OrganizationModel;
  @Output() validationResult = new EventEmitter<OrganizationModel>();

  // Step status
  currentStep = 0;
  statusGeneralInformation = 'process';
  statusContact = 'wait';
  statusAddress = 'wait';
  nextStepDisabled = true;

  // Child component form
  generalInformationModel: OrganizationModel = new OrganizationModel();
  contactModel: ContactModel = new ContactModel();
  addressModel: AddressModel = new AddressModel();
  addresses: AddressModel[] = [];

  _isGeneralInformationStepReady = false;
  _isContactStepReady = false;
  _isAddressStepReady = false;
  stepsData: boolean[] = [];

  organizationToSubmit = new OrganizationModel();

  constructor(public organizationSandbox: OrganizationSandbox) {}

  ngOnInit(): void {
    this.registerEvents();
  }

  ngOnDestroy(): void {
    this.unregisterEvents();
  }

  registerEvents() {}

  unregisterEvents() {
    // this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  prev(): void {
    this.currentStep -= 1;
    this.changeStatus();
  }

  next(): void {
    this.currentStep += 1;
    this.changeStatus();
    this.nextStepDisabled = true;
  }

  done(): void {
    this.organizationToSubmit = this.createOrganization();
    this.organizationSandbox.addOrganization(this.organizationToSubmit);
  }

  changeStatus() {
    switch (this.currentStep) {
      case 0: {
        this.statusGeneralInformation = 'process';
        this.statusContact = 'wait';
        this.statusAddress = 'wait';
        break;
      }
      case 1: {
        this.statusGeneralInformation = 'finish';
        this.statusContact = 'process';
        this.statusAddress = 'wait';
        break;
      }
      case 2: {
        this.statusGeneralInformation = 'finish';
        this.statusContact = 'finish';
        this.statusAddress = 'process';
        break;
      }
    }
  }

  updateStepsData(): void {
    this.stepsData = [this._isGeneralInformationStepReady, this._isContactStepReady, this._isAddressStepReady];

    switch (this.currentStep) {
      case 0: {
        if (this.stepsData[0] === true) {
          this.nextStepDisabled = false;
        } else {
          this.nextStepDisabled = true;
        }
        break;
      }
      case 1: {
        if (this.stepsData[1] === true) {
          this.nextStepDisabled = false;
        } else {
          this.nextStepDisabled = true;
        }
        break;
      }
      case 2: {
        if (this.stepsData[2] === true) {
          this.nextStepDisabled = false;
        } else {
          this.nextStepDisabled = true;
        }
        break;
      }
      default: {
        this.nextStepDisabled = true;
      }
    }
  }

  isGeneralInformationStepReady(event) {
    if (event) {
      this._isGeneralInformationStepReady = event.value;
      this.generalInformationModel = event.generalInformationFormModel;
      this.updateStepsData();
    }
  }

  isContactStepReady(event) {
    if (event) {
      this._isContactStepReady = event.value;
      this.contactModel = event.contactFormModel;
      this.updateStepsData();
    }
  }

  isAddressStepReady(event) {
    if (event) {
      this._isAddressStepReady = event.value;
      this.addressModel = event.addressFormModel;
      this.updateStepsData();
    }
  }

  createOrganization(): OrganizationModel {
    const organization = new OrganizationModel();
    const contact = new ContactModel();
    let addresses: AddressModel[] = [];
    let addressesFromModel: AddressModel[] = [];
    addressesFromModel = this.organizationStepAddressComponent.addresses;

    addressesFromModel.forEach((a) => {
      const newAddress = new AddressModel();
      const country = new CountryModel();
      const state = new StateModel();
      const city = new CityModel();

      country.name = a.country?.name;
      state.name = a.state?.name;
      city.name = a.city?.name;

      newAddress.street = a.street;
      newAddress.postalCode = a.postalCode;
      newAddress.floor = a.postalCode;
      newAddress.appartment = a.appartment;
      newAddress.additionalInformation = a.additionalInformation;

      newAddress.country = country;
      newAddress.countryId = a.countryId;
      newAddress.stateId = a.stateId;
      newAddress.state = a.state;
      newAddress.cityId = a.cityId;
      newAddress.city = a.city;
      newAddress.contact = a.contact;
      newAddress.contactId = a.contactId;

      addresses = [...addresses, newAddress];
    });

    contact.firstName = this.contactModel.firstName;
    contact.lastName = this.contactModel.lastName;
    contact.email = this.contactModel.email;
    contact.identityNumber = this.contactModel.identityNumber;
    contact.phoneNumber = this.contactModel.phoneNumber;
    contact.position = this.contactModel.position;

    organization.name = this.generalInformationModel.name;
    organization.description = this.generalInformationModel.description;
    organization.contact = contact;
    organization.addresses = addresses;

    return organization;
  }
}
