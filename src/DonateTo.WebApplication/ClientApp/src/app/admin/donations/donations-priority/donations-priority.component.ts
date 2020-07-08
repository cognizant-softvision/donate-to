import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Question } from 'src/app/shared/models/question-provisional.model';
@Component({
  selector: 'app-donations-priority',
  templateUrl: './donations-priority.component.html',
  styleUrls: ['./donations-priority.component.css'],
})
export class DonationPriorityComponent implements OnInit {
  form: FormGroup;
  questions: Question[];

  @Output() isSubmited = new EventEmitter<number>();

  constructor(private formBuilder: FormBuilder) {
    this.questions = [
      {
        createdBy: '',
        createdDate: new Date(),
        updateBy: '',
        updateDate: new Date(),
        id: 1,
        order: 0,
        controlType: 'dropdown',
        required: true,
        key: '1',
        label: 'Question 1',
        type: '',
        options: [
          {
            id: 1,
            createdBy: '',
            createdDate: new Date(),
            updateBy: '',
            updateDate: new Date(),
            key: '1',
            value: 'Option 1',
            questionId: 1,
          },
          {
            id: 2,
            createdBy: '',
            createdDate: new Date(),
            updateBy: '',
            updateDate: new Date(),
            key: '2',
            value: 'Option 2',
            questionId: 1,
          },
          {
            id: 3,
            createdBy: '',
            createdDate: new Date(),
            updateBy: '',
            updateDate: new Date(),
            key: '3',
            value: 'Option 3',
            questionId: 1,
          },
        ],
      },
      {
        createdBy: '',
        createdDate: new Date(),
        updateBy: '',
        updateDate: new Date(),
        id: 2,
        order: 0,
        controlType: 'dropdown',
        required: true,
        key: '2',
        label: 'Question 2',
        type: '',
        options: [
          {
            id: 1,
            createdBy: '',
            createdDate: new Date(),
            updateBy: '',
            updateDate: new Date(),
            key: '1',
            value: 'Option 1',
            questionId: 1,
          },
          {
            id: 2,
            createdBy: '',
            createdDate: new Date(),
            updateBy: '',
            updateDate: new Date(),
            key: '2',
            value: 'Option 2',
            questionId: 1,
          },
          {
            id: 3,
            createdBy: '',
            createdDate: new Date(),
            updateBy: '',
            updateDate: new Date(),
            key: '3',
            value: 'Option 3',
            questionId: 1,
          },
        ],
      },
    ];
  }

  ngOnInit() {
    this.form = this.toFormGroup(this.questions);
  }

  average() {
    let sum = 0;
    this.questions.forEach((element) => {
      sum += this.form.controls[element.key].value;
    });
    return sum;
  }

  private validateFormGroup(formGroup: FormGroup) {
    for (const i in formGroup.controls) {
      if (formGroup.controls.hasOwnProperty(i)) {
        formGroup.controls[i].markAsDirty();
        formGroup.controls[i].updateValueAndValidity();
      }
    }
  }

  onSubmit() {
    this.validateFormGroup(this.form);
    if (this.form.valid) {
      this.isSubmited.emit(this.average());
    }
  }

  toFormGroup(questions: Question[]) {
    const group: any = {};
    questions.forEach((question) => {
      group[question.key] = question.required ? new FormControl('', Validators.required) : new FormControl('');
    });
    return this.formBuilder.group(group);
  }
  isValid(question: Question) {
    return this.form.controls[question.key].valid;
  }
}
