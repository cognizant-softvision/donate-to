import { QuestionsSandbox } from './../../questions/questions-sandbox';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionModel } from 'src/app/shared/models';
import { DataUpdatedService } from 'src/app/shared/async-services/data-updated.service';
import { Subscription } from 'rxjs';
import { ControlType } from 'src/app/shared/enum/controlTypes';
import { QuestionResult } from 'src/app/shared/models/question-result';
@Component({
  selector: 'app-donations-priority',
  templateUrl: './donations-priority.component.html',
  styleUrls: ['./donations-priority.component.css'],
})
export class DonationPriorityComponent implements OnInit, OnDestroy {
  @Output() isSubmited = new EventEmitter<number>();

  form: FormGroup;
  questions: QuestionModel[];
  submitedQuestions: QuestionResult[];
  dataSaved = false;
  private subscriptions: Subscription[] = [];
  failedStatus = false;
  successStatus = false;

  get controlTypeEnum() {
    return ControlType;
  }

  constructor(private dataUpdated: DataUpdatedService, public questionSandbox: QuestionsSandbox) {}

  ngOnInit(): void {
    this.questionSandbox.loadQuestions();
    this.registerEvents();
    // Updates table when a new donation is created
    // this.dataUpdated.currentStatus.subscribe((dataSaved) => (this.dataSaved = dataSaved));
  }

  ngOnDestroy(): void {
    this.unregisterEvents();
  }

  registerEvents(): void {
    this.subscriptions.push(
      this.questionSandbox.questions$.subscribe((questions) => {
        this.questions = questions;
        this.form = this.toFormGroup(this.questions);
      })
    );
  }

  private unregisterEvents() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
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
    if (this.isValid) {
      this.addQuestionsSubmited();
      this.questionSandbox.updateQuestionsResult(this.submitedQuestions);
      this.dataUpdated.changeMessage(true);
    }
  }

  toFormGroup(questions: QuestionModel[]) {
    const group: any = {};
    questions.forEach((question) => {
      group[question.id] = new FormControl('', Validators.required);
    });
    return new FormGroup(group);
  }

  isValid(question: QuestionModel) {
    return this.form.controls[question.id].valid;
  }

  addQuestionsSubmited(): void {
    this.questions.forEach((question) => {
      const submitQuestion = new QuestionResult();
      submitQuestion.id = question.id;
      submitQuestion.value = this.form.controls[question.id].value;
      this.submitedQuestions = [...this.submitedQuestions, submitQuestion];
    });
  }
}
