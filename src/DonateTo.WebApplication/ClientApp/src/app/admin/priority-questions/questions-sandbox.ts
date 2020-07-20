import { QuestionModel } from './../../shared/models/question.model';
import * as store from 'src/app/shared/store';
import { Subscription } from 'rxjs';
import { Injectable, OnDestroy } from '@angular/core';
import { Sandbox } from 'src/app/shared/sandbox/base.sandbox';
import { Store } from '@ngrx/store';
import { QuestionFilter } from 'src/app/shared/models/filters/question-filter';

@Injectable()
export class QuestionsSandbox extends Sandbox implements OnDestroy {
  private subscriptions: Subscription[] = [];
  questions$ = this.appState$.select(store.fromQuestion.getAllQuestions);
  failAction$ = this.appState$.select(store.fromQuestion.getFailedStatus);
  loadAction$ = this.appState$.select(store.fromQuestion.getLoadingStatus);
  questionsPagedFiltered$ = this.appState$.select(store.fromQuestion.getQuestionsFilteredPaged);
  controlTypes$ = this.appState$.select(store.fromQuestion.getControlTypes);
  // options$ = this.appState$.select(store.fromQuestion.getOptions);

  constructor(protected appState$: Store<store.State>) {
    super(appState$);
  }

  ngOnDestroy(): void {
    this.unregisterEvents();
  }

  private unregisterEvents() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  loadQuestions(): void {
    this.appState$.dispatch(store.fromQuestion.loadQuestions());
  }

  loadControlTypes(): void {
    this.appState$.dispatch(store.fromQuestion.loadControlTypes());
  }

  updateQuestions(questions: QuestionModel[]): void {
    this.appState$.dispatch(store.fromQuestion.addQuestions({ questions }));
  }

  public loadQuestionsFilteredPaged(questionFilter: QuestionFilter): void {
    this.appState$.dispatch(store.fromQuestion.loadQuestionsPagedFiltered({ questionFilter }));
  }
}
