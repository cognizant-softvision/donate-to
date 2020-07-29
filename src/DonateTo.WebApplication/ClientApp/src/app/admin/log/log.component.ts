import { Component, OnDestroy, OnInit } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd';
import { LogFilter } from 'src/app/shared/models/filters/log-filter';
import { LogModel } from './../../shared/models/log.model';
import { LogSandbox } from './log-sandbox';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-log-admin',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css'],
})
export class LogComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  logList: LogModel[] = [];
  logFilter: LogFilter;
  total = 0;
  pageSize = 10;
  pageIndex = 1;
  searchNameValue = '';
  searchDescriptionValue = '';
  searchContactNameValue = '';
  nameVisible = false;
  descriptionVisible = false;
  contactNameVisible = false;
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

    this.logSandbox.loadLogs();
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find((item) => item.value !== null);

    this.logFilter = {
      ...this.logFilter,
      pageSize,
      pageNumber: pageIndex,
      orderBy: (currentSort && currentSort.key) || '',
      orderDirection: (currentSort && currentSort.value) || '',
      name: (filter && filter.find((f) => f.key === 'name')?.value) || '',
      description: (filter && filter.find((f) => f.key === 'description')?.value) || '',
      contactName: (filter && filter.find((f) => f.key === 'contactName')?.value) || '',
    };

    this.logSandbox.loadLogsFilteredPaged(this.logFilter);
  }

  reset(): void {
    this.searchNameValue = '';
    this.searchDescriptionValue = '';
    this.searchContactNameValue = '';
    this.logFilter = {
      ...this.logFilter,
      name: this.searchNameValue,
      description: this.searchDescriptionValue,
      contactName: this.searchContactNameValue,
    };
    this.logSandbox.loadLogsFilteredPaged(this.logFilter);
  }

  resetNameSearch(): void {
    this.searchNameValue = '';
    this.logFilter = { ...this.logFilter, name: this.searchNameValue };
    this.logSandbox.loadLogsFilteredPaged(this.logFilter);
  }

  resetDescriptionSearch(): void {
    this.searchDescriptionValue = '';
    this.logFilter = { ...this.logFilter, description: this.searchDescriptionValue };
    this.logSandbox.loadLogsFilteredPaged(this.logFilter);
  }

  resetContactNameSearch(): void {
    this.searchContactNameValue = '';
    this.logFilter = { ...this.logFilter, contactName: this.searchContactNameValue };
    this.logSandbox.loadLogsFilteredPaged(this.logFilter);
  }

  searchName(): void {
    this.nameVisible = false;
    this.logFilter = { ...this.logFilter, name: this.searchNameValue };
    this.logSandbox.loadLogsFilteredPaged(this.logFilter);
  }

  searchDescription(): void {
    this.descriptionVisible = false;
    this.logFilter = { ...this.logFilter, description: this.searchDescriptionValue };
    this.logSandbox.loadLogsFilteredPaged(this.logFilter);
  }

  searchContactName(): void {
    this.contactNameVisible = false;
    this.logFilter = { ...this.logFilter, contactName: this.searchContactNameValue };
    this.logSandbox.loadLogsFilteredPaged(this.logFilter);
  }

  ngOnDestroy(): void {
    this.unregisterEvents();
  }

  private unregisterEvents() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
