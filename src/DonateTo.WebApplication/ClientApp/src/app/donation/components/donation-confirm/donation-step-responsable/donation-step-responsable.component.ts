import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactModel } from 'src/app/shared/models/contact.model';

@Component({
  selector: 'app-donation-step-responsable',
  templateUrl: './donation-step-responsable.component.html',
  styleUrls: ['./donation-step-responsable.component.css'],
})
export class DonationStepResponsableComponent implements OnInit {
  responsableStepForm: FormGroup;

  @Output() isFormValid = new EventEmitter<boolean>();
  @Input() contactModel: ContactModel;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.responsableStepForm = this.fb.group({
      firstName: [this.contactModel?.firstName, [Validators.required]],
      lastName: [this.contactModel?.lastName, [Validators.required]],
      identityNumber: [this.contactModel?.identityNumber, [Validators.required]],
      phoneNumber: [this.contactModel?.phoneNumber, [Validators.required]],
      email: [this.contactModel?.email, [Validators.required, Validators.email]],
      position: [this.contactModel?.position],
    });

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

  getContactFormModel(): ContactModel {
    const contactModel: ContactModel = new ContactModel();
    contactModel.firstName = this.responsableStepForm.value.firstName;
    contactModel.lastName = this.responsableStepForm.value.lastName;
    contactModel.identityNumber = this.responsableStepForm.value.identityNumber;
    contactModel.phoneNumber = this.responsableStepForm.value.phoneNumber;
    contactModel.email = this.responsableStepForm.value.email;
    contactModel.position = this.responsableStepForm.value.position;

    return contactModel;
  }

  isValidForm(): boolean {
    return this.responsableStepForm.valid;
  }
}
