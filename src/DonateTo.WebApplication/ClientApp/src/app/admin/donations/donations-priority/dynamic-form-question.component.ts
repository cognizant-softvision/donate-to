import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Question } from 'src/app/shared/models/question.model';

@Component({
  selector: 'app-question',
  templateUrl: './dynamic-form-question.component.html',
  styleUrls: ['./dynamic-form-question.component.css'],
})
export class DynamicFormQuestionComponent implements OnInit {
  @Input() question: Question;
  @Input() form: FormGroup;
  get isValid() {
    return this.form.controls[this.question.key].valid;
  }

  /**
   *
   */
  constructor() {
    console.log('question ctro');
    console.log(this.question);
  }

  ngOnInit(): void {
    console.log('question oninit');
    console.log(this.question);
  }
}
