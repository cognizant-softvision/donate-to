import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { DonationItemModel } from 'src/app/shared/models/donation-item.model';
import { DonationSandbox } from 'src/app/donation/donation.sandbox';
import { AvailabilityModel } from 'src/app/shared/models/availability.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-donation-step-finish',
  templateUrl: './donation-step-finish.component.html',
  styleUrls: ['./donation-step-finish.component.css'],
})
export class DonationStepFinishComponent implements OnInit, OnDestroy {
  @Input() donationItems: DonationItemModel[];
  @Output() isFormValid = new EventEmitter<boolean>();

  observation: string;

  subscriptions: Subscription[] = [];

  availabilities: AvailabilityModel[] = [];

  weekDays = [
    { dayOfWeek: 2, description: 'Monday' },
    { dayOfWeek: 3, description: 'Tuesday' },
    { dayOfWeek: 4, description: 'Wednesday' },
    { dayOfWeek: 5, description: 'Thursday' },
    { dayOfWeek: 6, description: 'Friday' },
  ];

  finishStepFormGroup = new FormGroup({
    weekDayFormControl: new FormControl('', Validators.required),
    startTimeFormControl: new FormControl(null, Validators.required),
    finishTimeFormControl: new FormControl(null, Validators.required),
  });

  constructor(public donationSandbox: DonationSandbox) {}
  ngOnInit(): void {}

  dayOfWeekDescription(dayOfWeek: number): string {
    return this.weekDays.find((weekDay) => weekDay.dayOfWeek === dayOfWeek).description;
  }

  addAvailabilityToList(): void {
    this.validateFormGroup(this.finishStepFormGroup);
    if (this.finishStepFormGroup.valid) {
      const availability: AvailabilityModel = new AvailabilityModel();
      availability.dayOfWeek = this.finishStepFormGroup.controls.weekDayFormControl.value;
      availability.startTime = this.finishStepFormGroup.controls.startTimeFormControl.value;
      availability.endTime = this.finishStepFormGroup.controls.finishTimeFormControl.value;
      this.availabilities = [...this.availabilities, availability];
      this.finishStepFormGroup.reset();
    }
  }

  removeAvailability(availability: AvailabilityModel): void {
    this.availabilities = this.availabilities.filter((item) => item !== availability);
  }

  validateFormGroup(formGroup: FormGroup) {
    for (const i in formGroup.controls) {
      if (formGroup.controls.hasOwnProperty(i)) {
        formGroup.controls[i].markAsDirty();
        formGroup.controls[i].updateValueAndValidity();
      }
    }
  }

  isValidForm(): boolean {
    return this.finishStepFormGroup.valid;
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
      this.finishStepFormGroup.valueChanges.subscribe(() => this.isFormValid.emit(this.isValidForm()))
    );
  }
}
