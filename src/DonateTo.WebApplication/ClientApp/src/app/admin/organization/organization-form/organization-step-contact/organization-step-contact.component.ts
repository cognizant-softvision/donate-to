import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactModel, OrganizationModel } from 'src/app/shared/models';
import { OrganizationSandbox } from '../../organization-sandbox';

@Component({
  selector: 'app-organization-step-contact',
  templateUrl: './organization-step-contact.component.html',
  styleUrls: ['./organization-step-contact.component.less'],
})
export class OrganizationStepContactComponent implements OnInit {
  responsableStepForm: FormGroup;

  @Output() isFormValid = new EventEmitter();
  @Input() contactModel: ContactModel;
  @Input() isEditOrganization: boolean;
  @Input() contactForBranch: boolean;

  organizationToEdit: OrganizationModel;

  firstName = '';
  lastName = '';
  identityNumber = '';
  email = '';
  phoneNumber = '';
  position = '';
  contactId = 0;

  constructor(private fb: FormBuilder, private organizationSandbox: OrganizationSandbox) {}

  ngOnInit(): void {
    this.responsableStepForm = this.fb.group({
      firstName: [this.contactModel?.firstName, [Validators.required]],
      lastName: [this.contactModel?.lastName, [Validators.required]],
      identityNumber: [this.contactModel?.identityNumber, [Validators.required]],
      phoneNumber: [this.contactModel?.phoneNumber, [Validators.required]],
      email: [this.contactModel?.email, [Validators.required, Validators.email]],
      position: [this.contactModel?.position],
    });

    this.firstName = this.contactModel?.firstName;
    this.lastName = this.contactModel?.lastName;
    this.identityNumber = this.contactModel?.identityNumber;
    this.email = this.contactModel?.email;
    this.phoneNumber = this.contactModel?.phoneNumber;
    this.position = this.contactModel?.position;
    this.contactId = this.contactModel?.id;

    if (this.isEditOrganization) {
      this.organizationSandbox.organization$.subscribe((organization) => {
        this.firstName = organization?.contact?.firstName;
        this.lastName = organization?.contact?.lastName;
        this.identityNumber = organization?.contact?.identityNumber;
        this.email = organization?.contact?.email;
        this.phoneNumber = organization?.contact?.phoneNumber;
        this.position = organization?.contact?.position;
        this.contactId = organization?.contact?.id;
      });
    }

    if (this.contactModel.id) {
      this.validateForm();
      this.isFormValid.emit({ value: this.isValidForm(), contactFormModel: this.getContactFormModel() });
    }

    this.responsableStepForm.valueChanges.subscribe(() =>
      this.isFormValid.emit({
        value: this.isValidForm(),
        contactFormModel: this.getContactFormModel(),
      })
    );
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
    contactModel.id = this.contactId;
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
