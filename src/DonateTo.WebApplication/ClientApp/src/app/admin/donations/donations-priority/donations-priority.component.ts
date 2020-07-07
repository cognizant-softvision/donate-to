import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionModel } from 'src/app/shared/models/question.model';
import { DonationsSandbox } from '../donations-sandbox';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-donations-priority',
  templateUrl: './donations-priority.component.html',
  styleUrls: ['./donations-priority.component.css'],
})
export class DonationPriorityComponent implements OnInit, OnDestroy {
  questions: QuestionModel[] = [];
  subscriptions: Subscription[] = [];
  form: FormGroup;
  payLoad = '';
  @Output() isSubmited = new EventEmitter<boolean>();

  constructor(public donationSandbox: DonationsSandbox, private formBuilder: FormBuilder) {
    this.form = this.toFormGroup([]);
  }

  ngOnDestroy(): void {
    this.unregisterEvents();
  }

  ngOnInit() {
    this.registerEvents();
    this.donationSandbox.loadQuestions();
  }

  registerEvents() {
    this.subscriptions.push(
      this.donationSandbox.questions$.subscribe((questions) => {
        this.questions = questions;
        this.form = this.toFormGroup(this.questions);
      })
    );
  }

  unregisterEvents() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  onSubmit() {
    // form validation
    this.payLoad = JSON.stringify(this.form.getRawValue());
    this.isSubmited.emit(true);
  }

  toFormGroup(questions: QuestionModel[]) {
    const group: any = {};

    questions.forEach((question) => {
      group[question.key] = question.required ? new FormControl('', Validators.required) : new FormControl('');
    });

    return this.formBuilder.group(group);
  }

  isValid(question: QuestionModel) {
    return this.form.controls[question.key].valid;
  }
}
