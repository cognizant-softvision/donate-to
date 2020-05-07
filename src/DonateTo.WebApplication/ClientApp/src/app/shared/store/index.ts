import { SettingsState } from './settings/settings.reducer';

export interface State {
  settings: SettingsState;
}

export * as fromSettings from './settings';
export * as fromSample from './sample';
