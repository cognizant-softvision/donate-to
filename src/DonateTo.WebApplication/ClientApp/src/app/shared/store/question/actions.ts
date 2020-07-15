import { createAction, props } from '@ngrx/store';
import { PageModel, QuestionModel } from '../../models';
import { QuestionFilter } from '../../models/filters/question-filter';

export const loadQuestionsPagedFiltered = createAction(
  '[Question] Load items from server paged and filtered',
  props<{ questionFilter: QuestionFilter }>()
);
export const loadQuestionsPagedFilteredSuccess = createAction(
  '[Question] Load success',
  props<{ pagedQuestions: PageModel<QuestionModel> }>()
);
export const loadQuestionsPagedFilteredFailed = createAction('[Question] Load failed');
export const loadQuestions = createAction('[Questions] Load items from server');
export const loadQuestionsSuccess = createAction('[Questions] Load success', props<{ questions: QuestionModel[] }>());
export const loadQuestionsFailed = createAction('[Questions] Load failed');
export const addQuestions = createAction('[Questions] Add items from server', props<{ questions: QuestionModel[] }>());
export const addQuestionsSuccess = createAction('[Questions] Add success', props<{ questions: QuestionModel[] }>());
export const addQuestionsFailed = createAction('[Questions] Add failed');
