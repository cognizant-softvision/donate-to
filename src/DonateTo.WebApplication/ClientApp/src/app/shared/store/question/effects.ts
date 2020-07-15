import {
  loadQuestionsPagedFiltered,
  loadQuestionsPagedFilteredFailed,
  loadQuestionsPagedFilteredSuccess,
} from './actions';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { QuestionService } from '../../async-services/http/question.service';

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

  constructor(private actions$: Actions, private questionService: QuestionService) {}
}
