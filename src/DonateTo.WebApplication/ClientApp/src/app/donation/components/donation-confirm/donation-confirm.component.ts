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

  @Output() showDonationConfirmModal = new EventEmitter<boolean>();

  ngOnInit(): void {}

  next() {
    this.currentStep += 1;
  }

  prev() {
    this.currentStep === 0 ? this.showDonationConfirmModal.emit(false) : (this.currentStep -= 1);
  }
}
