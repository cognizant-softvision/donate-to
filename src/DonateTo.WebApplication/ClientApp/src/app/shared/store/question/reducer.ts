import * as questionActions from './actions';
import { Action, createReducer, on } from '@ngrx/store';
import { PageModel, QuestionModel } from '../../models';
import { ControlTypeModel } from '../../models/control-type.model';

export interface QuestionState {
  loading: boolean;
  failed: boolean;
  pagedItems: PageModel<QuestionModel>;
  questions: QuestionModel[];
  controlTypes: ControlTypeModel[];
}

const INITIAL_STATE: QuestionState = {
  loading: false,
  failed: false,
  pagedItems: new PageModel<QuestionModel>(),
  questions: [],
  controlTypes: [],
};

const questionReducer = createReducer(
  INITIAL_STATE,
  on(questionActions.loadQuestionsPagedFiltered, (state) => ({
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
  })),
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
  })),
  on(questionActions.loadControlTypes, (state) => ({
    ...state,
    loading: true,
    failed: false,
  })),
  on(questionActions.loadControlTypesSuccess, (state, { controlTypes }) => ({
    ...state,
    loading: false,
    failed: false,
    controlTypes,
  })),
  on(questionActions.loadControlTypesFailed, (state) => ({
    ...state,
    loading: false,
    failed: true,
  }))
);

export function reducer(state: QuestionState, action: Action) {
  return questionReducer(state, action);
}
