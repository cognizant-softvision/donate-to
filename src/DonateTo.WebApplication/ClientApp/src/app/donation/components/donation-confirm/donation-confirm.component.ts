import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { DonationSandbox } from 'src/app/donation/donation.sandbox';
import { ContactModel } from 'src/app/shared/models/contact.model';
import { AddressModel, DonationRequestModel, Status } from 'src/app/shared/models';
import { DonationStepResponsableComponent } from './donation-step-responsable/donation-step-responsable.component';
import { DonationModel } from 'src/app/shared/models/donation.model';
import { Subscription } from 'rxjs';
import { DonationStepAddressComponent } from './donation-step-address/donation-step-address.component';
import { DonationStepFinishComponent } from './donation-step-finish/donation-step-finish.component';
import { DonationItemModel } from 'src/app/shared/models/donation-item.model';
import { AvailabilityModel } from 'src/app/shared/models/availability.model';
import { DonationStepAvailabilityComponent } from './donation-step-availability/donation-step-availability.component';

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

  @ViewChild(DonationStepAvailabilityComponent)
  private donationStepAvailabilityComponent: DonationStepAvailabilityComponent;

  currentStep = 0;
  @Input() donation: DonationModel = new DonationModel();
  @Input() isEdit: boolean;

  _isResponsableStepReady = false;
  _isAddressStepReady = false;
  _isAvailabilityStepReady = false;
  _isFinishStepReady = true;

  stepsData: boolean[] = [];

  contactModel: ContactModel = new ContactModel();
  addressModel: AddressModel = new AddressModel();
  observation: string;

  subscriptions: Subscription[] = [];

  availabilities: AvailabilityModel[] = [];

  donationRequest: DonationRequestModel;

  @Output() showDonationConfirmModal = new EventEmitter<boolean>();

  @Output() isSubmited = new EventEmitter<boolean>();
  @Input() donationItems: DonationItemModel[];

  isResponsableStepReady(event) {
    if (event) {
      this._isResponsableStepReady = event.value;
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

  isAvailabilityStepReady(event) {
    if (event) {
      this._isAvailabilityStepReady = event.value;
      this.availabilities = event.availabilities;
      this.updateStepsData();
    }
  }

  isFinishStepReady(event) {
    if (event) {
      this._isFinishStepReady = event.value;
      this.observation = event.observation;
      this.updateStepsData();
    }
  }

  ngOnInit(): void {
    this.registerEvents();
    if (this.isEdit && this.donation) {
      const donation = this.donation;
      this.observation = donation.observation;
      this.donationRequest = donation.donationRequest;
      this.addressModel = donation.address ?? new AddressModel();
      this.contactModel = donation.address.contact ?? new ContactModel();
      this.availabilities = donation.availabilities;
    }
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
        this.donationRequest = donationRequest;
      })
    );
  }

  donate(): void {
    const donation = new DonationModel();
    if (this.isEdit && this.donation) {
      Object.entries(this.donation).forEach((kv) => {
        if (['string', 'number', 'Date'].includes(typeof kv[1])) {
          donation[kv[0]] = kv[1];
        }
      });
      donation.id = this.donation.id;
      donation.statusId = this.donation.statusId;
      donation.observation = this.observation;
      donation.donationRequestId = this.donationRequest.id;
      donation.address = { ...this.addressModel };
      donation.address.contact = { ...this.contactModel };
      donation.availabilities = [...this.availabilities];
      donation.donationItems = this.donationItems.map((item) => {
        const donationItem: DonationItemModel = new DonationItemModel();
        Object.assign(donationItem, item);
        return donationItem;
      });
    } else {
      donation.observation = this.observation;
      donation.donationRequestId = this.donationRequest.id;
      donation.statusId = Status.Pending;
      donation.address = new AddressModel();
      donation.address = { ...this.addressModel };
      donation.address.contact = { ...this.contactModel };
      donation.availabilities = [...this.availabilities];
      donation.donationItems = this.donationItems.map((item) => {
        const donationItem: DonationItemModel = new DonationItemModel();
        Object.assign(donationItem, item);
        donationItem.unit = null;
        donationItem.donationRequestItem = null;
        donationItem.statusId = Status.Pending;
        return donationItem;
      });
    }
    this.isSubmited.emit(true);

    console.log('Donation to submit', donation);
    if (this.isEdit) {
      this.donationSandbox.updateDonation(donation);
    } else {
      this.donationSandbox.addDonation(donation);
    }
  }

  updateStepsData(): void {
    this.stepsData = [
      this._isResponsableStepReady,
      this._isAddressStepReady,
      this._isAvailabilityStepReady,
      this._isFinishStepReady,
    ];
  }

  done(): void {
    this.donate();
  }

  next() {
    if (this.currentStep < 3 && this.stepsData[this.currentStep]) {
      this.currentStep += 1;
    }
  }

  prev() {
    this.currentStep === 0 ? this.showDonationConfirmModal.emit(false) : (this.currentStep -= 1);
  }
}
