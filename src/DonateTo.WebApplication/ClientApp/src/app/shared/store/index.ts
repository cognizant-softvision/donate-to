import * as settings from './settings';
import * as sample from './sample';

export interface State {
  settings: settings.SettingsState;
}

export const fromSettings = settings;
export const fromSample = sample;
