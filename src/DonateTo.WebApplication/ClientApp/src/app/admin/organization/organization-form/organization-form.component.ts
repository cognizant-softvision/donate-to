import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AddressModel, ContactModel, OrganizationModel } from 'src/app/shared/models';
import { OrganizationSandbox } from '../organization-sandbox';
import { OrganizationStepAddressComponent } from './organization-step-address/organization-step-address.component';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-organization-form',
  templateUrl: './organization-form.component.html',
  styleUrls: ['./organization-form.component.css'],
})
export class OrganizationFormComponent implements OnInit {
  @ViewChild(OrganizationStepAddressComponent)
  private organizationStepAddressComponent: OrganizationStepAddressComponent;

  @Input() id: number;
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
  subscriptions: Subscription[] = [];

  _isGeneralInformationStepReady = false;
  _isContactStepReady = false;
  _isAddressStepReady = false;
  stepsData: boolean[] = [];

  isEditOrganization = false;
  organization: OrganizationModel;

  constructor(public organizationSandbox: OrganizationSandbox, private router: Router) {}

  ngOnInit(): void {
    if (this.id !== 0) {
      this.organizationSandbox.loadOrganization(this.id);

      this.subscriptions.push(
        this.organizationSandbox.organization$.subscribe((o) => {
          this.organization = o;
        })
      );
    }
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
    if (this.organization.id && this.organization.id !== 0) {
      this.setOrganization();
      this.organizationSandbox.updateOrganization(this.organization);
    } else {
      this.setOrganization();
      this.organizationSandbox.addOrganization(this.organization);
    }

    this.goBack();
  }

  goBack() {
    this.router.navigate(['/admin/organizations']);
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

  setOrganization() {
    let addressesFromModel: AddressModel[] = [];
    addressesFromModel = this.organizationStepAddressComponent.addresses;

    this.organization = {
      ...this.organization,
      name: this.generalInformationModel.name,
      description: this.generalInformationModel.description,
      contact: this.contactModel,
      addresses: addressesFromModel,
    };

    return this.organization;
  }
}
