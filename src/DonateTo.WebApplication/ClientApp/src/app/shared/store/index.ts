import * as settings from './settings';
import * as auth from './auth';

export interface State {
  settings: settings.SettingsState;
}

export const fromSettings = settings;
export const fromAuth = auth;
