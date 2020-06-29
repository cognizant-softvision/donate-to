import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Question } from 'src/app/shared/models/question.model';
import { DonationsSandbox } from '../donations-sandbox';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-donations-priority',
  templateUrl: './donations-priority.component.html',
  styleUrls: ['./donations-priority.component.css'],
})
export class DonationPriorityComponent implements OnInit, OnDestroy {
  questions: Question[] = [];
  subscriptions: Subscription[] = [];
  form: FormGroup;
  payLoad = '';
  @Output() isSubmited = new EventEmitter<boolean>();

  constructor(public donationSandbox: DonationsSandbox, private formBuilder: FormBuilder) {
    console.log('form creation');
    this.form = this.toFormGroup([]);
    console.log('form creation done');
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
    // validacion de form
    this.payLoad = JSON.stringify(this.form.getRawValue());
    this.isSubmited.emit(true);
  }

  toFormGroup(questions: Question[]) {
    const group: any = {};

    questions.forEach((question) => {
      group[question.key] = question.required ? new FormControl('', Validators.required) : new FormControl('');
    });

    console.log(questions);

    return this.formBuilder.group(group);
  }

  isValid(question: Question) {
    return this.form.controls[question.key].valid;
  }
}
