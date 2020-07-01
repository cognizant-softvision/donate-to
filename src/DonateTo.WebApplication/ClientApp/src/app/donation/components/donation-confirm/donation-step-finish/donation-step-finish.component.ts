import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { DonationItemModel } from 'src/app/shared/models/donation-item.model';
import { DonationSandbox } from 'src/app/donation/donation.sandbox';
import { AvailabilityModel } from 'src/app/shared/models/availability.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { WeekDays } from 'src/app/shared/enum/weekdays';
import { compareDate, CompareDateResult } from 'src/app/shared/utility/dates/compare-dates';

@Component({
  selector: 'app-donation-step-finish',
  templateUrl: './donation-step-finish.component.html',
  styleUrls: ['./donation-step-finish.component.css'],
})
export class DonationStepFinishComponent implements OnInit, OnDestroy {
  @Input() donationItems: DonationItemModel[];
  @Output() isFormValid = new EventEmitter();

  @Input() observation: string;

  subscriptions: Subscription[] = [];

  @Input() availabilities: AvailabilityModel[] = [];

  weekDays = [
    { dayOfWeek: WeekDays.Monday, description: this.translateService.instant('WeekDays.Monday') },
    { dayOfWeek: WeekDays.Tuesday, description: this.translateService.instant('WeekDays.Tuesday') },
    { dayOfWeek: WeekDays.Wednesday, description: this.translateService.instant('WeekDays.Wednesday') },
    { dayOfWeek: WeekDays.Thursday, description: this.translateService.instant('WeekDays.Thursday') },
    { dayOfWeek: WeekDays.Friday, description: this.translateService.instant('WeekDays.Friday') },
  ];

  constructor(
    public donationSandbox: DonationSandbox,
    public translateService: TranslateService,
    private fb: FormBuilder
  ) {
    this.finishStepFormGroup = this.fb.group({
      weekDayFormControl: new FormControl('', Validators.required),
      startTimeFormControl: new FormControl(null, [Validators.required, this.startTimeValidator.bind(this)]),
      finishTimeFormControl: new FormControl(null, [Validators.required, this.finishTimeValidator.bind(this)]),
    });
  }

  ngOnInit(): void {
    this.registerEvents();
    if (this.availabilities.length > 0) {
      this.isFormValid.emit(
        this.isFormValid.emit({ value: true, observation: this.observation, availabilities: this.availabilities })
      );
    }
  }

  startTimeValidator(control: FormControl): { [s: string]: boolean } {
    if (!control.value) {
      return { error: true, required: true };
    } else if (
      (control.parent as FormGroup).controls?.finishTimeFormControl?.value &&
      compareDate(control.value, (control.parent as FormGroup).controls?.finishTimeFormControl?.value) ===
        CompareDateResult.Greater
    ) {
      return { greater: true, error: true };
    }
    return {};
  }

  finishTimeValidator(control: FormControl): { [s: string]: boolean } {
    if (!control.value) {
      return { error: true, required: true };
    } else if (
      (control.parent as FormGroup).controls?.startTimeFormControl?.value &&
      compareDate(control.value, (control.parent as FormGroup).controls?.startTimeFormControl?.value) ===
        CompareDateResult.Less
    ) {
      return { greater: true, error: true };
    }
    return {};
  }

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
      this.availabilities = [...(this.availabilities || []), availability];
      this.finishStepFormGroup.reset();
      this.isFormValid.emit(true);
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
    return (!!this.availabilities && this.availabilities.length > 0) || this.finishStepFormGroup.valid;
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
      this.finishStepFormGroup.valueChanges.subscribe(() =>
        this.isFormValid.emit(
          this.isFormValid.emit({
            value: this.isValidForm(),
            observation: this.observation,
            availabilities: this.availabilities,
          })
        )
      )
    );

    this.subscriptions.push();
  }
}
