import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionBase } from 'src/app/shared/models/question-base.model';
import { TextboxQuestion } from 'src/app/shared/models/question-textbox.model';
import { DropdownQuestion } from 'src/app/shared/models';

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
      new DropdownQuestion({
        key: 'brave',
        label: 'Bravery Rating',
        options: [
          { key: 'solid', value: 'Solid' },
          { key: 'great', value: 'Great' },
          { key: 'good', value: 'Good' },
          { key: 'unproven', value: 'Unproven' },
        ],
        order: 3,
      }),

      new TextboxQuestion({
        key: 'firstName',
        label: 'First name',
        value: 'Bombasto',
        required: true,
        order: 1,
      }),

      new TextboxQuestion({
        key: 'emailAddress',
        label: 'Email',
        type: 'email',
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
