import { loadQuestions, loadQuestionsFailed, loadQuestionsSuccess } from './actions';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { QuestionService } from '../../async-services/http/question.service';

@Injectable()
export class QuestionEffects {
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

  constructor(private actions$: Actions, private questionService: QuestionService) {}
}
