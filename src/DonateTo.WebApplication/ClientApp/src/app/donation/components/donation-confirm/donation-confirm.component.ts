import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { DonationSandbox } from 'src/app/donation/donation.sandbox';
import { ContactModel } from 'src/app/shared/models/contact.model';
import { AddressModel, DonationRequestItemModel, DonationRequestModel } from 'src/app/shared/models';
import { DonationStepResponsableComponent } from './donation-step-responsable/donation-step-responsable.component';
import { DonationModel } from 'src/app/shared/models/donation.model';
import { Subscription } from 'rxjs';
import { DonationStepAddressComponent } from './donation-step-address/donation-step-address.component';
import { DonationStepFinishComponent } from './donation-step-finish/donation-step-finish.component';
import { DonationItemModel } from 'src/app/shared/models/donation-item.model';

@Component({
  selector: 'app-donation-confirm',
  templateUrl: './donation-confirm.component.html',
  styleUrls: ['./donation-confirm.component.css'],
})
export class DonationConfirmComponent implements OnInit, OnDestroy {
  constructor(public donationSandbox: DonationSandbox) {}

  @ViewChild(DonationStepResponsableComponent)
  private donationStepResponsableComponent: DonationStepResponsableComponent;

  @ViewChild(DonationStepAddressComponent)
  private donationStepAddressComponent: DonationStepAddressComponent;

  @ViewChild(DonationStepFinishComponent)
  private donationStepFinishComponent: DonationStepFinishComponent;

  currentStep = 0;

  _isResponsableStepReady = false;
  _isAddressStepReady = false;
  _isFinishStepReady = true;

  donationItems: DonationItemModel[] = [];

  stepsData: boolean[] = [];

  contactModel: ContactModel = new ContactModel();
  addressModel: AddressModel = new AddressModel();
  observation: string;

  subscriptions: Subscription[] = [];

  donation: DonationRequestModel;

  @Output() showDonationConfirmModal = new EventEmitter<boolean>();

  isResponsableStepReady(value: boolean) {
    this._isResponsableStepReady = value;
    this.contactModel = this.donationStepResponsableComponent.getContactFormModel();
    this.updateStepsData();
  }

  isAddressStepReady(value: boolean) {
    this._isAddressStepReady = value;
    this.addressModel = this.donationStepAddressComponent.getAddressFormModel();
    this.updateStepsData();
  }

  isFinishStepReady(value: boolean) {
    this._isFinishStepReady = value;
    this.observation = this.donationStepFinishComponent.observation;
    this.updateStepsData();
  }

  ngOnInit(): void {
    this.registerEvents();
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
      this.donationSandbox.donationRequest$.subscribe((donationRequest) => {
        this.donation = donationRequest;
      })
    );
  }

  donate(): void {
    const donation: DonationModel = new DonationModel();

    donation.observation = this.observation;
    donation.donationRequestId = this.donation.id;
    donation.statusId = 1;
    donation.address = new AddressModel();
    Object.assign(donation.address, this.addressModel);
    donation.address.contact = new ContactModel();
    Object.assign(donation.address.contact, this.contactModel);

    donation.donationItems = this.donationItems.map((item) => {
      const donationItem: DonationRequestItemModel = new DonationRequestItemModel();
      Object.assign(donationItem, item.item);
      donationItem.unit = null;
      donationItem.currentQuantity += item.quantityToDonate;
      return donationItem;
    });

    this.donationSandbox.addDonation(donation);
  }

  updateStepsData(): void {
    this.stepsData = [this._isResponsableStepReady, this._isAddressStepReady, this._isFinishStepReady];
  }

  done(): void {
    this.donate();
  }

  next() {
    if (this.currentStep < 2 && this.stepsData[this.currentStep]) {
      this.currentStep += 1;
    }
  }

  prev() {
    this.currentStep === 0 ? this.showDonationConfirmModal.emit(false) : (this.currentStep -= 1);
  }
}
