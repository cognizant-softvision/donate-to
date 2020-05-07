import { Store } from '@ngrx/store';
import * as store from '../store/settings';

export abstract class Sandbox {
  public culture$ = this.appState$.select(store.getSelectedCulture);
  public culture: string;

  constructor(protected appState$: Store<store.State>) {}

  // TODO: Implement this after the issue 57 is merged
  public loadUser(): void {}
}
