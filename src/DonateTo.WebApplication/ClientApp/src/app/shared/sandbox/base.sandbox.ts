import { Store } from '@ngrx/store';
import * as store from '../store';

export abstract class Sandbox {
  public language$ = this.appState$.select(store.fromSettings.getSelectedLanguage);
  public culture$ = this.appState$.select(store.fromSettings.getSelectedCulture);
  public culture: string;

  public userName$ = this.appState$.select(store.fromAuth.getUserName);
  public userEmail$ = this.appState$.select(store.fromAuth.getUserEmail);
  public accessToken$ = this.appState$.select(store.fromAuth.getAccessToken);
  public isAuthenticated$ = this.appState$.select(store.fromAuth.isAuthenticated);

  public userName: string;
  public userEmail: string;
  public accessToken: string;
  public isAuthenticated: boolean;

  constructor(protected appState$: Store<store.State>) {}
}