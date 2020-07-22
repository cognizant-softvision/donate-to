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
    const address = new AddressModel();
    let addresses: AddressModel[] = [];
    console.log('General Information', this.generalInformationModel);
    console.log('Contact', this.contactModel);
    console.log('Address', this.addressModel);

    contact.firstName = this.contactModel.firstName;
    contact.lastName = this.contactModel.lastName;
    contact.email = this.contactModel.email;
    contact.identityNumber = this.contactModel.identityNumber;
    contact.phoneNumber = this.contactModel.phoneNumber;
    contact.position = this.contactModel.position;

    const country = new CountryModel();
    const state = new StateModel();
    const city = new CityModel();
    address.street = this.addressModel.street;
    address.postalCode = this.addressModel.postalCode;
    address.floor = this.addressModel.postalCode;
    address.appartment = this.addressModel.appartment;
    address.additionalInformation = this.addressModel.additionalInformation;

    address.countryId = this.addressModel.countryId;
    address.country = this.addressModel.country;
    address.stateId = this.addressModel.stateId;
    address.state = this.addressModel.state;
    address.cityId = this.addressModel.cityId;
    address.city = this.addressModel.city;
    address.contact = this.addressModel.contact;
    address.contactId = this.addressModel.contactId;
    addresses = [...addresses, address];

    organization.name = this.generalInformationModel.name;
    organization.description = this.generalInformationModel.description;
    organization.contact = contact;
    organization.addresses = addresses;

    console.log('ORGANIZATION TO CREATE', organization);
    return organization;
  }
}
