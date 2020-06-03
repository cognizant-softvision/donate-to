import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-donation-step-address',
  templateUrl: './donation-step-address.component.html',
  styleUrls: ['./donation-step-address.component.css'],
})
export class DonationStepAddressComponent implements OnInit {
  addressStepForm: FormGroup;

  validateForm(): void {
    for (const key in this.addressStepForm.controls) {
      if (key) {
        this.addressStepForm.controls[key].markAsDirty();
        this.addressStepForm.controls[key].updateValueAndValidity();
      }
    }
  }

  isValidForm(): boolean {
    return this.addressStepForm.valid;
  }

  constructor(private fb: FormBuilder) {
    this.addressStepForm = this.fb.group({
      street: ['', [Validators.required]],
      postalCode: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirm: ['', [Validators.required]],
      comment: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}
}
