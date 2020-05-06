import { createSelector } from 'reselect';

/**
 * We treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */

/**
 * Every reducer module's default export is the reducer function itself. In
 * addition, each module should export a type or interface that describes
 * the state of the reducer plus any selector functions. The `* as`
 * notation packages up all of the exports into a single object.
 */
import * as fromSettings from './reducers/settings.reducer';

export interface State {
  settings: fromSettings.State;
}

/**
 * Every reducer module exports selector functions, however child reducers
 * have no knowledge of the overall state tree. To make them useable, we
 * need to make new selectors that wrap them.
 */

/**
 * Settings store functions
 */
export const getSettingsState = (state: State) => state.settings;
export const getSelectedLanguage = createSelector(getSettingsState, fromSettings.getSelectedLanguage);
export const getSelectedCulture = createSelector(getSettingsState, fromSettings.getSelectedCulture);
export const getAvailableLanguages = createSelector(getSettingsState, fromSettings.getAvailableLanguages);
