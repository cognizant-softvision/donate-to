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
