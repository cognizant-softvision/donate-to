import { QuestionModel } from '../../models/question.model';
import * as questionActions from './actions';
import { Action, createReducer, on } from '@ngrx/store';

export interface QuestionState {
  loading: boolean;
  failed: boolean;
  questions: QuestionModel[];
}

const INITIAL_STATE: QuestionState = {
  loading: false,
  failed: false,
  questions: [],
};

const questionReducer = createReducer(
  INITIAL_STATE,
  on(questionActions.loadQuestions, (state) => ({
    ...state,
    loading: true,
    failed: false,
  })),
  on(questionActions.loadQuestionsSuccess, (state, { questions }) => ({
    ...state,
    loading: false,
    failed: false,
    questions,
  })),
  on(questionActions.loadQuestionsFailed, (state) => ({
    ...state,
    loading: false,
    failed: true,
  }))
);

export function reducer(state: QuestionState, action: Action) {
  return questionReducer(state, action);
}
