import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactModel, OrganizationModel } from 'src/app/shared/models';
import { EditOrganizationService } from 'src/app/shared/async-services/edit-organization.service';

@Component({
  selector: 'app-organization-step-contact',
  templateUrl: './organization-step-contact.component.html',
  styleUrls: ['./organization-step-contact.component.css'],
})
export class OrganizationStepContactComponent implements OnInit {
  responsableStepForm: FormGroup;

  @Output() isFormValid = new EventEmitter();
  @Input() contactModel: ContactModel;
  @Input() isEditOrganization: boolean;

  organizationToEdit: OrganizationModel;

  firstName = '';
  lastName = '';
  identityNumber = '';
  email = '';
  phoneNumber = '';
  position = '';

  constructor(private fb: FormBuilder, private data: EditOrganizationService) {}

  ngOnInit(): void {
    this.responsableStepForm = this.fb.group({
      firstName: [this.contactModel?.firstName, [Validators.required]],
      lastName: [this.contactModel?.lastName, [Validators.required]],
      identityNumber: [this.contactModel?.identityNumber, [Validators.required]],
      phoneNumber: [this.contactModel?.phoneNumber, [Validators.required]],
      email: [this.contactModel?.email, [Validators.required, Validators.email]],
      position: [this.contactModel?.position],
    });

    if (this.isEditOrganization) {
      this.data.currentOrganization.subscribe((x) => {
        this.firstName = x?.contact?.firstName;
        this.lastName = x?.contact?.lastName;
        this.identityNumber = x?.contact?.identityNumber;
        this.email = x?.contact?.email;
        this.phoneNumber = x?.contact?.phoneNumber;
        this.position = x?.contact?.position;
      });
    }

    if (this.contactModel.id) {
      this.validateForm();
      this.isFormValid.emit(
        this.isFormValid.emit({ value: this.isValidForm(), contactFormModel: this.getContactFormModel() })
      );
    }

    this.responsableStepForm.valueChanges.subscribe(() =>
      this.isFormValid.emit(
        this.isFormValid.emit({ value: this.isValidForm(), contactFormModel: this.getContactFormModel() })
      )
    );

    this.data.currentOrganization.subscribe((x) => (this.organizationToEdit = x));
  }

  validateForm(): void {
    for (const key in this.responsableStepForm.controls) {
      if (this.responsableStepForm.controls.hasOwnProperty(key)) {
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

    if (this.data.currentIsEditOrganization) {
      this.contactModel.id = this.organizationToEdit.contact.id;
    }
    return contactModel;
  }

  isValidForm(): boolean {
    return this.responsableStepForm.valid;
  }
}
