import { Component, OnDestroy, OnInit } from '@angular/core';
import { QuestionModel } from '../../shared/models';
import { Subscription } from 'rxjs';
import { NzTableQueryParams } from 'ng-zorro-antd';
import { QuestionSandbox } from './question.sandbox';
import { QuestionFilter } from '../../shared/models/filters/question-filter';
import { Router } from '@angular/router';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
})
export class QuestionsComponent implements OnInit, OnDestroy {
  question: QuestionModel;
  questionsList: QuestionModel[] = [];
  total = 0;
  pageSize = 10;
  pageIndex = 1;
  searchLabelValue = '';
  searchTypeValue = '';
  searchPlaceholderValue = '';
  labelVisible = false;
  typeVisible = false;
  placeholderVisible = false;
  questionFilter: QuestionFilter;
  expandSet = new Set<number>();
  private isSubmited = false;
  private subscriptions: Subscription[] = [];
  private failedStatus = false;

  constructor(private questionSandbox: QuestionSandbox, public router: Router) {}

  ngOnInit(): void {
    this.questionFilter = new QuestionFilter();
    this.questionSandbox.loadQuestionsFilteredPaged(this.questionFilter);

    this.subscriptions.push(
      this.questionSandbox.questionsPagedFiltered$.subscribe((res) => {
        this.total = res.rowCount;
        this.questionsList = res.results;
      })
    );

    this.subscriptions.push(
      this.questionSandbox.failAction$.subscribe((status) => {
        this.failedStatus = status;
      })
    );

    this.subscriptions.push(
      this.questionSandbox.loadAction$.subscribe((_) => {
        this.handleRequestResult();
      })
    );
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find((item) => item.value !== null);

    this.questionFilter = {
      pageSize: pageSize,
      pageNumber: pageIndex,
      orderBy: (currentSort && currentSort.key) || '',
      orderDirection: (currentSort && currentSort.value) || '',
      label: (filter && filter.find((f) => f.key === 'label')?.value) || '',
      type: (filter && filter.find((f) => f.key === 'type')?.value) || '',
      placeholder: (filter && filter.find((f) => f.key === 'placeholder')?.value) || '',
      updateDateBegin: null,
      updateDateEnd: null,
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
  }

  resetLabelSearch(): void {
    this.searchLabelValue = '';
  }

  resetTypeSearch(): void {
    this.searchTypeValue = '';
  }

  resetPlaceholderSearch(): void {
    this.searchPlaceholderValue = '';
  }

  searchLabel(): void {
    this.labelVisible = false;
  }

  searchType(): void {
    this.typeVisible = false;
  }

  searchPlaceholder(): void {
    this.placeholderVisible = false;
  }

  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

  private handleRequestResult() {
    if (this.isSubmited) {
      if (!this.failedStatus) {
        this.questionSandbox.loadQuestionsFilteredPaged(this.questionFilter);
        this.isSubmited = false;
      }
    }
  }

  private unregisterEvents() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
