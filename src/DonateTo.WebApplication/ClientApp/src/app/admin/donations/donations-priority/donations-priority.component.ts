import { DonationSandbox } from './../../../donation/donation.sandbox';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Question } from 'src/app/shared/models/question.model';
import { DonationsSandbox } from '../donations-sandbox';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-donations-priority',
  templateUrl: './donations-priority.component.html',
  styleUrls: ['./donations-priority.component.css'],
})
export class DonationPriorityComponent implements OnInit, OnDestroy {
  questions: Question[];
  subscriptions: Subscription[] = [];
  form: FormGroup;
  payLoad = '';

  constructor(public donationSandbox: DonationsSandbox) {}

  ngOnDestroy(): void {
    this.unregisterEvents();
  }

  ngOnInit() {
    this.donationSandbox.loadQuestions();
    this.registerEvents();
    this.form = this.toFormGroup(this.questions);
  }

  registerEvents() {
    this.subscriptions.push(
      this.donationSandbox.questions$.subscribe((questions) => {
        this.questions = questions;
      })
    );
  }

  unregisterEvents() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.getRawValue());
  }

  toFormGroup(questions: Question[]) {
    const group: any = {};

    questions.forEach((question) => {
      group[question.key] = question.required ? new FormControl('', Validators.required) : new FormControl('');
    });
    return new FormGroup(group);
  }
}
