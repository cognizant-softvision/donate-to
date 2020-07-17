import { createFeatureSelector, createSelector, Store } from '@ngrx/store';
import { QuestionState } from './reducer';
import { Injectable } from '@angular/core';

// selectors
export const getQuestionState = createFeatureSelector<QuestionState>('question');

export const getFailedStatus = createSelector(getQuestionState, (state: QuestionState) => state.failed);
export const getLoadingStatus = createSelector(getQuestionState, (state: QuestionState) => state.loading);
export const getQuestionsFilteredPaged = createSelector(getQuestionState, (state: QuestionState) => state.pagedItems);

@Injectable()
export class QuestionSelectors {
  constructor(private store: Store<QuestionState>) {}

  questionsFilteredPaged$ = this.store.select(getQuestionsFilteredPaged);
  failed$ = this.store.select(getFailedStatus);
  loading$ = this.store.select(getLoadingStatus);
}
