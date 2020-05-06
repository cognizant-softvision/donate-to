import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import * as settings from '../actions/settings.action';

export interface State {
  selectedLanguage: string;
  selectedCulture: string;
  availableLanguages: any[];
}

const INITIAL_STATE: State = {
  selectedLanguage: '',
  selectedCulture: '',
  availableLanguages: [
    { code: 'es', name: 'ES', culture: 'es-ES' },
    { code: 'en', name: 'EN', culture: 'en-EN' },
  ],
};

export function reducer(state = INITIAL_STATE, action: settings.Actions): State {
  switch (action.type) {
    case settings.ActionTypes.SET_LANGUAGE: {
      return Object.assign({}, state, { selectedLanguage: action.payload });
    }

    case settings.ActionTypes.SET_CULTURE: {
      return Object.assign({}, state, { selectedCulture: action.payload });
    }

    default: {
      return state;
    }
  }
}

export const getSelectedLanguage = (state: State) => state.selectedLanguage;
export const getSelectedCulture = (state: State) => state.selectedCulture;
export const getAvailableLanguages = (state: State) => state.availableLanguages;
