import { Component, OnDestroy, OnInit } from '@angular/core';
import { QuestionModel } from 'src/app/shared/models';
import { QuestionFilter } from 'src/app/shared/models/filters/question-filter';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { NzTableQueryParams } from 'ng-zorro-antd';
import { QuestionsSandbox } from './questions.sandbox';
import { DataUpdatedService } from 'src/app/shared/async-services/data-updated.service';

@Component({
  selector: 'app-questions-admin',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
})
export class QuestionsComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  questionsList: QuestionModel[] = [];
  question: QuestionModel;
  total = 0;
  pageSize = 10;
  pageIndex = 1;
  searchLabelValue = '';
  searchTypeValue = '';
  searchPlaceholderValue = '';
  labelVisible = false;
  typeVisible = false;
  placeholderVisible = false;
  questionFilter = new QuestionFilter();
  expandSet = new Set<number>();
  failedStatus = false;
  successStatus = false;
  dataSaved = false;

  constructor(
    private questionSandbox: QuestionsSandbox,
    public router: Router,
    private dataUpdated: DataUpdatedService
  ) {}

  ngOnInit(): void {
    this.questionFilter = {
      ...this.questionFilter,
      pageSize: this.pageSize,
      pageNumber: this.pageIndex,
    };

    this.subscriptions.push(
      this.questionSandbox.questionsPagedFiltered$.subscribe((res) => {
        this.total = res.rowCount;
        this.questionsList = res.results;
      })
    );

    this.subscriptions.push(
      this.questionSandbox.questions$.subscribe((questions) => {
        this.questionsList = questions;
      })
    );

    this.subscriptions.push(
      this.questionSandbox.failAction$.subscribe((status) => {
        this.failedStatus = status;
      })
    );

    this.subscriptions.push(
      this.questionSandbox.loadAction$.subscribe((status) => {
        this.successStatus = status;
      })
    );

    this.questionSandbox.loadQuestions();

    this.dataUpdated.currentStatus.subscribe((dataSaved) => (this.dataSaved = dataSaved));
    if (this.dataSaved) {
      this.dataUpdated.changeMessage(false);
      window.location.reload();
    }
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex, sort } = params;
    const currentSort = sort.find((item) => item.value !== null);

    this.questionFilter = {
      ...this.questionFilter,
      pageSize,
      pageNumber: pageIndex,
      orderBy: (currentSort && currentSort.key) || '',
      orderDirection: (currentSort && currentSort.value) || '',
    };

    this.questionSandbox.loadQuestionsFilteredPaged(this.questionFilter);
  }

  ngOnDestroy(): void {
    this.unregisterEvents();
  }

  reset(): void {
    this.searchLabelValue = '';
    this.searchTypeValue = '';
    this.searchPlaceholderValue = '';
    this.questionFilter = {
      ...this.questionFilter,
      label: this.searchLabelValue,
      type: this.searchTypeValue,
      placeholder: this.searchPlaceholderValue,
    };
    this.questionSandbox.loadQuestionsFilteredPaged(this.questionFilter);
  }

  resetLabelSearch(): void {
    this.searchLabelValue = '';
    this.questionFilter = { ...this.questionFilter, label: this.searchLabelValue };
    this.questionSandbox.loadQuestionsFilteredPaged(this.questionFilter);
  }

  resetTypeSearch(): void {
    this.searchTypeValue = '';
    this.questionFilter = { ...this.questionFilter, type: this.searchTypeValue };
    this.questionSandbox.loadQuestionsFilteredPaged(this.questionFilter);
  }

  resetPlaceholderSearch(): void {
    this.searchPlaceholderValue = '';
    this.questionFilter = { ...this.questionFilter, placeholder: this.searchPlaceholderValue };
    this.questionSandbox.loadQuestionsFilteredPaged(this.questionFilter);
  }

  searchLabel(): void {
    this.labelVisible = false;
    this.questionFilter = { ...this.questionFilter, label: this.searchLabelValue };
    this.questionSandbox.loadQuestionsFilteredPaged(this.questionFilter);
  }

  searchType(): void {
    this.typeVisible = false;
    this.questionFilter = { ...this.questionFilter, type: this.searchTypeValue };
    this.questionSandbox.loadQuestionsFilteredPaged(this.questionFilter);
  }

  searchPlaceholder(): void {
    this.placeholderVisible = false;
    this.questionFilter = { ...this.questionFilter, placeholder: this.searchPlaceholderValue };
    this.questionSandbox.loadQuestionsFilteredPaged(this.questionFilter);
  }

  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

  private unregisterEvents() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
