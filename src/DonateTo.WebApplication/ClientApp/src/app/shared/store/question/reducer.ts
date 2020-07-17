import * as questionActions from './actions';
import { Action, createReducer, on } from '@ngrx/store';
import { PageModel, QuestionModel } from '../../models';

export interface QuestionState {
  loading: boolean;
  failed: boolean;
  pagedItems: PageModel<QuestionModel>;
}

const INITIAL_STATE: QuestionState = {
  loading: false,
  failed: false,
  pagedItems: new PageModel<QuestionModel>(),
};

const questionReducer = createReducer(
  INITIAL_STATE,
  on(questionActions.loadQuestionsPagedFiltered, (state, action) => ({
    ...state,
    loading: true,
    failed: false,
  })),
  on(questionActions.loadQuestionsPagedFilteredSuccess, (state, { pagedQuestions }) => ({
    ...state,
    loading: false,
    failed: false,
    pagedItems: pagedQuestions,
  })),
  on(questionActions.loadQuestionsPagedFilteredFailed, (state) => ({
    ...state,
    loading: false,
    failed: true,
    pagedItems: new PageModel<QuestionModel>(),
  }))
);

export function reducer(state: QuestionState, action: Action) {
  return questionReducer(state, action);
}
