import { QuestionResult } from '../../shared/models/question-result.model';
import { QuestionModel } from './../../shared/models/question.model';
import * as store from '../../shared/store';
import { Injectable } from '@angular/core';
import { Sandbox } from '../../shared/sandbox/base.sandbox';
import { Store } from '@ngrx/store';
import { QuestionFilter } from '../../shared/models/filters/question-filter';

@Injectable()
export class QuestionsSandbox extends Sandbox {
  questions$ = this.appState$.select(store.fromQuestion.getAllQuestions);
  failAction$ = this.appState$.select(store.fromQuestion.getFailedStatus);
  loadAction$ = this.appState$.select(store.fromQuestion.getLoadingStatus);
  questionsPagedFiltered$ = this.appState$.select(store.fromQuestion.getQuestionsFilteredPaged);
  controlTypes$ = this.appState$.select(store.fromQuestion.getControlTypes);

  constructor(protected appState$: Store<store.State>) {
    super(appState$);
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

  /**
   * Soft Deletes a Question from the server
   */
  public deleteQuestion(question: QuestionModel) {
    this.appState$.dispatch(store.fromQuestion.deleteQuestion({ question }));
  }
}
