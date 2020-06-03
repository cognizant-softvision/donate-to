import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DonationSandbox } from 'src/app/donation/donation.sandbox';

@Component({
  selector: 'app-donation-confirm',
  templateUrl: './donation-confirm.component.html',
  styleUrls: ['./donation-confirm.component.css'],
})
export class DonationConfirmComponent implements OnInit {
  constructor(public donationSandbox: DonationSandbox) {}

  currentStep = 0;

  _isResponsableStepReady = false;
  _isAddressStepReady = false;
  _isFinishStepReady = false;

  stepsData: boolean[] = [];

  @Output() showDonationConfirmModal = new EventEmitter<boolean>();

  isResponsableStepReady(value: boolean) {
    this._isResponsableStepReady = value;
    this.updateStepsData();
  }

  isAddressStepReady(value: boolean) {
    this._isAddressStepReady = value;
    this.updateStepsData();
  }

  isFinishStepReady(value: boolean) {
    this._isFinishStepReady = value;
    this.updateStepsData();
  }

  ngOnInit(): void {}

  updateStepsData(): void {
    this.stepsData = [this._isResponsableStepReady, this._isAddressStepReady, this._isFinishStepReady];
  }

  next() {
    if (this.stepsData[this.currentStep]) {
      this.currentStep += 1;
    }
  }

  prev() {
    this.currentStep === 0 ? this.showDonationConfirmModal.emit(false) : (this.currentStep -= 1);
  }
}
