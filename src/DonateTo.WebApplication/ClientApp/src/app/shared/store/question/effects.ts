import {
  addQuestions,
  addQuestionsFailed,
  addQuestionsSuccess,
  addResults,
  addResultsFailed,
  addResultsSuccess,
  loadControlTypes,
  loadControlTypesFailed,
  loadControlTypesSuccess,
  loadQuestions,
  loadQuestionsFailed,
  loadQuestionsPagedFiltered,
  loadQuestionsPagedFilteredFailed,
  loadQuestionsPagedFilteredSuccess,
  loadQuestionsSuccess,
} from './actions';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { QuestionService } from '../../async-services/http/question.service';
import { ControlTypeService } from '../../async-services/http/controlType.service';

@Injectable()
export class QuestionEffects {
  @Effect()
  loadQuestionPagedFiltered$: Observable<{}> = this.actions$.pipe(
    ofType(loadQuestionsPagedFiltered),
    switchMap(({ questionFilter }) =>
      this.questionService.getPagedFiltered(questionFilter).pipe(
        map((pagedQuestions) => loadQuestionsPagedFilteredSuccess({ pagedQuestions })),
        catchError(() => of(loadQuestionsPagedFilteredFailed()))
      )
    )
  );
  @Effect()
  loadQuestions$: Observable<{}> = this.actions$.pipe(
    ofType(loadQuestions),
    switchMap(() =>
      this.questionService.getQuestions().pipe(
        map((questions) => loadQuestionsSuccess({ questions })),
        catchError(() => of(loadQuestionsFailed()))
      )
    )
  );

  @Effect()
  addQuestions$: Observable<{}> = this.actions$.pipe(
    ofType(addQuestions),
    switchMap(({ questions }) =>
      this.questionService.createQuestions(questions).pipe(
        map(() => addQuestionsSuccess({ questions })),
        catchError(() => of(addQuestionsFailed()))
      )
    )
  );

  @Effect()
  loadControlTypes$: Observable<{}> = this.actions$.pipe(
    ofType(loadControlTypes),
    switchMap(() =>
      this.controlTypeService.getControlTypes().pipe(
        map((controlTypes) => loadControlTypesSuccess({ controlTypes })),
        catchError(() => of(loadControlTypesFailed()))
      )
    )
  );

  @Effect()
  addResults$: Observable<{}> = this.actions$.pipe(
    ofType(addResults),
    switchMap(({ results }) =>
      this.questionService.createQuestionsResult(results).pipe(
        map(() => addResultsSuccess({ results })),
        catchError(() => of(addResultsFailed()))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private questionService: QuestionService,
    private controlTypeService: ControlTypeService
  ) {}
}
