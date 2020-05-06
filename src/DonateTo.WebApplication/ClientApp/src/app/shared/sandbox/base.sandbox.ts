import { Store } from '@ngrx/store';
import * as store from '../store';

export abstract class Sandbox {
  public culture$ = this.appState$.select(store.getSelectedCulture);

  constructor(protected appState$: Store<store.State>) {}

  public loadUser(): void {}
}
