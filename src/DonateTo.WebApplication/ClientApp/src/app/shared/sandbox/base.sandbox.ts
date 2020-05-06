import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as store from '../store';
import * as authActions from '../store/actions/auth.action';
import { User } from '../models';

export abstract class Sandbox {
  public loggedUser$ = this.appState$.select(store.getLoggedUser);
  public culture$ = this.appState$.select(store.getSelectedCulture);

  constructor(protected appState$: Store<store.State>) {}

  /**
   * Pulls user from local storage and saves it to the store
   */
  public loadUser(): void {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    this.appState$.dispatch(new authActions.AddUserAction(new User(user)));
  }
}
