import { createFeatureSelector, createSelector, Store } from '@ngrx/store';
import { QuestionState } from './reducer';
import { Injectable } from '@angular/core';
// selectors
export const getQuestionsState = createFeatureSelector<QuestionState>('question');
export const getAllQuestions = createSelector(getQuestionsState, (state: QuestionState) => state.questions);
export const getQuestionsLoading = createSelector(getQuestionsState, (state: QuestionState) => state.loading);
@Injectable()
export class QuestionSelectors {
  constructor(private store: Store<QuestionState>) {}
  // selectors$
  questions$ = this.store.select(getAllQuestions);
  questionState$ = this.store.select(getQuestionsState);
  loading$ = this.store.select(getQuestionsLoading);
}
