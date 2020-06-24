import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-donations-priority',
  templateUrl: './donations-priority.component.html',
  styleUrls: ['./donations-priority.component.css'],
})
export class DonationPriorityComponent implements OnInit {
  form: FormGroup;
  payLoad = '';

  readonly questions = [
    {
      id: 1,
      order: 0,
      question: 'Dia?',
      value: 'textbox',
      required: true,
      answerType: 'textbox',
      answers: [
        // numerico
        {
          value: 0,
          max: 10,
          min: 1,
        },
        // select & radio-buttons & checks
        {
          text: 'Opcion 1',
          value: 1,
          isDefault: true,
        },
        {
          text: 'Opcion 2',
          value: 2,
          isDefault: false,
        },
        {
          text: 'Opcion 3',
          value: 3,
          isDefault: false,
        },
      ],
    },
  ];

  readonly questionResult = [{ id: 1, value: 0 }];

  ngOnInit() {
    this.form = this.toFormGroup();
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.getRawValue());
  }

  toFormGroup() {
    const group: any = {};

    this.questions.forEach((question) => {
      group[question.id] = question.required
        ? new FormControl(question.value || '', Validators.required)
        : new FormControl(question.value || '');
    });
    return new FormGroup(group);
  }
}
