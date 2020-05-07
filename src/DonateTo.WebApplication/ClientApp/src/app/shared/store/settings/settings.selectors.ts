import { createFeatureSelector, createSelector, Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { SettingsState } from './settings.reducer';

export const getSettingsState = createFeatureSelector<SettingsState>('entityCache');
export const getSelectedLanguage = createSelector(getSettingsState, (state: SettingsState) => state.selectedLanguage);
export const getSelectedCulture = createSelector(getSettingsState, (state: SettingsState) => state.selectedCulture);
export const getAvailableLanguages = createSelector(
  getSettingsState,
  (state: SettingsState) => state.availableLanguages
);

@Injectable()
export class SettingsSelectors {
  constructor(private store: Store<SettingsState>) {}
  // selectors$
  language$ = this.store.select(getSelectedLanguage);
  culture$ = this.store.select(getSelectedCulture);
  availableLanguages$ = this.store.select(getAvailableLanguages);
}
