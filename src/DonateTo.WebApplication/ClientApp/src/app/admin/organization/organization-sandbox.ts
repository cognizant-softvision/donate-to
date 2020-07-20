import { Injectable, OnDestroy } from '@angular/core';
import { Sandbox } from 'src/app/shared/sandbox/base.sandbox';
import { Store } from '@ngrx/store';
import * as store from 'src/app/shared/store';
import { Subscription } from 'rxjs';

@Injectable()
export class OrganizationSandbox extends Sandbox implements OnDestroy {
  private subscriptions: Subscription[] = [];

  constructor(protected appState$: Store<store.State>) {
    super(appState$);
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
}
