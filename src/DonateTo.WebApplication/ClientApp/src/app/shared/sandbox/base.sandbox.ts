import { Store } from '@ngrx/store';
import * as store from '../store';

export abstract class Sandbox {
  public language$ = this.appState$.select(store.fromSettings.getSelectedLanguage);
  public culture$ = this.appState$.select(store.fromSettings.getSelectedCulture);
  public language = this.language$.subscribe((value) => (this.language = value));
  public culture: string;

  constructor(protected appState$: Store<store.State>) {}

  // TODO: Implement this after the issue 57 is merged
  public loadUser(): void {}
}
