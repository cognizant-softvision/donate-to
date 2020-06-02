import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-donation-step-address',
  templateUrl: './donation-step-address.component.html',
  styleUrls: ['./donation-step-address.component.css'],
})
export class DonationStepAddressComponent implements OnInit {
  validateForm: FormGroup;

  submitForm(value: { userName: string; email: string; password: string; confirm: string; comment: string }): void {
    for (const key in this.validateForm.controls) {
      if (key) {
        this.validateForm.controls[key].markAsDirty();
        this.validateForm.controls[key].updateValueAndValidity();
      }
    }
    console.log(value);
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      if (key) {
        this.validateForm.controls[key].markAsPristine();
        this.validateForm.controls[key].updateValueAndValidity();
      }
    }
  }

  validateConfirmPassword(): void {
    setTimeout(() => this.validateForm.controls.confirm.updateValueAndValidity());
  }

  constructor(private fb: FormBuilder) {
    this.validateForm = this.fb.group({
      street: ['', [Validators.required]],
      postalCode: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirm: ['', [Validators.required]],
      comment: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {}
}
