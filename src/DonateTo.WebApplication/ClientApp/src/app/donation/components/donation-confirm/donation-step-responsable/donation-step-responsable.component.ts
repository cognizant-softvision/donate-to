import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-donation-step-responsable',
  templateUrl: './donation-step-responsable.component.html',
  styleUrls: ['./donation-step-responsable.component.css'],
})
export class DonationStepResponsableComponent implements OnInit {
  responsableStepForm: FormGroup;

  @Output() isFormValid = new EventEmitter<boolean>();

  constructor(private fb: FormBuilder) {
    const { required, email } = Validators;
    this.responsableStepForm = this.fb.group({
      firstName: ['', [required]],
      lastName: ['', [required]],
      identityNumber: ['', [required]],
      phoneNumber: ['', [required]],
      email: ['', [required, email]],
      position: ['', [required]],
    });
  }

  ngOnInit(): void {
    this.responsableStepForm.valueChanges.subscribe(() => this.isFormValid.emit(this.isValidForm()));
  }

  validateForm(): void {
    for (const key in this.responsableStepForm.controls) {
      if (key) {
        this.responsableStepForm.controls[key].markAsDirty();
        this.responsableStepForm.controls[key].updateValueAndValidity();
      }
    }
  }

  isValidForm(): boolean {
    return this.responsableStepForm.valid;
  }
}
