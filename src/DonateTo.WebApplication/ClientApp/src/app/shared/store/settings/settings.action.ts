import { Action, createAction, props } from '@ngrx/store';

export const setLanguageAction = createAction('[Settings] SetLanguage', props<{ payload: string }>());
export const setCultureAction = createAction('[Settings] SetCulture', props<{ payload: string }>());
