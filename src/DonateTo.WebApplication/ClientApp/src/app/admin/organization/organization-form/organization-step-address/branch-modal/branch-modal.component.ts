import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AddressModel, ContactModel, OrganizationModel } from 'src/app/shared/models';
import { OrganizationSandbox } from '../../../organization-sandbox';
import { Router } from '@angular/router';
import { DataUpdatedService } from 'src/app/shared/async-services/data-updated.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-branch-modal',
  templateUrl: './branch-modal.component.html',
  styleUrls: ['./branch-modal.component.css'],
})
export class BranchModalComponent implements OnInit {
  @Input() id: number;
  @Input() isBranchEdit: boolean;
  @Output() validationResult = new EventEmitter<OrganizationModel>();
  @Output() saveDone: EventEmitter<any> = new EventEmitter<any>();
  @Output() editDone: EventEmitter<any> = new EventEmitter<any>();

  // Step status
  currentStep = 0;
  statusContact = 'wait';
  statusAddress = 'process';
  nextStepDisabled = true;
  submitBranchDisabled = true;
  contactForBranch = true;

  // Child component form
  @Input() contactModel: ContactModel;
  @Input() addressModel: AddressModel;
  @Input() addressId: number;

  _isContactStepReady = false;
  _isAddressStepReady = false;
  stepsData: boolean[] = [];

  dataSaved = false;

  constructor(
    public organizationSandbox: OrganizationSandbox,
    private router: Router,
    private dataUpdated: DataUpdatedService
  ) {}

  ngOnInit(): void {
    this.dataUpdated.currentStatus.subscribe((dataSaved) => (this.dataSaved = dataSaved));
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
    this.saveDone.emit();
  }

  edit(): void {
    let editedModel = new AddressModel();
    editedModel = this.addressModel;
    editedModel.id = this.addressId;
    editedModel.contact = this.contactModel;
    this.editDone.emit(editedModel);
  }

  changeStatus() {
    switch (this.currentStep) {
      case 0: {
        this.statusContact = 'process';
        this.statusAddress = 'wait';
        break;
      }
      case 1: {
        this.statusContact = 'finish';
        this.statusAddress = 'process';
        break;
      }
    }
  }

  updateStepsData(): void {
    this.stepsData = [this._isAddressStepReady, this._isContactStepReady];

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
          this.submitBranchDisabled = false;
        } else {
          this.submitBranchDisabled = true;
        }
        break;
      }
      default: {
        this.nextStepDisabled = true;
      }
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
}
