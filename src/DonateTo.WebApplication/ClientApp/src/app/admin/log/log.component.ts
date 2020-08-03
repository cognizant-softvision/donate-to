import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd';
import { LogFilter } from 'src/app/shared/models/filters/log-filter';
import { LogModel } from './../../shared/models/log.model';
import { LogSandbox } from './log-sandbox';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LogDetailModalComponent } from './log-detail-modal/log-detail-modal/log-detail-modal.component';
import { StringExtensions } from 'src/app/shared/utility/extensions/string-extensions';

@Component({
  selector: 'app-log-admin',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css'],
})
export class LogComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  @ViewChild(LogDetailModalComponent)
  private logDetailModal: LogDetailModalComponent;
  truncateMaxLength = 60;

  logList: LogModel[] = [];
  logFilter: LogFilter;
  total = 0;
  pageSize = 10;
  pageIndex = 1;
  searchMessageValue = '';
  searchLevelValue = null;
  searchExceptionValue = '';
  searchTimeStampBeginValue: Date;
  searchTimeStampEndValue: Date;
  messageVisible = false;
  levelVisible = false;
  exceptionVisible = false;
  timeStampVisible = false;
  failedStatus = false;
  successStatus = false;

  constructor(private logSandbox: LogSandbox, public router: Router) {}

  ngOnInit(): void {
    this.logFilter = {
      ...this.logFilter,
      pageSize: this.pageSize,
      pageNumber: this.pageIndex,
    };

    this.subscriptions.push(
      this.logSandbox.logsPagedFiltered$.subscribe((res) => {
        this.total = res.rowCount;
        this.logList = res.results;
      })
    );

    this.subscriptions.push(
      this.logSandbox.logs$.subscribe((logs) => {
        this.logList = logs;
      })
    );

    this.subscriptions.push(
      this.logSandbox.failAction$.subscribe((status) => {
        this.failedStatus = status;
      })
    );

    this.subscriptions.push(
      this.logSandbox.loadAction$.subscribe((status) => {
        this.successStatus = status;
      })
    );

    this.logSandbox.loadLogsFilteredPaged(this.logFilter);
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex, sort } = params;
    const currentSort = sort.find((item) => item.value !== null);
    this.logFilter = {
      ...this.logFilter,
      pageSize,
      pageNumber: pageIndex,
      orderBy: (currentSort && currentSort.key) || '',
      orderDirection: (currentSort && currentSort.value) || '',
    };

    this.logSandbox.loadLogsFilteredPaged(this.logFilter);
  }

  reset(): void {
    this.searchMessageValue = '';
    this.searchExceptionValue = '';
    this.searchLevelValue = null;
    this.searchTimeStampBeginValue = null;
    this.searchTimeStampEndValue = null;
    this.logFilter = {
      ...this.logFilter,
      message: this.searchMessageValue,
      exception: this.searchExceptionValue,
      level: this.searchLevelValue,
      timeStampBegin: this.searchTimeStampBeginValue,
      timeStampEnd: this.searchTimeStampEndValue,
    };
    this.logSandbox.loadLogsFilteredPaged(this.logFilter);
  }

  resetTimeStampSearch(): void {
    this.timeStampVisible = false;
    this.searchTimeStampBeginValue = null;
    this.searchTimeStampEndValue = null;
    this.logFilter = {
      ...this.logFilter,
      timeStampBegin: this.searchTimeStampBeginValue,
      timeStampEnd: this.searchTimeStampEndValue,
    };
    this.logSandbox.loadLogsFilteredPaged(this.logFilter);
  }

  resetMessageSearch(): void {
    this.searchMessageValue = '';
    this.logFilter = { ...this.logFilter, message: this.searchMessageValue };
    this.logSandbox.loadLogsFilteredPaged(this.logFilter);
  }

  resetExceptionSearch(): void {
    this.searchExceptionValue = '';
    this.logFilter = { ...this.logFilter, exception: this.searchExceptionValue };
    this.logSandbox.loadLogsFilteredPaged(this.logFilter);
  }

  resetLevelSearch(): void {
    this.searchLevelValue = null;
    this.logFilter = { ...this.logFilter, level: this.searchLevelValue };
    this.logSandbox.loadLogsFilteredPaged(this.logFilter);
  }

  searchTimeStamp(): void {
    this.timeStampVisible = false;
    this.logFilter = {
      ...this.logFilter,
      timeStampBegin: this.searchTimeStampBeginValue,
      timeStampEnd: this.searchTimeStampEndValue,
    };
    this.logSandbox.loadLogsFilteredPaged(this.logFilter);
  }

  searchMessage(): void {
    this.messageVisible = false;
    this.logFilter = { ...this.logFilter, message: this.searchMessageValue };
    this.logSandbox.loadLogsFilteredPaged(this.logFilter);
  }

  searchLevel(): void {
    this.levelVisible = false;
    this.logFilter = { ...this.logFilter, level: this.searchLevelValue };
    this.logSandbox.loadLogsFilteredPaged(this.logFilter);
  }

  searchException(): void {
    this.exceptionVisible = false;
    this.logFilter = { ...this.logFilter, exception: this.searchExceptionValue };
    this.logSandbox.loadLogsFilteredPaged(this.logFilter);
  }

  ngOnDestroy(): void {
    this.unregisterEvents();
  }

  private unregisterEvents() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  showDetail(selectedLog: LogModel) {
    this.logDetailModal.showModal(selectedLog);
  }

  truncate(text: string, maxLength: number) {
    return StringExtensions.truncate(text, maxLength);
  }
}
