import * as store from 'src/app/shared/store';
import { Subscription } from 'rxjs';
import { Injectable, OnDestroy } from '@angular/core';
import { Sandbox } from 'src/app/shared/sandbox/base.sandbox';
import { Store } from '@ngrx/store';
import { LogFilter } from 'src/app/shared/models/filters/log-filter';

@Injectable()
export class LogSandbox extends Sandbox implements OnDestroy {
  private subscriptions: Subscription[] = [];

  logs$ = this.appState$.select(store.fromLog.getAllLogs);
  failAction$ = this.appState$.select(store.fromLog.getFailedStatus);
  loadAction$ = this.appState$.select(store.fromLog.getLoadingStatus);
  logsPagedFiltered$ = this.appState$.select(store.fromLog.getLogsFilteredPaged);

  constructor(protected appState$: Store<store.State>) {
    super(appState$);
  }

  ngOnDestroy(): void {
    this.unregisterEvents();
  }

  loadLogs(): void {
    this.appState$.dispatch(store.fromLog.loadLogs());
  }

  private unregisterEvents() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  public loadLogsFilteredPaged(logFilter: LogFilter): void {
    this.appState$.dispatch(store.fromLog.loadLogsPagedFiltered({ logFilter }));
  }
}
