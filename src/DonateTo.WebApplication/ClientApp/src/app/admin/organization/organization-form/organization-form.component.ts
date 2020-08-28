import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AddressModel, ContactModel, OrganizationModel } from '../../../shared/models';
import { OrganizationSandbox } from '../organization-sandbox';
import { OrganizationStepAddressComponent } from './organization-step-address/organization-step-address.component';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataUpdatedService } from 'src/app/shared/async-services/data-updated.service';
import { OrganizationStepGeneralInformationComponent } from './organization-step-general-information/organization-step-general-information.component';
import { NzTabsCanDeactivateFn } from 'ng-zorro-antd';
import { OrganizationStepContactComponent } from './organization-step-contact/organization-step-contact.component';

@Component({
  selector: 'app-organization-form',
  templateUrl: './organization-form.component.html',
  styleUrls: ['./organization-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationFormComponent implements OnInit {
  @ViewChild(OrganizationStepGeneralInformationComponent)
  private organizationStepGeneralInformationComponent: OrganizationStepGeneralInformationComponent;

  @ViewChild(OrganizationStepContactComponent)
  private organizationStepContactComponent: OrganizationStepContactComponent;

  @ViewChild(OrganizationStepAddressComponent)
  private organizationStepAddressComponent: OrganizationStepAddressComponent;

  @Input() id: number;
  @Output() validationResult = new EventEmitter<OrganizationModel>();

  // Step status
  currentStep = 0;
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
  dataSaved = false;
  viewAddAddressWarning = false;

  // Tabs
  generalInformationTabDisabled = false;
  tabs = [
    {
      disabled: false,
      name: 'Admin.Organization.OrganizationSteps.GeneralInformation.GeneralInformation',
      icon: 'info-circle',
      currentStep: 0,
    },
    {
      disabled: false,
      name: 'Admin.Organization.OrganizationSteps.Contact.Owner',
      icon: 'user',
      currentStep: 1,
    },
    {
      disabled: false,
      name: 'Admin.Organization.OrganizationSteps.Address.StepTitle',
      icon: 'home',
      currentStep: 2,
    },
  ];

  constructor(
    public organizationSandbox: OrganizationSandbox,
    private router: Router,
    private dataUpdated: DataUpdatedService
  ) {}

  ngOnInit(): void {
    if (this.id !== 0) {
      this.organizationSandbox.loadOrganization(this.id);

      this.subscriptions.push(
        this.organizationSandbox.organization$.subscribe((o) => {
          this.organization = o;
        })
      );

      this.isEditOrganization = true;
    }

    this.dataUpdated.currentStatus.subscribe((dataSaved) => (this.dataSaved = dataSaved));
  }

  done(): void {
    this.setOrganization();

    if (this.organization.addresses.length > 0) {
      if (this.organization.id) {
        this.organizationSandbox.updateOrganization(this.organization);
        this.dataUpdated.changeMessage(true);
      } else {
        this.organizationSandbox.addOrganization(this.organization);
        this.dataUpdated.changeMessage(true);
      }

      this.router.navigate(['/admin/organizations']);
    } else {
      this.viewAddAddressWarning = true;
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

    for (let i = 0; i < addressesFromModel.length; i++) {
      addressesFromModel[i] = {
        ...addressesFromModel[i],
        country: null,
        city: null,
        state: null,
      };
    }

    this.organization = {
      ...this.organization,
      name: this.generalInformationModel.name,
      description: this.generalInformationModel.description,
      contact: this.contactModel,
      addresses: addressesFromModel,
    };

    return this.organization;
  }

  canDeactivate: NzTabsCanDeactivateFn = (fromIndex: number, toIndex: number) => {
    switch (fromIndex) {
      case 0:
        if (this._isGeneralInformationStepReady) {
          if (toIndex === 2 && this._isContactStepReady) {
            this.currentStep = toIndex;
            return toIndex === 2;
          }
          this.currentStep = 1;
          return toIndex === 1;
        } else {
          this.organizationStepGeneralInformationComponent.validateForm();
          this.currentStep = 0;
          return toIndex === 0;
        }
      case 1:
        if (toIndex === 0) {
          this.currentStep = 0;
          return toIndex === 0;
        }

        if (toIndex === 2 && this._isContactStepReady) {
          this.currentStep = 2;
          return toIndex === 2;
        } else {
          this.organizationStepContactComponent.validateForm();
          this.currentStep = 1;
          return toIndex === 1;
        }
      case 2:
        this.currentStep = toIndex;
        return true;
      default:
        return true;
    }
    // tslint:disable-next-line: semicolon
  };
}
