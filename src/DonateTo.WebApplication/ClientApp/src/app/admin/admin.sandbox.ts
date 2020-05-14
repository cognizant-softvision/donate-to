import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Sandbox } from '../shared/sandbox/base.sandbox';
import * as store from '../shared/store';
import { AuthSandbox } from '../shared/auth/auth.sandbox';

@Injectable()
export class AdminSandbox extends Sandbox {
  constructor(protected appState$: Store<store.State>, public authSandbox: AuthSandbox) {
    super(appState$);
    this.registerEvents();
  }

  private registerEvents(): void {}
}
