import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrganizationModel } from 'src/app/shared/models/organization.model';

@Component({
  selector: 'app-organization-step-general-information',
  templateUrl: './organization-step-general-information.component.html',
  styleUrls: ['./organization-step-general-information.component.css'],
})
export class OrganizationStepGeneralInformationComponent implements OnInit {
  generalInformationStepForm: FormGroup;

  @Output() isFormValid = new EventEmitter();
  @Input() generalInformationModel: OrganizationModel;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.generalInformationStepForm = this.fb.group({
      organizationName: [this.generalInformationModel?.name, [Validators.required]],
      description: [this.generalInformationModel?.description, [Validators.required]],
    });

    // if (this.organizationModel.id) {
    //   this.validateForm();
    //   this.isFormValid.emit(
    //     this.isFormValid.emit({ value: this.isValidForm(), contactFormModel: this.getOrganizationFormModel() })
    //   );
    // }

    this.generalInformationStepForm.valueChanges.subscribe(() =>
      this.isFormValid.emit(
        this.isFormValid.emit({
          value: this.isValidForm(),
          generalInformationFormModel: this.getOrganizationFormModel(),
        })
      )
    );
  }

  validateForm(): void {
    for (const key in this.generalInformationStepForm.controls) {
      if (this.generalInformationStepForm.controls.hasOwnProperty(key)) {
        this.generalInformationStepForm.controls[key].markAsDirty();
        this.generalInformationStepForm.controls[key].updateValueAndValidity();
      }
    }
  }

  isValidForm(): boolean {
    return this.generalInformationStepForm.valid;
  }

  getOrganizationFormModel(): OrganizationModel {
    const organizationModel: OrganizationModel = new OrganizationModel();
    organizationModel.name = this.generalInformationStepForm.value.organizationName;
    organizationModel.description = this.generalInformationStepForm.value.description;

    return organizationModel;
  }
}
