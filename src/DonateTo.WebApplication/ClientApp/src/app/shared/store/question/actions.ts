import { QuestionModel } from '../../models/question.model';
import { createAction, props } from '@ngrx/store';
export const loadQuestions = createAction('[Questions] Load items from server');
export const loadQuestionsSuccess = createAction('[Questions] Load success', props<{ questions: QuestionModel[] }>());
export const loadQuestionsFailed = createAction('[Questions] Load failed');
export const addQuestions = createAction('[Questions] Add items from server', props<{ questions: QuestionModel[] }>());
export const addQuestionsSuccess = createAction('[Questions] Add success', props<{ questions: QuestionModel[] }>());
export const addQuestionsFailed = createAction('[Questions] Add failed');
