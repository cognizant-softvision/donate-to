import { Store } from '@ngrx/store';
import * as store from '../store';

export abstract class Sandbox {
  public language$ = this.appState$.select(store.fromSettings.getSelectedLanguage);
  public culture$ = this.appState$.select(store.fromSettings.getSelectedCulture);
  public language = this.language$.subscribe((value) => (this.language = value));
  public culture: string;

  public accessToken$ = this.appState$.select(store.fromAuth.getAccessToken);
  public isAuthenticated$ = this.appState$.select(store.fromAuth.isAuthenticated);
  public isLoginProcessed$ = this.appState$.select(store.fromAuth.isLoginProcessed);

  public accessToken: string;
  public isAuthenticated: boolean;
  public isLoginProcessed: boolean;

  constructor(protected appState$: Store<store.State>) {}

  SetLanguage() {}
}
