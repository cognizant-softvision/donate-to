import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionBase } from 'src/app/shared/models/question-base.model';
import { TextboxQuestion } from 'src/app/shared/models/question-textbox.model';
import { IntegratedQuestion } from 'src/app/shared/models';

@Component({
  selector: 'app-donations-priority',
  templateUrl: './donations-priority.component.html',
  styleUrls: ['./donations-priority.component.css'],
})
export class DonationPriorityComponent implements OnInit {
  questions: Array<QuestionBase<any>>;
  question: QuestionBase<string>;
  form: FormGroup;
  payLoad = '';

  getQuestions() {
    const questions: Array<QuestionBase<string>> = [
      new IntegratedQuestion({
        key: 'brave',
        label: 'Bravery Rating',
        controlType: 'dropdown',
        options: [
          { key: 'solid', value: 'Solid' },
          { key: 'great', value: 'Great' },
          { key: 'good', value: 'Good' },
          { key: 'unproven', value: 'Unproven' },
        ],
        order: 3,
      }),

      new IntegratedQuestion({
        key: 'gender',
        label: 'Gender',
        controlType: 'radiobutton',
        options: [
          { key: 'male', value: 'Male' },
          { key: 'female', value: 'Female' },
          { key: 'other', value: 'Other' },
        ],
        order: 4,
      }),

      new IntegratedQuestion({
        key: 'vehicle',
        label: 'Vehicle',
        controlType: 'checkbox',
        options: [
          { key: 'bike', value: 'Bike' },
          { key: 'car', value: 'Car' },
          { key: 'boat', value: 'Boat' },
        ],
        order: 5,
      }),

      new TextboxQuestion({
        key: 'firstName',
        label: 'First name',
        required: true,
        order: 1,
      }),

      new TextboxQuestion({
        key: 'age',
        label: 'Age',
        type: 'number',
        order: 2,
      }),
    ];

    return questions.sort((a, b) => a.order - b.order);
  }

  ngOnInit() {
    this.questions = this.getQuestions();
    this.form = this.toFormGroup(this.questions);
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.getRawValue());
  }

  toFormGroup(questions: Array<QuestionBase<string>>) {
    const group: any = {};

    questions.forEach((question) => {
      group[question.key] = question.required
        ? new FormControl(question.value || '', Validators.required)
        : new FormControl(question.value || '');
    });
    return new FormGroup(group);
  }
}
