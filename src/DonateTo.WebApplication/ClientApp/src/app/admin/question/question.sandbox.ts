import { Sandbox } from '../../shared/sandbox/base.sandbox';
import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as store from '../../shared/store';
import { QuestionFilter } from '../../shared/models/filters/question-filter';

@Injectable()
export class QuestionSandbox extends Sandbox implements OnDestroy {
  private subscriptions: Subscription[] = [];
  failAction$ = this.appState$.select(store.fromQuestion.getFailedStatus);
  loadAction$ = this.appState$.select(store.fromQuestion.getLoadingStatus);
  questionsPagedFiltered$ = this.appState$.select(store.fromQuestion.getQuestionsFilteredPaged);

  constructor(protected appState$: Store<store.State>) {
    super(appState$);
  }

  public loadQuestionsFilteredPaged(questionFilter: QuestionFilter): void {
    this.appState$.dispatch(store.fromQuestion.loadQuestionsPagedFiltered({ questionFilter }));
  }

  ngOnDestroy(): void {
    this.unregisterEvents();
  }

  private unregisterEvents() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
