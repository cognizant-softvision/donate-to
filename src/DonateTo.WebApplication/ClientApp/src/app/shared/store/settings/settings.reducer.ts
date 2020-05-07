import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import * as settings from './settings.action';
import { Action, createReducer, on } from '@ngrx/store';

export interface SettingsState {
  selectedLanguage: string;
  selectedCulture: string;
  availableLanguages: any[];
}

const INITIAL_STATE: SettingsState = {
  selectedLanguage: '',
  selectedCulture: '',
  availableLanguages: [
    { code: 'es', name: 'ES', culture: 'es-ES' },
    { code: 'en', name: 'EN', culture: 'en-EN' },
  ],
};

const settingsReducer = createReducer(
  INITIAL_STATE,
  on(settings.setLanguageAction, (state, action) => ({ ...state, selectedLanguage: action.payload })),
  on(settings.setCultureAction, (state, action) => ({ ...state, selectedCulture: action.payload }))
);

export function reducer(state: SettingsState, action: Action) {
  return settingsReducer(state, action);
}

export const getSelectedLanguage = (state: SettingsState) => state.selectedLanguage;
export const getSelectedCulture = (state: SettingsState) => state.selectedCulture;
export const getAvailableLanguages = (state: SettingsState) => state.availableLanguages;
