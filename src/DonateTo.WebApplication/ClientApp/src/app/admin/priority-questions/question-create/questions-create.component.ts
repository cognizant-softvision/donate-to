import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionOption } from 'src/app/shared/models/question-option.modal';

@Component({
  selector: 'app-questions-create',
  templateUrl: './questions-create.component.html',
  styleUrls: ['./questions-create.component.css'],
})
export class QuestionsCreateComponent implements OnInit {
  form!: FormGroup;
  label: string;
  listOfControl: Array<{ id: number; option: string }> = [];

  questionOptionFormGroup = new FormGroup({
    keyFormControl: new FormControl('', Validators.required),
    valueFormControl: new FormControl(''),
    questionId: new FormControl(''),
  });

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      label: new FormControl('', Validators.required),
    });
    this.addField();
    this.addField();
  }

  addField(e?: MouseEvent): void {
    if (e) {
      e.preventDefault();
    }
    const id = this.listOfControl.length > 0 ? this.listOfControl[this.listOfControl.length - 1].id + 1 : 0;

    const control = {
      id,
      option: `option${id}`,
    };
    const index = this.listOfControl.push(control);
    console.log(this.listOfControl[this.listOfControl.length - 1]);
    this.form.addControl(this.listOfControl[index - 1].option, new FormControl(null, Validators.required));
  }

  removeField(i: { id: number; option: string }, e: MouseEvent): void {
    e.preventDefault();
    if (this.listOfControl.length > 2) {
      const index = this.listOfControl.indexOf(i);
      this.listOfControl.splice(index, 1);
      console.log(this.listOfControl);
      this.form.removeControl(i.option);
    }
  }

  submitForm(): void {
    for (const i in this.form.controls) {
      if (this.form.controls.hasOwnProperty(i)) {
        this.form.controls[i].markAsDirty();
        this.form.controls[i].updateValueAndValidity();
      }
    }
    console.log(this.form.value);
  }
}
