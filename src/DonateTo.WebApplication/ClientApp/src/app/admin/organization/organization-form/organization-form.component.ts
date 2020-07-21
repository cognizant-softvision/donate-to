import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { AddressModel, ContactModel, OrganizationModel } from 'src/app/shared/models';
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
  statusVerify = 'wait';
  nextStepDisabled = true;

  // Child component form
  generalInformationModel: OrganizationModel = new OrganizationModel();
  contactModel: ContactModel = new ContactModel();
  addressModel: AddressModel = new AddressModel();

  _isGeneralInformationStepReady = false;
  _isContactStepReady = false;
  _isAddressStepReady = false;
  stepsData: boolean[] = [];

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
    this.createOrganization();
  }

  changeStatus() {
    switch (this.currentStep) {
      case 0: {
        this.statusGeneralInformation = 'process';
        this.statusContact = 'wait';
        this.statusAddress = 'wait';
        this.statusVerify = 'wait';
        break;
      }
      case 1: {
        this.statusGeneralInformation = 'finish';
        this.statusContact = 'process';
        this.statusAddress = 'wait';
        this.statusVerify = 'wait';
        break;
      }
      case 2: {
        this.statusGeneralInformation = 'finish';
        this.statusContact = 'finish';
        this.statusAddress = 'process';
        this.statusVerify = 'wait';
        break;
      }
      case 3: {
        this.statusGeneralInformation = 'finish';
        this.statusContact = 'finish';
        this.statusAddress = 'finish';
        this.statusVerify = 'process';
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
      case 3: {
        if (this.stepsData[3] === true) {
          this.nextStepDisabled = true;
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

  createOrganization() {
    const organization = new OrganizationModel();
    console.log('General Information', this.generalInformationModel);
    console.log('Contact', this.contactModel);
    console.log('Address', this.addressModel);
  }
}
