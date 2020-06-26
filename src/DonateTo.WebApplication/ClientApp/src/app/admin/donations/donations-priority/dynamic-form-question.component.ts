import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Question } from 'src/app/shared/models/question.model';

@Component({
  selector: 'app-question',
  templateUrl: './dynamic-form-question.component.html',
  styleUrls: ['./dynamic-form-question.component.css'],
})
export class DynamicFormQuestionComponent {
  @Input() question: Question;
  @Input() form: FormGroup;
  get isValid() {
    return this.form.controls[this.question.key].valid;
  }
}
