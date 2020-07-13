import * as store from 'src/app/shared/store';
import { Subscription } from 'rxjs';
import { Injectable, OnDestroy } from '@angular/core';
import { Sandbox } from 'src/app/shared/sandbox/base.sandbox';
import { Store } from '@ngrx/store';

@Injectable()
export class QuestionsSandbox extends Sandbox implements OnDestroy {
  private subscriptions: Subscription[] = [];
  questions$ = this.appState$.select(store.fromQuestion.getAllQuestions);

  constructor(protected appState$: Store<store.State>) {
    super(appState$);
  }

  ngOnDestroy(): void {
    this.unregisterEvents();
  }

  private unregisterEvents() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  loadQuestions(): void {
    this.appState$.dispatch(store.fromQuestion.loadQuestions());
  }
}
