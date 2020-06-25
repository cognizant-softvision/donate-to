import { Question } from '../../models/question.model';
import { createAction, props } from '@ngrx/store';

export const loadQuestions = createAction('[Questions] Load items from server');
export const loadQuestionsSuccess = createAction('[Questions] Load success', props<{ questions: Question[] }>());
export const loadQuestionsFailed = createAction('[Questions] Load failed');
