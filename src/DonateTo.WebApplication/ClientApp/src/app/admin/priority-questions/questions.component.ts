import { Component, OnDestroy, OnInit } from '@angular/core';
import { QuestionModel } from 'src/app/shared/models';
import { QuestionFilter } from 'src/app/shared/models/filters/question-filter';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { NzTableQueryParams } from 'ng-zorro-antd';
import { QuestionsSandbox } from './questions-sandbox';

@Component({
  selector: 'app-questions-admin',
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
  questionFilter = new QuestionFilter();
  labelVisible = false;
  typeVisible = false;
  placeholderVisible = false;
  expandSet = new Set<number>();
  private isSubmited = false;
  private subscriptions: Subscription[] = [];
  private failedStatus = false;

  constructor(private questionSandbox: QuestionsSandbox, public router: Router) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.questionSandbox.questionsPagedFiltered$.subscribe((res) => {
        // this.total = res.rowCount;
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
      this.questionSandbox.loadAction$.subscribe((_) => {
        this.handleRequestResult();
      })
    );

    this.questionSandbox.loadQuestions();
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex, sort, filter } = params;
    let questionFilter = new QuestionFilter();
    questionFilter.pageSize = pageSize;
    questionFilter.pageNumber = pageIndex;
    const currentSort = sort.find((item) => item.value !== null);
    questionFilter.orderBy = (currentSort && currentSort.key) || null;
    questionFilter.orderDirection = (currentSort && currentSort.value) || null;
    questionFilter.label = filter.find((f) => f.key === 'label')?.value;
    questionFilter.type = filter.find((f) => f.key === 'type')?.value;
    questionFilter.placeholder = filter.find((f) => f.key === 'placeholder')?.value;
    this.questionFilter = questionFilter;
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
